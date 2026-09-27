// Messages and their files (DECISIONS.md, D-080, D-081). Shared by the page and the server.

/** send_message refuses more, and the table checks it. */
export const MAX_MESSAGE_LENGTH = 4000;
export const MAX_ATTACHMENTS = 5;
/** The message-files bucket's limit, in step with its migration. */
export const MESSAGE_FILE_MAX_BYTES = 10 * 1024 * 1024;
/** Messages shown at once; older ones come on demand. */
export const THREAD_PAGE = 50;

export const MESSAGE_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

/** A photo is drawn again on the phone before it leaves: light, and without its metadata. */
export const MESSAGE_IMAGE_PREPARATION = {
  maxSide: 2000,
  keepUnder: 0,
  maxBytes: MESSAGE_FILE_MAX_BYTES,
  quality: 0.8,
} as const;

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

/** `<conversation_id>/<sender_id>/<file_id>.<ext>`, the only name the storage policy accepts. */
export const MESSAGE_FILE_NAME = new RegExp(`^${UUID}/${UUID}/${UUID}\\.(?:webp|jpg|png|pdf)$`);

export function messageFilePath(conversationId: string, userId: string, extension: string) {
  return `${conversationId}/${userId}/${crypto.randomUUID()}.${extension}`;
}

export type Attachment = { path: string; name: string; type: string; size: number };

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  body: string;
  attachments: Attachment[];
  createdAt: string;
};

export function isImage(attachment: Pick<Attachment, "type">): boolean {
  return attachment.type.startsWith("image/");
}
