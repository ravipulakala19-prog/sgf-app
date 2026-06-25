import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, Droplets, GraduationCap, LifeBuoy, Users, Landmark, Smartphone, QrCode } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { siteConfig } from "@/lib/site-config";

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

const supports = [
  { icon: HeartPulse, label: "Emergency medical assistance" },
  { icon: Droplets, label: "Life-saving blood donation support" },
  { icon: GraduationCap, label: "Educational aid" },
  { icon: LifeBuoy, label: "Disaster relief" },
  { icon: Users, label: "Community welfare initiatives" },
];

function Donate() {
  const { donate } = siteConfig;

  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Donate</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              Your contribution saves lives
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Every donation — big or small — makes a meaningful difference. With your generosity, we can reach more
              families and create lasting impact.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* What your support provides */}
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-blue">Where your money goes</h2>
            <p className="mt-3 text-muted-foreground">Your support helps us provide:</p>
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
              Donate Online Now <ArrowRight className="size-5" />
            </a>
          </Reveal>

          {/* Payment details */}
          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              {/* UPI */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
                <div className="flex items-center gap-3">
                  <Smartphone className="size-6 text-blue" aria-hidden="true" />
                  <h3 className="font-heading text-xl font-bold text-blue">Pay via UPI</h3>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                  <div className="mx-auto grid size-40 place-items-center rounded-xl border-2 border-dashed border-border bg-muted/40 text-center text-muted-foreground">
                    <div>
                      <QrCode className="mx-auto size-10" aria-hidden="true" />
                      <span className="mt-1 block text-xs">QR code placeholder</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">UPI ID</p>
                    <p className="font-heading text-lg font-bold text-foreground break-all">{donate.upiId}</p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Scan the QR code or use the UPI ID in any UPI app to donate instantly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
                <div className="flex items-center gap-3">
                  <Landmark className="size-6 text-blue" aria-hidden="true" />
                  <h3 className="font-heading text-xl font-bold text-blue">Bank Transfer</h3>
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Account Name</dt>
                    <dd className="text-right font-medium text-foreground">{donate.bank.accountName}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Account Number</dt>
                    <dd className="text-right font-medium text-foreground">{donate.bank.accountNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">IFSC</dt>
                    <dd className="text-right font-medium text-foreground">{donate.bank.ifsc}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Bank</dt>
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
            For donation receipts or any questions, contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-saffron underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
