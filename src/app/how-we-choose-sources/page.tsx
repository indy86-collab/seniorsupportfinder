import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "How We Choose Sources",
  description: "How Senior Support Finder chooses council, GOV.UK and charity sources for senior support information.",
};

export default function SourcePolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="relative mx-auto max-w-[1000px] px-5 py-14 sm:px-8">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89] shadow-sm">
              <FileCheck2 aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">Source standards</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">How we choose sources</h1>
            <p className="mt-5 text-xl leading-8 text-slate-700">
              Senior Support Finder is a signposting service. We aim to point visitors towards official and recognised sources, then explain the next step in plain English.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8">
          <div className="space-y-6">
            <SourceBlock title="Council and Local Authority Pages">
              For local support, we prefer official council or local authority pages because eligibility, assessment routes and contact processes vary by area.
            </SourceBlock>
            <SourceBlock title="GOV.UK and Public Services">
              For national benefits, Blue Badge routes and government guidance, we link to GOV.UK or other public service pages where available.
            </SourceBlock>
            <SourceBlock title="Recognised Charities">
              For community support, advice and local branches, we use recognised charities such as Age UK where they provide relevant local information.
            </SourceBlock>
            <SourceBlock title="Freshness and Limits">
              Links and schemes can change. We show last checked dates where available and provide a way to report outdated links. Visitors should always confirm current rules on the official source before applying.
            </SourceBlock>
          </div>

          <div className="mt-10 grid gap-5 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf] md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <ShieldCheck aria-hidden="true" className="h-10 w-10 text-[#2f7d46]" />
              <h2 className="mt-3 text-2xl font-bold text-navy">Our Approach</h2>
              <p className="mt-2 leading-7 text-slate-700">We summarise rather than copy. We do not decide eligibility, and we do not replace professional or official advice.</p>
            </div>
            <Link href="/guides" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77]">
              Read guides
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SourceBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-navy [font-family:Georgia,serif]">
        {title}
        <ExternalLink aria-hidden="true" className="h-5 w-5 text-[#007c89]" />
      </h2>
      <p className="mt-3 leading-8 text-slate-700">{children}</p>
    </section>
  );
}
