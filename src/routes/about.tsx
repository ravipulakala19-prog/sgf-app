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
import { useT } from "@/lib/i18n";
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

const valueIcons = [Heart, ShieldCheck, HandHeart, Users, Handshake, Sparkles];

function About() {
  const t = useT();
  const values = valueIcons.map((icon, i) => ({ icon, ...t.about.values[i] }));
  return (
    <>
      {/* Page header */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.about.label}</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              {t.about.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {t.about.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.about.whoLabel}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-blue sm:text-4xl">
              {t.about.whoTitle}
            </h2>
            <p className="mt-5 text-muted-foreground">
              {t.about.whoP1}
            </p>
            <p className="mt-4 text-muted-foreground">
              {t.about.whoP2}
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
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.about.storyLabel}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              {t.about.storyTitle}
            </h2>
            <p className="mt-6 text-white/85">
              {t.about.storyP1}
            </p>
            <p className="mt-4 text-white/85">
              {t.about.storyP2}
            </p>
            <p className="mt-6 inline-block rounded-full bg-saffron px-6 py-2 font-heading font-bold text-saffron-foreground">
              {t.about.humanityFirst}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-blue">{t.about.missionTitle}</h2>
              <p className="mt-4 text-muted-foreground">
                {t.about.missionP1}
              </p>
              <p className="mt-4 text-muted-foreground">
                {t.about.missionP2}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-blue">{t.about.visionTitle}</h2>
              <p className="mt-4 text-muted-foreground">
                {t.about.visionP1}
              </p>
              <p className="mt-4 text-muted-foreground">
                {t.about.visionP2}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.about.valuesLabel}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-blue sm:text-4xl">{t.about.valuesTitle}</h2>
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
          <h2 className="font-heading text-3xl font-bold text-blue">{t.about.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {t.about.ctaDescPre}{siteConfig.acronym}{t.about.ctaDescPost}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/volunteer" className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-bold text-saffron-foreground transition-transform hover:scale-105">
              {t.about.becomeVolunteer} <ArrowRight className="size-5" />
            </Link>
            <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-red-foreground transition-transform hover:scale-105">
              {t.about.donateNow} <ArrowRight className="size-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
