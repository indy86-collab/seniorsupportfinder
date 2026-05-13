import { AlertTriangle } from "lucide-react";

export function QaLinkWarning() {
  return (
    <p className="mt-2 inline-flex items-start gap-2 rounded-md bg-amber-50 px-3 py-2 text-sm font-medium leading-5 text-amber-900">
      <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      This link may need checking. Please verify on the official council website.
    </p>
  );
}
