import { Link } from "@tanstack/react-router";

/**
 * SGF brand logo mark.
 * Swap easily: drop the master logo into src/assets/ and replace the inline mark
 * with <img src={logo} ... />. Until then this renders the SGF acronym mark
 * (Acronym Red) with the org name.
 */
export function Logo({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "footer";
  className?: string;
}) {
  const isFooter = variant === "footer";
  return (
    <Link
      to="/"
      aria-label="Special Guys Foundation — home"
      className={`flex items-center gap-3 ${className}`}
    >
      {/* SWAP: replace this block with the master logo image */}
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-red text-red-foreground font-heading text-lg font-extrabold shadow-sm ring-2 ring-saffron/60"
      >
        SGF
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-heading text-sm font-bold tracking-tight sm:text-base ${
            isFooter ? "text-white" : "text-blue"
          }`}
        >
          Special Guys Foundation
        </span>
        <span
          className={`text-[0.65rem] font-medium ${
            isFooter ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          Sharing Hands, Saving Lives
        </span>
      </span>
    </Link>
  );
}
