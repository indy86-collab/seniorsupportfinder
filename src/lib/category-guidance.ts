import {
  BadgePoundSterling,
  ClipboardCheck,
  FileWarning,
  HeartHandshake,
  Home,
  type LucideIcon,
} from "lucide-react";

export type CategoryGuidance = {
  eyebrow: string;
  intro: string;
  cards: Array<{ title: string; text: string; icon: LucideIcon; color: "green" | "teal" | "orange" }>;
  whatItMeans: string;
  whoItHelps: string;
  whatToHaveReady: string[];
  commonMistakes: string[];
};

const fallback: CategoryGuidance = {
  eyebrow: "Local support",
  intro: "Use this page to understand the support type, then choose your area to find official local links.",
  cards: [
    { title: "Understand the support", text: "Read what this help usually covers before you contact services.", icon: ClipboardCheck, color: "teal" },
    { title: "Prepare key details", text: "Gather basic information so calls and forms are easier.", icon: BadgePoundSterling, color: "green" },
    { title: "Use official links", text: "Check current eligibility and application routes at the source.", icon: FileWarning, color: "orange" },
  ],
  whatItMeans: "This support area can vary by council and by personal circumstances. The goal is to help you find the right official starting point and understand what to ask about.",
  whoItHelps: "It may help older people, unpaid carers, relatives and friends who are trying to understand local options.",
  whatToHaveReady: ["The person’s full address and council area", "A short description of the need", "Any relevant benefit, care or health information"],
  commonMistakes: ["Assuming every council uses the same process", "Starting forms before checking the latest official route", "Not writing down reference numbers or advice given"],
};

export const categoryGuidance: Record<string, CategoryGuidance> = {
  "benefits-money": {
    eyebrow: "Money and benefits",
    intro: "Understand common financial support routes before checking local council and GOV.UK pages.",
    cards: [
      { title: "Check national benefits", text: "Pension Credit and Attendance Allowance are useful starting points for many older people.", icon: BadgePoundSterling, color: "green" },
      { title: "Look for local help", text: "Council Tax Reduction and hardship support are handled locally.", icon: Home, color: "teal" },
      { title: "Confirm eligibility", text: "Rules change, so always check the official application page.", icon: ClipboardCheck, color: "orange" },
    ],
    whatItMeans: "Benefits and money support can include national benefits, local Council Tax Reduction, disability-related support and cost of living help. Some support is handled by GOV.UK, while other help depends on the council area.",
    whoItHelps: "This is most relevant for older people on a lower income, people with care needs, carers helping with paperwork, and families trying to understand what financial help might be available.",
    whatToHaveReady: ["National Insurance number", "Income, pension and savings details", "Council Tax bill", "Existing benefit award letters", "Notes about care or disability needs"],
    commonMistakes: ["Assuming home ownership rules out all help", "Checking only one benefit", "Using old eligibility information", "Forgetting local Council Tax Reduction"],
  },
  "adult-social-care": {
    eyebrow: "Care and daily living",
    intro: "Learn what adult social care can cover before finding your council’s care assessment route.",
    cards: [
      { title: "Ask about assessment", text: "A care needs assessment looks at daily living, safety and independence.", icon: ClipboardCheck, color: "teal" },
      { title: "Explain real difficulties", text: "Describe what happens on a hard day, not only a good day.", icon: HeartHandshake, color: "orange" },
      { title: "Prepare for next steps", text: "The council may suggest advice, equipment, care or other local services.", icon: Home, color: "green" },
    ],
    whatItMeans: "Adult social care is local authority support for adults who may need help with daily life, safety, independence or care at home. It can include assessments, advice, equipment, safeguarding, reablement or care services.",
    whoItHelps: "It may help older people struggling with washing, dressing, meals, mobility, memory, safety, isolation or managing at home. It can also help carers explain what support is already being provided.",
    whatToHaveReady: ["A description of daily difficulties", "Falls, safety or memory concerns", "Current support from family or carers", "Medication or health context", "Any urgent risks"],
    commonMistakes: ["Waiting until crisis point", "Describing only medical diagnoses", "Leaving out unpaid carer support", "Not explaining night-time or safety issues"],
  },
  "mobility-transport": {
    eyebrow: "Mobility and transport",
    intro: "Find out how Blue Badge, parking and local mobility support usually work.",
    cards: [
      { title: "Blue Badge route", text: "Applications usually go through GOV.UK or your local council.", icon: ClipboardCheck, color: "teal" },
      { title: "Describe impact", text: "Evidence should explain walking, safety or travel difficulties.", icon: FileWarning, color: "orange" },
      { title: "Check local options", text: "Community transport and mobility schemes vary by area.", icon: Home, color: "green" },
    ],
    whatItMeans: "Mobility support can include Blue Badge parking, local transport schemes, accessible travel information and help getting to essential appointments or community activities.",
    whoItHelps: "It may help people who cannot walk far, experience severe pain or breathlessness, have hidden conditions that make journeys unsafe, or rely on carers for travel.",
    whatToHaveReady: ["Benefit award letters if relevant", "Evidence of mobility or travel difficulties", "Photo and identity details for Blue Badge", "Notes about journeys that are difficult", "Council area and postcode"],
    commonMistakes: ["Only naming a diagnosis without explaining impact", "Assuming rules are identical in every car park", "Not checking renewal dates", "Missing hidden-condition evidence"],
  },
  "carers-support": {
    eyebrow: "For unpaid carers",
    intro: "Understand support options if you regularly help someone because of age, illness or disability.",
    cards: [
      { title: "Ask for assessment", text: "A carer’s assessment looks at your needs, not just the person you support.", icon: ClipboardCheck, color: "orange" },
      { title: "Find breaks and advice", text: "Local carers services may offer respite information, groups and guidance.", icon: HeartHandshake, color: "teal" },
      { title: "Check financial help", text: "Some carers may be able to check Carer’s Allowance or related support.", icon: BadgePoundSterling, color: "green" },
    ],
    whatItMeans: "Carers support is for people who provide unpaid help to someone who could not manage without that support. It can include assessments, respite information, advice, peer groups, emergency planning and benefits signposting.",
    whoItHelps: "It may help adult children, spouses, relatives, neighbours or friends who regularly support someone with care, appointments, paperwork, meals, safety or emotional wellbeing.",
    whatToHaveReady: ["What you do in a typical week", "How caring affects your health or work", "Whether you get breaks", "The cared-for person’s council area", "Questions about benefits or emergency plans"],
    commonMistakes: ["Thinking you must be a full-time carer", "Waiting until burnout", "Only asking for help for the cared-for person", "Not mentioning night-time or emotional support"],
  },
  "home-adaptations": {
    eyebrow: "Safer homes",
    intro: "Understand equipment, minor adaptations and larger home adaptation grants.",
    cards: [
      { title: "Describe the barrier", text: "Explain the home task that has become unsafe or impossible.", icon: Home, color: "orange" },
      { title: "Ask before building", text: "Major adaptations usually need assessment before work starts.", icon: ClipboardCheck, color: "teal" },
      { title: "Check small aids too", text: "Some equipment may be available without a large grant route.", icon: HeartHandshake, color: "green" },
    ],
    whatItMeans: "Home adaptations can include equipment, rails, ramps, bathroom changes, stair access, safer entrances or Disabled Facilities Grants. The correct route depends on the person’s needs and local assessment process.",
    whoItHelps: "It may help older people or disabled people who struggle with stairs, bathing, toilet access, entrances, falls risk or moving around safely at home.",
    whatToHaveReady: ["Photos or notes about the home barrier", "Falls or safety concerns", "Tenure or landlord details", "Occupational therapy or medical notes if available", "Whether work has already started"],
    commonMistakes: ["Starting work before approval", "Assuming only major building work counts", "Not asking about equipment first", "Leaving out bathroom or entrance safety issues"],
  },
  "health-wellbeing": {
    eyebrow: "Health and wellbeing",
    intro: "Find local wellbeing, NHS-related and community support routes for older people.",
    cards: [
      { title: "Start with the need", text: "Wellbeing support may be social, practical, health-related or community-based.", icon: HeartHandshake, color: "teal" },
      { title: "Use trusted sources", text: "Check NHS, council and recognised charity information.", icon: ClipboardCheck, color: "green" },
      { title: "Do not wait in crisis", text: "Urgent medical or safeguarding concerns need urgent services.", icon: FileWarning, color: "orange" },
    ],
    whatItMeans: "Health and wellbeing support can include social prescribing, local groups, mental wellbeing support, falls prevention, NHS information, community activities and practical help to stay connected.",
    whoItHelps: "It may help older people who feel isolated, less confident, at risk of falls, recently discharged from hospital, or unsure where to find non-emergency support.",
    whatToHaveReady: ["Main wellbeing concern", "GP or local service details", "Mobility or transport barriers", "Any recent hospital or falls history", "Preferred contact method"],
    commonMistakes: ["Using emergency routes for non-urgent advice", "Ignoring loneliness as a support need", "Not checking accessibility before attending groups", "Assuming every activity is free"],
  },
  "local-charities": {
    eyebrow: "Community support",
    intro: "Learn how charities and community groups can help alongside official services.",
    cards: [
      { title: "Ask specific questions", text: "Charities can signpost better when the need is clear.", icon: ClipboardCheck, color: "teal" },
      { title: "Check local branches", text: "Services vary by area, even under national charity names.", icon: Home, color: "green" },
      { title: "Use alongside councils", text: "Charities can help explain options but may not replace statutory support.", icon: HeartHandshake, color: "orange" },
    ],
    whatItMeans: "Local charity support can include advice, social activities, befriending, form help, carers groups, dementia support, transport information and community directories.",
    whoItHelps: "It may help older people, carers and families who need practical guidance, companionship, local knowledge or help understanding which official service to contact.",
    whatToHaveReady: ["The kind of help needed", "Location and travel limits", "Accessibility needs", "Whether a referral is required", "Any urgent risks that need official services"],
    commonMistakes: ["Assuming all branches offer the same service", "Not checking opening hours", "Using charities for emergencies", "Forgetting smaller local community groups"],
  },
  "information-advice": {
    eyebrow: "Clear advice routes",
    intro: "Find trusted information sources and understand when to use official guidance.",
    cards: [
      { title: "Start official", text: "Use council, GOV.UK, NHS and recognised charity sources first.", icon: ClipboardCheck, color: "green" },
      { title: "Keep notes", text: "Record dates, names and reference numbers when asking for help.", icon: FileWarning, color: "orange" },
      { title: "Ask for plain language", text: "It is okay to ask services to explain forms or next steps clearly.", icon: HeartHandshake, color: "teal" },
    ],
    whatItMeans: "Information and advice support helps people understand options before applying, calling a council or contacting a charity. It is especially useful when several issues overlap.",
    whoItHelps: "It may help people who are unsure whether their question is about money, care, housing, transport, wellbeing or carers support.",
    whatToHaveReady: ["A short summary of the issue", "Any letters or reference numbers", "The council area", "Questions you need answered", "Preferred format for information"],
    commonMistakes: ["Relying on old forum answers", "Not checking dates on guidance", "Trying to solve every issue in one call", "Not asking for written confirmation"],
  },
};

export function getCategoryGuidance(id: string) {
  return categoryGuidance[id] ?? fallback;
}
