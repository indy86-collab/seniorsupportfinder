import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Senior Support Finder privacy policy, including what information may be collected and how privacy is respected.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89] shadow-sm">
              <LockKeyhole aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">
              Privacy Policy
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">
              Respecting your privacy while helping you find support
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Senior Support Finder is designed to help older people, carers and families find trusted support with as little friction as possible. We aim to collect only what is needed to run and improve the service.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            <PrivacyValue icon={ShieldCheck} title="Careful by Design" text="We keep the site focused on signposting, not building unnecessary user profiles." />
            <PrivacyValue icon={Eye} title="Clear and Honest" text="This page explains the kinds of information that may be processed when you use the site." />
            <PrivacyValue icon={HeartHandshake} title="Purpose Led" text="Any data use should support a safer, clearer and more helpful experience." />
          </div>

          <div className="mt-8 space-y-6">
            <PolicyBlock title="1. Who This Policy Is For">
              This policy is for visitors using Senior Support Finder to browse support information, search locations, follow official links, or contact us about the service.
            </PolicyBlock>

            <PolicyBlock title="2. Information You Provide">
              If you contact us by email, we may receive your name, email address and the content of your message. Please avoid sending sensitive medical, financial or personal details unless they are truly necessary for your enquiry.
            </PolicyBlock>

            <PolicyBlock title="3. Search and Browsing Information">
              Searches entered on the site are used to help you find relevant locations or support pages. The site may also process standard technical information such as page visits, browser type, device information and approximate usage patterns to keep the service working and improve usability.
            </PolicyBlock>

            <PolicyBlock title="4. Cookies and Analytics">
              The site may use essential cookies or basic analytics to understand how pages are used and to improve accessibility, navigation and reliability. We do not want analytics to get in the way of the site’s purpose: helping people find support.
            </PolicyBlock>

            <PolicyBlock title="5. External Websites">
              Senior Support Finder links to council, GOV.UK, NHS where relevant, and charity websites. When you leave this site, the privacy policy of the external website applies. We cannot control how those third-party services collect or use information.
            </PolicyBlock>

            <PolicyBlock title="6. How Information Is Used">
              Information may be used to respond to enquiries, maintain the site, fix problems, understand which areas need improvement, protect the service from misuse and improve the clarity of support information.
            </PolicyBlock>

            <PolicyBlock title="7. Keeping Information Safe">
              We take reasonable steps to protect information connected with the service. No website can guarantee perfect security, so please be careful about what you choose to share online.
            </PolicyBlock>

            <PolicyBlock title="8. Your Choices">
              You can use the site without creating an account. If you contact us and later want your message deleted where possible, you can ask us. Some technical records may need to be retained for security, legal or operational reasons.
            </PolicyBlock>

            <PolicyBlock title="9. Changes to This Policy">
              We may update this policy as the site develops. The latest version will be available on this page.
            </PolicyBlock>
          </div>

          <div className="mt-10 grid gap-5 rounded-2xl bg-[#fbf8e8] p-6 shadow-sm ring-1 ring-[#efe8bf] md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Mail aria-hidden="true" className="h-10 w-10 text-[#007c89]" />
              <h2 className="mt-3 text-2xl font-bold text-navy">Questions About Privacy?</h2>
              <p className="mt-2 leading-7 text-slate-700">
                If you have a question about this policy or how the site handles information, you can contact us and we will try to respond clearly.
              </p>
            </div>
            <Link href="/about" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              About our purpose
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

function PrivacyValue({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <Icon aria-hidden="true" className="h-9 w-9 text-[#007c89]" />
      <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function PolicyBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-navy [font-family:Georgia,serif]">{title}</h2>
      <p className="mt-3 leading-8 text-slate-700">{children}</p>
    </section>
  );
}
