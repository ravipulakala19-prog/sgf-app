import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { useT } from "@/lib/i18n";
import galleryDonation from "@/assets/media/gallery-1.jpg.asset.json";
import galleryRelief from "@/assets/media/gallery-relief.jpg.asset.json";
import galleryBlood from "@/assets/media/gallery-blood.jpg.asset.json";
import galleryEducation from "@/assets/media/gallery-education.jpg.asset.json";
import pressNewsTime from "@/assets/media/press-newstime.jpg.asset.json";
import press1 from "@/assets/media/press/press-1.jpg.asset.json";
import press2 from "@/assets/media/press/press-2.jpg.asset.json";
import press3 from "@/assets/media/press/press-3.jpg.asset.json";
import press4 from "@/assets/media/press/press-4.jpg.asset.json";
import press5 from "@/assets/media/press/press-5.jpg.asset.json";
import press6 from "@/assets/media/press/press-6.jpg.asset.json";
import press7 from "@/assets/media/press/press-7.jpg.asset.json";
import press8 from "@/assets/media/press/press-8.jpg.asset.json";
import press9 from "@/assets/media/press/press-9.jpg.asset.json";
import press10 from "@/assets/media/press/press-10.jpg.asset.json";
import press11 from "@/assets/media/press/press-11.jpg.asset.json";
import press12 from "@/assets/media/press/press-12.jpg.asset.json";
import press13 from "@/assets/media/press/press-13.jpg.asset.json";
import press14 from "@/assets/media/press/press-14.jpg.asset.json";
import press15 from "@/assets/media/press/press-15.jpg.asset.json";
import press16 from "@/assets/media/press/press-16.jpg.asset.json";
import press17 from "@/assets/media/press/press-17.jpg.asset.json";
import press18 from "@/assets/media/press/press-18.jpg.asset.json";

const gallerySrcs = [galleryDonation.url, galleryBlood.url, galleryEducation.url, galleryRelief.url];
const clippingSrcs = [
  press1.url, press2.url, press3.url, press4.url, press5.url,
  press6.url, press7.url, press8.url, press9.url, press10.url,
  press11.url, press12.url, press13.url, press14.url, press15.url,
  press16.url, press17.url, press18.url,
];

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media & Recognition — Special Guys Foundation (SGF)" },
      {
        name: "description",
        content:
          "SGF's humanitarian work has been featured in regional newspapers and community publications recognizing our medical, blood donation, education, and relief efforts.",
      },
      { property: "og:title", content: "Media & Recognition — Special Guys Foundation (SGF)" },
      {
        property: "og:description",
        content: "Press coverage and community recognition of SGF's humanitarian work in Srikakulam District.",
      },
      { property: "og:url", content: "/media" },
    ],
    links: [{ rel: "canonical", href: "/media" }],
  }),
  component: Media,
});

function Media() {
  const t = useT();
  const gallery = gallerySrcs.map((src, i) => ({ src, caption: t.media.gallery[i] }));
  const clippings = [
    { src: pressNewsTime.url, caption: t.media.pressBody },
    ...clippingSrcs.map((src, i) => ({ src, caption: t.media.clippings[i] })),
  ];
  const coverage = t.media.coverage;
  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">{t.media.label}</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              {t.media.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {t.media.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-blue">{t.media.fieldTitle}</h2>
          <p className="mt-3 text-muted-foreground">
            {t.media.fieldDesc}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 60}>
              <figure className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5 text-sm text-muted-foreground">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Press clippings grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-blue">{t.media.clippingsTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.media.clippingsDesc}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clippings.map((c, i) => (
            <Reveal key={c.src} delay={i * 50}>
              <figure className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="overflow-hidden bg-muted/30">
                  <img
                    src={c.src}
                    alt={c.caption}
                    loading="lazy"
                    className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-4 text-sm text-muted-foreground">{c.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>


      <section className="bg-blue">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <Quote className="size-10 text-saffron" aria-hidden="true" />
            <p className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">
              {t.media.featuredFor}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {coverage.map((c, i) => (
              <Reveal key={c} delay={i * 70}>
                <div className="rounded-xl bg-white/10 p-5 text-white backdrop-blur">
                  <p className="font-medium">{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-blue">{t.media.featureTitle}</h2>
        <p className="mt-3 text-muted-foreground">
          {t.media.featureDesc}
        </p>
        <Link to="/contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue px-7 py-3.5 font-bold text-blue-foreground transition-transform hover:scale-105">
          {t.media.contactUs} <ArrowRight className="size-5" />
        </Link>
      </section>
    </>
  );
}
