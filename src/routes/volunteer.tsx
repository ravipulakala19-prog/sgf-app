import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Droplets, Search, Megaphone, HandCoins, LifeBuoy, Sparkles, Check, Loader2, AlertCircle, Camera, User, X } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { PhotoCropper } from "@/components/sgf/PhotoCropper";
import { siteConfig } from "@/lib/site-config";
import { useT } from "@/lib/i18n";
import { submitVolunteer } from "@/lib/submissions.functions";
import { supabase } from "@/integrations/supabase/client";
import volunteersImg from "@/assets/sgf-volunteers.jpeg.asset.json";


export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Become a Volunteer — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "Students, professionals, entrepreneurs, and retirees — join SGF's volunteer network. Help with blood drives, awareness campaigns, fundraising, and emergency response.",
      },
      { property: "og:title", content: "Become a Volunteer — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content: "Every helping hand creates a ripple of hope. Become an SGF volunteer today.",
      },
      { property: "og:url", content: "/volunteer" },
      { property: "og:image", content: volunteersImg.url },
      { name: "twitter:image", content: volunteersImg.url },
    ],
    links: [{ rel: "canonical", href: "/volunteer" }],
  }),
  component: Volunteer,
});

const wayIcons = [Droplets, Search, Megaphone, HandCoins, LifeBuoy, Sparkles];

function Volunteer() {
  const t = useT();
  const ways = wayIcons.map((icon, i) => ({ icon, label: t.volunteer.ways[i] }));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const submit = useServerFn(submitVolunteer);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((prev) => ({ ...prev, photo: t.volunteer.photoHint }));
      return;
    }
    setFieldErrors((prev) => {
      const { photo, ...rest } = prev;
      return rest;
    });
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function clearPhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^[+]?[\d][\d\s\-()]{6,18}$/;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      city: String(fd.get("city") || "").trim(),
      bloodGroup: String(fd.get("bloodGroup") || "").trim(),
      gender: String(fd.get("gender") || "").trim(),
      age: String(fd.get("age") || "").trim(),
      occupation: String(fd.get("occupation") || "").trim(),
      availability: String(fd.get("availability") || "").trim(),
      interests: String(fd.get("interests") || "").trim(),
      profilePicturePath: "",
      message: String(fd.get("message") || "").trim(),
    };

    const errs: Record<string, string> = {};
    if (!values.name) errs.name = t.volunteer.fullName;
    if (!values.phone || !phoneRe.test(values.phone)) errs.phone = t.volunteer.phone;
    if (values.email && !emailRe.test(values.email)) errs.email = t.volunteer.email;

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setFormError(t.volunteer.fixErrors);
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setStatus("submitting");
    try {
      if (photoFile) {
        const ext = (photoFile.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("volunteer-photos")
          .upload(path, photoFile, { contentType: photoFile.type, upsert: false });
        if (upErr) {
          console.error(upErr);
          setFormError(t.volunteer.photoError);
          setStatus("error");
          return;
        }
        values.profilePicturePath = path;
      }
      await submit({ data: values });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setFormError(err instanceof Error ? err.message : t.volunteer.errorGeneric);
      setStatus("error");
    }
  }

  const inputBase =
    "mt-1 w-full rounded-lg border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron";
  const errClass = (f: string) => (fieldErrors[f] ? "border-red" : "border-border");



  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.volunteer.label}</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              {t.volunteer.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {t.volunteer.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-heading text-3xl font-bold text-blue">{t.volunteer.waysTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.volunteer.waysDesc}</p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ways.map((w, i) => (
                <Reveal key={w.label} delay={i * 60}>
                  <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-saffron/15 text-saffron">
                      <w.icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-medium text-foreground">{w.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="mt-8 overflow-hidden rounded-2xl shadow-xl ring-1 ring-border">
                <img
                  src={volunteersImg.url}
                  alt="Special Guys Foundation volunteers gathered together in branded t-shirts"
                  width={1820}
                  height={1214}
                  loading="lazy"
                  className="aspect-[16/9] size-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Sign-up form */}
          <Reveal delay={100}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md sm:p-8">
              <h2 className="font-heading text-2xl font-bold text-blue">{t.volunteer.formTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.volunteer.formDesc}
              </p>
              {status === "success" ? (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-green/10 p-5 text-green" role="status">
                  <Check className="size-6 shrink-0" aria-hidden="true" />
                  <p className="font-medium">{t.volunteer.thanks}</p>
                </div>
              ) : (
                <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                  {formError && (
                    <div className="flex items-start gap-2 rounded-lg bg-red/10 p-3 text-sm text-red" role="alert">
                      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>{formError}</span>
                    </div>
                  )}
                  <div>
                    <label htmlFor="v-name" className="text-sm font-medium text-foreground">{t.volunteer.fullName}</label>
                    <input id="v-name" name="name" type="text" required className={`${inputBase} ${errClass("name")}`} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="v-phone" className="text-sm font-medium text-foreground">{t.volunteer.phone}</label>
                      <input id="v-phone" name="phone" type="tel" required className={`${inputBase} ${errClass("phone")}`} />
                    </div>
                    <div>
                      <label htmlFor="v-email" className="text-sm font-medium text-foreground">{t.volunteer.email}</label>
                      <input id="v-email" name="email" type="email" className={`${inputBase} ${errClass("email")}`} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="v-city" className="text-sm font-medium text-foreground">{t.volunteer.city}</label>
                      <input id="v-city" name="city" type="text" className={`${inputBase} ${errClass("city")}`} />
                    </div>
                    <div>
                      <label htmlFor="v-blood" className="text-sm font-medium text-foreground">{t.volunteer.bloodGroup}</label>
                      <select id="v-blood" name="bloodGroup" defaultValue="" className={`${inputBase} ${errClass("bloodGroup")}`}>
                        <option value="">{t.volunteer.select}</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="v-gender" className="text-sm font-medium text-foreground">{t.volunteer.gender}</label>
                      <select id="v-gender" name="gender" defaultValue="" className={`${inputBase} ${errClass("gender")}`}>
                        <option value="">{t.volunteer.select}</option>
                        {t.volunteer.genderOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="v-age" className="text-sm font-medium text-foreground">{t.volunteer.age}</label>
                      <input id="v-age" name="age" type="number" min={1} max={120} className={`${inputBase} ${errClass("age")}`} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="v-occ" className="text-sm font-medium text-foreground">{t.volunteer.occupation}</label>
                      <input id="v-occ" name="occupation" type="text" className={`${inputBase} ${errClass("occupation")}`} />
                    </div>
                    <div>
                      <label htmlFor="v-avail" className="text-sm font-medium text-foreground">{t.volunteer.availability}</label>
                      <select id="v-avail" name="availability" defaultValue="" className={`${inputBase} ${errClass("availability")}`}>
                        <option value="">{t.volunteer.select}</option>
                        {t.volunteer.availabilityOptions.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="v-interests" className="text-sm font-medium text-foreground">{t.volunteer.interests}</label>
                    <input id="v-interests" name="interests" type="text" placeholder={t.volunteer.interestsHint} className={`${inputBase} ${errClass("interests")}`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{t.volunteer.photo}</span>
                    <div className="mt-2 flex flex-col items-center gap-3">
                      <label className="group relative cursor-pointer">
                        <span className="block size-28 overflow-hidden rounded-full bg-muted ring-4 ring-card shadow-md">
                          {photoPreview ? (
                            <img src={photoPreview} alt="" className="size-full object-cover" />
                          ) : (
                            <span className="grid size-full place-items-center text-muted-foreground">
                              <User className="size-12" aria-hidden="true" />
                            </span>
                          )}
                        </span>
                        <span className="absolute bottom-0 right-0 grid size-9 place-items-center rounded-full border-2 border-card bg-saffron text-saffron-foreground shadow transition-transform group-hover:scale-110">
                          <Camera className="size-4" aria-hidden="true" />
                        </span>
                        <input type="file" accept="image/png,image/jpeg" className="sr-only" onChange={handlePhotoChange} />
                      </label>
                      {photoPreview && (
                        <button type="button" onClick={clearPhoto} className="inline-flex items-center gap-1 text-xs font-medium text-red hover:underline">
                          <X className="size-3.5" aria-hidden="true" /> {t.volunteer.photoChoose === "Choose photo" ? "Remove photo" : t.volunteer.photoChoose}
                        </button>
                      )}
                    </div>
                    {fieldErrors.photo ? (
                      <p className="mt-1 text-center text-xs text-red">{fieldErrors.photo}</p>
                    ) : (
                      <p className="mt-1 text-center text-xs text-muted-foreground">{t.volunteer.photoHint}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="v-msg" className="text-sm font-medium text-foreground">{t.volunteer.helpHow}</label>
                    <textarea id="v-msg" name="message" rows={3} className={`${inputBase} ${errClass("message")}`} />
                  </div>

                  <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-bold text-saffron-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70">
                    {status === "submitting" ? (
                      <>{t.volunteer.sending} <Loader2 className="size-5 animate-spin" /></>
                    ) : (
                      <>{t.volunteer.signUp} <ArrowRight className="size-5" /></>
                    )}
                  </button>

                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{t.volunteer.supportTitle}</h2>
          <p className="mt-3 text-white/80">{t.volunteer.supportDesc}</p>
          <Link to="/donate" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-red-foreground transition-transform hover:scale-105">
            {t.volunteer.donateNow} <ArrowRight className="size-5" />
          </Link>
          <p className="mt-4 text-sm text-white/70">{t.volunteer.questionsPre}{siteConfig.contact.phone}</p>
        </div>
      </section>
    </>
  );
}
