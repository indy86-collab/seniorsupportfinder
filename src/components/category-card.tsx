import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function CategoryCard({
  title,
  description,
  href,
  icon: Icon,
  count,
  accent = "teal",
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  count?: number;
  accent?: "green" | "teal" | "blue" | "orange" | "red" | "sage";
}) {
  const styles = {
    green: { gradient: "from-[#f1faee] to-[#e3f6e2]", border: "border-[#b9deb6]", iconText: "text-[#2f7d46]", iconBg: "bg-[#dff3dc]" },
    teal: { gradient: "from-[#effcff] to-[#dcf5f4]", border: "border-[#b7dfe4]", iconText: "text-[#007c89]", iconBg: "bg-[#d7f1f4]" },
    blue: { gradient: "from-[#f3f6ff] to-[#e7edff]", border: "border-[#bdcdf5]", iconText: "text-[#155fa0]", iconBg: "bg-[#dce7ff]" },
    orange: { gradient: "from-[#fff9e8] to-[#ffedc2]", border: "border-[#efd28a]", iconText: "text-[#d98a00]", iconBg: "bg-[#ffedbc]" },
    red: { gradient: "from-[#fff5ec] to-[#ffe4d3]", border: "border-[#f3c5a2]", iconText: "text-[#c95100]", iconBg: "bg-[#ffe1ca]" },
    sage: { gradient: "from-[#eefcf8] to-[#dff4ec]", border: "border-[#b6ded4]", iconText: "text-[#007c89]", iconBg: "bg-[#d6f3ea]" },
  }[accent];

  return (
    <Link href={href} className={`group flex min-h-56 flex-col items-center justify-between rounded-2xl border ${styles.border} bg-gradient-to-br ${styles.gradient} p-6 text-center shadow-[0_8px_20px_rgba(15,27,61,0.1)] transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700`}>
      <span className={`flex h-16 w-16 items-center justify-center rounded-full ${styles.iconBg} ${styles.iconText} shadow-sm`}>
        <Icon aria-hidden="true" className="h-9 w-9" />
      </span>
      <span className="mt-4 text-lg font-bold leading-snug text-slate-950">{title}</span>
      <span className="mt-3 text-sm leading-6 text-slate-600">{description}</span>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-teal-900 shadow-sm">
        {typeof count === "number" ? `${count} links` : "Browse support"}
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
