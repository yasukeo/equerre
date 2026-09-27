import "server-only";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { THREAD_PAGE, type Attachment, type ChatMessage } from "./files";

// Conversations read through the reader's own session: private.conversation_access decides
// what exists for her (D-080), and nothing here is cached.

const attachmentSchema = z.object({
  path: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
});

export function readAttachments(value: unknown): Attachment[] {
  const parsed = z.array(attachmentSchema).safeParse(value);
  return parsed.success ? parsed.data : [];
}

export type InboxEntry = {
  conversationId: string;
  student: { id: string; name: string; status: string } | null;
  group: { id: string; name: string } | null;
  lastMessageAt: string | null;
  lastBody: string | null;
  lastSenderId: string | null;
  lastSenderName: string | null;
  lastFiles: number;
  unread: number;
};

export async function getInbox(): Promise<InboxEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("my_inbox");
  if (error) throw new Error("Could not read the inbox", { cause: error });
  return (data ?? []).map((row) => ({
    conversationId: row.conversation_id,
    student: row.student_id
      ? { id: row.student_id, name: row.student_name ?? "", status: row.student_status ?? "actif" }
      : null,
    group: row.group_id ? { id: row.group_id, name: row.group_name ?? "" } : null,
    lastMessageAt: row.last_message_at,
    lastBody: row.last_body,
    lastSenderId: row.last_sender_id,
    lastSenderName: row.last_sender_name,
    lastFiles: row.last_files ?? 0,
    unread: row.unread ?? 0,
  }));
}

export async function countUnread(): Promise<number> {
  const inbox = await getInbox();
  return inbox.reduce((total, entry) => total + entry.unread, 0);
}

export type Thread = {
  id: string;
  student: { id: string; name: string; status: string } | null;
  group: { id: string; name: string } | null;
  messages: ChatMessage[];
  /** Older messages exist beyond those given. */
  hasOlder: boolean;
  /** When the other side of a one-to-one conversation last read it, for « Lu ». */
  otherReadAt: string | null;
};

export function toChatMessage(row: {
  id: string;
  sender_id: string;
  sender_name: string;
  body: string;
  attachments: unknown;
  created_at: string;
}): ChatMessage {
  return {
    id: row.id,
    senderId: row.sender_id,
    senderName: row.sender_name,
    body: row.body,
    attachments: readAttachments(row.attachments),
    createdAt: row.created_at,
  };
}

export const MESSAGE_FIELDS = "id, sender_id, sender_name, body, attachments, created_at" as const;

export async function getThread(id: string, viewerId: string): Promise<Thread | null> {
  const supabase = await createClient();
  const { data: conversation, error } = await supabase
    .from("conversations")
    .select(
      "id, student_id, group_id, student:profiles!conversations_student_id_fkey(id, full_name, status), group:groups(id, name)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Could not read the conversation", { cause: error });
  if (!conversation) return null;

  const [messages, reads] = await Promise.all([
    supabase
      .from("messages")
      .select(MESSAGE_FIELDS)
      .eq("conversation_id", id)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(THREAD_PAGE + 1),
    conversation.student_id
      ? supabase
          .from("conversation_reads")
          .select("profile_id, last_read_at")
          .eq("conversation_id", id)
          .neq("profile_id", viewerId)
      : null,
  ]);
  if (messages.error) throw new Error("Could not read the messages", { cause: messages.error });

  const rows = messages.data ?? [];
  return {
    id: conversation.id,
    student: conversation.student
      ? {
          id: conversation.student.id,
          name: conversation.student.full_name,
          status: conversation.student.status,
        }
      : null,
    group: conversation.group,
    messages: rows.slice(0, THREAD_PAGE).reverse().map(toChatMessage),
    hasOlder: rows.length > THREAD_PAGE,
    otherReadAt: reads?.data?.[0]?.last_read_at ?? null,
  };
}

/** A conversation's name for the page title: the student or the group, or null if unseen. */
export async function getConversationTitle(id: string): Promise<{
  student: string | null;
  group: string | null;
} | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select("student:profiles!conversations_student_id_fkey(full_name), group:groups(name)")
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  return { student: data.student?.full_name ?? null, group: data.group?.name ?? null };
}
