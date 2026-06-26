import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HeartPulse, Droplets, GraduationCap, Users, LifeBuoy, type LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";

const programIcons: LucideIcon[] = [HeartPulse, Droplets, GraduationCap, Users, LifeBuoy];
const programSlugs = ["emergency", "blood", "education", "community", "relief"] as const;
const nodeColors = [
  "bg-red text-red-foreground",
  "bg-saffron text-saffron-foreground",
  "bg-blue text-blue-foreground",
  "bg-green text-green-foreground",
  "bg-red text-red-foreground",
];

export function ProgramOrbit() {
  const t = useT();
  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const programs = programIcons.map((icon, i) => ({
    icon,
    slug: programSlugs[i],
    color: nodeColors[i],
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

  return (
    <div
      className="relative mx-auto mt-10 aspect-square w-[88vw] max-w-[30rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Rotating ring */}
      <div
        className="absolute inset-0 rounded-full border-2 border-dashed border-border/70"
        style={{
          animation: "sgf-orbit-spin 40s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {programs.map((p, i) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const radiusPct = 42;
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
              <span
                className="block"
                style={{
                  animation: "sgf-orbit-spin 40s linear infinite reverse",
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                <span
                  className={`flex size-20 flex-col items-center justify-center gap-1 rounded-full shadow-lg ring-4 ring-background transition-transform duration-500 ease-out sm:size-24 ${p.color} ${
                    isActive ? "scale-150" : "group-hover:scale-110"
                  }`}
                >
                  <p.icon className="size-7 sm:size-8" aria-hidden="true" />
                </span>
                <span className="mt-2 block max-w-[7rem] text-center text-xs font-bold leading-tight text-blue">
                  {p.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-blue p-4 text-center shadow-xl ring-4 ring-saffron/40 sm:size-40">
        <span className="font-heading text-xl font-extrabold text-white sm:text-2xl">SGF</span>
        <span className="mt-1 text-[0.65rem] leading-tight text-white/80 sm:text-xs">
          {t.home.whatWeDoTitle}
        </span>
      </div>
    </div>
  );
}
