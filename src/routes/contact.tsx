import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Phone, Mail, MessageCircle, Send, Check, Facebook, Instagram, Loader2, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { siteConfig } from "@/lib/site-config";
import { useT } from "@/lib/i18n";
import { submitContact } from "@/lib/submissions.functions";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "Get in touch with Special Guys Foundation to seek assistance, volunteer, partner, or support our mission across Srikakulam District, Andhra Pradesh.",
      },
      { property: "og:title", content: "Contact Us — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content: "Reach out to SGF — together we can build stronger communities built on compassion and hope.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { contact, social } = siteConfig;
  const t = useT();
  const submit = useServerFn(submitContact);

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^[+]?[\d][\d\s\-()]{6,18}$/;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      subject: String(fd.get("subject") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };

    const errs: Record<string, string> = {};
    if (!values.name) errs.name = t.contact.fullName;
    if (!values.email || !emailRe.test(values.email)) errs.email = t.contact.email;
    if (values.phone && !phoneRe.test(values.phone)) errs.phone = t.contact.phone;
    if (!values.message) errs.message = t.contact.message;

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setFormError(t.contact.fixErrors);
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
      setFormError(err instanceof Error ? err.message : t.contact.errorGeneric);
      setStatus("error");
    }
  }

  const inputBase =
    "mt-1 w-full rounded-lg border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron";
  const errClass = (f: string) => (fieldErrors[f] ? "border-red" : "border-border");


  const details = [
    { icon: MapPin, label: t.contact.location, value: contact.location, href: undefined },
    { icon: Phone, label: t.contact.phone, value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: t.contact.email, value: contact.email, href: `mailto:${contact.email}` },
    { icon: MessageCircle, label: t.contact.whatsapp, value: contact.whatsapp, href: social.whatsapp },
  ];

  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.contact.label}</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">{t.contact.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {t.contact.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Details */}
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-blue">{t.contact.reachTitle}</h2>
            <ul className="mt-8 flex flex-col gap-4">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-saffron/15 text-saffron">
                    <d.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="font-medium text-foreground hover:text-red">{d.value}</a>
                    ) : (
                      <p className="font-medium text-foreground">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">{t.contact.followUs}</p>
              <div className="mt-3 flex gap-3">
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full bg-blue text-blue-foreground transition-transform hover:scale-110">
                  <Facebook className="size-5" aria-hidden="true" />
                </a>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full bg-blue text-blue-foreground transition-transform hover:scale-110">
                  <Instagram className="size-5" aria-hidden="true" />
                </a>
                <a href={social.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="grid size-11 place-items-center rounded-full bg-blue text-blue-foreground transition-transform hover:scale-110">
                  <Send className="size-5" aria-hidden="true" />
                </a>
                <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-green text-green-foreground transition-transform hover:scale-110">
                  <MessageCircle className="size-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md sm:p-8">
              <h2 className="font-heading text-2xl font-bold text-blue">{t.contact.formTitle}</h2>
              {submitted ? (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-green/10 p-5 text-green" role="status">
                  <Check className="size-6 shrink-0" aria-hidden="true" />
                  <p className="font-medium">{t.contact.thanks}</p>
                </div>
              ) : (
                <form
                  className="mt-6 flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div>
                    <label htmlFor="c-name" className="text-sm font-medium text-foreground">{t.contact.fullName}</label>
                    <input id="c-name" type="text" required className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-email" className="text-sm font-medium text-foreground">{t.contact.email}</label>
                      <input id="c-email" type="email" required className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className="text-sm font-medium text-foreground">{t.contact.phone}</label>
                      <input id="c-phone" type="tel" className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="text-sm font-medium text-foreground">{t.contact.subject}</label>
                    <input id="c-subject" type="text" className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="text-sm font-medium text-foreground">{t.contact.message}</label>
                    <textarea id="c-msg" rows={4} required className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-red-foreground transition-transform hover:scale-105">
                    {t.contact.sendMessage} <Send className="size-5" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
