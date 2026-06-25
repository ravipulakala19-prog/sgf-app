import { createFileRoute, Link } from "@tanstack/react-router";
import {
  HeartPulse,
  Droplets,
  Activity,
  Building2,
  ArrowRight,
  Check,
  ShieldCheck,
  Clock,
  HandHeart,
  Eye,
  Award,
} from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { CountUp } from "@/components/sgf/CountUp";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "Through dedicated volunteers and generous donors, SGF has positively impacted hundreds of families with medical aid, blood camps, education, and emergency relief.",
      },
      { property: "og:title", content: "Our Impact — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content: "Hundreds of families supported across Srikakulam District. See the SGF impact.",
      },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: Impact,
});

const statIcons = [HeartPulse, Droplets, Activity, Building2];

const achievements = [
  "Financial assistance for critical medical treatments",
  "Organizing multiple blood donation camps",
  "Supporting cancer and kidney patients",
  "Assisting accident victims",
  "Helping economically disadvantaged families",
  "Providing educational materials to school children",
  "Conducting awareness campaigns",
  "Responding quickly during emergencies",
];

const reasons = [
  { icon: ShieldCheck, title: "Genuine Cases", desc: "Every request is carefully verified before assistance is provided." },
  { icon: Clock, title: "Immediate Response", desc: "We prioritize urgent medical and humanitarian emergencies." },
  { icon: HandHeart, title: "Volunteer Driven", desc: "Our dedicated volunteers work selflessly to maximize social impact." },
  { icon: Eye, title: "Transparent Donations", desc: "Every contribution is used responsibly for community welfare." },
  { icon: Award, title: "Community Trust", desc: "Years of consistent service have built strong community relationships." },
];

function Impact() {
  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Our Impact</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              Real change, one family at a time
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Through the dedication of volunteers and the generosity of donors, SGF has positively impacted hundreds
              of families across Srikakulam District and surrounding regions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue" aria-label="Our impact in numbers">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 sm:px-6 lg:grid-cols-4">
          {siteConfig.stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <Reveal key={stat.label} delay={i * 100} className="flex flex-col items-center text-center text-white">
                <Icon className="mb-3 size-9 text-saffron" aria-hidden="true" />
                <span className="font-heading text-3xl font-extrabold sm:text-4xl">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 text-sm text-white/80">{stat.label}</span>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-blue sm:text-4xl">What we've accomplished</h2>
          <p className="mt-3 text-muted-foreground">
            Many of these initiatives have also received recognition in regional newspapers and media, highlighting the
            trust SGF has earned within the community.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a} delay={i * 50}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green/10 text-green">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <p className="text-sm text-foreground">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Choose SGF */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Why Choose SGF</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-blue sm:text-4xl">
              Built on trust, driven by compassion
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                  <span className="grid size-12 place-items-center rounded-full bg-green/10 text-green">
                    <r.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-blue">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Grow this impact with us</h2>
          <p className="mt-3 text-white/80">Every contribution helps us reach one more family.</p>
          <Link to="/donate" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-red-foreground transition-transform hover:scale-105">
            Donate Now <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
