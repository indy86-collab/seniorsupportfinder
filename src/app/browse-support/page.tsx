import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Compass, ShieldCheck, type LucideIcon } from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getAllEntries, supportCategories } from "@/lib/support-data";

export const metadata: Metadata = {
  title: "Browse Support",
  description: "Browse support categories for benefits, adult social care, mobility, home adaptations, carers support and local charities.",
};

const accents = ["green", "teal", "blue", "red", "orange", "sage", "teal", "blue"] as const;

export default function BrowseSupportPage() {
  const total = getAllEntries().length;
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_55%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">Browse support</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">Choose the support you need</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Find practical links for older people and carers. Information is written in plain English and points you to official guidance before you apply.
            </p>
            <div className="mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
              <HeroPoint icon={ShieldCheck} title="Trusted sources" text="Council, GOV.UK and charity links." />
              <HeroPoint icon={Compass} title="Easy to browse" text="Pick the topic that matches your need." />
              <HeroPoint icon={CheckCircle2} title="Free to use" text="No sign-up or account needed." />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1460px] px-5 pt-8 sm:px-8 lg:px-12">
          <div className="grid gap-5 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf] md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#007c89] ring-1 ring-teal-100">
              <ClipboardCheck aria-hidden="true" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-navy">Not sure which category fits?</h2>
              <p className="mt-2 text-slate-700">Answer 6 quick questions and see which support routes may be worth checking first.</p>
            </div>
            <Link href="/support-checker" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              Try the checker
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </section>
        <section className="mx-auto max-w-[1460px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Support categories</h2>
              <p className="mt-2 text-slate-700">Large, color-coded cards make it easier to spot the right type of help.</p>
            </div>
            <p className="rounded-full bg-[#fbf8e8] px-4 py-2 text-sm font-bold text-teal-900 ring-1 ring-[#efe8bf]">{total} local areas covered</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportCategories.map((category, index) => (
              <CategoryCard key={category.id} title={category.shortTitle} description={category.description} href={`/browse-support/${category.id}`} icon={category.icon} count={total} accent={accents[index] ?? "teal"} />
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-[1460px] px-5 pb-12 sm:px-8 lg:px-12">
          <div className="grid gap-5 rounded-2xl bg-[#eaf8f6] p-6 shadow-sm ring-1 ring-teal-100 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-navy">Not sure where to start?</h2>
              <p className="mt-2 max-w-3xl text-slate-700">Benefits & Money is a good first stop for financial help. Adult Social Care is best for care needs, assessments and support at home.</p>
            </div>
            <Link href="/locations" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              Browse by location
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function HeroPoint({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/85 p-4 shadow-sm ring-1 ring-slate-200">
      <Icon aria-hidden="true" className="h-8 w-8 text-[#007c89]" />
      <h2 className="mt-3 text-lg font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}
