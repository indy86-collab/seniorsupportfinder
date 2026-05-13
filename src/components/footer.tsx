import Link from "next/link";
import { HeartHandshake } from "lucide-react";

const footerLinks = ["Support Checker", "About", "Guides", "For Carers", "Sources", "Privacy Policy", "Terms of Use", "Accessibility", "Contact"];

export function Footer() {
  return (
    <footer className="bg-[#006d77] text-white">
      <div className="mx-auto flex max-w-[1460px] flex-col items-center gap-5 px-5 py-5 sm:px-8 md:flex-row md:justify-between lg:px-12">
        <Link href="/" className="flex items-center gap-3 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <HeartHandshake aria-hidden="true" className="h-9 w-9" />
          <span className="text-lg">Senior Support Finder</span>
        </Link>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-sm font-semibold">
          {footerLinks.map((item) => (
            <Link key={item} href={item === "Support Checker" ? "/support-checker" : item === "For Carers" ? "/browse-support/carers-support" : item === "About" ? "/about" : item === "Guides" ? "/guides" : item === "Sources" ? "/how-we-choose-sources" : item === "Privacy Policy" ? "/privacy" : item === "Terms of Use" ? "/terms" : item === "Accessibility" ? "/accessibility" : item === "Contact" ? "/contact" : "/#about"} className="hover:text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {item}
            </Link>
          ))}
        </nav>
        <p className="text-center text-sm font-semibold leading-6 text-white/90 md:whitespace-nowrap md:text-right">
          Made with care for older people and carers.
        </p>
      </div>
    </footer>
  );
}
