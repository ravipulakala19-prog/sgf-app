import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Droplets,
  HeartPulse,
  GraduationCap,
  LifeBuoy,
  Megaphone,
  HandCoins,
  Users,
  MapPin,
  CalendarDays,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { CountUp } from "@/components/sgf/CountUp";
import { siteConfig } from "@/lib/site-config";
import { useT } from "@/lib/i18n";
import volunteersImg from "@/assets/sgf-volunteers.jpeg.asset.json";

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "Our Volunteer Team & Network — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "Meet the SGF volunteer network — coordinators, team leads, and hundreds of volunteers across Srikakulam District. Explore volunteer roles and responsibilities.",
      },
      { property: "og:title", content: "Our Volunteer Team & Network — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content: "Hundreds of volunteers serving communities across Srikakulam. See roles, responsibilities, and our coordinators.",
      },
      { property: "og:url", content: "/volunteers" },
      { property: "og:image", content: volunteersImg.url },
      { name: "twitter:image", content: volunteersImg.url },
    ],
    links: [{ rel: "canonical", href: "/volunteers" }],
  }),
  component: Volunteers,
});

const roleIcons: LucideIcon[] = [Droplets, HeartPulse, GraduationCap, LifeBuoy, Megaphone, HandCoins];

const roleColors = [
  "bg-red/10 text-red",
  "bg-saffron/15 text-saffron",
  "bg-blue/10 text-blue",
  "bg-green/10 text-green",
  "bg-saffron/15 text-saffron",
  "bg-red/10 text-red",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Volunteers() {
  const t = useT();
  const v = siteConfig.volunteers;

  const stats = [
    { icon: Users, value: v.total, suffix: "+", label: t.volunteersPage.statTotal },
    { icon: Activity, value: v.activeToday, suffix: "", label: t.volunteersPage.statActive },
    { icon: MapPin, value: v.cities, suffix: "+", label: t.volunteersPage.statCities },
    { icon: CalendarDays, value: v.yearsActive, suffix: "+", label: t.volunteersPage.statYears },
  ];

  const roles = t.volunteersPage.roles.map((r, i) => ({
    ...r,
    icon: roleIcons[i % roleIcons.length],
    color: roleColors[i % roleColors.length],
  }));

  return (
    <>
      {/* Hero */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.volunteersPage.label}</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">{t.volunteersPage.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{t.volunteersPage.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-blue" aria-label="Volunteer network in numbers">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="flex flex-col items-center text-center text-white">
              <s.icon className="mb-3 size-9 text-saffron" aria-hidden="true" />
              <span className="font-heading text-3xl font-extrabold sm:text-4xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-1 text-sm text-white/80">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roles & responsibilities */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-blue sm:text-4xl">{t.volunteersPage.rolesTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.volunteersPage.rolesDesc}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className={`grid size-12 place-items-center rounded-xl ${r.color}`}>
                  <r.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-blue">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team / coordinators */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-blue sm:text-4xl">{t.volunteersPage.teamTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.volunteersPage.teamDesc}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {v.team.map((m, i) => (
              <Reveal key={`${m.name}-${i}`} delay={i * 60}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                  <span className="grid size-20 place-items-center rounded-full bg-blue font-heading text-2xl font-extrabold text-white ring-4 ring-saffron/30">
                    {initials(m.name)}
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-blue">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-red">{m.role}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden="true" /> {m.area}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{t.volunteersPage.ctaTitle}</h2>
          <p className="mt-3 text-white/80">{t.volunteersPage.ctaDesc}</p>
          <Link
            to="/volunteer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-bold text-saffron-foreground transition-transform hover:scale-105"
          >
            {t.volunteersPage.ctaBtn} <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
