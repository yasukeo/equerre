import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { adminClient, seedId, signedInAs, type Client } from "./clients";

// The chat through the real API (DECISIONS.md, D-080, D-081): only those who take part read a
// conversation, a group's member from the day she joined, and every message goes through
// send_message. Messages cannot be deleted by anyone signed in, so the secret key cleans up;
// without it, this file is skipped.

const ids = {
  salma: seedId("00000000", 101),
  omar: seedId("00000000", 102),
  imane: seedId("00000000", 104),
  hiba: seedId("00000000", 107),
  group: seedId("10000000", 1),
};

const admin = adminClient();

describe.skipIf(!admin)("chat", () => {
  let tutor: Client;
  let salma: Client;
  let omar: Client;
  let imane: Client;
  let hiba: Client;
  let salmaConversation = "";
  let groupConversation = "";
  let hibaConversation = "";
  const sent: string[] = [];
  const files: string[] = [];

  async function send(
    client: Client,
    conversation: string,
    body: string,
    attachments: string[] = [],
  ) {
    const id = randomUUID();
    const result = await client.rpc("send_message", {
      p_id: id,
      p_conversation_id: conversation,
      p_body: body,
      p_attachments: attachments,
    });
    if (!result.error) sent.push(id);
    return { id, ...result };
  }

  beforeAll(async () => {
    [tutor, salma, omar, imane, hiba] = await Promise.all([
      signedInAs("prof@equerre.test"),
      signedInAs("salma.alaoui@equerre.test"),
      signedInAs("omar.elidrissi@equerre.test"),
      signedInAs("imane.chraibi@equerre.test"),
      signedInAs("hiba.tazi@equerre.test"),
    ]);
    const { data } = await tutor
      .from("conversations")
      .select("id, student_id, group_id")
      .or(`student_id.in.(${ids.salma},${ids.hiba}),group_id.eq.${ids.group}`);
    salmaConversation = data?.find((row) => row.student_id === ids.salma)?.id ?? "";
    hibaConversation = data?.find((row) => row.student_id === ids.hiba)?.id ?? "";
    groupConversation = data?.find((row) => row.group_id === ids.group)?.id ?? "";
  });

  afterAll(async () => {
    if (sent.length > 0) await admin!.from("messages").delete().in("id", sent);
    if (files.length > 0) await admin!.storage.from("message-files").remove(files);
    await admin!.from("conversation_reads").delete().eq("profile_id", ids.imane);
    await tutor
      .from("group_members")
      .delete()
      .eq("group_id", ids.group)
      .eq("student_id", ids.imane);
    await tutor.from("profiles").update({ status: "actif" }).eq("id", ids.hiba);
  });

  it("keeps a conversation to those who take part", async () => {
    expect(salmaConversation).not.toBe("");
    const first = await send(salma, salmaConversation, "Test RLS — bonjour");
    expect(first.error).toBeNull();

    // Sent again with the same id after a dropped answer: the same message, once.
    const again = await salma.rpc("send_message", {
      p_id: first.id,
      p_conversation_id: salmaConversation,
      p_body: "Test RLS — autre texte",
      p_attachments: [],
    });
    expect(again.data).toBe(first.data);
    const { data: stored } = await tutor.from("messages").select("body").eq("id", first.id);
    expect(stored).toEqual([{ body: "Test RLS — bonjour" }]);

    // Another student sees neither the conversation nor its messages, and cannot write in it.
    const { data: conversations } = await omar
      .from("conversations")
      .select("id")
      .eq("id", salmaConversation);
    const { data: messages } = await omar
      .from("messages")
      .select("id")
      .eq("conversation_id", salmaConversation);
    expect(conversations).toEqual([]);
    expect(messages).toEqual([]);
    const intrusion = await send(omar, salmaConversation, "Test RLS — intrus");
    expect(intrusion.error?.message).toBe("not_allowed");
    const reuse = await omar.rpc("send_message", {
      p_id: first.id,
      p_conversation_id: groupConversation,
      p_body: "x",
      p_attachments: [],
    });
    expect(reuse.error?.message).toBe("id_taken");

    // Nobody writes around the function, nor changes what was said.
    const direct = await salma.from("messages").insert({
      id: randomUUID(),
      conversation_id: salmaConversation,
      sender_id: ids.salma,
      sender_name: "Keltoum Gharbaoui",
      body: "faux",
    });
    expect(direct.error).not.toBeNull();
    const { data: edited } = await salma
      .from("messages")
      .update({ body: "modifié" })
      .eq("id", first.id)
      .select("id");
    expect(edited ?? []).toEqual([]);
  });

  it("counts what she has not read, and shows « Lu » to the other side", async () => {
    const before = await tutor.rpc("my_inbox");
    const row = before.data?.find((entry) => entry.conversation_id === salmaConversation);
    expect(row?.unread).toBeGreaterThan(0);
    await tutor.rpc("mark_conversation_read", {
      p_conversation_id: salmaConversation,
      p_up_to: new Date().toISOString(),
    });
    const after = await tutor.rpc("my_inbox");
    expect(after.data?.find((entry) => entry.conversation_id === salmaConversation)?.unread).toBe(
      0,
    );

    // Salma sees the tutor's mark on her own conversation.
    const { data: marks } = await salma
      .from("conversation_reads")
      .select("profile_id")
      .eq("conversation_id", salmaConversation);
    expect(marks?.some((mark) => mark.profile_id !== ids.salma)).toBe(true);
  });

  it("opens a group's conversation to its members from the day each joined", async () => {
    const earlier = await send(omar, groupConversation, "Test RLS — avant Imane");
    expect(earlier.error).toBeNull();
    const { data: seen } = await salma.from("messages").select("sender_name").eq("id", earlier.id);
    expect(seen).toEqual([{ sender_name: "Omar El Idrissi" }]);
    const { data: outside } = await imane
      .from("messages")
      .select("id")
      .eq("conversation_id", groupConversation);
    expect(outside).toEqual([]);

    // Added today, she reads what is said from now on, not before.
    await tutor.from("group_members").insert({ group_id: ids.group, student_id: ids.imane });
    const { data: stillHidden } = await imane.from("messages").select("id").eq("id", earlier.id);
    expect(stillHidden).toEqual([]);
    const later = await send(imane, groupConversation, "Test RLS — bonjour le groupe");
    expect(later.error).toBeNull();
    // Omar may read Imane's message, but not her read marks: they would tell him who is in it.
    const { data: omarSees } = await omar.from("messages").select("id").eq("id", later.id);
    expect(omarSees).toHaveLength(1);
    const { data: marks } = await omar
      .from("conversation_reads")
      .select("profile_id")
      .eq("conversation_id", groupConversation)
      .eq("profile_id", ids.imane);
    expect(marks).toEqual([]);

    // Once she leaves, the conversation is closed to her.
    await tutor
      .from("group_members")
      .update({ left_at: new Date().toISOString() })
      .eq("group_id", ids.group)
      .eq("student_id", ids.imane);
    const { data: gone } = await imane
      .from("messages")
      .select("id")
      .eq("conversation_id", groupConversation);
    expect(gone).toEqual([]);
    const refused = await send(imane, groupConversation, "Test RLS — partie");
    expect(refused.error?.message).toBe("not_allowed");
  });

  it("gives a file only with the message that holds it", async () => {
    const path = `${salmaConversation}/${ids.salma}/${randomUUID()}.pdf`;
    const upload = await salma.storage
      .from("message-files")
      .upload(path, new Blob(["%PDF-1.4 test"], { type: "application/pdf" }), {
        contentType: "application/pdf",
        metadata: { filename: "Test RLS.pdf" },
      });
    expect(upload.error).toBeNull();
    files.push(path);

    // Nobody else may place a file in her folder, nor under a name that is not an id.
    const foreign = await omar.storage
      .from("message-files")
      .upload(
        `${salmaConversation}/${ids.omar}/${randomUUID()}.pdf`,
        new Blob(["x"], { type: "application/pdf" }),
        {
          contentType: "application/pdf",
        },
      );
    expect(foreign.error).not.toBeNull();

    const message = await send(salma, salmaConversation, "", [path]);
    expect(message.error).toBeNull();
    const { data: stored } = await tutor
      .from("messages")
      .select("attachments")
      .eq("id", message.id)
      .single();
    expect(stored?.attachments).toEqual([
      expect.objectContaining({ path, name: "Test RLS.pdf", type: "application/pdf" }),
    ]);

    const byTutor = await tutor.storage.from("message-files").createSignedUrl(path, 60);
    expect(byTutor.error).toBeNull();
    const byOmar = await omar.storage.from("message-files").createSignedUrl(path, 60);
    expect(byOmar.data).toBeNull();

    // A file already sent cannot be sent again, nor removed by its sender.
    const twice = await send(salma, salmaConversation, "encore", [path]);
    expect(twice.error?.message).toBe("attachments_invalid");
    const { data: removed } = await salma.storage.from("message-files").remove([path]);
    expect(removed ?? []).toEqual([]);
  });

  it("closes the chat to a stopped student, both ways", async () => {
    await tutor.from("profiles").update({ status: "arrete" }).eq("id", ids.hiba);
    const { data } = await hiba.from("conversations").select("id");
    expect(data).toEqual([]);
    const toHer = await send(tutor, hibaConversation, "Test RLS — arrêtée");
    expect(toHer.error?.message).toBe("recipient_inactive");
  });
});
