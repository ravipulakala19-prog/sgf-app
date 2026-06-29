import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { HeartPulse, Droplets, GraduationCap, Users, LifeBuoy, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { useT } from "@/lib/i18n";
import { programSlugs, programIndex, programMedia, type ProgramSlug } from "@/lib/program-media";
import { BlurImage } from "@/components/sgf/BlurImage";
import { mediaByFull } from "@/lib/media-assets";

const icons = [HeartPulse, Droplets, GraduationCap, Users, LifeBuoy];

export const Route = createFileRoute("/programs/$program")({
  beforeLoad: ({ params }) => {
    if (!programSlugs.includes(params.program as ProgramSlug)) throw notFound();
  },
  head: ({ params }) => {
    const titles: Record<string, string> = {
      emergency: "Emergency Medical Assistance",
      blood: "Blood Donation Services",
      education: "Educational Support",
      community: "Community Welfare",
      relief: "Disaster & Family Relief",
    };
    const name = titles[params.program] ?? "Our Programs";
    const hero = programMedia[params.program as ProgramSlug]?.hero;
    return {
      meta: [
        { title: `${name} — Special Guys Foundation (SGF)` },
        { name: "description", content: `${name} by Special Guys Foundation — recent work, activities, and photos from the field across Srikakulam District.` },
        { property: "og:title", content: `${name} — Special Guys Foundation (SGF)` },
        { property: "og:description", content: `See how SGF delivers ${name.toLowerCase()} across Srikakulam District.` },
        ...(hero ? [{ property: "og:image", content: hero }] : []),
      ],
      links: [{ rel: "canonical", href: `/programs/${params.program}` }],
    };
  },
  component: ProgramDetail,
});

function ProgramDetail() {
  const { program } = Route.useParams();
  const t = useT();
  const slug = program as ProgramSlug;
  const i = programIndex[slug];
  const p = t.whatWeDo.programs[i];
  const Icon = icons[i];
  const media = programMedia[slug];

  return (
    <>
      {/* Hero */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <Link
            to="/what-we-do"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue transition-colors hover:text-red"
          >
            <ArrowLeft className="size-4" /> {t.whatWeDo.backToAll}
          </Link>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <span className="grid size-14 place-items-center rounded-2xl bg-saffron/15 text-saffron">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h1 className="mt-4 font-heading text-3xl font-extrabold text-blue sm:text-4xl">{p.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{p.body}</p>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-border">
                <img
                  src={media.hero}
                  alt={p.title}
                  loading="eager"
                  className="aspect-[4/3] size-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview + activities */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <h2 className="font-heading text-2xl font-bold text-blue">{t.whatWeDo.overview}</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              {p.detail.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            {p.points.length > 0 && (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <Reveal delay={120} className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-blue">{t.whatWeDo.recentWork}</h2>
              <ul className="mt-4 space-y-3">
                {p.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-red" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      {media.gallery.length > 0 && (
        <section className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-blue">{t.whatWeDo.gallery}</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {media.gallery.map((src, gi) => {
                const opt = mediaByFull[src];
                return (
                  <Reveal key={src} delay={gi * 70}>
                    <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-border">
                      {opt ? (
                        <BlurImage
                          src={opt.thumb}
                          blur={opt.blur}
                          width={opt.w}
                          height={opt.h}
                          alt={`${p.title} activity ${gi + 1}`}
                          className="aspect-square size-full transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <img
                          src={src}
                          alt={`${p.title} activity ${gi + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="aspect-square size-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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
