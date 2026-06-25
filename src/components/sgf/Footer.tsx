import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, QrCode } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site-config";

const quickLinks = [
  { label: "About", to: "/about" },
  { label: "What We Do", to: "/what-we-do" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Donate", to: "/donate" },
  { label: "Contact", to: "/contact" },
] as const;

export function Footer() {
  const { contact, social } = siteConfig;
  return (
    <footer className="bg-blue text-white">
      <div className="tricolor-bar h-1 w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="footer" />
          <p className="max-w-xs text-sm text-white/80">
            A volunteer-driven non-profit serving communities across Srikakulam
            District with compassion, integrity, and service.
          </p>
          <div className="flex gap-3">
            <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <Facebook className="size-5" />
            </a>
            <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <Instagram className="size-5" />
            </a>
            <a href={social.telegram} aria-label="Telegram" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <Send className="size-5" />
            </a>
            <a href={social.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <MessageCircle className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-base font-bold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/80 transition-colors hover:text-saffron">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-base font-bold text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="size-5 shrink-0 text-saffron" /><span>{contact.location}</span></li>
            <li className="flex gap-2"><Phone className="size-5 shrink-0 text-saffron" /><a href={`tel:${contact.phone}`} className="hover:text-saffron">{contact.phone}</a></li>
            <li className="flex gap-2"><Mail className="size-5 shrink-0 text-saffron" /><a href={`mailto:${contact.email}`} className="hover:text-saffron">{contact.email}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-base font-bold text-white">Scan to Give</h2>
          <div className="mt-4 grid aspect-square w-32 place-items-center rounded-lg bg-white/10 text-center text-xs text-white/60">
            {/* SWAP: replace with your UPI / donation QR image */}
            <span className="flex flex-col items-center gap-2">
              <QrCode className="size-10" />
              QR Placeholder
            </span>
          </div>
          <Link to="/donate" className="mt-4 inline-block rounded-full bg-red px-4 py-2 text-sm font-bold text-red-foreground transition-transform hover:scale-105">
            Donate Now
          </Link>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/70 sm:px-6">
          © {new Date().getFullYear()} Special Guys Foundation. Sharing Hands, Saving Lives.
        </p>
      </div>
    </footer>
  );
}
