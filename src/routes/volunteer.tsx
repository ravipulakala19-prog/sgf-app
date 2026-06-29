import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Droplets, Search, Megaphone, HandCoins, LifeBuoy, Sparkles, Check, Loader2, AlertCircle, Upload, X } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
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
  const submit = useServerFn(submitVolunteer);

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
                  <div>
                    <label htmlFor="v-city" className="text-sm font-medium text-foreground">{t.volunteer.city}</label>
                    <input id="v-city" name="city" type="text" className={`${inputBase} ${errClass("city")}`} />
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
