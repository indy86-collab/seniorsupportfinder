import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import XLSX from "xlsx";

const source =
  process.env.SENIOR_SUPPORT_XLSX ||
  "/Users/isingh/Downloads/senior_support_finder_100_cleaned_audit.xlsx";
const outFile = path.join(process.cwd(), "data", "senior-support.json");

const workbook = XLSX.readFile(source, { cellDates: false });
const sheet = workbook.Sheets["Directory Data"] || workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

const camelMap = {
  website_url: "websiteUrl",
  council_tax_reduction_url: "councilTaxReductionUrl",
  adult_social_care_url: "adultSocialCareUrl",
  blue_badge_url: "blueBadgeUrl",
  disabled_facilities_grant_url: "disabledFacilitiesGrantUrl",
  carers_support_url: "carersSupportUrl",
  local_age_uk_url: "localAgeUkUrl",
  phone_number: "phoneNumber",
  source_urls: "sourceUrls",
  last_checked: "lastChecked",
  qa_status: "qaStatus",
  qa_notes: "qaNotes",
  url_fields_present: "urlFieldsPresent",
  source_url_count: "sourceUrlCount",
  needs_manual_live_check: "needsManualLiveCheck",
};

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function splitList(value, separator) {
  return clean(value)
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

const entries = rows
  .map((row) => {
    const entry = {};
    for (const [key, rawValue] of Object.entries(row)) {
      const outputKey = camelMap[key] || key;
      entry[outputKey] = clean(rawValue);
    }
    entry.sourceUrls = splitList(entry.sourceUrls, ";");
    entry.tags = splitList(entry.tags, ",");
    entry.urlFieldsPresent = Number(entry.urlFieldsPresent || 0);
    entry.sourceUrlCount = Number(entry.sourceUrlCount || entry.sourceUrls.length || 0);
    return entry;
  })
  .filter((entry) => entry.name && entry.slug);

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} senior support entries to ${outFile}`);
