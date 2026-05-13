"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, MapPinned, Search, X } from "lucide-react";
import { LocationCard } from "@/components/location-card";
import type { SeniorSupportEntry } from "@/lib/support-data";
import { getDisplayLocation } from "@/lib/support-data";
import { looksLikePostcode } from "@/lib/postcode";

export function LocationDirectory({
  entries,
  regions,
  initialQuery = "",
}: {
  entries: SeniorSupportEntry[];
  regions: string[];
  initialQuery?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState("All regions");
  const [category, setCategory] = useState("All categories");
  const [postcodeMessage, setPostcodeMessage] = useState("");
  const categories = useMemo(() => Array.from(new Set(entries.map((entry) => entry.category))).sort(), [entries]);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const text = `${entry.name} ${getDisplayLocation(entry)} ${entry.region} ${entry.description} ${(entry.tags || []).join(" ")}`.toLowerCase();
      return (!term || text.includes(term)) && (region === "All regions" || entry.region === region) && (category === "All categories" || entry.category === category);
    });
  }, [entries, query, region, category]);

  const hasFilters = query || region !== "All regions" || category !== "All categories";

  useEffect(() => {
    const value = query.trim();
    if (!looksLikePostcode(value)) return;
    let cancelled = false;
    fetch(`/api/postcode-lookup?postcode=${encodeURIComponent(value)}`)
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (cancelled) return;
        if (response.ok && data.slug) {
          router.push(`/locations/${data.slug}`);
          return;
        }
        setPostcodeMessage(data.error || "We could not match that postcode. Try your town or council area instead.");
      })
      .catch(() => {
        if (!cancelled) setPostcodeMessage("Postcode lookup is unavailable right now. Try your town or council area instead.");
      });
    return () => {
      cancelled = true;
    };
  }, [query, router]);

  return (
    <section className="mx-auto max-w-[1460px] px-5 py-10 sm:px-8 lg:px-12">
      <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-[0_10px_26px_rgba(15,27,61,0.1)]">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89]">
            <Filter aria-hidden="true" className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-navy">Search by place or need</h2>
            <p className="text-sm text-slate-600">Try a town, council area, region, or topic such as Blue Badge.</p>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_240px_240px]">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fbfb] px-4 focus-within:outline focus-within:outline-2 focus-within:outline-teal-700">
            <Search aria-hidden="true" className="h-6 w-6 text-[#007c89]" />
            <span className="sr-only">Search locations</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setPostcodeMessage(""); }} placeholder="Search by location or support need" className="w-full bg-transparent py-4 text-base outline-none placeholder:text-slate-500" />
          </label>
          <label>
            <span className="sr-only">Filter by region</span>
            <select value={region} onChange={(event) => setRegion(event.target.value)} className="h-full w-full rounded-2xl border border-slate-200 bg-[#f1faee] px-4 py-4 font-semibold text-slate-900">
              <option>All regions</option>
              {regions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-full w-full rounded-2xl border border-slate-200 bg-[#fff5ec] px-4 py-4 font-semibold text-slate-900">
              <option>All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Blue Badge", "carers", "benefits", "home adaptations"].map((term) => (
            <button key={term} type="button" onClick={() => setQuery(term)} className="rounded-full bg-[#fbf8e8] px-4 py-2 text-sm font-bold text-teal-900 ring-1 ring-[#efe8bf] hover:bg-[#fff5d1]">
              {term}
            </button>
          ))}
          {hasFilters && (
            <button type="button" onClick={() => { setQuery(""); setRegion("All regions"); setCategory("All categories"); }} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200">
              <X aria-hidden="true" className="h-4 w-4" />
              Clear filters
            </button>
          )}
        </div>
        {postcodeMessage && looksLikePostcode(query) && (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 ring-1 ring-amber-100">{postcodeMessage}</p>
        )}
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Local support results</h2>
          <p className="mt-1 font-semibold text-slate-700">{filtered.length} locations found</p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#eefcf8] px-4 py-2 text-sm font-bold text-[#007c89] ring-1 ring-[#b6ded4]">
          <MapPinned aria-hidden="true" className="h-5 w-5" />
          Official local links
        </span>
      </div>
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <LocationCard key={entry.slug} entry={entry} compact />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">No exact match found</h2>
          <p className="mt-3 text-slate-700">Try a nearby council area, browse all regions, or search by a support need such as Blue Badge or carers support.</p>
        </div>
      )}
    </section>
  );
}
