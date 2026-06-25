import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "What We Do", to: "/what-we-do" },
  { label: "Impact", to: "/impact" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Media", to: "/media" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="tricolor-bar h-1 w-full" aria-hidden="true" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-blue ${
                    active ? "text-blue" : "text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/donate"
            className="inline-flex items-center gap-1.5 rounded-full bg-red px-4 py-2.5 text-sm font-bold text-red-foreground shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 sm:px-5"
          >
            <Heart className="size-4" aria-hidden="true" />
            Donate
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="grid size-11 place-items-center rounded-md text-blue hover:bg-accent lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((l) => {
                  const active = pathname === l.to;
                  return (
                    <SheetClose asChild key={l.to}>
                      <Link
                        to={l.to}
                        className={`rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent ${
                          active ? "bg-accent text-blue" : "text-foreground"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Link
                    to="/donate"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-red px-5 py-3 text-base font-bold text-red-foreground"
                  >
                    <Heart className="size-4" aria-hidden="true" />
                    Donate Now
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
