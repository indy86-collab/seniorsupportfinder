export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string;
  related: Array<{ label: string; href: string }>;
  sections: Array<{ heading: string; body: string[] }>;
};

export const guides: Guide[] = [
  {
    slug: "check-senior-benefits-entitlement",
    title: "How to Check What Senior Benefits You May Be Entitled To",
    description: "A plain-English route through Pension Credit, Attendance Allowance, Council Tax Reduction and local cost of living help.",
    category: "Benefits & Money",
    updated: "2026-05-12",
    related: [
      { label: "Benefits & Money Support", href: "/browse-support/benefits-money" },
      { label: "Find local support", href: "/locations" },
    ],
    sections: [
      {
        heading: "Start With the Main National Benefits",
        body: [
          "For many older people, the first useful check is whether national benefits could increase weekly income or help with care needs. Pension Credit is often the key starting point for people over State Pension age on a lower income. Attendance Allowance may help if someone needs support or supervision because of illness or disability, even if they do not currently pay for care.",
          "These benefits have different rules, and a person can sometimes be eligible for one even if they are not eligible for another. That is why it is better to check each one rather than assume a previous refusal means there is no support available.",
        ],
      },
      {
        heading: "Check Local Help as Well",
        body: [
          "Councils may offer Council Tax Reduction, local welfare support, discretionary funds or cost of living help. The names of these schemes vary by area, and local rules can change. A council page is usually the safest place to confirm current eligibility and how to apply.",
          "If you are helping someone else, keep their council area in mind. Local help is normally based on where the person lives, not where a relative or carer lives.",
        ],
      },
      {
        heading: "Information to Have Ready",
        body: [
          "Before applying, gather details such as National Insurance number, income, savings, rent or mortgage costs, Council Tax bill, disability or care needs, and any existing benefits. You may not need every document for every application, but having them nearby reduces the chance of stopping halfway through.",
          "If the person finds forms difficult, ask whether a trusted relative, carer, advice charity or council support team can help. Some services can talk through applications or explain what evidence is needed.",
        ],
      },
      {
        heading: "Avoid Common Assumptions",
        body: [
          "Do not assume owning a home rules someone out of help. Do not assume a small pension increase means there is no entitlement. Do not assume support is only for people receiving care at home. The safest next step is to check official eligibility rules or speak with a recognised advice service.",
          "This site does not decide eligibility. It helps you find official starting points so you can check the latest rules directly.",
        ],
      },
    ],
  },
  {
    slug: "what-is-a-carers-assessment",
    title: "What Is a Carer’s Assessment?",
    description: "What unpaid carers can expect when asking their council for an assessment and practical support.",
    category: "Carers Support",
    updated: "2026-05-12",
    related: [
      { label: "Support for Carers", href: "/browse-support/carers-support" },
      { label: "Find local support", href: "/locations" },
    ],
    sections: [
      {
        heading: "It Is About Your Needs as a Carer",
        body: [
          "A carer’s assessment is a conversation about how caring affects your life. It is not a test of whether you are doing a good job, and it is not only for people providing full-time care. If you regularly help someone because of age, illness, disability, mental health needs or addiction, you may be able to ask for one.",
          "The assessment can cover your health, work, sleep, family life, emotional wellbeing, ability to take breaks, and whether you are willing and able to continue caring in the same way.",
        ],
      },
      {
        heading: "What Support Might Follow",
        body: [
          "Support varies by council and by situation. It may include advice, training, respite options, local carers groups, emergency planning, equipment guidance or signposting to benefits and charities. In some cases there may be a support plan or a personal budget, but this is not guaranteed.",
          "The main value is that your role becomes visible. Caring can grow gradually until it feels normal to cope alone. An assessment gives you a structured way to explain what is happening.",
        ],
      },
      {
        heading: "How to Prepare",
        body: [
          "Before contacting the council, write down what you do in a typical week. Include practical tasks, emotional support, night-time help, appointments, travel, medication reminders and anything you have stopped doing because of caring. This helps make hidden work visible.",
          "Also note what would make the biggest difference: a regular break, advice about benefits, safer moving and handling, emergency backup, transport help or someone to talk to.",
        ],
      },
      {
        heading: "A Kind Reminder",
        body: [
          "Asking for a carer’s assessment does not mean you are failing. It means the caring role matters and deserves support. If you are unsure where to begin, find your local carers support page and ask what the first step is in your area.",
        ],
      },
    ],
  },
  {
    slug: "blue-badge-applications-explained",
    title: "How Blue Badge Applications Work",
    description: "A practical guide to Blue Badge parking support, evidence and local application routes.",
    category: "Blue Badge & Mobility",
    updated: "2026-05-12",
    related: [
      { label: "Blue Badge & Mobility", href: "/browse-support/mobility-transport" },
      { label: "GOV.UK Blue Badge", href: "https://www.gov.uk/apply-blue-badge" },
    ],
    sections: [
      {
        heading: "What a Blue Badge Can Help With",
        body: [
          "A Blue Badge helps people with significant mobility difficulties or certain hidden conditions park closer to where they need to go. It can make hospital visits, shopping, appointments and family support more manageable, but it does not automatically guarantee parking in every place.",
          "Rules can vary depending on the road, car park and local restrictions. Always check signs before parking, even with a badge.",
        ],
      },
      {
        heading: "Who Handles Applications",
        body: [
          "Applications are usually made through GOV.UK or through the local council route. Some people qualify automatically because of certain benefits or awards. Others need to provide more information about how their condition affects walking, safety or travel.",
          "If you are applying for someone else, make sure the details describe their real daily difficulties rather than only naming a diagnosis. Decision makers usually need to understand impact, not just a medical label.",
        ],
      },
      {
        heading: "Evidence That May Help",
        body: [
          "Useful evidence may include benefit award letters, medical letters, mobility assessments, prescription lists, appointment letters, or a clear explanation of walking distance, pain, breathlessness, falls, confusion or distress. Do not send original documents unless the official application route asks for them.",
          "Photos and proof of identity may also be needed. Check the council or GOV.UK instructions before starting so you know what to prepare.",
        ],
      },
      {
        heading: "If an Application Is Refused",
        body: [
          "A refusal does not always mean support is impossible. Read the reason carefully. It may be that more evidence is needed, or that the person does not meet the criteria at that time. Some councils explain review routes or suggest alternative travel support.",
        ],
      },
    ],
  },
  {
    slug: "home-adaptation-grants-explained",
    title: "Home Adaptation Grants Explained",
    description: "How older people may get help with ramps, bathrooms, stairlifts and safer living at home.",
    category: "Home Adaptations",
    updated: "2026-05-12",
    related: [
      { label: "Home Adaptations", href: "/browse-support/home-adaptations" },
      { label: "Find local support", href: "/locations" },
    ],
    sections: [
      {
        heading: "Why Adaptations Matter",
        body: [
          "Small changes at home can make a large difference to safety and independence. Grab rails, ramps, level-access showers, stairlifts, better access and bathroom changes may reduce falls, make personal care easier and help someone remain at home for longer.",
          "The right route depends on the person’s needs, home, tenure and local council process.",
        ],
      },
      {
        heading: "Disabled Facilities Grants",
        body: [
          "A Disabled Facilities Grant may help fund larger adaptations for eligible disabled people. Councils usually assess whether the work is necessary and appropriate, and there may be a financial assessment depending on the applicant and circumstances.",
          "Do not start major building work assuming it will be funded. Most schemes require assessment and approval before work begins.",
        ],
      },
      {
        heading: "What to Gather Before Asking",
        body: [
          "It helps to describe the practical problem clearly: difficulty getting upstairs, unsafe bathing, steps at the entrance, falls, wheelchair access, or problems using the toilet or kitchen. Photos, occupational therapy notes and medical context may help, but the council will explain what is required.",
          "If the situation is urgent, such as repeated falls or unsafe discharge from hospital, say that clearly when contacting services.",
        ],
      },
      {
        heading: "Smaller Equipment May Be Separate",
        body: [
          "Not every need requires a grant. Some equipment or minor adaptations may come through adult social care, occupational therapy or community equipment services. Ask the council which route fits the problem before assuming there is only one application form.",
        ],
      },
    ],
  },
  {
    slug: "adult-social-care-assessments",
    title: "Adult Social Care Assessments: What to Expect",
    description: "A calm explanation of care needs assessments, what councils look at and how to prepare.",
    category: "Adult Social Care",
    updated: "2026-05-12",
    related: [
      { label: "Adult Social Care", href: "/browse-support/adult-social-care" },
      { label: "Find local support", href: "/locations" },
    ],
    sections: [
      {
        heading: "The Purpose of an Assessment",
        body: [
          "An adult social care assessment looks at what support a person may need to manage daily life. It can cover washing, dressing, eating, moving around, staying safe, maintaining relationships, using the home and accessing the community.",
          "It is not only for people who need a care home. Many assessments are about helping someone remain safely at home.",
        ],
      },
      {
        heading: "What to Explain",
        body: [
          "Try to describe what happens on a difficult day, not only on a good day. Mention falls, missed meals, confusion, medication problems, loneliness, carer strain, unsafe stairs, washing difficulties or problems leaving the home.",
          "If a family member or carer is doing a lot, explain what they do and whether that support is sustainable. Councils need to understand the whole picture.",
        ],
      },
      {
        heading: "Possible Outcomes",
        body: [
          "The council may suggest advice, equipment, home adaptations, reablement, care at home, day services, safeguarding support, carer support or other local services. If ongoing care is arranged, there may be a financial assessment to decide what the person contributes.",
          "The assessment does not guarantee a particular service, but it is the usual gateway to understanding options.",
        ],
      },
      {
        heading: "If You Are Worried",
        body: [
          "If someone is unsafe, being neglected, at risk of abuse, or unable to meet basic needs, explain the urgency clearly. For immediate danger, use emergency services rather than waiting for a routine assessment.",
        ],
      },
    ],
  },
  {
    slug: "local-charity-support-for-older-people",
    title: "Where to Find Local Charity Support for Older People",
    description: "How charities can help with advice, companionship, activities, practical support and local knowledge.",
    category: "Local Charities",
    updated: "2026-05-12",
    related: [
      { label: "Local Charities", href: "/browse-support/local-charities" },
      { label: "Find local support", href: "/locations" },
    ],
    sections: [
      {
        heading: "Why Charities Can Be Useful",
        body: [
          "Charities often understand local needs in a practical way. They may offer advice, social groups, befriending, form-filling support, transport information, digital help, dementia support, carer groups or signposting to trusted services.",
          "They can be especially helpful when someone does not know whether their issue is about benefits, care, loneliness, housing or transport.",
        ],
      },
      {
        heading: "Start With Recognised Local Organisations",
        body: [
          "Local Age UK branches, carers centres, Citizens Advice, disability charities and community foundations are common starting points. Availability varies, so check the local branch rather than assuming every national charity offers the same service everywhere.",
          "Council websites often list voluntary sector partners and community directories. These can help identify smaller local groups.",
        ],
      },
      {
        heading: "Ask Specific Questions",
        body: [
          "Instead of asking generally for help, describe the need: help understanding Attendance Allowance, someone to talk to, transport to appointments, support after hospital discharge, carer groups, or help finding lunch clubs. Specific questions make signposting easier.",
          "If the issue is urgent or involves safety, contact the council, NHS or emergency services as appropriate. Charities are valuable, but they are not always crisis services.",
        ],
      },
      {
        heading: "Check Practical Details",
        body: [
          "Before attending a group or appointment, check opening times, eligibility, cost, accessibility, transport, referral requirements and whether booking is needed. Community services can change quickly when funding or volunteer availability changes.",
        ],
      },
    ],
  },
  {
    slug: "support-options-helping-a-parent",
    title: "Support Options If You Are Helping a Parent",
    description: "A practical starting point for adult children supporting an older parent or loved one.",
    category: "For Carers",
    updated: "2026-05-12",
    related: [
      { label: "Support for Carers", href: "/browse-support/carers-support" },
      { label: "Adult Social Care", href: "/browse-support/adult-social-care" },
    ],
    sections: [
      {
        heading: "Notice What Has Changed",
        body: [
          "Support often starts because of small changes: missed bills, falls, unopened letters, weight loss, confusion, loneliness, difficulty washing, or a home that no longer feels safe. Write down what you have noticed and how often it happens.",
          "This makes conversations with councils, GPs, charities or family members clearer and less emotional.",
        ],
      },
      {
        heading: "Separate the Types of Help",
        body: [
          "Money help may involve benefits or Council Tax Reduction. Care help may involve an adult social care assessment. Home safety may involve equipment or adaptations. Mobility help may involve Blue Badge or transport support. Carer help may involve your own carer’s assessment.",
          "Thinking in categories can stop everything feeling like one huge problem.",
        ],
      },
      {
        heading: "Talk With the Person, Not Around Them",
        body: [
          "Where possible, involve your parent or loved one in decisions. Ask what matters most to them: staying at home, getting out more, feeling safer, reducing paperwork, or not overloading family. Support works better when it respects dignity and preferences.",
          "If capacity, safeguarding or urgent risk is involved, seek appropriate professional advice.",
        ],
      },
      {
        heading: "Look After Your Own Role",
        body: [
          "Helping a parent can quietly become a caring role. If it affects your sleep, health, work or family life, look at carers support as well as support for the older person. You do not have to wait until you are exhausted to ask what help exists.",
        ],
      },
    ],
  },
  {
    slug: "prepare-before-contacting-council",
    title: "How to Prepare Before Contacting Your Council",
    description: "A checklist-style guide to make council conversations about care, benefits and adaptations easier.",
    category: "Local Support",
    updated: "2026-05-12",
    related: [
      { label: "Find local support", href: "/locations" },
      { label: "Browse support", href: "/browse-support" },
    ],
    sections: [
      {
        heading: "Be Clear About the Main Problem",
        body: [
          "Council websites cover many services, so it helps to start with the main issue. Is the person struggling with care at home, money, mobility, housing safety, loneliness, transport, or caring responsibilities? You can mention more than one issue, but name the most urgent one first.",
          "If there is immediate danger, safeguarding risk or urgent medical need, use the relevant urgent route rather than a general enquiry form.",
        ],
      },
      {
        heading: "Gather Basic Details",
        body: [
          "Useful details can include full name, address, date of birth, phone number, GP practice, National Insurance number, current benefits, housing situation, key diagnoses, medication issues and who already helps. Not every service needs every detail, but having them nearby avoids repeated calls.",
          "If you are contacting the council for someone else, ask whether they need consent or whether the person should be present.",
        ],
      },
      {
        heading: "Describe Real-World Impact",
        body: [
          "Services usually need to understand what happens day to day. Instead of only saying someone is frail, explain whether they can wash, dress, cook, use stairs, remember medication, leave the house, manage money, or stay safe at night.",
          "Examples are helpful: two falls in a month, no hot meals without help, cannot get into the bath, or carer visiting three times a day.",
        ],
      },
      {
        heading: "Keep Notes",
        body: [
          "Write down who you spoke to, the date, any reference number and what they said would happen next. If you are juggling several services, notes can prevent confusion and help you follow up calmly.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
