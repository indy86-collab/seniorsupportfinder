import type { Metadata } from "next";
import { AlertCircle, HeartHandshake, Mail, ShieldCheck, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Senior Support Finder about broken links, support sources, accessibility feedback or general questions.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(90deg,#eaf8f6_0%,#ffffff_52%,#fff5df_100%)]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#bdeee7]/55" />
          <div className="pointer-events-none absolute -right-20 bottom-[-5rem] h-80 w-80 rounded-full bg-[#ffe4bd]/55" />
          <div className="relative mx-auto max-w-[1460px] px-5 py-14 sm:px-8 lg:px-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f1f4] text-[#007c89] shadow-sm">
              <Mail aria-hidden="true" className="h-9 w-9" />
            </span>
            <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm ring-1 ring-teal-100">
              Contact us
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-navy sm:text-6xl [font-family:Georgia,serif]">
              Help us keep support information useful
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Tell us about outdated links, missing sources, accessibility issues or anything that would make Senior Support Finder easier for older people, carers and families to use.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1460px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div className="space-y-5">
            <InfoCard icon={HeartHandshake} title="What To Send" text="Useful corrections, trusted support sources, broken links, accessibility feedback or general questions about the site." color="teal" />
            <InfoCard icon={ShieldCheck} title="Please Avoid Sensitive Details" text="Please do not send medical, financial or safeguarding details unless absolutely necessary. We are a signposting service, not an emergency service." color="green" />
            <div className="rounded-2xl bg-[#fbf8e8] p-5 shadow-sm ring-1 ring-[#efe8bf]">
              <AlertCircle aria-hidden="true" className="h-9 w-9 text-[#c95100]" />
              <h2 className="mt-4 text-xl font-bold text-slate-950">Urgent Help</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                If someone is in immediate danger or needs urgent medical help, contact emergency services, NHS services or the relevant local authority directly.
              </p>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  color: "teal" | "green";
}) {
  const styles = {
    teal: "bg-[#effcff] text-[#007c89] ring-[#b7dfe4]",
    green: "bg-[#f1faee] text-[#2f7d46] ring-[#b9deb6]",
  }[color];
  return (
    <div className={`rounded-2xl p-5 shadow-sm ring-1 ${styles}`}>
      <Icon aria-hidden="true" className="h-9 w-9" />
      <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}
