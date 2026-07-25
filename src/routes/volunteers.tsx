import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Droplet,
  HeartPulse,
  Users,
  MapPin,
  CalendarDays,
  Activity,
  Cake,
  UserRound,
} from "lucide-react";
import { Reveal } from "@/components/sgf/Reveal";
import { CountUp } from "@/components/sgf/CountUp";
import { siteConfig } from "@/lib/site-config";
import { useT } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import volunteersImg from "@/assets/sgf-volunteers.jpeg.asset.json";

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "Our Team — Core Team, Volunteers & Blood Donors | SGF" },
      {
        name: "description",
        content:
          "Meet the Special Guys Foundation family — our core team, volunteers, and blood donors serving Srikakulam District.",
      },
      { property: "og:title", content: "Our Team — Special Guys Foundation" },
      {
        property: "og:description",
        content: "Core team, volunteers, and blood donors — the people behind SGF.",
      },
      { property: "og:url", content: "/volunteers" },
      { property: "og:image", content: volunteersImg.url },
      { name: "twitter:image", content: volunteersImg.url },
    ],
    links: [{ rel: "canonical", href: "/volunteers" }],
  }),
  component: Volunteers,
});

type Category = "core_team" | "volunteer" | "blood_donor";

type Member = {
  id: string;
  name: string;
  category: Category;
  blood_group: string | null;
  city: string | null;
  date_of_birth: string | null;
  profile_picture_url: string | null;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDob(dob: string | null) {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return dob;
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

function photoUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const { data } = supabase.storage.from("volunteer-photos").getPublicUrl(path);
  return data.publicUrl;
}

function MemberCard({ m, t }: { m: Member; t: ReturnType<typeof useT> }) {
  const photo = photoUrl(m.profile_picture_url);
  const dob = formatDob(m.date_of_birth);
  const catLabel = t.volunteersPage.tabs[m.category];
  return (
    <div className="flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative w-28 shrink-0 bg-muted sm:w-32">
        {photo ? (
          <img
            src={photo}
            alt={m.name}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-blue text-white">
            <span className="font-heading text-2xl font-extrabold">{initials(m.name)}</span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
        <h3 className="truncate font-heading text-base font-bold text-blue">{m.name}</h3>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-saffron/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-saffron">
          {catLabel}
        </span>
        <dl className="mt-1 space-y-1 text-xs text-muted-foreground">
          {m.blood_group && (
            <div className="flex items-center gap-1.5">
              <Droplet className="size-3.5 text-red" aria-hidden="true" />
              <span className="font-medium text-foreground">{m.blood_group}</span>
            </div>
          )}
          {dob && (
            <div className="flex items-center gap-1.5">
              <Cake className="size-3.5 text-blue" aria-hidden="true" />
              <span>{dob}</span>
            </div>
          )}
          {m.city && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-green" aria-hidden="true" />
              <span className="truncate">{m.city}</span>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

function Volunteers() {
  const t = useT();
  const v = siteConfig.volunteers;
  const [tab, setTab] = useState<Category>("core_team");

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["public_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("volunteer_signups")
        .select("id, name, category, blood_group, city, date_of_birth, profile_picture_url")
        .in("category", ["core_team", "volunteer", "blood_donor"])
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Member[];
    },
    staleTime: 60_000,
  });

  const grouped = useMemo(() => {
    const g: Record<Category, Member[]> = { core_team: [], volunteer: [], blood_donor: [] };
    for (const m of members) if (g[m.category]) g[m.category].push(m);
    return g;
  }, [members]);

  const tabs: { key: Category; icon: typeof Users }[] = [
    { key: "core_team", icon: UserRound },
    { key: "volunteer", icon: Users },
    { key: "blood_donor", icon: HeartPulse },
  ];

  const stats = [
    { icon: Users, value: v.total, suffix: "+", label: t.volunteersPage.statTotal },
    { icon: Activity, value: v.activeToday, suffix: "", label: t.volunteersPage.statActive },
    { icon: MapPin, value: v.cities, suffix: "+", label: t.volunteersPage.statCities },
    { icon: CalendarDays, value: v.yearsActive, suffix: "+", label: t.volunteersPage.statYears },
  ];

  const current = grouped[tab];

  return (
    <>
      {/* Hero */}
      <section className="tricolor-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-saffron">
              {t.volunteersPage.label}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-blue sm:text-5xl">
              {t.volunteersPage.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{t.volunteersPage.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-blue" aria-label="Volunteer network in numbers">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className="flex flex-col items-center text-center text-white"
            >
              <s.icon className="mb-3 size-9 text-saffron" aria-hidden="true" />
              <span className="font-heading text-3xl font-extrabold sm:text-4xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-1 text-sm text-white/80">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Directory with tabs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-blue sm:text-4xl">
            {t.volunteersPage.directoryTitle}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.volunteersPage.directoryDesc}</p>
        </Reveal>

        <div
          role="tablist"
          aria-label={t.volunteersPage.directoryTitle}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-card p-1.5 sm:mx-auto sm:w-fit"
        >
          {tabs.map(({ key, icon: Icon }) => {
            const active = tab === key;
            const count = grouped[key].length;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-blue text-white shadow"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{t.volunteersPage.tabs[key]}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    active ? "bg-white/20 text-white" : "bg-muted text-foreground/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl border border-border bg-muted/40"
                />
              ))}
            </div>
          ) : current.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
              <p className="text-muted-foreground">{t.volunteersPage.directoryEmpty}</p>
              <Link
                to="/volunteer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-saffron-foreground transition-transform hover:scale-105"
              >
                {t.volunteersPage.ctaBtn} <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {current.map((m) => (
                <MemberCard key={m.id} m={m} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {t.volunteersPage.ctaTitle}
          </h2>
          <p className="mt-3 text-white/80">{t.volunteersPage.ctaDesc}</p>
          <Link
            to="/volunteer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-bold text-saffron-foreground transition-transform hover:scale-105"
          >
            {t.volunteersPage.ctaBtn} <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
