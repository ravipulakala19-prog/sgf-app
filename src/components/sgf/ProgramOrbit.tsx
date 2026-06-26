import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  HeartPulse,
  Droplets,
  GraduationCap,
  HandHeart,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import logo from "@/assets/sgf-logo.jpeg.asset.json";

const programIcons: LucideIcon[] = [HeartPulse, Droplets, GraduationCap, HandHeart, LifeBuoy];
const programSlugs = ["emergency", "blood", "education", "community", "relief"] as const;

/** Per-node gradient + glow color (decent palette, no red). */
const nodeStyles = [
  { from: "var(--blue)", glow: "var(--blue)" },
  { from: "var(--saffron)", glow: "var(--saffron)" },
  { from: "#0d9488", glow: "#0d9488" },
  { from: "var(--green)", glow: "var(--green)" },
  { from: "#6d28d9", glow: "#6d28d9" },
];

export function ProgramOrbit() {
  const t = useT();
  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const programs = programIcons.map((icon, i) => ({
    icon,
    slug: programSlugs[i],
    style: nodeStyles[i],
    ...t.home.programs[i],
  }));

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
    window.setTimeout(() => {
      navigate({ to: "/programs/$program", params: { program: programs[i].slug } });
    }, 550);
  };

  const count = programs.length;
  const radiusPct = 42;

  return (
    <div
      className="relative mx-auto mt-10 aspect-square w-[90vw] max-w-[34rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative connecting spokes */}
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {programs.map((p, i) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + radiusPct * Math.cos(angle);
          const y = 50 + radiusPct * Math.sin(angle);
          return (
            <line
              key={p.slug}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={p.style.from}
              strokeWidth="0.5"
              strokeDasharray="1.5 1.5"
              opacity="0.35"
            />
          );
        })}
      </svg>

      {/* Soft glowing backdrop */}
      <div
        className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/10 blur-2xl"
        style={{ animation: "sgf-pulse-glow 6s ease-in-out infinite" }}
        aria-hidden="true"
      />

      {/* Rotating ring + nodes */}
      <div
        className="absolute inset-0 rounded-full border border-dashed border-border/60"
        style={{
          animation: "sgf-orbit-spin 44s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {programs.map((p, i) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + radiusPct * Math.cos(angle);
          const y = 50 + radiusPct * Math.sin(angle);
          const isActive = active === i;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => handleSelect(i)}
              aria-label={p.title}
              className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Counter-rotate to keep upright */}
              <span
                className="block"
                style={{
                  animation: "sgf-orbit-spin 44s linear infinite reverse",
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                <span className="relative flex flex-col items-center">
                  <span
                    className={`flex size-20 items-center justify-center rounded-full bg-white text-blue shadow-md ring-1 ring-border transition-all duration-300 ease-out sm:size-24 ${
                      isActive ? "scale-150" : "group-hover:scale-110 group-hover:-translate-y-1"
                    }`}
                  >
                    <p.icon className="size-9 sm:size-10" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="mt-3 block max-w-[7.5rem] rounded-full bg-background/90 px-2 py-0.5 text-center text-xs font-bold leading-tight text-blue shadow-sm backdrop-blur">
                    {p.title}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Center hub */}
      <div
        className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-blue shadow-2xl ring-4 ring-saffron/50 sm:size-40"
        style={{ animation: "sgf-float 5s ease-in-out infinite" }}
      >
        <img
          src={logo.url}
          alt="Special Guys Foundation"
          className="size-full rounded-full object-cover ring-2 ring-white/70"
        />
      </div>
    </div>
  );
}
