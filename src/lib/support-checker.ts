import {
  BadgePoundSterling,
  BusFront,
  HandHeart,
  HeartHandshake,
  Home,
  Users,
  type LucideIcon,
} from "lucide-react";

export type CheckerCategoryId =
  | "benefits-money"
  | "adult-social-care"
  | "mobility-transport"
  | "home-adaptations"
  | "carers-support"
  | "local-charities";

export type CheckerQuestionId =
  | "role"
  | "money"
  | "daily"
  | "mobility"
  | "carer";

export type CheckerOption = {
  id: string;
  label: string;
  description: string;
  categories: CheckerCategoryId[];
};

export type CheckerQuestion = {
  id: CheckerQuestionId;
  title: string;
  helper: string;
  options: CheckerOption[];
};

export type CheckerResult = {
  id: CheckerCategoryId;
  title: string;
  summary: string;
  href: string;
  guideHref: string;
  guideLabel: string;
  icon: LucideIcon;
  color: "green" | "teal" | "blue" | "orange" | "red";
};

export const checkerQuestions: CheckerQuestion[] = [
  {
    id: "role",
    title: "Who are you looking for?",
    helper: "Choose the option that feels closest. This does not affect eligibility; it helps us order the results.",
    options: [
      {
        id: "older-person",
        label: "I am over State Pension age",
        description: "Show financial, care and local support routes for older people.",
        categories: ["benefits-money", "adult-social-care", "local-charities"],
      },
      {
        id: "helping-someone",
        label: "I am helping an older person",
        description: "Show support for carers, families and local services.",
        categories: ["carers-support", "adult-social-care", "local-charities"],
      },
      {
        id: "not-sure",
        label: "I am not sure yet",
        description: "Start with broad local guidance and common support routes.",
        categories: ["local-charities", "benefits-money"],
      },
    ],
  },
  {
    id: "money",
    title: "Do money, bills or benefits feel like the main worry?",
    helper: "This includes pension income, Council Tax, disability benefits, energy costs or cost of living help.",
    options: [
      {
        id: "yes",
        label: "Yes, please show money support",
        description: "Include benefits, Council Tax Reduction and local cost of living help.",
        categories: ["benefits-money"],
      },
      {
        id: "maybe",
        label: "Maybe, I want to check",
        description: "Include money support as a useful first check.",
        categories: ["benefits-money"],
      },
      {
        id: "no",
        label: "No, not right now",
        description: "Keep going with other types of support.",
        categories: [],
      },
    ],
  },
  {
    id: "daily",
    title: "Are daily tasks, safety or independence becoming difficult?",
    helper: "This may include washing, dressing, meals, falls, memory worries, getting around the home or staying safe.",
    options: [
      {
        id: "care",
        label: "Yes, care or safety support may help",
        description: "Include adult social care assessments and support at home.",
        categories: ["adult-social-care", "home-adaptations"],
      },
      {
        id: "home",
        label: "The home may need adapting",
        description: "Include grants, equipment and safer living at home.",
        categories: ["home-adaptations", "adult-social-care"],
      },
      {
        id: "no",
        label: "No, not at the moment",
        description: "Keep going with other possible support.",
        categories: [],
      },
    ],
  },
  {
    id: "mobility",
    title: "Do mobility, parking, transport or getting out cause problems?",
    helper: "This may include walking difficulty, hidden conditions, parking closer, accessible transport or leaving the house.",
    options: [
      {
        id: "yes",
        label: "Yes, getting around is difficult",
        description: "Include Blue Badge, mobility and local transport routes.",
        categories: ["mobility-transport", "local-charities"],
      },
      {
        id: "parking",
        label: "Parking closer would help",
        description: "Include Blue Badge and mobility guidance.",
        categories: ["mobility-transport"],
      },
      {
        id: "no",
        label: "No, not right now",
        description: "Keep going with other types of support.",
        categories: [],
      },
    ],
  },
  {
    id: "carer",
    title: "Are you an unpaid carer, or worried about a parent or loved one?",
    helper: "This includes helping with appointments, medicines, meals, money, transport, personal care or emotional support.",
    options: [
      {
        id: "carer",
        label: "Yes, I provide regular help",
        description: "Include carer's assessments, respite and local carer services.",
        categories: ["carers-support", "local-charities"],
      },
      {
        id: "worried",
        label: "I am worried and need a starting point",
        description: "Include carer support, care assessments and local charities.",
        categories: ["carers-support", "adult-social-care", "local-charities"],
      },
      {
        id: "no",
        label: "No, not currently",
        description: "Show the most relevant support based on your other answers.",
        categories: [],
      },
    ],
  },
];

export const checkerResults: Record<CheckerCategoryId, CheckerResult> = {
  "benefits-money": {
    id: "benefits-money",
    title: "Benefits & Money",
    summary: "Pension Credit, Attendance Allowance, Council Tax Reduction and local cost of living help may be worth checking.",
    href: "/browse-support/benefits-money",
    guideHref: "/guides/check-senior-benefits-entitlement",
    guideLabel: "How to check senior benefits",
    icon: BadgePoundSterling,
    color: "green",
  },
  "adult-social-care": {
    id: "adult-social-care",
    title: "Adult Social Care",
    summary: "A care needs assessment may help explain what support could make daily life safer or easier.",
    href: "/browse-support/adult-social-care",
    guideHref: "/guides/adult-social-care-assessments",
    guideLabel: "What to expect from care assessments",
    icon: HandHeart,
    color: "teal",
  },
  "mobility-transport": {
    id: "mobility-transport",
    title: "Blue Badge & Mobility",
    summary: "Blue Badge, accessible transport and mobility support may be useful if getting around is difficult.",
    href: "/browse-support/mobility-transport",
    guideHref: "/guides/blue-badge-applications-explained",
    guideLabel: "How Blue Badge applications work",
    icon: BusFront,
    color: "blue",
  },
  "home-adaptations": {
    id: "home-adaptations",
    title: "Home Adaptations",
    summary: "Equipment, minor adaptations or Disabled Facilities Grants may help make the home safer.",
    href: "/browse-support/home-adaptations",
    guideHref: "/guides/home-adaptation-grants-explained",
    guideLabel: "Home adaptation grants explained",
    icon: Home,
    color: "orange",
  },
  "carers-support": {
    id: "carers-support",
    title: "Carers Support",
    summary: "A carer's assessment, respite options and local carer services may help if you support someone regularly.",
    href: "/browse-support/carers-support",
    guideHref: "/guides/what-is-a-carers-assessment",
    guideLabel: "What is a carer's assessment?",
    icon: HeartHandshake,
    color: "red",
  },
  "local-charities": {
    id: "local-charities",
    title: "Local Charities",
    summary: "Local charities can help with advice, activities, companionship and practical community support.",
    href: "/browse-support/local-charities",
    guideHref: "/guides/local-charity-support-for-older-people",
    guideLabel: "Where to find local charity support",
    icon: Users,
    color: "teal",
  },
};

export function getCheckerMatches(answers: Partial<Record<CheckerQuestionId, string>>) {
  const scores = new Map<CheckerCategoryId, number>();

  checkerQuestions.forEach((question) => {
    const answer = answers[question.id];
    const option = question.options.find((item) => item.id === answer);
    option?.categories.forEach((categoryId, index) => {
      scores.set(categoryId, (scores.get(categoryId) || 0) + (index === 0 ? 3 : 2));
    });
  });

  if (!scores.size) {
    scores.set("benefits-money", 2);
    scores.set("adult-social-care", 2);
    scores.set("local-charities", 2);
  }

  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => checkerResults[id]);
}
