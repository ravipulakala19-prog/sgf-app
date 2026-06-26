import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, Droplets, GraduationCap, Users, LifeBuoy, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { useT } from "@/lib/i18n";
import emergencyImg from "@/assets/media/gallery-1.jpg.asset.json";
import bloodImg from "@/assets/media/gallery-blood.jpg.asset.json";
import educationImg from "@/assets/media/gallery-education.jpg.asset.json";
import communityImg from "@/assets/slider/slide-5.jpg.asset.json";
import reliefImg from "@/assets/media/gallery-relief.jpg.asset.json";

export const Route = createFileRoute("/what-we-do")({
  head: () => ({
    meta: [
      { title: "What We Do — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "Emergency medical assistance, blood donation services, educational support, community welfare, and disaster relief — the five ways SGF serves communities in Srikakulam.",
      },
      { property: "og:title", content: "What We Do — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content: "Five programs through which SGF turns compassion into action across Srikakulam District.",
      },
      { property: "og:url", content: "/what-we-do" },
    ],
    links: [{ rel: "canonical", href: "/what-we-do" }],
  }),
  component: WhatWeDo,
});

const programIcons = [HeartPulse, Droplets, GraduationCap, Users, LifeBuoy];
const programSlugs = ["emergency", "blood", "education", "community", "relief"];
const programImages = [emergencyImg.url, bloodImg.url, educationImg.url, communityImg.url, reliefImg.url];

function WhatWeDo() {
  const t = useT();
  const programs = programIcons.map((icon, i) => ({ icon, slug: programSlugs[i], image: programImages[i], ...t.whatWeDo.programs[i] }));
  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.whatWeDo.label}</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              {t.whatWeDo.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {t.whatWeDo.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-col gap-10">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-[auto_1fr] sm:p-8">
                <span className="grid size-14 place-items-center rounded-2xl bg-saffron/15 text-saffron">
                  <p.icon className="size-7" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-blue">{p.title}</h2>
                  <p className="mt-3 text-muted-foreground">{p.body}</p>
                  {p.points.length > 0 && (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{t.whatWeDo.ctaTitle}</h2>
          <p className="mt-3 text-white/80">{t.whatWeDo.ctaDesc}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-red-foreground transition-transform hover:scale-105">
              {t.whatWeDo.donateNow} <ArrowRight className="size-5" />
            </Link>
            <Link to="/volunteer" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-saffron px-7 py-3.5 font-bold text-white transition-colors hover:bg-saffron hover:text-saffron-foreground">
              {t.whatWeDo.volunteerWithUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
