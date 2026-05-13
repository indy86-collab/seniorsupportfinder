import { entries, getDisplayLocation } from "@/lib/support-data";

export function looksLikePostcode(value: string) {
  const normalized = value.trim().toUpperCase().replace(/\s+/g, "");
  return /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(normalized);
}

export function findEntryForCouncilNames(names: Array<string | null | undefined>) {
  const candidates = names
    .filter(Boolean)
    .map((name) => normalizeCouncilName(String(name)))
    .filter(Boolean);

  const exact = entries.find((entry) => {
    const location = normalizeCouncilName(getDisplayLocation(entry));
    return candidates.some((candidate) => location === candidate);
  });
  if (exact) return exact;

  return entries.find((entry) => {
    const location = normalizeCouncilName(getDisplayLocation(entry));
    const name = normalizeCouncilName(entry.name);
    return candidates.some((candidate) => name.includes(candidate) || location.includes(candidate));
  });
}

function normalizeCouncilName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\b(city of|royal borough of|london borough of|metropolitan borough of|borough of|county council|city council|council|district|borough|city|county)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
