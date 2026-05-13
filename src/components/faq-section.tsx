import type { SeniorSupportEntry } from "@/lib/support-data";
import { getDisplayLocation } from "@/lib/support-data";

export function FAQSection({ entry }: { entry: SeniorSupportEntry }) {
  const location = getDisplayLocation(entry);
  const faqs = [
    {
      question: `What support can pensioners get in ${location}?`,
      answer: `Older people in ${location} may be eligible for national benefits, Council Tax Reduction, adult social care, home adaptations, mobility support and local charity services. Check the official links before applying.`,
    },
    {
      question: `How do I apply for a Blue Badge in ${location}?`,
      answer: "Use the Blue Badge link on this page. Applications are usually handled through GOV.UK or your local council, depending on the service route.",
    },
    {
      question: `Can carers get support in ${location}?`,
      answer: "Unpaid carers may be able to request a carer's assessment, advice, respite support or local carers services through the council or recognised charities.",
    },
    {
      question: "Can older people get help adapting their home?",
      answer: "A Disabled Facilities Grant or local adaptation service may help with changes such as ramps, bathroom adaptations or stairlifts. Eligibility and funding can change, so check official guidance.",
    },
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">FAQs</h2>
      <div className="mt-5 space-y-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-md border border-slate-200 p-4">
            <summary className="cursor-pointer text-lg font-bold text-slate-950">{faq.question}</summary>
            <p className="mt-3 text-sm leading-6 text-slate-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
