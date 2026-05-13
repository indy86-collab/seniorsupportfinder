import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Accessibility, ArrowRight, BadgePoundSterling, ClipboardCheck, ClipboardList, ExternalLink, HandHeart, Heart, HeartHandshake, Home as HomeIcon, Search } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocationCard } from "@/components/location-card";
import { SearchBar } from "@/components/search-bar";
import { TrustStrip } from "@/components/trust-strip";
import { getAllEntries, getFeaturedEntries } from "@/lib/support-data";

export const metadata: Metadata = {
  title: "Senior Support Finder | Benefits, Care & Local Help",
  description:
    "Search trusted council, charity and government support for older people, carers and families across the UK.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Senior Support Finder | Benefits, Care & Local Help",
    description:
      "Search trusted council, charity and government support for older people, carers and families across the UK.",
  },
};

const homepageCategories = [
  { title: "Benefits & Money", href: "/browse-support/benefits-money", icon: BadgePoundSterling, color: "text-[#2f7d46]", bg: "from-[#f1faee] to-[#e6f6e8]" },
  { title: "Adult Social Care", href: "/browse-support/adult-social-care", icon: HeartHandshake, color: "text-[#007c89]", bg: "from-[#effcff] to-[#e2f5fb]" },
  { title: "Blue Badge & Mobility", href: "/browse-support/mobility-transport", icon: Accessibility, color: "text-[#155fa0]", bg: "from-[#f6f5ff] to-[#edf0ff]" },
  { title: "Home Adaptations", href: "/browse-support/home-adaptations", icon: HomeIcon, color: "text-[#d98a00]", bg: "from-[#fff9e8] to-[#fff0ca]" },
  { title: "Carers Support", href: "/browse-support/carers-support", icon: Heart, color: "text-[#c95100] fill-[#c95100]", bg: "from-[#fff5ec] to-[#ffe8d7]" },
  { title: "Local Charities", href: "/browse-support/local-charities", icon: HandHeart, color: "text-[#007c89]", bg: "from-[#eefcf8] to-[#dff4ec]" },
];

export default function Home() {
  const entries = getAllEntries();
  const featured = getFeaturedEntries();
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[360px] overflow-hidden bg-[linear-gradient(90deg,#eefbf8_0%,#f7fcfb_42%,#fff7e7_100%)]">
          <div className="pointer-events-none absolute -left-24 bottom-[-4.5rem] h-[23rem] w-[23rem] rounded-full bg-[#bdeee7]/55" />
          <div className="absolute inset-y-0 right-0 hidden w-[49%] lg:block">
            <Image src="/images/home-hero.png" alt="Older person and family carer talking together at home" fill priority sizes="50vw" className="object-cover object-center [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.35)_20%,black_45%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7fbfb] via-[#f7fbfb]/55 to-transparent" />
          </div>
          <div className="relative mx-auto max-w-[1460px] px-5 py-9 sm:px-8 lg:px-12 lg:py-8">
            <div className="relative z-10 max-w-[760px]">
              <h1 className="text-4xl font-black leading-[1.02] tracking-normal text-navy sm:text-5xl lg:text-[4.2rem] [font-family:Georgia,serif]">
                Find senior support, benefits<br className="hidden sm:block" />
                and local help near you
              </h1>
              <p className="mt-4 max-w-[700px] text-xl leading-8 text-slate-700">
                Search trusted council, charity and government support for older people and carers across the UK.
              </p>
              <div className="mt-6">
                <SearchBar entries={entries} large />
              </div>
              <Link href="/support-checker" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#007c89] shadow-sm ring-1 ring-teal-100 hover:bg-[#eefcf8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
                <ClipboardCheck aria-hidden="true" className="h-5 w-5" />
                Check what support may be worth checking
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative mt-8 min-h-64 overflow-hidden rounded-2xl sm:min-h-80 lg:hidden">
              <Image src="/images/home-hero.png" alt="Older person and family carer talking together at home" fill priority sizes="100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f7fbfb]/80 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section aria-labelledby="categories-title" className="mx-auto max-w-[1460px] px-5 py-4 sm:px-8 lg:px-12">
          <h2 id="categories-title" className="sr-only">Browse support categories</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {homepageCategories.map((category) => (
              <Link key={category.title} href={category.href} className={`group rounded-xl border border-slate-200 bg-gradient-to-br ${category.bg} px-5 py-4 text-center shadow-[0_7px_16px_rgba(15,27,61,0.12)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700`}>
                <category.icon aria-hidden="true" className={`mx-auto h-[3.25rem] w-[3.25rem] ${category.color}`} strokeWidth={2.6} />
                <span className="mt-2 block text-base font-bold text-slate-950">{category.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-5 pb-5 sm:px-8 lg:px-12">
          <div className="mb-2 text-center">
            <h2 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Featured local support</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.slice(0, 3).map((entry) => (
              <LocationCard key={entry.slug} entry={entry} featured />
            ))}
          </div>
        </section>

        <section className="bg-[#eaf8f6] py-5">
          <div className="mx-auto max-w-[1460px] px-5 sm:px-8 lg:px-12">
            <h2 className="text-center text-3xl font-extrabold text-navy [font-family:Georgia,serif]">How it works</h2>
            <div className="mt-3 grid gap-7 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              {[
                ["Search your area", "Enter your postcode, town or council area to find local support.", Search],
                ["Choose the support you need", "Browse by category to find the right help for you or your loved one.", ClipboardList],
                ["Visit trusted official links", "We connect you to official council, government and charity websites.", ExternalLink],
              ].map(([title, text, Icon], index) => (
                <Fragment key={String(title)}>
                  <div className="flex items-center gap-5">
                    <span className="flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-full bg-white text-[#007c89] shadow-sm ring-8 ring-white/65">
                      <Icon aria-hidden="true" className="h-11 w-11" strokeWidth={2.3} />
                    </span>
                    <div>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#2f8a4f] text-sm font-bold text-white">{index + 1}</span>
                      <h3 className="mt-2 text-xl font-bold text-slate-950">{title as string}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-700">{text as string}</p>
                    </div>
                  </div>
                  {index < 2 && <ArrowRight aria-hidden="true" className="hidden h-8 w-14 text-[#007c89] md:block" strokeWidth={2.4} />}
                </Fragment>
              ))}
            </div>
            <div className="mt-4">
              <TrustStrip />
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1460px] px-5 py-4 sm:px-8 lg:px-12">
          <div className="grid items-center gap-6 overflow-hidden rounded-2xl bg-[#fff8df] p-0 shadow-sm ring-1 ring-amber-100 md:grid-cols-[420px_1fr_auto]">
            <div className="relative hidden h-28 overflow-hidden md:block">
              <Image src="/images/carer-cta.png" alt="Carer sitting with an older loved one" fill sizes="420px" className="object-cover object-left" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#fff8df] to-transparent" />
            </div>
            <div className="px-5 py-5 md:px-0">
              <h2 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Helping a parent or loved one?</h2>
              <p className="mt-2 max-w-3xl text-slate-700">
                You are not alone. Find practical support, advice and local services to help them live well and stay independent.
              </p>
            </div>
            <Link href="/locations" className="mx-5 mb-5 inline-flex items-center justify-center gap-3 rounded-xl bg-[#007c89] px-8 py-4 text-lg font-bold text-white shadow-[0_8px_18px_rgba(0,109,119,0.28)] hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 md:mx-6 md:mb-0">
              <Heart aria-hidden="true" className="h-6 w-6" />
              Browse local help
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
