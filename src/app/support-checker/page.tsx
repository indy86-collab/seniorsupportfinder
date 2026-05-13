import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SupportChecker } from "@/components/support-checker";
import { getAllEntries } from "@/lib/support-data";

export const metadata: Metadata = {
  title: "Support Checker",
  description:
    "Answer 6 quick questions to see senior support, benefits, care, mobility, home adaptation and carer support routes that may be worth checking.",
  alternates: { canonical: "/support-checker" },
  openGraph: {
    url: "/support-checker",
    title: "Support Checker | Senior Support Finder",
    description:
      "Answer 6 quick questions to see senior support routes that may be worth checking.",
  },
};

export default function SupportCheckerPage() {
  const entries = getAllEntries();
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Support Checker",
    url: "https://seniorsupportfinder.uk/support-checker",
    description: metadata.description,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: "Senior Support Finder",
      url: "https://seniorsupportfinder.uk",
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does the support checker decide if I am eligible?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The checker suggests support routes that may be worth checking. Official councils, GOV.UK, NHS services and charities decide eligibility and current application rules.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to enter personal details?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The checker is anonymous and does not ask for names, phone numbers, email addresses, medical details or financial documents.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use the checker for a parent or loved one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The checker includes support routes for unpaid carers, family members and people helping an older person.",
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#007c89] shadow-sm ring-1 ring-teal-100">
              <ClipboardCheck aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">Answer 6 questions</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">
              See what support may be worth checking
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Use this free, anonymous checker to find useful routes for benefits, care, mobility, home adaptations, carers support and local charities.
            </p>
            <div className="mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
              <HeroPoint icon={ShieldCheck} title="No sign-up" text="We do not ask for names, emails or medical details." />
              <HeroPoint icon={Sparkles} title="Instant results" text="Get plain-English suggestions straight away." />
              <HeroPoint icon={ArrowRight} title="Official next steps" text="Follow council, GOV.UK and charity links." />
            </div>
          </div>
        </section>

        <SupportChecker entries={entries} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Footer />
    </>
  );
}

function HeroPoint({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white/85 p-4 shadow-sm ring-1 ring-slate-200">
      <Icon aria-hidden="true" className="h-8 w-8 text-[#007c89]" />
      <h2 className="mt-3 text-lg font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}
