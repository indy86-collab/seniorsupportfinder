"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import type { SeniorSupportEntry } from "@/lib/support-data";
import { getDisplayLocation } from "@/lib/support-data";
import { looksLikePostcode } from "@/lib/postcode";
import { cn } from "@/lib/utils";

export function SearchBar({
  entries,
  initialQuery = "",
  large = false,
}: {
  entries: SeniorSupportEntry[];
  initialQuery?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const lookup = useMemo(
    () =>
      entries.map((entry) => ({
        entry,
        location: getDisplayLocation(entry).toLowerCase(),
        name: entry.name.toLowerCase(),
      })),
    [entries],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const value = query.trim();
    if (!value) {
      router.push("/locations");
      return;
    }
    if (looksLikePostcode(value)) {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/postcode-lookup?postcode=${encodeURIComponent(value)}`);
        const data = await response.json();
        if (response.ok && data.slug) {
          router.push(`/locations/${data.slug}`);
          return;
        }
        setError(data.error || "We could not match that postcode. Try your town or council area instead.");
      } catch {
        setError("Postcode lookup is unavailable right now. Try your town or council area instead.");
      } finally {
        setIsSearching(false);
      }
      return;
    }
    const normalized = value.toLowerCase();
    const exact = lookup.find((item) => item.location === normalized || item.name.includes(normalized));
    if (exact) {
      router.push(`/locations/${exact.entry.slug}`);
      return;
    }
    router.push(`/locations?query=${encodeURIComponent(value)}`);
  }

  return (
    <div className={cn("w-full", large && "max-w-[680px]")}>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 rounded-[1.35rem] bg-white p-2 shadow-[0_12px_28px_rgba(15,27,61,0.14)] ring-1 ring-slate-200/80 sm:flex-row">
        <label className="sr-only" htmlFor="support-search">Search by postcode, town, city or council area</label>
        <div className="flex min-w-0 flex-1 items-center gap-4 px-4">
          <MapPin aria-hidden="true" className="h-7 w-7 shrink-0 text-slate-500" />
          <input
            id="support-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter postcode, town, city or council area"
            className="w-full bg-transparent py-4 text-base text-slate-950 outline-none placeholder:text-slate-500"
          />
        </div>
        <button type="submit" disabled={isSearching} className="inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#00879a] to-[#006d77] px-6 py-4 text-base font-bold text-white shadow-[0_5px_14px_rgba(0,109,119,0.32)] hover:from-[#007c89] hover:to-[#005f68] disabled:cursor-wait disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-900 sm:w-auto sm:px-8 sm:text-lg">
          <Search aria-hidden="true" className="h-6 w-6" />
          {isSearching ? "Searching" : "Search"}
        </button>
      </form>
      {error && <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 ring-1 ring-amber-100">{error}</p>}
    </div>
  );
}
