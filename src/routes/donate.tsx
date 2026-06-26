import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, Droplets, GraduationCap, LifeBuoy, Users, Landmark, Smartphone } from "lucide-react";
import { UpiQr } from "@/components/sgf/UpiQr";
import { Reveal } from "@/components/sgf/Reveal";
import { siteConfig } from "@/lib/site-config";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "Your contribution saves lives. Donate to SGF via UPI, bank transfer, or our online campaign to fund medical aid, blood donation, education, and disaster relief.",
      },
      { property: "og:title", content: "Donate — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content: "Every donation, big or small, makes a meaningful difference. Support SGF today.",
      },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: Donate,
});

const supportIcons = [HeartPulse, Droplets, GraduationCap, LifeBuoy, Users];

function Donate() {
  const { donate } = siteConfig;
  const t = useT();
  const supports = supportIcons.map((icon, i) => ({ icon, label: t.donate.supports[i] }));

  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.donate.label}</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              {t.donate.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {t.donate.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* What your support provides */}
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-blue">{t.donate.whereTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.donate.whereDesc}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {supports.map((s) => (
                <li key={s.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-saffron/15 text-saffron">
                    <s.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-foreground">{s.label}</span>
                </li>
              ))}
            </ul>
            <a
              href={donate.campaignUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-red px-8 py-4 text-lg font-bold text-red-foreground shadow-lg transition-transform hover:scale-105"
            >
              {t.donate.donateOnline} <ArrowRight className="size-5" />
            </a>
          </Reveal>

          {/* Payment details */}
          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              {/* UPI — interactive QR flow */}
              <DonateQrFlow />


              {/* Bank */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
                <div className="flex items-center gap-3">
                  <Landmark className="size-6 text-blue" aria-hidden="true" />
                  <h3 className="font-heading text-xl font-bold text-blue">{t.donate.bankTitle}</h3>
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">{t.donate.accountName}</dt>
                    <dd className="text-right font-medium text-foreground">{donate.bank.accountName}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">{t.donate.accountNumber}</dt>
                    <dd className="text-right font-medium text-foreground">{donate.bank.accountNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">{t.donate.ifsc}</dt>
                    <dd className="text-right font-medium text-foreground">{donate.bank.ifsc}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.donate.bank}</dt>
                    <dd className="text-right font-medium text-foreground">{donate.bank.bankName}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
          <p className="text-white/85">
            {t.donate.receiptsPre}
            <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-saffron underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
