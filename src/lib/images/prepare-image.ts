// A picture is made small enough on the device that holds it, before it is sent anywhere
// (DECISIONS.md, D-051, D-053). Browser only: it decodes and draws on a canvas.

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export type ImageType = (typeof IMAGE_TYPES)[number];

const EXTENSIONS = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;

export type PreparedImage = {
  blob: Blob;
  type: ImageType;
  extension: (typeof EXTENSIONS)[ImageType];
  width: number;
  height: number;
};

export type ImagePreparationFailure = "type" | "unreadable" | "tooLarge";

export class ImagePreparationError extends Error {
  constructor(readonly reason: ImagePreparationFailure) {
    super(reason);
  }
}

export type PrepareImageOptions = {
  /** The longest side once reduced, in pixels. */
  maxSide: number;
  /** An accepted file this light and within maxSide is sent as it is: a PNG figure stays sharp. */
  keepUnder: number;
  /** What the bucket accepts. */
  maxBytes: number;
  quality: number;
};

function isImageType(type: string): type is ImageType {
  return (IMAGE_TYPES as readonly string[]).includes(type);
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function prepareImage(
  file: File,
  options: PrepareImageOptions,
): Promise<PreparedImage> {
  if (!isImageType(file.type)) throw new ImagePreparationError("type");

  let bitmap: ImageBitmap;
  try {
    // Turned the way the camera held it, from the photo's own orientation tag.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new ImagePreparationError("unreadable");
  }

  try {
    const scale = Math.min(1, options.maxSide / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size <= options.keepUnder) {
      return {
        blob: file,
        type: file.type,
        extension: EXTENSIONS[file.type],
        width: bitmap.width,
        height: bitmap.height,
      };
    }

    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new ImagePreparationError("unreadable");
    // Transparency would turn black in a JPEG; a figure is drawn on white paper anyway.
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);

    // WebP where the browser can write it. Safari cannot, and hands back a PNG instead.
    let blob = await toBlob(canvas, "image/webp", options.quality);
    if (blob?.type !== "image/webp") blob = await toBlob(canvas, "image/jpeg", options.quality);
    if (!blob || !isImageType(blob.type)) throw new ImagePreparationError("unreadable");
    if (blob.size > options.maxBytes) throw new ImagePreparationError("tooLarge");

    return { blob, type: blob.type, extension: EXTENSIONS[blob.type], width, height };
  } finally {
    bitmap.close();
  }
}
