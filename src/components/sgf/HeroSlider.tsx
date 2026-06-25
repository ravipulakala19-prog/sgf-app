import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "@/assets/slider/slide-1.jpg.asset.json";
import slide2 from "@/assets/slider/slide-2.jpg.asset.json";
import slide3 from "@/assets/slider/slide-3.jpg.asset.json";
import slide4 from "@/assets/slider/slide-4.jpg.asset.json";
import slide5 from "@/assets/slider/slide-5.jpg.asset.json";

type Slide = {
  src: string;
  highlight: string;
  title: string;
  sub: string;
  tint: string;
  cta: { label: string; to: string };
};

const slides: Slide[] = [
  {
    src: slide1.url,
    highlight: "Every Drop Counts.",
    title: "Donate Blood, Save a Life Today",
    sub: "Support 100+ Patients in Need",
    tint: "bg-red/10",
    cta: { label: "Donate Now", to: "/donate" },
  },
  {
    src: slide2.url,
    highlight: "Join Our Volunteers.",
    title: "Ordinary People, Extraordinary Impact",
    sub: "500+ Volunteers Serving Communities",
    tint: "bg-saffron/15",
    cta: { label: "Become a Volunteer", to: "/volunteer" },
  },
  {
    src: slide3.url,
    highlight: "Empower a Child.",
    title: "Books and Hope for Every Student",
    sub: "Support Education for 200+ Children",
    tint: "bg-green/10",
    cta: { label: "Support Education", to: "/donate" },
  },
  {
    src: slide4.url,
    highlight: "Safer Roads.",
    title: "Awareness That Saves Lives",
    sub: "Reaching 50+ Communities",
    tint: "bg-blue/10",
    cta: { label: "See Our Work", to: "/what-we-do" },
  },
  {
    src: slide5.url,
    highlight: "Together We Win.",
    title: "Uniting People for a Cause",
    sub: "Community Events & Tournaments",
    tint: "bg-saffron/15",
    cta: { label: "Get Involved", to: "/volunteer" },
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section
      className="relative bg-background py-8 sm:py-10"
      aria-roledescription="carousel"
      aria-label="Special Guys Foundation highlights"
    >
      <div className="relative overflow-hidden">
        {/* Track: each slide is 80% wide, centered with 10% peek on each side */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(calc(10% - ${index * 80}%))` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="w-[80%] shrink-0 px-2 sm:px-3"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
            >
              <div
                className={`relative grid items-stretch overflow-hidden rounded-2xl shadow-lg ring-1 ring-border md:h-[24rem] md:grid-cols-5 ${slide.tint}`}
              >
                {/* Text */}
                <div className="order-2 flex flex-col justify-center gap-3 p-6 sm:p-8 md:order-1 md:col-span-2 lg:p-10">
                  <p className="font-heading text-2xl font-extrabold leading-tight text-red sm:text-3xl lg:text-4xl">
                    {slide.highlight}
                  </p>
                  <h2 className="font-heading text-xl font-bold leading-snug text-blue sm:text-2xl lg:text-3xl">
                    {slide.title}
                  </h2>
                  <p className="text-sm text-muted-foreground sm:text-base">{slide.sub}</p>
                  <Link
                    to={slide.cta.to}
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-red-foreground shadow-md transition-transform hover:scale-105 sm:text-base"
                  >
                    {slide.cta.label} <ArrowRight className="size-4 sm:size-5" />
                  </Link>
                </div>

                {/* Image — uniform size across all slides */}
                <div className="order-1 md:order-2 md:col-span-3">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="h-52 w-full object-cover sm:h-72 md:h-full"
                    fetchPriority={i === 0 ? "high" : "low"}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-card text-blue shadow-md ring-1 ring-border transition-colors hover:bg-saffron hover:text-saffron-foreground sm:left-[6%]"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-card text-blue shadow-md ring-1 ring-border transition-colors hover:bg-saffron hover:text-saffron-foreground sm:right-[6%]"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-red" : "w-2.5 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
