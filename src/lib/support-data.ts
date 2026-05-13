import {
  BadgePoundSterling,
  BusFront,
  HandHeart,
  HeartHandshake,
  Home,
  Info,
  Landmark,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import rawEntries from "../../data/senior-support.json";

export type SeniorSupportEntry = {
  name: string;
  slug: string;
  category: string;
  region: string;
  country: string;
  description: string;
  websiteUrl?: string;
  councilTaxReductionUrl?: string;
  adultSocialCareUrl?: string;
  blueBadgeUrl?: string;
  disabledFacilitiesGrantUrl?: string;
  carersSupportUrl?: string;
  localAgeUkUrl?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  tags?: string[];
  sourceUrls?: string[];
  lastChecked?: string;
  qaStatus?: string;
  qaNotes?: string;
  urlFieldsPresent?: number;
  sourceUrlCount?: number;
  needsManualLiveCheck?: string;
};

export type SupportLink = {
  name: string;
  description: string;
  sourceType: "GOV.UK" | "Council" | "Charity" | "Information";
  href?: string;
  action: string;
  icon?: LucideIcon;
};

export type SupportSection = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  links: SupportLink[];
};

export const entries = rawEntries as SeniorSupportEntry[];

export const supportCategories = [
  {
    id: "benefits-money",
    title: "Benefits & Money",
    shortTitle: "Benefits & Money Support",
    description: "Pension Credit, Attendance Allowance, Council Tax Reduction and cost of living help.",
    icon: BadgePoundSterling,
  },
  {
    id: "adult-social-care",
    title: "Adult Social Care",
    shortTitle: "Adult Social Care",
    description: "Care assessments, home care, safeguarding and support services.",
    icon: HandHeart,
  },
  {
    id: "mobility-transport",
    title: "Mobility & Transport",
    shortTitle: "Mobility & Transport",
    description: "Blue Badge, mobility support and local transport options.",
    icon: BusFront,
  },
  {
    id: "carers-support",
    title: "Carers Support",
    shortTitle: "Support for Carers",
    description: "Carer assessments, respite care, support groups and advice.",
    icon: HeartHandshake,
  },
  {
    id: "home-adaptations",
    title: "Home Adaptations",
    shortTitle: "Home Adaptations",
    description: "Disabled Facilities Grants, equipment and home improvements.",
    icon: Home,
  },
  {
    id: "health-wellbeing",
    title: "Health & Wellbeing",
    shortTitle: "Health & Wellbeing",
    description: "NHS services, wellbeing support and local groups.",
    icon: ShieldCheck,
  },
  {
    id: "local-charities",
    title: "Local Charities",
    shortTitle: "Local Charities & Community",
    description: "Age UK branches, local charities and community organisations.",
    icon: Users,
  },
  {
    id: "information-advice",
    title: "Information & Advice",
    shortTitle: "Information & Advice",
    description: "Official guidance, helplines and advice services.",
    icon: Info,
  },
];

export function getAllEntries() {
  return entries;
}

export function getEntryBySlug(slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

export function getDisplayLocation(entry: SeniorSupportEntry) {
  return entry.name
    .replace(/^Senior benefits and support in\s+/i, "")
    .replace(/^Senior support in\s+/i, "")
    .trim();
}

export function getRegions() {
  return Array.from(new Set(entries.map((entry) => entry.region).filter(Boolean))).sort();
}

export function needsQaWarning(entry: SeniorSupportEntry) {
  return entry.qaStatus?.toLowerCase().includes("review") ?? false;
}

export function getFeaturedEntries() {
  const preferred = ["hounslow", "croydon", "birmingham", "derbyshire", "norfolk", "suffolk"];
  return preferred
    .map((term) => entries.find((entry) => entry.slug.includes(term)))
    .filter(Boolean)
    .slice(0, 6) as SeniorSupportEntry[];
}

export function findBestEntry(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return undefined;
  return entries.find((entry) => {
    const location = getDisplayLocation(entry).toLowerCase();
    return location === normalized || entry.slug.endsWith(normalized.replace(/\s+/g, "-"));
  });
}

export function getQuickLinks(entry: SeniorSupportEntry): SupportLink[] {
  const links: SupportLink[] = [
    {
      name: `${getDisplayLocation(entry)} Council`,
      description: "Support for residents",
      sourceType: "Council",
      href: entry.websiteUrl,
      action: "Visit website",
      icon: Landmark,
    },
    {
      name: "Council Tax Reduction",
      description: "Check eligibility",
      sourceType: "Council",
      href: entry.councilTaxReductionUrl,
      action: "Check eligibility",
      icon: BadgePoundSterling,
    },
    {
      name: "Adult Social Care",
      description: getDisplayLocation(entry),
      sourceType: "Council",
      href: entry.adultSocialCareUrl,
      action: "View care support",
      icon: HandHeart,
    },
    {
      name: "Blue Badge",
      description: "Apply online",
      sourceType: "GOV.UK",
      href: entry.blueBadgeUrl,
      action: "Apply online",
      icon: BusFront,
    },
    {
      name: "Disabled Facilities Grant",
      description: "Home adaptations",
      sourceType: "Council",
      href: entry.disabledFacilitiesGrantUrl,
      action: "View grant",
      icon: Home,
    },
    {
      name: "Carers Support",
      description: "Support for carers",
      sourceType: "Council",
      href: entry.carersSupportUrl,
      action: "Find carers help",
      icon: HeartHandshake,
    },
    {
      name: "Age UK local branch",
      description: "Charity support",
      sourceType: "Charity",
      href: entry.localAgeUkUrl,
      action: "Visit Age UK",
      icon: Users,
    },
  ];
  return links.filter((link) => Boolean(link.href));
}

export function getSupportSections(entry: SeniorSupportEntry): SupportSection[] {
  const location = getDisplayLocation(entry);
  return [
    {
      id: "benefits-money",
      title: "Benefits & Money Support",
      description: "Financial support and benefits you may be entitled to.",
      icon: BadgePoundSterling,
      links: [
        {
          name: "Pension Credit",
          description: "Extra money to help with living costs if you are over State Pension age.",
          sourceType: "GOV.UK",
          href: "https://www.gov.uk/pension-credit",
          action: "Check eligibility",
        },
        {
          name: "Attendance Allowance",
          description: "Financial support if you have a disability or health condition.",
          sourceType: "GOV.UK",
          href: "https://www.gov.uk/attendance-allowance",
          action: "View details",
        },
        {
          name: "Council Tax Reduction",
          description: `Help paying your Council Tax in ${location}.`,
          sourceType: "Council",
          href: entry.councilTaxReductionUrl,
          action: "Check eligibility",
        },
        {
          name: "Cost of Living Support",
          description: "Local support with food, energy bills and other living costs.",
          sourceType: "Council",
          href: entry.websiteUrl,
          action: "Contact council",
        },
        {
          name: "Universal Credit",
          description: "Financial support for people on a low income.",
          sourceType: "GOV.UK",
          href: "https://www.gov.uk/universal-credit",
          action: "View guidance",
        },
      ],
    },
    {
      id: "adult-social-care",
      title: "Adult Social Care",
      description: "Support with care needs, assessments and staying independent.",
      icon: HandHeart,
      links: [
        {
          name: "Care Needs Assessment",
          description: "Assessment to understand your care and support needs.",
          sourceType: "Council",
          href: entry.adultSocialCareUrl,
          action: "View details",
        },
        {
          name: "Home Care Services",
          description: "Help at home with daily living, personal care and more.",
          sourceType: "Council",
          href: entry.adultSocialCareUrl,
          action: "View details",
        },
        {
          name: "Safeguarding Adults",
          description: "Report a concern or get help to stay safe.",
          sourceType: "Council",
          href: entry.adultSocialCareUrl,
          action: "Contact council",
        },
        {
          name: "Equipment and Adaptations",
          description: "Support with equipment to help you live independently.",
          sourceType: "Council",
          href: entry.disabledFacilitiesGrantUrl || entry.adultSocialCareUrl,
          action: "View details",
        },
        {
          name: `Care Homes in ${location}`,
          description: `Find care homes in ${location} and nearby areas.`,
          sourceType: "Information",
          href: entry.adultSocialCareUrl,
          action: "View details",
        },
      ],
    },
    {
      id: "mobility-transport",
      title: "Mobility & Transport",
      description: "Help getting around, parking concessions and transport support.",
      icon: BusFront,
      links: [
        {
          name: "Blue Badge",
          description: "Parking support for people with disabilities or mobility needs.",
          sourceType: entry.blueBadgeUrl?.includes("gov.uk") ? "GOV.UK" : "Council",
          href: entry.blueBadgeUrl,
          action: "Apply online",
        },
        {
          name: "Local transport support",
          description: "Ask your local council about community transport and mobility schemes.",
          sourceType: "Council",
          href: entry.websiteUrl,
          action: "Contact council",
        },
      ],
    },
    {
      id: "carers-support",
      title: "Support for Carers",
      description: "Advice and practical support for unpaid carers.",
      icon: HeartHandshake,
      links: [
        {
          name: "Carer's Assessment",
          description: "A conversation about your needs as an unpaid carer.",
          sourceType: "Council",
          href: entry.carersSupportUrl,
          action: "View details",
        },
        {
          name: "Respite care",
          description: "Short breaks and replacement care may be available locally.",
          sourceType: "Council",
          href: entry.carersSupportUrl,
          action: "Find support",
        },
        {
          name: "Local carers support",
          description: "Support groups, advice and practical help for carers.",
          sourceType: "Council",
          href: entry.carersSupportUrl,
          action: "Contact council",
        },
      ],
    },
    {
      id: "home-adaptations",
      title: "Home Adaptations",
      description: "Help adapting your home so it is safer and easier to live in.",
      icon: Home,
      links: [
        {
          name: "Disabled Facilities Grant",
          description: "Funding may help with ramps, bathrooms, stairlifts and other adaptations.",
          sourceType: "Council",
          href: entry.disabledFacilitiesGrantUrl,
          action: "View grant",
        },
        {
          name: "Home improvements",
          description: "Ask your council about support to make your home safer.",
          sourceType: "Council",
          href: entry.disabledFacilitiesGrantUrl || entry.websiteUrl,
          action: "Contact council",
        },
        {
          name: "Assistive equipment",
          description: "Equipment may help with daily tasks and staying independent.",
          sourceType: "Council",
          href: entry.adultSocialCareUrl,
          action: "View details",
        },
      ],
    },
    {
      id: "local-charities",
      title: "Local Charities & Community",
      description: "Community organisations, advice and friendly local support.",
      icon: Users,
      links: [
        {
          name: "Age UK local branch",
          description: "Local charity support, advice and activities for older people.",
          sourceType: "Charity",
          href: entry.localAgeUkUrl,
          action: "Visit charity",
        },
        {
          name: "Local community organisations",
          description: "Find community services, groups and practical support.",
          sourceType: "Council",
          href: entry.websiteUrl,
          action: "Contact council",
        },
        {
          name: "Advice services",
          description: "Local help with benefits, care options and everyday questions.",
          sourceType: "Information",
          href: entry.websiteUrl,
          action: "Find advice",
        },
      ],
    },
  ];
}

export function getCategoryLinkCount(entry: SeniorSupportEntry, categoryId: string) {
  const section = getSupportSections(entry).find((item) => item.id === categoryId);
  return section?.links.filter((link) => Boolean(link.href)).length ?? 0;
}
