import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote, X } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/sgf/Reveal";
import { BlurImage } from "@/components/sgf/BlurImage";
import { useT } from "@/lib/i18n";
import { galleryImages, pressClippings, pressNewstime, type MediaImage } from "@/lib/media-assets";

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

type LightboxState = { img: MediaImage; caption: string } | null;

function Media() {
  const t = useT();
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const gallery = galleryImages.map((img, i) => ({ img, caption: t.media.gallery[i] ?? t.media.fieldTitle })).reverse();
  const clippings = [
    { img: pressNewstime, caption: t.media.pressBody },
    ...pressClippings.map((img, i) => ({ img, caption: t.media.clippings[i] })),
  ].reverse();
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
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.img.thumb} delay={i * 30}>
              <figure className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <button
                  type="button"
                  onClick={() => setLightbox({ img: g.img, caption: g.caption })}
                  className="block w-full cursor-zoom-in"
                  aria-label="View full image"
                >
                  <BlurImage
                    src={g.img.thumb}
                    blur={g.img.blur}
                    width={g.img.w}
                    height={g.img.h}
                    alt={g.caption}
                    className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <figcaption className="p-2.5 text-xs text-muted-foreground line-clamp-2">{g.caption}</figcaption>
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
            <Reveal key={c.img.thumb} delay={i * 50}>
              <figure className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <button
                  type="button"
                  onClick={() => setLightbox({ img: c.img, caption: c.caption })}
                  className="block w-full cursor-zoom-in"
                  aria-label="View full image"
                >
                  <BlurImage
                    src={c.img.thumb}
                    blur={c.img.blur}
                    width={c.img.w}
                    height={c.img.h}
                    alt={c.caption}
                    className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <figcaption className="p-4 text-sm text-muted-foreground">{c.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="size-6" />
          </button>
          <figure className="max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.img.full}
              alt={lightbox.caption}
              width={lightbox.img.w}
              height={lightbox.img.h}
              decoding="async"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
              style={{ backgroundImage: `url(${lightbox.img.blur})`, backgroundSize: "cover" }}
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">{lightbox.caption}</figcaption>
          </figure>
        </div>
      )}


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
