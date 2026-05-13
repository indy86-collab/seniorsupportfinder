import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Search, ShieldCheck, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn why Senior Support Finder exists and how it helps older people, carers and families find trusted local support.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-16 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89] shadow-sm">
              <HeartHandshake aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">
              About Senior Support Finder
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">
              Helping families find trusted support without the overwhelm
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Senior Support Finder exists because looking for help should not feel like a maze. Older people, carers and families deserve clear signposts to official support, written in plain English and gathered in one calm place.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="rounded-2xl bg-white p-7 shadow-[0_10px_26px_rgba(15,27,61,0.08)] ring-1 ring-slate-200">
              <h2 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Why We Built This</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700">
                <p>
                  When someone starts needing support, families often have to search across council pages, GOV.UK guidance, charity sites and local services while already feeling worried or tired.
                </p>
                <p>
                  Our intention is simple: reduce that stress. We bring together useful starting points for benefits, adult social care, mobility support, home adaptations, carers support and local charities, then point people back to trusted official sources.
                </p>
                <p>
                  We are not here to replace councils, charities or professional advice. We are here to make the first step easier, kinder and less confusing.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <ValueCard icon={ShieldCheck} title="Trust Comes First" text="We prioritise official council, GOV.UK and recognised charity links so visitors can check information at the source." color="green" />
              <ValueCard icon={Users} title="Built for Real Families" text="The site is designed for older people, unpaid carers and relatives who may need quick, readable answers." color="orange" />
              <ValueCard icon={Search} title="Plain English, Clear Next Steps" text="We avoid jargon where possible and focus on helping people choose what to do next." color="teal" />
              <Link href="/how-we-choose-sources" className="inline-flex items-center justify-center rounded-2xl bg-[#007c89] px-5 py-4 font-bold text-white shadow-md hover:bg-[#006d77]">
                How we choose sources
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#eaf8f6] py-12">
          <div className="mx-auto max-w-[1460px] px-5 sm:px-8 lg:px-12">
            <h2 className="text-center text-3xl font-extrabold text-navy [font-family:Georgia,serif]">What We Care About</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <Principle title="Dignity" text="Support information should feel respectful, not clinical or cold." />
              <Principle title="Accessibility" text="Pages should be readable, calm and easy to scan for people of all ages." />
              <Principle title="Practical Help" text="Every page should help someone move closer to a useful official service." />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-5 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf] md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Start Finding Support</h2>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                Search by location or browse by need. We will guide you towards official local support pages and trusted sources.
              </p>
            </div>
            <Link href="/locations" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              Browse local help
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ValueCard({
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
  color: "green" | "orange" | "teal";
}) {
  const styles = {
    green: "border-[#b9deb6] bg-[#f1faee] text-[#2f7d46]",
    orange: "border-[#f3c5a2] bg-[#fff5ec] text-[#c95100]",
    teal: "border-[#b7dfe4] bg-[#effcff] text-[#007c89]",
  }[color];
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${styles}`}>
      <Icon aria-hidden="true" className="h-10 w-10" />
      <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function Principle({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-teal-100">
      <h3 className="text-2xl font-bold text-navy [font-family:Georgia,serif]">{title}</h3>
      <p className="mt-3 leading-7 text-slate-700">{text}</p>
    </div>
  );
}
