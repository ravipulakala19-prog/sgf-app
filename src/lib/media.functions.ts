import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const uploadSchema = z.object({
  password: z.string().min(1),
  section: z.enum(["field", "press"]),
  captionEn: z.string().max(300).optional().default(""),
  captionTe: z.string().max(300).optional().default(""),
  width: z.number().int().positive().max(20000),
  height: z.number().int().positive().max(20000),
  // data URL: data:image/jpeg;base64,....
  imageDataUrl: z.string().min(1),
  fileExt: z.enum(["jpg", "jpeg", "png", "webp"]),
});

export const uploadMediaPost = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => uploadSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env.MEDIA_UPLOAD_PASSWORD;
    if (!expected || data.password !== expected) {
      throw new Error("Incorrect upload password.");
    }

    const match = data.imageDataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) throw new Error("Invalid image data.");
    const contentType = match[1];
    const base64 = match[2];
    const bytes = Buffer.from(base64, "base64");
    if (bytes.byteLength > 8 * 1024 * 1024) {
      throw new Error("Image is too large (max 8MB).");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const fileName = `${data.section}/${Date.now()}-${crypto.randomUUID()}.${data.fileExt}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("media-posts")
      .upload(fileName, bytes, { contentType, upsert: false });
    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    const { data: pub } = supabaseAdmin.storage.from("media-posts").getPublicUrl(fileName);
    const imageUrl = pub.publicUrl;

    const { error: insertError } = await supabaseAdmin.from("media_posts").insert({
      image_url: imageUrl,
      section: data.section,
      caption_en: data.captionEn || null,
      caption_te: data.captionTe || null,
      width: data.width,
      height: data.height,
    });
    if (insertError) throw new Error(`Save failed: ${insertError.message}`);

    return { ok: true, imageUrl };
  });
