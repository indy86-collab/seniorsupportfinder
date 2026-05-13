import Link from "next/link";
import { HeartHandshake } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/support-checker", label: "Support Checker" },
  { href: "/browse-support", label: "Browse Support" },
  { href: "/locations", label: "Locations" },
  { href: "/guides", label: "Guides" },
  { href: "/browse-support/carers-support", label: "For Carers" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-950/10 bg-white/95 shadow-[0_2px_12px_rgba(15,27,61,0.06)] backdrop-blur">
      <div className="mx-auto flex max-w-[1460px] flex-col gap-4 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-8 md:py-5 lg:px-12">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white shadow-sm sm:h-12 sm:w-12">
            <HeartHandshake aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span>
            <span className="block text-xl font-bold leading-tight text-navy sm:text-2xl">Senior Support Finder</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-950 sm:gap-x-7 md:gap-10 md:text-base">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-md px-1 py-1.5 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 md:py-2 ${item.href === "/" ? "text-teal-800 after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-teal-700" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
