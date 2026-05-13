import { ExternalLink } from "lucide-react";
import type { SupportLink } from "@/lib/support-data";
import { QaLinkWarning } from "./qa-link-warning";

export function SupportLinkRow({ link, showWarning = false }: { link: SupportLink; showWarning?: boolean }) {
  const content = (
    <>
      <div className="min-w-0">
        <p className="text-lg font-bold text-slate-950">{link.name}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{link.description}</p>
        <span className="mt-2 inline-flex rounded-full bg-mint-50 px-2.5 py-1 text-xs font-bold text-teal-900">{link.sourceType}</span>
        {showWarning && <QaLinkWarning />}
      </div>
      <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-teal-700 px-4 py-2 text-sm font-bold text-white self-start">
        {link.action}
        <ExternalLink aria-hidden="true" className="h-4 w-4" />
      </span>
    </>
  );

  if (!link.href) {
    return (
      <div className="grid gap-4 border-t border-slate-200 py-4 sm:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="text-lg font-bold text-slate-950">{link.name}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{link.description}</p>
          <p className="mt-2 text-sm font-semibold text-slate-500">No direct link available. Use the main council website.</p>
        </div>
      </div>
    );
  }

  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="grid gap-4 border-t border-slate-200 py-4 hover:bg-mint-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:grid-cols-[1fr_auto]">
      {content}
    </a>
  );
}
