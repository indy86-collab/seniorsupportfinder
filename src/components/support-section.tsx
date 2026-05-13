import type { SupportSection as SupportSectionType } from "@/lib/support-data";
import { needsQaWarning, type SeniorSupportEntry } from "@/lib/support-data";
import { SupportLinkRow } from "./support-link-row";

const accents: Record<string, { bg: string; icon: string; border: string; tag: string }> = {
  "benefits-money": { bg: "bg-[#f1faee]", icon: "bg-[#dff3dc] text-[#2f7d46]", border: "border-[#b9deb6]", tag: "text-[#2f7d46]" },
  "adult-social-care": { bg: "bg-[#eefcff]", icon: "bg-[#d7f1f4] text-[#007c89]", border: "border-[#b7dfe4]", tag: "text-[#007c89]" },
  "mobility-transport": { bg: "bg-[#f3f6ff]", icon: "bg-[#dce7ff] text-[#155fa0]", border: "border-[#bdcdf5]", tag: "text-[#155fa0]" },
  "carers-support": { bg: "bg-[#fff5ec]", icon: "bg-[#ffe1ca] text-[#c95100]", border: "border-[#f3c5a2]", tag: "text-[#c95100]" },
  "home-adaptations": { bg: "bg-[#fff9e8]", icon: "bg-[#ffedbc] text-[#d98a00]", border: "border-[#efd28a]", tag: "text-[#b87400]" },
  "local-charities": { bg: "bg-[#eefcf8]", icon: "bg-[#d6f3ea] text-[#007c89]", border: "border-[#b6ded4]", tag: "text-[#007c89]" },
};

export function SupportSection({
  section,
  entry,
  defaultOpen = false,
}: {
  section: SupportSectionType;
  entry: SeniorSupportEntry;
  defaultOpen?: boolean;
}) {
  const Icon = section.icon;
  const warn = needsQaWarning(entry);
  const accent = accents[section.id] ?? { bg: "bg-white", icon: "bg-mint-100 text-teal-800", border: "border-slate-200", tag: "text-teal-800" };
  return (
    <section id={section.id} className={`scroll-mt-28 rounded-2xl border ${accent.border} bg-white shadow-[0_8px_20px_rgba(15,27,61,0.08)]`}>
      <details open={defaultOpen} className="group">
        <summary className={`flex cursor-pointer list-none flex-col gap-4 rounded-2xl ${accent.bg} p-5 sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex gap-4">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${accent.icon}`}>
              <Icon aria-hidden="true" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-slate-950">{section.title}</h2>
              <p className="mt-1 max-w-2xl text-base leading-6 text-slate-700">{section.description}</p>
            </div>
          </div>
          <span className={`inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm ${accent.tag}`}>
            <span className="group-open:hidden">Show {section.links.length} links</span>
            <span className="hidden group-open:inline">Hide links</span>
          </span>
        </summary>
        <div className="px-5 pb-2">
          {section.links.map((link) => (
            <SupportLinkRow key={`${section.id}-${link.name}`} link={link} showWarning={warn && link.sourceType === "Council"} />
          ))}
        </div>
      </details>
    </section>
  );
}
