import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const phoneRegex = /^[+]?[\d][\d\s\-()]{6,18}$/;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || phoneRegex.test(v), "Enter a valid phone number"),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const volunteerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .max(20)
    .refine((v) => phoneRegex.test(v), "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255)
    .refine((v) => z.string().email().safeParse(v).success, "Enter a valid email address"),
  city: z.string().trim().min(1, "City is required").max(100),
  bloodGroup: z.string().trim().min(1, "Blood group is required").max(10),
  gender: z.string().trim().min(1, "Gender is required").max(20),
  age: z
    .union([z.literal(""), z.coerce.number().int().min(1).max(120)])
    .optional(),
  occupation: optionalText(100),
  availability: optionalText(100),
  interests: optionalText(300),
  profilePicturePath: optionalText(500),
  message: optionalText(2000),
});

const NOTIFY_EMAIL = "specialguysfoundationsgf@gmail.com";

async function notify(subject: string, lines: string[]): Promise<void> {
  // Best-effort email notification. Requires a verified sender domain + email
  // infrastructure. If not configured, this fails silently so the saved
  // submission is still treated as a success.
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabaseAdmin as any).rpc("enqueue_email", {
      queue_name: "transactional_emails",
      message: {
        to: NOTIFY_EMAIL,
        subject,
        html: lines.map((l) => `<p>${l}</p>`).join(""),
      },
    });
  } catch (err) {
    console.error("[notify] email notification skipped:", err);
  }
}


export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) {
      console.error("[submitContact] insert failed:", error);
      throw new Error("Could not save your message. Please try again.");
    }

    await notify(`New contact message from ${data.name}`, [
      `<strong>Name:</strong> ${data.name}`,
      `<strong>Email:</strong> ${data.email}`,
      `<strong>Phone:</strong> ${data.phone || "—"}`,
      `<strong>Subject:</strong> ${data.subject || "—"}`,
      `<strong>Message:</strong> ${data.message}`,
    ]);

    return { ok: true as const };
  });

export const submitVolunteer = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => volunteerSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("volunteer_signups").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      city: data.city || null,
      blood_group: data.bloodGroup || null,
      gender: data.gender || null,
      age: typeof data.age === "number" ? data.age : null,
      occupation: data.occupation || null,
      availability: data.availability || null,
      areas_of_interest: data.interests || null,
      profile_picture_url: data.profilePicturePath || null,
      message: data.message || null,
    });
    if (error) {
      console.error("[submitVolunteer] insert failed:", error);
      throw new Error("Could not save your signup. Please try again.");
    }

    await notify(`New volunteer signup: ${data.name}`, [
      `<strong>Name:</strong> ${data.name}`,
      `<strong>Phone:</strong> ${data.phone}`,
      `<strong>Email:</strong> ${data.email || "—"}`,
      `<strong>City:</strong> ${data.city || "—"}`,
      `<strong>Blood group:</strong> ${data.bloodGroup || "—"}`,
      `<strong>Gender:</strong> ${data.gender || "—"}`,
      `<strong>Age:</strong> ${typeof data.age === "number" ? data.age : "—"}`,
      `<strong>Occupation:</strong> ${data.occupation || "—"}`,
      `<strong>Availability:</strong> ${data.availability || "—"}`,
      `<strong>Areas of interest:</strong> ${data.interests || "—"}`,
      `<strong>Profile photo:</strong> ${data.profilePicturePath || "—"}`,
      `<strong>How they can help:</strong> ${data.message || "—"}`,
    ]);

    return { ok: true as const };
  });
