import { Link } from "@tanstack/react-router";
import sgfLogo from "@/assets/sgf-logo.jpeg.asset.json";

/**
 * SGF brand logo mark — uses the official Special Guys Foundation logo.
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
      <img
        src={sgfLogo.url}
        alt="Special Guys Foundation logo"
        className="size-11 shrink-0 rounded-full object-contain"
        width={44}
        height={44}
      />
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
