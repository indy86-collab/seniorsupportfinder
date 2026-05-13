import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Plain-English guides for older people, carers and families looking for benefits, care and local support.",
  alternates: { canonical: "/guides" },
  openGraph: {
    url: "/guides",
    title: "Guides | Senior Support Finder",
    description: "Plain-English guides for older people, carers and families looking for benefits, care and local support.",
  },
};

export default function GuidesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Senior Support Finder guides",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `https://seniorsupportfinder.uk/guides/${guide.slug}`,
    })),
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Senior support guides",
    url: "https://seniorsupportfinder.uk/guides",
    description: metadata.description,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: "Senior Support Finder",
      url: "https://seniorsupportfinder.uk",
    },
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89] shadow-sm">
              <BookOpen aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">Senior support guides</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">Plain-English help before you apply</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              These guides explain common support routes in original, practical language. They are designed to help you understand what to ask for before you follow official council, GOV.UK or charity links.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="mb-7 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf]">
            <ShieldCheck aria-hidden="true" className="h-10 w-10 text-[#2f7d46]" />
            <h2 className="mt-3 text-2xl font-bold text-navy">How to Use These Guides</h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-700">
              Start with the topic closest to your question, then use the related links to find local services. These pages do not replace professional advice or official eligibility checks.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group flex min-h-72 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,27,61,0.08)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
                <span className="inline-flex self-start rounded-full bg-[#eefcf8] px-3 py-1 text-xs font-bold text-[#007c89] ring-1 ring-[#b6ded4]">{guide.category}</span>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-navy [font-family:Georgia,serif]">{guide.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-700">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-[#007c89]">
                  Read guide
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Footer />
    </>
  );
}
