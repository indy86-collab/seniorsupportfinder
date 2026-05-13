import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, ExternalLink } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getGuide, guides } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      url: `/guides/${guide.slug}`,
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const pageUrl = `https://seniorsupportfinder.uk/guides/${guide.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.updated,
    dateModified: guide.updated,
    articleSection: guide.category,
    inLanguage: "en-GB",
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: "Senior Support Finder",
      url: "https://seniorsupportfinder.uk/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Senior Support Finder",
      url: "https://seniorsupportfinder.uk",
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://seniorsupportfinder.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://seniorsupportfinder.uk/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <article>
          <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
            <div className="relative mx-auto max-w-[1000px] px-5 py-14 sm:px-8">
              <Link href="/guides" className="text-sm font-bold text-[#007c89] hover:text-[#006d77]">Guides</Link>
              <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-teal-800 shadow-sm ring-1 ring-teal-100">{guide.category}</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">{guide.title}</h1>
              <p className="mt-5 text-xl leading-8 text-slate-700">{guide.description}</p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#fbf8e8] px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-[#efe8bf]">
                <CalendarCheck aria-hidden="true" className="h-4 w-4 text-[#007c89]" />
                Updated {new Date(guide.updated).getFullYear()}
              </p>
            </div>
          </section>

          <section className="mx-auto grid max-w-[1000px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-8">
              {guide.sections.map((section) => (
                <section key={section.heading} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h2 className="text-3xl font-bold text-navy [font-family:Georgia,serif]">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-lg leading-8 text-slate-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
              <section className="rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf]">
                <h2 className="text-2xl font-bold text-navy">Important reminder</h2>
                <p className="mt-3 leading-7 text-slate-700">
                  This guide is general information, not legal, financial, medical or care advice. Use official sources to confirm eligibility, application routes and current local rules.
                </p>
              </section>
            </div>
            <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
              <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-bold text-slate-950">Related pages</h2>
                <div className="mt-4 space-y-3">
                  {guide.related.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center justify-between gap-3 rounded-xl bg-[#eefcf8] px-4 py-3 text-sm font-bold text-[#007c89] hover:bg-[#dff4ec]">
                      {link.label}
                      {link.href.startsWith("http") ? <ExternalLink aria-hidden="true" className="h-4 w-4" /> : <ArrowRight aria-hidden="true" className="h-4 w-4" />}
                    </Link>
                  ))}
                </div>
              </section>
              <Link href="/locations" className="flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-5 py-3 font-bold text-white shadow-md hover:bg-[#006d77]">
                Find local support
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
            </aside>
          </section>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Footer />
    </>
  );
}
