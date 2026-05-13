import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Search, type LucideIcon } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocationCard } from "@/components/location-card";
import { getCategoryGuidance } from "@/lib/category-guidance";
import { getAllEntries, supportCategories } from "@/lib/support-data";

export function generateStaticParams() {
  return supportCategories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = supportCategories.find((item) => item.id === categoryParam);
  if (!category) return {};
  return {
    title: category.shortTitle,
    description: `${category.description} Learn what to prepare, then find official local senior support links.`,
    alternates: { canonical: `/browse-support/${category.id}` },
    openGraph: {
      url: `/browse-support/${category.id}`,
      title: `${category.shortTitle} | Senior Support Finder`,
      description: `${category.description} Learn what to prepare, then find official local senior support links.`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const category = supportCategories.find((item) => item.id === categoryParam);
  if (!category) notFound();
  const guidance = getCategoryGuidance(category.id);
  const entries = getAllEntries().filter((entry) => hasCategoryLink(entry, category.id));
  const Icon = category.icon;
  const pageUrl = `https://seniorsupportfinder.uk/browse-support/${category.id}`;
  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.shortTitle} support`,
    url: pageUrl,
    description: guidance.intro,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: "Senior Support Finder",
      url: "https://seniorsupportfinder.uk",
    },
    about: {
      "@type": "Thing",
      name: category.shortTitle,
      description: guidance.whatItMeans,
    },
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.shortTitle} local support areas`,
    itemListElement: entries.slice(0, 25).map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Support in ${entry.name}`,
      url: `https://seniorsupportfinder.uk/locations/${entry.slug}`,
    })),
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
        name: "Browse Support",
        item: "https://seniorsupportfinder.uk/browse-support",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.shortTitle,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#fff5ec_0%,#ffffff_52%,#eaf8f6_100%)]">
          <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#ffe1ca]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#bdeee7]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#007c89] shadow-sm ring-1 ring-teal-100">
              <Icon aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#007c89] shadow-sm ring-1 ring-teal-100">{guidance.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">{category.shortTitle}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">{guidance.intro}</p>
            <div className="mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
              {guidance.cards.map((card) => (
                <InfoCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <GuidancePanel title={`What ${category.title.toLowerCase()} means`} text={guidance.whatItMeans} />
            <GuidancePanel title="Who this may help" text={guidance.whoItHelps} />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Checklist title="Useful things to have ready" items={guidance.whatToHaveReady} color="green" />
            <Checklist title="Common mistakes to avoid" items={guidance.commonMistakes} color="orange" />
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-5 pb-12 sm:px-8 lg:px-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Find local support</h2>
              <p className="mt-2 text-slate-700">Choose your council area to reach official local pages and trusted sources.</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#eefcf8] px-4 py-2 text-sm font-bold text-[#007c89] ring-1 ring-[#b6ded4]">
              <MapPin aria-hidden="true" className="h-5 w-5" />
              {entries.length} areas with links
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <LocationCard key={entry.slug} entry={entry} compact />
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf]">
            <h2 className="text-2xl font-bold text-navy">Prefer to search by postcode or town?</h2>
            <p className="mt-2 max-w-3xl text-slate-700">If you are not sure which council area applies, use the location search and enter a postcode, town or city.</p>
            <Link href="/locations" className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              Search by location
              <Search aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Footer />
    </>
  );
}

function hasCategoryLink(entry: ReturnType<typeof getAllEntries>[number], categoryId: string) {
  const fields: Record<string, keyof typeof entry> = {
    "benefits-money": "councilTaxReductionUrl",
    "adult-social-care": "adultSocialCareUrl",
    "mobility-transport": "blueBadgeUrl",
    "carers-support": "carersSupportUrl",
    "home-adaptations": "disabledFacilitiesGrantUrl",
    "health-wellbeing": "websiteUrl",
    "local-charities": "localAgeUkUrl",
    "information-advice": "websiteUrl",
  };
  return Boolean(entry[fields[categoryId] || "websiteUrl"]);
}

function InfoCard({ icon: Icon, title, text, color }: { icon: LucideIcon; title: string; text: string; color: "green" | "teal" | "orange" }) {
  const styles = {
    green: "border-[#b9deb6] bg-[#f1faee] text-[#2f7d46]",
    teal: "border-[#b7dfe4] bg-[#effcff] text-[#007c89]",
    orange: "border-[#f3c5a2] bg-[#fff5ec] text-[#c95100]",
  }[color];
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${styles}`}>
      <Icon aria-hidden="true" className="h-10 w-10" />
      <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function GuidancePanel({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-3xl font-bold text-navy [font-family:Georgia,serif]">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-slate-700">{text}</p>
    </section>
  );
}

function Checklist({ title, items, color }: { title: string; items: string[]; color: "green" | "orange" }) {
  const iconColor = color === "green" ? "text-[#2f7d46]" : "text-[#c95100]";
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-navy">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-slate-700">
            <CheckCircle2 aria-hidden="true" className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
