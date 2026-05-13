import { BookOpen, Heart, Landmark, ShieldCheck } from "lucide-react";

const items = [
  { title: "Official sources", text: "Information from trusted public and charitable organisations.", icon: ShieldCheck },
  { title: "Council links", text: "Direct links to your local council and services.", icon: Landmark },
  { title: "Simple guidance", text: "Clear, easy-to-understand information for everyone.", icon: BookOpen },
  { title: "Free to use", text: "Here to help you find the right support.", icon: Heart },
];

export function TrustStrip() {
  return (
    <section className="rounded-2xl bg-[#fbf8e8] px-6 py-4 shadow-sm ring-1 ring-[#efe8bf]">
      <div className="grid gap-5 md:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-4 md:border-r md:border-slate-300 md:pr-5 md:last:border-r-0">
              <Icon aria-hidden="true" className="h-12 w-12 shrink-0 text-[#2f7d46]" strokeWidth={2.4} />
              <div>
                <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
                <p className="mt-1 text-sm leading-5 text-slate-700">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
