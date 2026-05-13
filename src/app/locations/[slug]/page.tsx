import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, ExternalLink, FileText, Globe2, HeartHandshake, Home, Landmark, MapPin, PoundSterling, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QaLinkWarning } from "@/components/qa-link-warning";
import { SidebarQuickLinks } from "@/components/sidebar-quick-links";
import { SupportSection } from "@/components/support-section";
import { getCategoryGuidance } from "@/lib/category-guidance";
import { getLocationImage } from "@/lib/location-images";
import {
  getAllEntries,
  getCategoryLinkCount,
  getDisplayLocation,
  getEntryBySlug,
  getSupportSections,
  needsQaWarning,
} from "@/lib/support-data";

export function generateStaticParams() {
  return getAllEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) return {};
  const location = getDisplayLocation(entry);
  return {
    title: `Senior Support in ${location} | Benefits, Care & Local Help`,
    description: `Find senior support in ${location}, including benefits, adult social care, Blue Badge, home adaptations, carers support and local charities.`,
    alternates: {
      canonical: `/locations/${entry.slug}`,
    },
  };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();
  const location = getDisplayLocation(entry);
  const sections = getSupportSections(entry);
  const imageSrc = getLocationImage(entry.slug);
  const showWarning = needsQaWarning(entry);
  const pageUrl = `https://seniorsupportfinder.uk/locations/${entry.slug}`;
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      `What support can pensioners get in ${location}?`,
      `How do I apply for a Blue Badge in ${location}?`,
      `Can carers get support in ${location}?`,
      "Can older people get help adapting their home?",
    ].map((question) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Support and eligibility can vary. Use the official council, GOV.UK and recognised charity links on this page before applying.",
      },
    })),
  };
  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorsupportfinder.uk" },
      { "@type": "ListItem", position: 2, name: entry.region, item: "https://seniorsupportfinder.uk/locations" },
      { "@type": "ListItem", position: 3, name: location, item: pageUrl },
    ],
  };
  const webpageJson = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Senior Support in ${location}`,
    description: entry.description,
    url: pageUrl,
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-r from-[#eaf8f6] via-white to-[#fff8df]">
          <div className="mx-auto grid max-w-[1460px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
            <div>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: entry.region, href: "/locations" }, { label: location }]} />
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-navy sm:text-5xl [font-family:Georgia,serif]">Senior Support in {location}</h1>
              <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">{entry.description}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-800">
                <MetaChip icon={MapPin} label={entry.region} />
                <MetaChip icon={Globe2} label={entry.country} />
                <MetaChip icon={ExternalLink} label={`${entry.urlFieldsPresent || 0} official links`} />
                {entry.lastChecked && <MetaChip icon={CalendarCheck} label={`Last checked ${entry.lastChecked}`} />}
              </div>
              {showWarning && (
                <div className="mt-5">
                  <QaLinkWarning />
                </div>
              )}
            </div>
            <div className="relative min-h-64 overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200 lg:min-h-80">
              <Image src={imageSrc} alt={`Calm local scene representing senior support in ${location}`} fill priority className="object-cover" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-5 py-8 sm:px-8 lg:px-12">
          <div className="rounded-2xl bg-[#fbf8e8] p-5 shadow-sm ring-1 ring-[#efe8bf]">
            <h2 className="text-2xl font-bold text-navy">Start here</h2>
            <p className="mt-2 text-slate-700">Most visitors need one of these first. Choose a button to jump straight to the right section.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StartCard href="#benefits-money" icon={PoundSterling} title="Money and benefits" text="Pension Credit, Attendance Allowance and council tax help." color="green" />
              <StartCard href="#adult-social-care" icon={HeartHandshake} title="Care at home" text="Care assessments, home care and safeguarding support." color="teal" />
              <StartCard href="#home-adaptations" icon={Home} title="Home adaptations" text="Grants, equipment, ramps and bathroom changes." color="orange" />
              <StartCard href="#quick-links" icon={Landmark} title="Council links" text="Go straight to official local and GOV.UK pages." color="blue" />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1460px] gap-8 px-5 pb-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-12">
          <div className="min-w-0 space-y-8">
            <section aria-labelledby="browse-categories" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 id="browse-categories" className="text-2xl font-extrabold text-slate-950">Choose the kind of help you need</h2>
              <p className="mt-2 text-slate-700">These sections open and close, so the page stays easier to read.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {sections.map((category) => {
                  const Icon = category.icon;
                  return (
                    <a key={category.id} href={`#${category.id}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-950 hover:bg-mint-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-100 text-teal-800">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span>{category.id === "mobility-transport" ? "Blue Badge & Mobility" : category.title}</span>
                      <span className="ml-auto rounded-full bg-white px-2 py-1 text-xs text-teal-800">{getCategoryLinkCount(entry, category.id)}</span>
                    </a>
                  );
                })}
              </div>
            </section>
            <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf]">
                <h2 className="text-3xl font-bold text-navy [font-family:Georgia,serif]">Before you apply in {location}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  Support routes can differ between councils. Before starting a form, check that you are using the latest official page for {location}, make a note of any eligibility rules, and keep reference numbers from calls or online applications.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-2xl font-bold text-navy">Useful things to have ready</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    `${location} address or postcode`,
                    "National Insurance number if applying for benefits",
                    "Notes about care, mobility or home safety needs",
                    "Existing benefit or council letters",
                    "Contact details for the person needing support",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-slate-700">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#2f7d46]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            {sections.map((section, index) => (
              <div key={section.id} className="space-y-3">
                <p className="rounded-2xl bg-slate-50 p-4 leading-7 text-slate-700 ring-1 ring-slate-200">
                  {getCategoryGuidance(section.id).whatItMeans}
                </p>
                <SupportSection section={section} entry={entry} defaultOpen={index < 2} />
              </div>
            ))}
            <FAQSection entry={entry} />
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <FileText aria-hidden="true" className="h-10 w-10 text-teal-800" />
              <h2 className="mt-3 text-2xl font-bold text-slate-950">Information sources</h2>
              <p className="mt-3 leading-7 text-slate-700">
                Links point to official council, GOV.UK, NHS where relevant, and recognised charity sources. Eligibility, funding and availability can change. Always check the official website before applying.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {entry.websiteUrl && <SourcePill label="Council source" href={entry.websiteUrl} />}
                {entry.blueBadgeUrl && <SourcePill label="GOV.UK source" href={entry.blueBadgeUrl} />}
                {entry.localAgeUkUrl && <SourcePill label="Charity source" href={entry.localAgeUkUrl} />}
                {(entry.sourceUrls || []).map((url) => (
                  <SourcePill key={url} label="Additional source" href={url} />
                ))}
                {entry.lastChecked && <span className="inline-flex items-center gap-2 rounded-full bg-[#fbf8e8] px-3 py-2 text-sm font-bold text-slate-700 ring-1 ring-[#efe8bf]">Last checked {entry.lastChecked}</span>}
              </div>
              <Link href="/how-we-choose-sources" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#007c89] hover:text-[#006d77]">
                How we choose sources
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </Link>
            </section>
            <section className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
              <h2 className="text-xl font-bold text-slate-950">Report an outdated link</h2>
              <p className="mt-2 text-slate-700">Found a link that no longer works? Report it so this directory can prioritise a manual review.</p>
              <a href={`mailto:hello@seniorsupportfinder.uk?subject=Outdated link report: ${encodeURIComponent(location)}`} className="mt-4 inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800">
                Report outdated link
              </a>
            </section>
          </div>
          <SidebarQuickLinks entry={entry} />
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
    </>
  );
}

function SourcePill({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-teal-700/30 px-3 py-2 text-sm font-bold text-teal-800 hover:bg-mint-50">
      {label} <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

function MetaChip({ icon: Icon, label }: { icon: typeof Users; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
      <Icon aria-hidden="true" className="h-5 w-5 text-teal-800" />
      {label}
    </span>
  );
}

function StartCard({
  href,
  icon: Icon,
  title,
  text,
  color,
}: {
  href: string;
  icon: typeof Users;
  title: string;
  text: string;
  color: "green" | "teal" | "orange" | "blue";
}) {
  const styles = {
    green: "border-[#b9deb6] bg-[#f1faee] text-[#2f7d46]",
    teal: "border-[#b7dfe4] bg-[#eefcff] text-[#007c89]",
    orange: "border-[#f3c5a2] bg-[#fff5ec] text-[#c95100]",
    blue: "border-[#bdcdf5] bg-[#f3f6ff] text-[#155fa0]",
  }[color];
  return (
    <Link href={href} className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 ${styles}`}>
      <Icon aria-hidden="true" className="h-10 w-10" />
      <h3 className="mt-3 text-xl font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </Link>
  );
}
