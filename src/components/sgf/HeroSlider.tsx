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
  eyebrow: string;
  title: string;
  desc: string;
  cta: { label: string; to: string };
};

const slides: Slide[] = [
  {
    src: slide1.url,
    eyebrow: "Blood Donation",
    title: "Every Drop Counts. Every Donor Saves a Life.",
    desc: "Our volunteer blood donor network and regular camps connect patients in critical need with willing donors.",
    cta: { label: "Donate Blood", to: "/what-we-do" },
  },
  {
    src: slide2.url,
    eyebrow: "Our Volunteers",
    title: "Ordinary People Doing Extraordinary Things.",
    desc: "A growing family of compassionate volunteers serving communities across Srikakulam District.",
    cta: { label: "Become a Volunteer", to: "/volunteer" },
  },
  {
    src: slide3.url,
    eyebrow: "Educational Support",
    title: "Empowering Students With Books and Hope.",
    desc: "School supplies, materials, and support to help disadvantaged children stay in school.",
    cta: { label: "Support Education", to: "/donate" },
  },
  {
    src: slide4.url,
    eyebrow: "Community Awareness",
    title: "Safer Roads, Stronger Communities.",
    desc: "Road safety drives and awareness campaigns spreading life-saving messages where they matter most.",
    cta: { label: "See Our Work", to: "/what-we-do" },
  },
  {
    src: slide5.url,
    eyebrow: "Community & Sports",
    title: "Bringing People Together for a Cause.",
    desc: "Sports tournaments and community events that unite people and raise support for those in need.",
    cta: { label: "Get Involved", to: "/volunteer" },
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      className="relative isolate overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Special Guys Foundation highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[80vh] min-h-[520px] w-full">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="absolute inset-0 size-full object-cover"
              fetchPriority={i === 0 ? "high" : "low"}
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue/90 via-blue/70 to-blue/30"
              aria-hidden="true"
            />
            <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-center gap-5 px-4 sm:px-6">
              <span className="rounded-full bg-saffron px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-saffron-foreground">
                {slide.eyebrow}
              </span>
              <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="max-w-2xl text-base text-white/90 sm:text-lg">{slide.desc}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 text-base font-bold text-red-foreground shadow-lg transition-transform hover:scale-105"
                >
                  Donate Now <ArrowRight className="size-5" />
                </Link>
                <Link
                  to={slide.cta.to}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-saffron bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-colors hover:bg-saffron hover:text-saffron-foreground"
                >
                  {slide.cta.label}
                </Link>
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
        className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 sm:left-5"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40 sm:right-5"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-saffron" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
