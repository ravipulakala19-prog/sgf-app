import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Droplets, Search, Megaphone, HandCoins, LifeBuoy, Sparkles, Check } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { siteConfig } from "@/lib/site-config";
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

const ways = [
  { icon: Droplets, label: "Participate in blood donation drives" },
  { icon: Search, label: "Help identify families in need" },
  { icon: Megaphone, label: "Organize awareness campaigns" },
  { icon: HandCoins, label: "Support fundraising initiatives" },
  { icon: LifeBuoy, label: "Assist during emergencies" },
  { icon: Sparkles, label: "Inspire others to serve" },
];

function Volunteer() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Volunteer</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              Every helping hand creates a ripple of hope
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Whether you're a student, professional, entrepreneur, or retiree, you can become part of SGF's mission.
              Together, we can transform compassion into action.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-heading text-3xl font-bold text-blue">Ways you can help</h2>
              <p className="mt-3 text-muted-foreground">As a volunteer, you can:</p>
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
              <h2 className="font-heading text-2xl font-bold text-blue">Join the team</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in your details and our coordinators will reach out to you.
              </p>
              {submitted ? (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-green/10 p-5 text-green" role="status">
                  <Check className="size-6 shrink-0" aria-hidden="true" />
                  <p className="font-medium">Thank you for signing up! We'll be in touch soon.</p>
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
                    <label htmlFor="v-name" className="text-sm font-medium text-foreground">Full name</label>
                    <input id="v-name" type="text" required className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="v-phone" className="text-sm font-medium text-foreground">Phone</label>
                      <input id="v-phone" type="tel" required className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                    </div>
                    <div>
                      <label htmlFor="v-email" className="text-sm font-medium text-foreground">Email</label>
                      <input id="v-email" type="email" className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="v-city" className="text-sm font-medium text-foreground">City / Town</label>
                    <input id="v-city" type="text" className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                  </div>
                  <div>
                    <label htmlFor="v-msg" className="text-sm font-medium text-foreground">How would you like to help?</label>
                    <textarea id="v-msg" rows={3} className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron" />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-bold text-saffron-foreground transition-transform hover:scale-105">
                    Sign Up to Volunteer <ArrowRight className="size-5" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Prefer to support financially?</h2>
          <p className="mt-3 text-white/80">Your donation is another powerful way to make a difference.</p>
          <Link to="/donate" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-red-foreground transition-transform hover:scale-105">
            Donate Now <ArrowRight className="size-5" />
          </Link>
          <p className="mt-4 text-sm text-white/70">Questions? Call us at {siteConfig.contact.phone}</p>
        </div>
      </section>
    </>
  );
}
