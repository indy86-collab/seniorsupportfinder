import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowRight, ExternalLink, HeartHandshake, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Senior Support Finder terms of use, including our purpose, limitations, external links and responsible use of the site.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89] shadow-sm">
              <ShieldCheck aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">
              Terms of Use
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">
              Clear terms for a support signposting service
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Senior Support Finder is here to help older people, carers and families find trusted starting points for local support. These terms explain what the site does, what it does not do, and how to use it responsibly.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8">
          <div className="rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf]">
            <div className="flex gap-4">
              <AlertCircle aria-hidden="true" className="mt-1 h-8 w-8 shrink-0 text-[#c95100]" />
              <div>
                <h2 className="text-2xl font-bold text-navy">Important</h2>
                <p className="mt-2 leading-7 text-slate-700">
                  We provide general information and links to external services. We do not provide legal, financial, medical, care, benefits or safeguarding advice. Always check official sources before making decisions or applying for support.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <TermBlock title="1. About This Site">
              Senior Support Finder helps visitors find information and links relating to senior support, benefits, adult social care, Blue Badge and mobility support, home adaptations, carers support and local charities.
            </TermBlock>

            <TermBlock title="2. Information Is for General Guidance Only">
              The information on this site is intended to make support easier to find and understand. It should not be treated as professional advice. Eligibility, funding, services and application routes can change, and different councils may handle support in different ways.
            </TermBlock>

            <TermBlock title="3. External Links">
              We link to council, GOV.UK, NHS where relevant, and recognised charity websites. Those websites are controlled by third parties. We are not responsible for their content, availability, decisions, privacy practices or application processes.
            </TermBlock>

            <TermBlock title="4. Accuracy and Updates">
              We aim to keep links and summaries useful, but we cannot guarantee that every link or description is always complete, accurate or up to date. If you spot something that appears outdated, please let us know so it can be reviewed.
            </TermBlock>

            <TermBlock title="5. No Emergency or Crisis Service">
              This site is not an emergency service. If someone is in immediate danger, needs urgent medical help, or there is a safeguarding concern, contact emergency services, NHS services, the relevant local authority, or another appropriate professional service.
            </TermBlock>

            <TermBlock title="6. Responsible Use">
              Please use this site lawfully and respectfully. Do not attempt to misuse, disrupt, scrape at harmful scale, reverse engineer, or interfere with the website or its data.
            </TermBlock>

            <TermBlock title="7. Changes to These Terms">
              We may update these terms as the site develops. Continued use of the site means you accept the latest version available on this page.
            </TermBlock>
          </div>

          <div className="mt-10 grid gap-5 rounded-2xl bg-[#eaf8f6] p-6 shadow-sm ring-1 ring-teal-100 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <HeartHandshake aria-hidden="true" className="h-10 w-10 text-[#007c89]" />
              <h2 className="mt-3 text-2xl font-bold text-navy">Our Intention</h2>
              <p className="mt-2 leading-7 text-slate-700">
                These terms are not here to make the site feel cold. They are here to be honest about what we can do: help people find trusted starting points, then encourage them to confirm details with official services.
              </p>
            </div>
            <Link href="/locations" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              Browse local help
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-8 flex items-center gap-2 text-sm text-slate-600">
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            Last updated: 2026
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TermBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-navy [font-family:Georgia,serif]">{title}</h2>
      <p className="mt-3 leading-8 text-slate-700">{children}</p>
    </section>
  );
}
