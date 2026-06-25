import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  HandHeart,
  Users,
  Handshake,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { siteConfig } from "@/lib/site-config";
import volunteersImg from "@/assets/sgf-volunteers.jpeg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "Learn the story, mission, vision, and values behind Special Guys Foundation — a volunteer-driven non-profit serving Srikakulam District with compassion and integrity.",
      },
      { property: "og:title", content: "About Us — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content:
          "Ordinary people doing extraordinary things together. Discover the SGF story, mission, and values.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: volunteersImg.url },
      { name: "twitter:image", content: volunteersImg.url },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Compassion", desc: "Every individual deserves dignity, respect, and timely assistance regardless of their background." },
  { icon: ShieldCheck, title: "Integrity", desc: "We maintain transparency and accountability in every initiative and every donation received." },
  { icon: HandHeart, title: "Service", desc: "Helping others is not an event — it is a lifelong responsibility." },
  { icon: Users, title: "Unity", desc: "Communities become stronger when people work together." },
  { icon: Handshake, title: "Trust", desc: "We build lasting relationships through honesty, responsibility, and genuine care." },
  { icon: Sparkles, title: "Volunteerism", desc: "We believe ordinary people can create extraordinary change through collective action." },
];

function About() {
  return (
    <>
      {/* Page header */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">About Us</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              Ordinary people doing extraordinary things together
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Special Guys Foundation (<span className="font-bold text-red">SGF</span>) is a registered social
              service organization built by passionate young volunteers dedicated to creating meaningful change.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Who We Are</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-blue sm:text-4xl">
              Compassion, integrity, and service
            </h2>
            <p className="mt-5 text-muted-foreground">
              What began as a small initiative among friends has grown into a respected humanitarian organization
              serving communities across Srikakulam District and surrounding regions. Our volunteers work tirelessly
              to identify genuine cases requiring assistance and ensure that support reaches beneficiaries quickly and
              transparently.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every donation entrusted to SGF becomes an opportunity to save a life, educate a child, support a
              struggling family, or inspire hope where it is needed most. Our strength lies not in our size but in our
              commitment to compassion, integrity, and service.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-border">
              <img
                src={volunteersImg.url}
                alt="Special Guys Foundation volunteers in branded t-shirts at a community gathering"
                width={1820}
                height={1214}
                loading="lazy"
                className="aspect-[4/3] size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-blue">
        <div className="mx-auto max-w-4xl px-4 py-16 text-white sm:px-6 lg:py-24">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Our Story</p>
            <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              "If we have the ability to help someone today, why should we wait?"
            </h2>
            <p className="mt-6 text-white/85">
              Seeing numerous families struggle to afford life-saving medical treatments, blood during emergencies,
              educational necessities, and daily essentials, a group of socially conscious youth decided to act.
            </p>
            <p className="mt-4 text-white/85">
              Instead of waiting for others, they created a volunteer network capable of responding immediately to
              emergencies. From helping a single patient to organizing district-wide blood donation camps, SGF has
              grown into a movement powered by ordinary people doing extraordinary things together.
            </p>
            <p className="mt-6 inline-block rounded-full bg-saffron px-6 py-2 font-heading font-bold text-saffron-foreground">
              Humanity First.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-blue">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                To improve the lives of vulnerable individuals and communities by providing timely humanitarian
                assistance, promoting voluntary blood donation, supporting education, encouraging community
                participation, and creating sustainable opportunities for people facing hardship.
              </p>
              <p className="mt-4 text-muted-foreground">
                We strive to ensure that no family feels alone during a crisis and that every individual has access to
                hope, dignity, and compassionate support.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-blue">Our Vision</h2>
              <p className="mt-4 text-muted-foreground">
                To build a compassionate society where every individual has access to emergency support, quality
                healthcare assistance, educational opportunities, and a caring community that stands together during
                difficult times.
              </p>
              <p className="mt-4 text-muted-foreground">
                We envision a future where kindness becomes a culture and every citizen actively participates in making
                society stronger, healthier, and more inclusive.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Our Values</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-blue sm:text-4xl">What guides our work</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="grid size-12 place-items-center rounded-xl bg-saffron/15 text-saffron">
                    <v.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-blue">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-blue">Be part of the movement</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join {siteConfig.acronym} as a volunteer or donor and help us reach more families in need.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/volunteer" className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-bold text-saffron-foreground transition-transform hover:scale-105">
              Become a Volunteer <ArrowRight className="size-5" />
            </Link>
            <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-red-foreground transition-transform hover:scale-105">
              Donate Now <ArrowRight className="size-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
