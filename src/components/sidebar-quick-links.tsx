import Link from "next/link";
import { ExternalLink, LifeBuoy } from "lucide-react";
import type { SeniorSupportEntry } from "@/lib/support-data";
import { getDisplayLocation, getQuickLinks } from "@/lib/support-data";
import { QaLinkWarning } from "./qa-link-warning";

export function SidebarQuickLinks({ entry }: { entry: SeniorSupportEntry }) {
  const quickLinks = getQuickLinks(entry);
  const location = getDisplayLocation(entry);
  const warn = entry.qaStatus?.toLowerCase().includes("review");
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <section id="quick-links" className="rounded-2xl border border-teal-100 bg-white p-5 shadow-[0_8px_20px_rgba(15,27,61,0.08)]">
        <h2 className="text-2xl font-bold text-slate-950">Useful official links</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Direct links to council, GOV.UK and charity pages.</p>
        <div className="mt-4 divide-y divide-slate-200">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex gap-3 py-3 hover:bg-mint-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
                {Icon && <Icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal-800" />}
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-teal-900">{link.name}</span>
                  <span className="block text-sm text-slate-600">{link.description}</span>
                </span>
                <ExternalLink aria-hidden="true" className="mt-1 h-4 w-4 text-teal-800" />
              </a>
            );
          })}
        </div>
        {warn && <QaLinkWarning />}
      </section>
      <section className="rounded-2xl bg-[#fff5ec] p-5 ring-1 ring-[#f3c5a2]">
        <LifeBuoy aria-hidden="true" className="h-9 w-9 text-[#c95100]" />
        <h2 className="mt-3 text-xl font-bold text-slate-950">Need more help?</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">Not sure where to start? Browse support by need or contact your local council.</p>
        <Link href="/locations" className="mt-4 inline-flex rounded-lg bg-[#007c89] px-4 py-2 text-sm font-bold text-white hover:bg-[#006d77]">Find local help</Link>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">About {location}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          {location} is listed in {entry.region}, {entry.country}. This page brings together official council, government and charity links for older people and carers.
        </p>
        {entry.websiteUrl && (
          <a href={entry.websiteUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal-800">
            About {location} Council <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        )}
      </section>
    </aside>
  );
}
