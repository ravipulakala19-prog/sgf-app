import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

/** Floating donate button — visible on mobile only, follows scroll. */
export function FloatingDonate() {
  return (
    <Link
      to="/donate"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-red px-5 py-3.5 text-sm font-bold text-red-foreground shadow-lg shadow-red/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 lg:hidden"
      aria-label="Donate now"
    >
      <Heart className="size-4" aria-hidden="true" />
      Donate
    </Link>
  );
}
