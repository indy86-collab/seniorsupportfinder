import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Keyboard, MousePointerClick, ShieldCheck, Type, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Read the Senior Support Finder accessibility page, including our commitment to readable, usable and inclusive support information.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89] shadow-sm">
              <Users aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">
              Accessibility
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">
              Support information should be easy to use
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Senior Support Finder is built for older people, carers and families who may need clear information quickly. Accessibility is central to that purpose, not an afterthought.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            <AccessValue icon={Type} title="Readable Text" text="We aim for clear language, strong contrast and comfortable spacing." />
            <AccessValue icon={Keyboard} title="Keyboard Friendly" text="Links, buttons and forms should be reachable without a mouse." />
            <AccessValue icon={Eye} title="Easy to Scan" text="Pages use headings, cards and sections to reduce overwhelm." />
          </div>

          <div className="mt-8 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf]">
            <div className="flex gap-4">
              <ShieldCheck aria-hidden="true" className="mt-1 h-8 w-8 shrink-0 text-[#2f7d46]" />
              <div>
                <h2 className="text-2xl font-bold text-navy">Our Accessibility Intention</h2>
                <p className="mt-2 leading-7 text-slate-700">
                  We want visitors to be able to find support without struggling through tiny text, confusing layouts or unclear next steps. The site should feel calm, legible and practical.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <AccessBlock title="What We Aim To Support">
              We aim to make the site usable for people with low vision, people using screen readers, people using keyboard navigation, older visitors who prefer larger and clearer layouts, and carers who may be searching under time pressure.
            </AccessBlock>

            <AccessBlock title="Design Choices">
              We use large headings, readable body text, clear buttons, strong color contrast, generous spacing and descriptive link text where possible. Pages are structured with headings so visitors can scan and move through information more easily.
            </AccessBlock>

            <AccessBlock title="Keyboard and Focus">
              Interactive elements such as links, buttons, search fields and filters should be usable with a keyboard. Focus outlines are included so visitors can see where they are on the page.
            </AccessBlock>

            <AccessBlock title="Images and Icons">
              Important images should include meaningful alternative text where they communicate content. Decorative images and icons are treated in a way that avoids unnecessary screen reader noise where possible.
            </AccessBlock>

            <AccessBlock title="Plain English">
              We try to explain support topics clearly and avoid unnecessary jargon. Where a topic is complex, the goal is to help people choose the right official source rather than pretend every answer is simple.
            </AccessBlock>

            <AccessBlock title="Known Limitations">
              Some external council, GOV.UK, NHS or charity websites may have their own accessibility limitations. When you follow an external link, that website is responsible for its own accessibility.
            </AccessBlock>

            <AccessBlock title="Improving Over Time">
              Accessibility is not a one-time task. As the site grows, we aim to keep improving readability, navigation, mobile layouts and support for assistive technology.
            </AccessBlock>
          </div>

          <div className="mt-10 grid gap-5 rounded-2xl bg-[#eaf8f6] p-6 shadow-sm ring-1 ring-teal-100 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <MousePointerClick aria-hidden="true" className="h-10 w-10 text-[#007c89]" />
              <h2 className="mt-3 text-2xl font-bold text-navy">Tell Us If Something Is Hard To Use</h2>
              <p className="mt-2 leading-7 text-slate-700">
                If a page is confusing, difficult to read or hard to navigate, that matters. Feedback helps us make the site more useful for the people it is meant to serve.
              </p>
            </div>
            <Link href="/about" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              Read our purpose
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-600">Last updated: 2026</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AccessValue({ icon: Icon, title, text }: { icon: typeof Type; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <Icon aria-hidden="true" className="h-9 w-9 text-[#007c89]" />
      <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function AccessBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-navy [font-family:Georgia,serif]">{title}</h2>
      <p className="mt-3 leading-8 text-slate-700">{children}</p>
    </section>
  );
}
