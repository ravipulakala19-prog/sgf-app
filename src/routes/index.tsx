import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  HeartPulse,
  Droplets,
  GraduationCap,
  Users,
  LifeBuoy,
  ShieldCheck,
  Clock,
  HandHeart,
  Eye,
  Award,
  ArrowRight,
  Newspaper,
  Activity,
  Building2,
} from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { CountUp } from "@/components/sgf/CountUp";
import { siteConfig } from "@/lib/site-config";
import heroImg from "@/assets/sgf-hero.jpg";
import volunteersImg from "@/assets/sgf-volunteers.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Special Guys Foundation (SGF) — Sharing Hands, Saving Lives" },
      {
        name: "description",
        content:
          "Special Guys Foundation is a volunteer-driven non-profit supporting underprivileged families, medical emergencies, students, and communities across Srikakulam District.",
      },
      { property: "og:title", content: "Special Guys Foundation (SGF) — Sharing Hands, Saving Lives" },
      {
        property: "og:description",
        content: "Together, we save lives and build hope. Donate or volunteer with SGF today.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const statIcons = [HeartPulse, Droplets, Activity, Building2];

const programs = [
  { icon: HeartPulse, title: "Emergency Medical Assistance", desc: "Immediate financial help and donor mobilization for patients in critical medical need." },
  { icon: Droplets, title: "Blood Donation Services", desc: "An active network of voluntary blood donors and regular donation camps." },
  { icon: GraduationCap, title: "Educational Support", desc: "School supplies, materials, and assistance for disadvantaged students." },
  { icon: Users, title: "Community Welfare", desc: "Awareness campaigns, health drives, and rural welfare initiatives." },
  { icon: LifeBuoy, title: "Disaster & Family Relief", desc: "Emergency relief and rehabilitation for families facing tragedy." },
];

const reasons = [
  { icon: ShieldCheck, title: "Genuine Cases", desc: "Every request is carefully verified before assistance is provided." },
  { icon: Clock, title: "Immediate Response", desc: "We prioritize urgent medical and humanitarian emergencies." },
  { icon: HandHeart, title: "Volunteer Driven", desc: "Our dedicated volunteers work selflessly to maximize social impact." },
  { icon: Eye, title: "Transparent Donations", desc: "Every contribution is used responsibly for community welfare." },
  { icon: Award, title: "Community Trust", desc: "Years of consistent service have built strong community relationships." },
];

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      {/* Hero slider */}
      <HeroSlider />


      {/* Impact stats band */}
      <section className="bg-blue" aria-label="Our impact in numbers">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
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

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Who We Are</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-blue sm:text-4xl">
              Ordinary people doing extraordinary things together
            </h2>
            <p className="mt-5 text-muted-foreground">
              Special Guys Foundation (<span className="font-bold text-red">SGF</span>) is a registered social
              service organization established by passionate young volunteers dedicated to creating meaningful
              change. What began as a small initiative among friends has grown into a respected humanitarian
              organization serving communities across Srikakulam District and surrounding regions.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every donation entrusted to SGF becomes an opportunity to save a life, educate a child, support a
              struggling family, or inspire hope where it is needed most.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-bold text-blue-foreground transition-transform hover:scale-105"
            >
              Read Our Story <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-border">
              <img
                src={volunteersImg.url}
                alt="Group of Special Guys Foundation volunteers in branded t-shirts at a community gathering"
                width={1820}
                height={1214}
                loading="lazy"
                className="aspect-[4/3] size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What We Do preview */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">What We Do</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-blue sm:text-4xl">
              Five ways we serve our communities
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="grid size-12 place-items-center rounded-xl bg-saffron/15 text-saffron">
                    <p.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-blue">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <Link
                    to="/what-we-do"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-red transition-colors group-hover:gap-2"
                  >
                    Learn more <ArrowRight className="size-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SGF */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
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
      </section>

      {/* Get Involved dual CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid overflow-hidden rounded-3xl shadow-lg md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 bg-saffron p-8 sm:p-12">
            <h3 className="font-heading text-2xl font-bold text-saffron-foreground sm:text-3xl">
              Become a Volunteer
            </h3>
            <p className="text-saffron-foreground/90">
              Every helping hand creates a ripple of hope. Join a network of people transforming compassion into
              action across Srikakulam District.
            </p>
            <Link
              to="/volunteer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-bold text-blue-foreground transition-transform hover:scale-105"
            >
              Join Us <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-blue p-8 sm:p-12">
            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Your Contribution Saves Lives
            </h3>
            <p className="text-white/85">
              Every donation — big or small — helps us reach more families and create lasting impact where it
              matters most.
            </p>
            <Link
              to="/donate"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-red-foreground transition-transform hover:scale-105"
            >
              Donate Now <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Media strip */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Reveal className="flex flex-col items-center gap-6 text-center">
            <p className="max-w-2xl text-muted-foreground">
              Our work has been featured in regional newspapers and community publications, recognizing SGF's
              consistent humanitarian efforts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="flex h-16 w-36 items-center justify-center rounded-lg border border-dashed border-border bg-card text-xs text-muted-foreground"
                >
                  <Newspaper className="mr-2 size-5" /> Press {n}
                </div>
              ))}
            </div>
            <Link to="/media" className="inline-flex items-center gap-1 text-sm font-bold text-red">
              See our media coverage <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Stay Connected</h2>
          <p className="mt-3 text-white/80">
            Get updates on our blood camps, relief drives, and ways you can help.
          </p>
          {subscribed ? (
            <p className="mt-6 rounded-full bg-green px-6 py-3 font-medium text-green-foreground" role="status">
              Thank you for subscribing! 💚
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-full border border-white/20 bg-white px-5 py-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              />
              <button
                type="submit"
                className="rounded-full bg-saffron px-6 py-3 font-bold text-saffron-foreground transition-transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
