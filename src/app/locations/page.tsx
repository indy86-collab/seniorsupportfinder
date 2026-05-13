import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, MapPin, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocationDirectory } from "@/components/location-directory";
import { getAllEntries, getRegions } from "@/lib/support-data";

export const metadata: Metadata = {
  title: "Browse Locations",
  description: "Search senior support by council area, town, city or region across the UK.",
};

export default async function LocationsPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
  const entries = getAllEntries();
  const regions = getRegions();
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">Browse locations</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">Find local senior support across the UK</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Search all spreadsheet entries by location, region or support need. Each location links to official council, GOV.UK and recognised charity sources where available.
            </p>
            <div className="mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
              <HeroStat icon={MapPin} value={`${entries.length}`} label="local areas" color="teal" />
              <HeroStat icon={Search} value={`${regions.length}`} label="regions covered" color="green" />
              <HeroStat icon={ShieldCheck} value="Official" label="council and charity links" color="orange" />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1460px] px-5 pt-8 sm:px-8 lg:px-12">
          <div className="grid gap-5 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf] md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#007c89] ring-1 ring-teal-100">
              <ClipboardCheck aria-hidden="true" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-navy">Need help knowing what to look for?</h2>
              <p className="mt-2 text-slate-700">Use the support checker first, then come back to your local council and charity links.</p>
            </div>
            <Link href="/support-checker" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              Start checker
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </section>
        <LocationDirectory entries={entries} regions={regions} initialQuery={params.query || ""} />
      </main>
      <Footer />
    </>
  );
}

function HeroStat({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  color: "teal" | "green" | "orange";
}) {
  const styles = {
    teal: "bg-[#effcff] text-[#007c89] border-[#b7dfe4]",
    green: "bg-[#f1faee] text-[#2f7d46] border-[#b9deb6]",
    orange: "bg-[#fff5ec] text-[#c95100] border-[#f3c5a2]",
  }[color];
  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${styles}`}>
      <Icon aria-hidden="true" className="h-8 w-8" />
      <p className="mt-3 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">{label}</p>
    </div>
  );
}
