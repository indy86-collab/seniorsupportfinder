import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { SeniorSupportEntry } from "@/lib/support-data";
import { getDisplayLocation, needsQaWarning } from "@/lib/support-data";
import { getLocationImage } from "@/lib/location-images";

export function LocationCard({
  entry,
  compact = false,
  featured = false,
}: {
  entry: SeniorSupportEntry;
  compact?: boolean;
  featured?: boolean;
}) {
  const location = getDisplayLocation(entry);
  const imageSrc = getLocationImage(entry.slug);
  const featuredCopy: Record<string, string> = {
    hounslow: "Find local council services, benefits advice, care options and community support in Hounslow.",
    croydon: "Discover trusted support for older people and carers in Croydon, from the council and local groups.",
    birmingham: "Access benefits help, social care, mobility services and charities across Birmingham.",
  };
  const imagePosition = entry.slug.includes("croydon")
    ? "object-center"
    : entry.slug.includes("birmingham")
      ? "object-[62%_50%]"
      : "object-[35%_50%]";
  const description = Object.entries(featuredCopy).find(([key]) => entry.slug.includes(key))?.[1] ?? entry.description;
  if (featured) {
    return (
      <article className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_7px_18px_rgba(15,27,61,0.12)] transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[46%_1fr]">
        <Image src={imageSrc} alt="" width={300} height={180} className={`h-36 w-full object-cover sm:h-full ${imagePosition}`} />
        <div className="p-5">
          <h3 className="text-xl font-bold leading-snug text-navy [font-family:Georgia,serif]">Support in {location}</h3>
          <p className="mt-2 text-sm leading-5 text-slate-700">{description}</p>
          <Link href={`/locations/${entry.slug}`} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#007c89] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_10px_rgba(0,109,119,0.25)] hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
            View Support
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_7px_18px_rgba(15,27,61,0.08)] transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg">
      <Image src={imageSrc} alt="" width={520} height={260} className={`${compact ? "h-32" : "h-36"} w-full object-cover`} />
      <div className="p-5">
        <div className="inline-flex items-start gap-2 rounded-full bg-[#eefcf8] px-3 py-1.5 text-sm font-semibold text-[#007c89]">
          <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4" />
          <span>{entry.region}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy [font-family:Georgia,serif]">Support in {location}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{entry.description}</p>
        {needsQaWarning(entry) && (
          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">Some links may need checking.</p>
        )}
        <Link href={`/locations/${entry.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#007c89] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
          View support
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
