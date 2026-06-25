import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import galleryDonation from "@/assets/media/gallery-1.jpg.asset.json";
import galleryRelief from "@/assets/media/gallery-relief.jpg.asset.json";
import galleryBlood from "@/assets/media/gallery-blood.jpg.asset.json";
import galleryEducation from "@/assets/media/gallery-education.jpg.asset.json";
import pressNewsTime from "@/assets/media/press-newstime.jpg.asset.json";

const gallery = [
  { src: galleryDonation.url, caption: "Financial assistance handed to a family in need" },
  { src: galleryBlood.url, caption: "Blood donation drive at Uddanam Blood Centre" },
  { src: galleryEducation.url, caption: "Educational support and supplies for students" },
  { src: galleryRelief.url, caption: "Community welfare visit to a family in distress" },
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

const coverage = [
  "Medical emergency support",
  "Blood donation initiatives",
  "Educational programs",
  "Disaster relief activities",
];

function Media() {
  return (
    <>
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">Media &amp; Recognition</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              Recognized for service to the community
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Over the years, SGF's humanitarian work has been featured in several regional newspapers and community
              publications, recognizing our consistent efforts across medical emergencies, blood donation, education,
              and disaster relief.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-blue">From the field</h2>
          <p className="mt-3 text-muted-foreground">
            Moments from SGF's on-ground service across Srikakulam District.
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

      {/* Press clipping */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-blue">In the news</h2>
            <p className="mt-3 text-muted-foreground">
              SGF's humanitarian work featured in regional newspapers.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <article className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-md">
              <img
                src={pressNewsTime.url}
                alt="News Time feature: SGF provides Rs. 25,000 financial assistance to a family in Kanchili Mandal"
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="p-5">
                <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">News Time — Srikakulam</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-blue">SGF extends ₹25,000 financial aid</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coverage of SGF members supporting an ailing family in Jadapudi village, Kanchili Mandal.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>


      {/* Coverage themes */}
      <section className="bg-blue">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <Quote className="size-10 text-saffron" aria-hidden="true" />
            <p className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">
              Featured for consistent efforts in supporting:
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
        <h2 className="font-heading text-2xl font-bold text-blue">Want to feature our work?</h2>
        <p className="mt-3 text-muted-foreground">
          Journalists and media partners are welcome to reach out for stories and interviews.
        </p>
        <Link to="/contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue px-7 py-3.5 font-bold text-blue-foreground transition-transform hover:scale-105">
          Contact Us <ArrowRight className="size-5" />
        </Link>
      </section>
    </>
  );
}
