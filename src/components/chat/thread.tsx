"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { FileText, Paperclip, RotateCw, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { Button } from "@/components/ui/button";
import {
  MAX_ATTACHMENTS,
  MAX_MESSAGE_LENGTH,
  MESSAGE_FILE_MAX_BYTES,
  MESSAGE_IMAGE_PREPARATION,
  THREAD_PAGE,
  isImage,
  messageFilePath,
  type Attachment,
  type ChatMessage,
} from "@/lib/chat/files";
import { renderChatText } from "@/lib/chat/text";
import { formatLocal } from "@/lib/dates";
import { ImagePreparationError, prepareImage } from "@/lib/images/prepare-image";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

// A conversation, live (DECISIONS.md, D-080, D-081, D-083).
//
// What she writes goes into an outbox first, with the id the database will keep, and is
// shown at once. The outbox lives on the device (and in memory when the device refuses to
// keep it), is sent in order by one tab at a time, and is tried again on its own while the
// line is bad: a message sent twice is stored once, and none is lost on the way. The browser
// calls send_message and mark_conversation_read itself, with her session: the database checks
// everything, and server actions, which Next runs one after another, would queue a send
// behind a slow read mark.

type Failure =
  | "not_allowed"
  | "id_taken"
  | "recipient_inactive"
  | "body_too_long"
  | "attachments_invalid"
  | "empty"
  | "too_heavy_today"
  | "rate_limited"
  | "unknown";

/** Refusals another try would not change. */
const FINAL: Failure[] = [
  "not_allowed",
  "id_taken",
  "recipient_inactive",
  "body_too_long",
  "attachments_invalid",
  "empty",
  "too_heavy_today",
];

type Row = ChatMessage & {
  state: "sent" | "sending" | "waiting" | "failed";
  failure?: Failure;
};

type Pending = { id: string; body: string; attachments: Attachment[]; at: string };

type Upload = {
  key: string;
  name: string;
  type: string;
  size: number;
  state: "uploading" | "ready" | "failed";
  path?: string;
  error?: string;
};

type Signed = { url: string; until: number };

const FIELDS = "id, sender_id, sender_name, body, attachments, created_at";
const SEND_TIMEOUT = 20_000;
const RETRY_EVERY = 15_000;
/** Signed addresses last an hour; one is renewed when less than ten minutes remain. */
const SIGNED_FOR = 3600;
const RENEW_BEFORE = 10 * 60_000;
/** A reconnection fetches a little before the newest message known: late commits land there. */
const CATCH_UP_OVERLAP = 5_000;

function storageKey(viewerId: string, conversationId: string, what: "draft" | "outbox") {
  return `equerre:chat:${viewerId}:${conversationId}:${what}`;
}

function fromRow(row: Record<string, unknown>): ChatMessage {
  return {
    id: String(row.id),
    senderId: String(row.sender_id),
    senderName: String(row.sender_name ?? ""),
    body: String(row.body ?? ""),
    attachments: Array.isArray(row.attachments) ? (row.attachments as Attachment[]) : [],
    createdAt: String(row.created_at),
  };
}

function byTime(a: Row, b: Row) {
  return a.createdAt === b.createdAt
    ? a.id.localeCompare(b.id)
    : a.createdAt.localeCompare(b.createdAt);
}

function sizeLabel(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} Mo`
    : `${Math.max(1, Math.round(bytes / 1024))} Ko`;
}

function latest(dates: (string | undefined)[]): string | undefined {
  return dates.reduce<string | undefined>(
    (newest, date) => (date && (!newest || date > newest) ? date : newest),
    undefined,
  );
}

function subscribeToStorage(change: () => void) {
  window.addEventListener("storage", change);
  return () => window.removeEventListener("storage", change);
}

function readKept(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

/** Runs `work` while no other tab of this device sends the same outbox. */
async function exclusively(name: string, work: () => Promise<void>) {
  if (typeof navigator !== "undefined" && "locks" in navigator) {
    await navigator.locks.request(name, work);
  } else {
    await work();
  }
}

export function Thread({
  conversationId,
  viewerId,
  viewerName,
  otherName,
  initial,
  hasOlder: initialHasOlder,
  otherReadAt: initialOtherReadAt,
  isGroup,
  closedNotice,
}: {
  conversationId: string;
  viewerId: string;
  viewerName: string;
  /** Who the other side is in a one-to-one conversation, for screen readers. */
  otherName: string;
  initial: ChatMessage[];
  hasOlder: boolean;
  /** When the other side of a one-to-one conversation last read it. */
  otherReadAt: string | null;
  /** In a group, each message says who wrote it, and nobody's reading is shown. */
  isGroup: boolean;
  /** Set when nothing can be sent here, with the reason. */
  closedNotice?: string;
}) {
  const t = useTranslations("chat");
  const [rows, setRows] = useState<Row[]>(() =>
    initial.map((message) => ({ ...message, state: "sent" as const })),
  );
  const [hasOlder, setHasOlder] = useState(initialHasOlder);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [otherReadAt, setOtherReadAt] = useState(initialOtherReadAt);
  // The draft as the device keeps it, until she types: then what she types.
  const [typed, setTyped] = useState<string | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [signed, setSigned] = useState<Record<string, Signed>>({});
  const [announcement, setAnnouncement] = useState("");
  const [clock, setClock] = useState(0);

  const field = useRef<HTMLTextAreaElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const flushing = useRef(false);
  const again = useRef(false);
  const retryTimer = useRef<number | undefined>(undefined);
  const readTimer = useRef<number | undefined>(undefined);
  const router = useRouter();
  const markedUpTo = useRef<string | undefined>(undefined);
  // The newest message the server has given this page, own ones included: what a
  // reconnection starts from. Confirmations of her own sends do not move it.
  const latestFetched = useRef(latest(initial.map((message) => message.createdAt)));
  // The outbox in memory, used alone when the device refuses to keep it.
  const memory = useRef<Pending[]>([]);
  const deviceKeeps = useRef(true);
  const cancelled = useRef(new Set<string>());
  // The rows as they are now, for timers that fire after the render that set them.
  const rowsNow = useRef(rows);
  const failedSigning = useRef(new Map<string, number>());

  const outboxKey = storageKey(viewerId, conversationId, "outbox");
  const draftKey = storageKey(viewerId, conversationId, "draft");
  const kept = useSyncExternalStore(
    subscribeToStorage,
    () => readKept(draftKey),
    () => "",
  );
  const body = typed ?? kept;
  const setBody = (value: string) => setTyped(value);

  // ───────────────────────────────────────────────── the outbox

  const loadOutbox = (): Pending[] => {
    if (!deviceKeeps.current) return memory.current;
    try {
      const raw = window.localStorage.getItem(outboxKey);
      return raw ? (JSON.parse(raw) as Pending[]) : [];
    } catch {
      return memory.current;
    }
  };

  const saveOutbox = (entries: Pending[]) => {
    memory.current = entries;
    try {
      if (entries.length === 0) window.localStorage.removeItem(outboxKey);
      else window.localStorage.setItem(outboxKey, JSON.stringify(entries));
    } catch {
      deviceKeeps.current = false;
    }
  };

  const saveDraft = (value: string) => {
    try {
      if (value === "") window.localStorage.removeItem(draftKey);
      else window.localStorage.setItem(draftKey, value);
    } catch {
      // A draft the device will not keep is only lost if the page closes.
    }
  };

  const merge = (incoming: Row[]) =>
    setRows((current) => {
      const byId = new Map(current.map((row) => [row.id, row]));
      for (const row of incoming) {
        const known = byId.get(row.id);
        // A message the server has confirmed stays confirmed, whatever arrives after.
        if (known?.state === "sent" && row.state !== "sent") continue;
        byId.set(row.id, { ...known, ...row });
      }
      return [...byId.values()].sort(byTime);
    });

  const pendingRow = (pending: Pending, state: Row["state"], failure?: Failure): Row => ({
    id: pending.id,
    senderId: viewerId,
    senderName: viewerName,
    body: pending.body.trim(),
    attachments: pending.attachments,
    createdAt: pending.at,
    state,
    failure,
  });

  const sendOne = async (pending: Pending): Promise<{ at: string } | { failure: Failure }> => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), SEND_TIMEOUT);
    try {
      const { data, error } = await createClient()
        .rpc("send_message", {
          p_id: pending.id,
          p_conversation_id: conversationId,
          p_body: pending.body,
          p_attachments: pending.attachments.map((file) => file.path),
        })
        .abortSignal(controller.signal);
      if (!error && data) return { at: data };
      const failure = FINAL.find((code) => code === error?.message);
      return {
        failure: failure ?? (error?.message === "rate_limited" ? "rate_limited" : "unknown"),
      };
    } catch {
      return { failure: "unknown" };
    } finally {
      window.clearTimeout(timer);
    }
  };

  const removeFiles = (attachments: Attachment[]) => {
    if (attachments.length === 0) return;
    void createClient()
      .storage.from("message-files")
      .remove(attachments.map((file) => file.path));
  };

  /** Sends the outbox in order, until it is empty or the line fails. */
  const flush = async () => {
    if (flushing.current) {
      again.current = true;
      return;
    }
    flushing.current = true;
    window.clearTimeout(retryTimer.current);
    try {
      await exclusively(outboxKey, async () => {
        do {
          again.current = false;
          let queue = loadOutbox();
          // Everything waiting is on screen before anything leaves.
          merge(queue.map((pending) => pendingRow(pending, "sending")));
          while (queue.length > 0) {
            const pending = queue[0]!;
            const result = await sendOne(pending);
            queue = loadOutbox().filter((entry) => entry.id !== pending.id);
            if ("at" in result) {
              saveOutbox(queue);
              merge([{ ...pendingRow(pending, "sent"), createdAt: result.at }]);
              continue;
            }
            if (FINAL.includes(result.failure)) {
              // It will not go: it leaves the outbox, its text goes back to her, its files go.
              saveOutbox(queue);
              merge([pendingRow(pending, "failed", result.failure)]);
              setAnnouncement(t(`failures.${result.failure}`));
              if (field.current && field.current.value.trim() === "") {
                setBody(pending.body);
                saveDraft(pending.body);
              }
              removeFiles(pending.attachments);
              continue;
            }
            // The line is bad: this one and those after it wait, and go again on their own.
            merge(
              [pending, ...queue].map((entry) =>
                pendingRow(entry, "waiting", entry.id === pending.id ? result.failure : undefined),
              ),
            );
            setAnnouncement(t(`failures.${result.failure}`));
            retryTimer.current = window.setTimeout(() => void flush(), RETRY_EVERY);
            return;
          }
        } while (again.current);
      });
    } finally {
      flushing.current = false;
    }
  };

  // ───────────────────────────────────────────────── reading

  const markRead = () => {
    window.clearTimeout(readTimer.current);
    readTimer.current = window.setTimeout(() => {
      if (document.visibilityState !== "visible") return;
      // Up to the newest message of the others that is on screen, and only when it moved.
      const upTo = latest(
        rowsNow.current
          .filter((row) => row.senderId !== viewerId && row.state === "sent")
          .map((row) => row.createdAt),
      );
      if (!upTo || (markedUpTo.current && upTo <= markedUpTo.current)) return;
      markedUpTo.current = upTo;
      // Then the page around the thread is drawn again: the unread count in the navigation
      // goes down as soon as she has read (D-104).
      void createClient()
        .rpc("mark_conversation_read", {
          p_conversation_id: conversationId,
          p_up_to: upTo,
        })
        .then(({ error }) => {
          if (!error) router.refresh();
        });
    }, 500);
  };

  const receive = (messages: ChatMessage[]) => {
    if (messages.length === 0) return;
    latestFetched.current = latest([
      latestFetched.current,
      ...messages.map((message) => message.createdAt),
    ]);
    merge(messages.map((message) => ({ ...message, state: "sent" as const })));
  };

  /** What was said while the line was down, page after page. */
  const catchUp = async () => {
    const supabase = createClient();
    for (let page = 0; page < 20; page++) {
      const since = latestFetched.current
        ? new Date(Date.parse(latestFetched.current) - CATCH_UP_OVERLAP).toISOString()
        : undefined;
      let query = supabase
        .from("messages")
        .select(FIELDS)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
        .order("id", { ascending: true })
        .limit(THREAD_PAGE);
      if (since) query = query.gte("created_at", since);
      const { data } = await query;
      if (!data) return;
      const fresh = data.map(fromRow);
      const before = latestFetched.current;
      receive(fresh);
      if (data.length < THREAD_PAGE || latestFetched.current === before) return;
    }
  };

  const refetchOtherRead = async () => {
    if (isGroup) return;
    const { data } = await createClient()
      .from("conversation_reads")
      .select("last_read_at")
      .eq("conversation_id", conversationId)
      .neq("profile_id", viewerId);
    const at = latest((data ?? []).map((row) => row.last_read_at));
    if (at) setOtherReadAt((current) => latest([current ?? undefined, at]) ?? null);
  };

  const nearBottom = () =>
    document.documentElement.scrollHeight - (window.innerHeight + window.scrollY) < 320;

  const scrollDown = () =>
    requestAnimationFrame(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "auto" }),
    );

  // ───────────────────────────────────────────────── effects

  useEffect(() => {
    rowsNow.current = rows;
  }, [rows]);

  const onMount = useEffectEvent(() => {
    void flush();
    markRead();
    scrollDown();
  });

  const onReturn = useEffectEvent(() => {
    void flush();
    void catchUp();
    void refetchOtherRead();
    markRead();
  });

  const onInsert = useEffectEvent((message: ChatMessage) => {
    const follow = nearBottom();
    receive([message]);
    if (message.senderId !== viewerId) {
      setAnnouncement(t("arrived", { name: isGroup ? message.senderName : otherName }));
      markRead();
    }
    if (follow) scrollDown();
  });

  const onRead = useEffectEvent((row: { profile_id?: string; last_read_at?: string }) => {
    if (isGroup || !row.profile_id || row.profile_id === viewerId || !row.last_read_at) return;
    const at = row.last_read_at;
    setOtherReadAt((current) => latest([current ?? undefined, at]) ?? null);
  });

  const onSubscribed = useEffectEvent(() => {
    void catchUp();
    void refetchOtherRead();
  });

  useEffect(() => {
    onMount();
    const visible = () => {
      if (document.visibilityState === "visible") onReturn();
    };
    window.addEventListener("online", onReturn);
    document.addEventListener("visibilitychange", visible);
    const tick = window.setInterval(() => setClock((value) => value + 1), 5 * 60_000);
    return () => {
      window.removeEventListener("online", onReturn);
      document.removeEventListener("visibilitychange", visible);
      window.clearInterval(tick);
      window.clearTimeout(retryTimer.current);
      window.clearTimeout(readTimer.current);
    };
  }, [conversationId]);

  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel | null = null;
    let stopped = false;
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (stopped) return;
      if (data.session) await supabase.realtime.setAuth(data.session.access_token);
      if (stopped) return;
      channel = supabase
        .channel(`conversation:${conversationId}:${crypto.randomUUID()}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => onInsert(fromRow(payload.new)),
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "conversation_reads",
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => onRead(payload.new as { profile_id?: string; last_read_at?: string }),
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") onSubscribed();
        });
    })();
    return () => {
      stopped = true;
      if (channel) void supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Signed addresses for the files on screen, renewed before they expire.
  useEffect(() => {
    const now = Date.now();
    const wanted = rows
      .flatMap((row) => row.attachments.map((file) => file.path))
      .filter((path) => {
        const known = signed[path];
        if (known && known.until - now > RENEW_BEFORE) return false;
        const failedAt = failedSigning.current.get(path);
        return !failedAt || now - failedAt > 60_000;
      });
    if (wanted.length === 0) return;
    let stopped = false;
    void createClient()
      .storage.from("message-files")
      .createSignedUrls([...new Set(wanted)], SIGNED_FOR)
      .then(({ data }) => {
        if (stopped) return;
        const fresh: Record<string, Signed> = {};
        for (const entry of data ?? []) {
          if (entry.path && entry.signedUrl) {
            fresh[entry.path] = { url: entry.signedUrl, until: Date.now() + SIGNED_FOR * 1000 };
          } else if (entry.path) {
            failedSigning.current.set(entry.path, Date.now());
          }
        }
        if (Object.keys(fresh).length > 0) setSigned((current) => ({ ...current, ...fresh }));
      });
    return () => {
      stopped = true;
    };
  }, [rows, signed, clock]);

  // ───────────────────────────────────────────────── actions

  const loadOlder = async () => {
    const oldest = rows.find((row) => row.state === "sent");
    if (!oldest || loadingOlder) return;
    setLoadingOlder(true);
    const { data } = await createClient()
      .from("messages")
      .select(FIELDS)
      .eq("conversation_id", conversationId)
      .or(
        `created_at.lt."${oldest.createdAt}",and(created_at.eq."${oldest.createdAt}",id.lt.${oldest.id})`,
      )
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(THREAD_PAGE);
    setLoadingOlder(false);
    if (!data) return;
    merge(data.map((row) => ({ ...fromRow(row), state: "sent" as const })));
    if (data.length < THREAD_PAGE) {
      setHasOlder(false);
      // The button goes: the focus goes to the messages it brought.
      list.current?.focus();
    }
  };

  const attach = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_ATTACHMENTS - uploads.length;
    const chosen = [...files].slice(0, Math.max(0, room));
    if (files.length > chosen.length) setAnnouncement(t("files.tooMany", { max: MAX_ATTACHMENTS }));
    const added: Upload[] = chosen.map((file) => ({
      key: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      state: "uploading",
    }));
    setUploads((current) => [...current, ...added]);
    const bucket = createClient().storage.from("message-files");
    for (const [index, file] of chosen.entries()) {
      const upload = added[index];
      if (!upload || cancelled.current.has(upload.key)) continue;
      const done = (change: Partial<Upload>) =>
        setUploads((current) =>
          current.map((entry) => (entry.key === upload.key ? { ...entry, ...change } : entry)),
        );
      try {
        let blob: Blob = file;
        let type = file.type;
        let extension = "pdf";
        if (file.type === "application/pdf") {
          if (file.size > MESSAGE_FILE_MAX_BYTES) throw new ImagePreparationError("tooLarge");
        } else {
          const prepared = await prepareImage(file, MESSAGE_IMAGE_PREPARATION);
          blob = prepared.blob;
          type = prepared.type;
          extension = prepared.extension;
        }
        const path = messageFilePath(conversationId, viewerId, extension);
        const { error } = await bucket.upload(path, blob, {
          contentType: type,
          upsert: false,
          metadata: { filename: file.name.slice(0, 120) },
        });
        if (error) throw error;
        // Taken back while it was on its way: it goes as soon as it has arrived.
        if (cancelled.current.has(upload.key)) {
          void bucket.remove([path]);
          continue;
        }
        done({ state: "ready", path, type, size: blob.size });
      } catch (error) {
        const message =
          error instanceof ImagePreparationError
            ? error.reason === "tooLarge"
              ? t("files.tooLarge")
              : error.reason === "type"
                ? t("files.type")
                : t("files.unreadable")
            : error instanceof Error && /row-level security/i.test(error.message)
              ? t("files.refused")
              : t("files.failed");
        done({ state: "failed", error: message });
        setAnnouncement(`${file.name} : ${message}`);
      }
    }
  };

  const discard = (upload: Upload) => {
    cancelled.current.add(upload.key);
    setUploads((current) => current.filter((entry) => entry.key !== upload.key));
    if (upload.path) void createClient().storage.from("message-files").remove([upload.path]);
    field.current?.focus();
  };

  const ready = uploads.filter((upload) => upload.state === "ready");
  const uploading = uploads.some((upload) => upload.state === "uploading");
  const canSend =
    !uploading &&
    (body.trim() !== "" || ready.length > 0) &&
    body.trim().length <= MAX_MESSAGE_LENGTH;

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!canSend) return;
    const pending: Pending = {
      id: crypto.randomUUID(),
      body,
      attachments: ready.map((upload) => ({
        path: upload.path ?? "",
        name: upload.name,
        type: upload.type,
        size: upload.size,
      })),
      at: new Date().toISOString(),
    };
    saveOutbox([...loadOutbox(), pending]);
    merge([pendingRow(pending, "sending")]);
    saveDraft("");
    setBody("");
    setUploads((current) => current.filter((upload) => upload.state !== "ready"));
    // The keyboard stays open for the next line.
    field.current?.focus();
    scrollDown();
    void flush();
  };

  const retry = () => {
    field.current?.focus();
    void flush();
  };

  const drop = async (row: Row) => {
    // Refused for good, or given up while waiting: out of the outbox and off the screen. One
    // that reached the server after all stays, as sent.
    saveOutbox(loadOutbox().filter((entry) => entry.id !== row.id));
    const { data } = await createClient().from("messages").select(FIELDS).eq("id", row.id);
    if (data && data.length > 0) {
      receive(data.map(fromRow));
    } else {
      setRows((current) => current.filter((entry) => entry.id !== row.id));
      if (row.state === "waiting") removeFiles(row.attachments);
    }
    field.current?.focus();
  };

  const lastReadMine = isGroup
    ? undefined
    : rows
        .filter((row) => row.senderId === viewerId && row.state === "sent")
        .filter((row) => otherReadAt !== null && row.createdAt <= otherReadAt)
        .at(-1)?.id;

  const days = rows.map((row) => formatLocal(row.createdAt, "yyyy-MM-dd"));
  const hintId = `message-hint-${conversationId}`;

  return (
    <div className="grid gap-4">
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {hasOlder ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="justify-self-center"
          aria-busy={loadingOlder || undefined}
          onClick={() => void loadOlder()}
        >
          {loadingOlder ? t("loading") : t("older")}
        </Button>
      ) : null}

      {rows.length === 0 ? (
        <p className="text-center text-encre-douce">
          {closedNotice ? t("emptyClosed") : t("empty")}
        </p>
      ) : null}

      <ol
        ref={list}
        tabIndex={-1}
        role="list"
        aria-label={t("listLabel")}
        className="grid grid-cols-1 gap-2"
      >
        {rows.map((row, index) => (
          <li key={row.id} className="grid min-w-0 grid-cols-1 gap-2">
            {index === 0 || days[index] !== days[index - 1] ? (
              <p className="py-2 text-center text-xs font-medium text-encre-douce first-letter:uppercase">
                {formatLocal(row.createdAt, "EEEE d MMMM")}
              </p>
            ) : null}
            <Bubble
              row={row}
              mine={row.senderId === viewerId}
              showName={isGroup}
              who={row.senderId === viewerId ? t("you") : isGroup ? row.senderName : otherName}
              read={row.id === lastReadMine}
              signed={signed}
              onImageLoad={() => {
                if (nearBottom()) scrollDown();
              }}
              onRetry={retry}
              onDrop={() => void drop(row)}
            />
          </li>
        ))}
      </ol>

      {closedNotice ? (
        <p className="rounded-md border border-dashed border-trait px-4 py-3 text-encre-douce">
          {closedNotice}
        </p>
      ) : (
        <form
          onSubmit={submit}
          className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom))] grid gap-2 border-t border-quadrillage bg-papier py-3 md:bottom-0"
        >
          {uploads.length > 0 ? (
            <ul role="list" className="flex flex-wrap gap-2">
              {uploads.map((upload) => (
                <li
                  key={upload.key}
                  className={cn(
                    "flex min-h-11 max-w-full items-center gap-2 rounded-md border ps-2 text-sm",
                    upload.state === "failed" ? "border-stylo-rouge/60" : "border-quadrillage",
                  )}
                >
                  <span className="min-w-0 truncate">{upload.name}</span>
                  <span
                    className={cn(
                      "shrink-0 text-xs",
                      upload.state === "failed" ? "text-stylo-rouge" : "text-encre-douce",
                    )}
                  >
                    {upload.state === "uploading"
                      ? t("files.uploading")
                      : upload.state === "failed"
                        ? upload.error
                        : sizeLabel(upload.size)}
                  </span>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={t("files.remove", { name: upload.name })}
                    onClick={() => discard(upload)}
                  >
                    <X aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : null}
          <label htmlFor={`message-${conversationId}`} className="sr-only">
            {t("fieldLabel")}
          </label>
          <div className="flex items-end gap-2">
            <label
              className={cn(
                "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md hover:bg-sunken",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-encre",
                uploads.length >= MAX_ATTACHMENTS && "pointer-events-none opacity-50",
              )}
            >
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,application/pdf"
                className="sr-only"
                disabled={uploads.length >= MAX_ATTACHMENTS}
                onChange={(event) => {
                  void attach(event.target.files);
                  event.target.value = "";
                }}
              />
              <Paperclip aria-hidden="true" className="size-5" />
              <span className="sr-only">{t("files.add")}</span>
            </label>
            <textarea
              ref={field}
              id={`message-${conversationId}`}
              rows={2}
              maxLength={MAX_MESSAGE_LENGTH}
              value={body}
              aria-describedby={hintId}
              placeholder={t("placeholder")}
              onChange={(event) => {
                setBody(event.target.value);
                saveDraft(event.target.value);
              }}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  (event.ctrlKey || event.metaKey) &&
                  !event.nativeEvent.isComposing
                ) {
                  submit();
                }
              }}
              className="min-h-11 w-full min-w-0 flex-1 resize-y rounded-md border border-trait bg-surface px-3 py-2 text-base leading-relaxed text-encre placeholder:text-encre-douce"
            />
            <Button type="submit" size="icon" disabled={!canSend} aria-label={t("send")}>
              <Send aria-hidden="true" className="rtl:-scale-x-100" />
            </Button>
          </div>
          <p id={hintId} className="text-xs text-encre-douce">
            {t("hint")}
            <span className="hidden md:inline"> {t("hintKeys")}</span>
          </p>
        </form>
      )}
    </div>
  );
}

function Bubble({
  row,
  mine,
  showName,
  who,
  read,
  signed,
  onImageLoad,
  onRetry,
  onDrop,
}: {
  row: Row;
  mine: boolean;
  showName: boolean;
  who: string;
  read: boolean;
  signed: Record<string, Signed>;
  onImageLoad: () => void;
  onRetry: () => void;
  onDrop: () => void;
}) {
  const t = useTranslations("chat");
  return (
    <div
      className={cn(
        "grid max-w-[85%] min-w-0 grid-cols-1 gap-1.5 border px-3.5 py-2.5",
        mine
          ? "justify-self-end rounded-2xl rounded-ee-md border-stylo-bleu/25 bg-lavis-bleu"
          : "justify-self-start rounded-2xl rounded-es-md border-quadrillage bg-surface",
        row.state === "failed" && "border-stylo-rouge/60",
      )}
    >
      {showName && !mine ? (
        <p className="text-xs font-semibold">{row.senderName}</p>
      ) : (
        <span className="sr-only">{who} :</span>
      )}
      {row.body ? (
        <p className="leading-relaxed [overflow-wrap:anywhere] whitespace-pre-wrap [contain:paint]">
          {renderChatText(row.body)}
        </p>
      ) : null}
      {row.attachments.length > 0 ? (
        <ul role="list" className="grid min-w-0 gap-1.5">
          {row.attachments.map((file) => {
            const url = signed[file.path]?.url;
            return (
              <li key={file.path} className="min-w-0">
                {isImage(file) && url ? (
                  <a href={url} target="_blank" rel="noreferrer" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={file.name}
                      loading="lazy"
                      decoding="async"
                      onLoad={onImageLoad}
                      className="max-h-64 max-w-full rounded-md border border-quadrillage object-contain"
                    />
                  </a>
                ) : (
                  <a
                    href={url ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={url ? undefined : true}
                    className="inline-flex min-h-11 max-w-full items-center gap-2 text-sm underline decoration-trait underline-offset-4"
                  >
                    <FileText aria-hidden="true" className="size-4 shrink-0" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">{file.name}</span>
                    <span className="shrink-0 text-encre-douce">{sizeLabel(file.size)}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
      <p
        className={cn(
          "flex flex-wrap items-center gap-x-2 text-xs text-encre-douce",
          mine && "justify-end",
        )}
      >
        <span className="tabular">{formatLocal(row.createdAt, "HH:mm")}</span>
        {row.state === "sending" ? <span>{t("sending")}</span> : null}
        {read ? <span>{t("read")}</span> : null}
      </p>
      {row.state === "waiting" || row.state === "failed" ? (
        <div className="grid gap-1 text-sm text-stylo-rouge">
          <p>
            {row.state === "waiting" && !row.failure
              ? t("queued")
              : t(`failures.${row.failure ?? "unknown"}`)}
          </p>
          <div className="flex flex-wrap gap-2">
            {row.state === "waiting" ? (
              <Button type="button" size="sm" variant="outline" onClick={onRetry}>
                <RotateCw aria-hidden="true" />
                {t("retry")}
              </Button>
            ) : null}
            <Button type="button" size="sm" variant="ghost" onClick={onDrop}>
              {t("drop")}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
