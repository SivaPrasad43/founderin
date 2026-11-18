export const MEMBER_ROLES = ["founder", "investor", "associate", "mentor"] as const
export type MemberRole = (typeof MEMBER_ROLES)[number]

export const ROLE_META: Record<MemberRole, { label: string; short: string; description: string }> = {
  founder: {
    label: "Founder / Co-founder",
    short: "Founder",
    description: "You're building a startup and want to share the journey.",
  },
  investor: {
    label: "Investor",
    short: "Investor",
    description: "You back founders and want to discover what's being built.",
  },
  associate: {
    label: "Associate / Specialist",
    short: "Associate",
    description: "You offer expertise or services that help startups grow.",
  },
  mentor: {
    label: "Mentor",
    short: "Mentor",
    description: "You guide founders with experience and perspective.",
  },
}

export const INVESTOR_TYPES = [
  { value: "individual", label: "Individual investor" },
  { value: "vc", label: "VC / investment firm" },
  { value: "family-office", label: "Family office" },
  { value: "team", label: "Investment team / office representative" },
  { value: "network", label: "Angel network / investment group" },
] as const

export const SPECIALTIES = [
  { value: "design", label: "Design & branding" },
  { value: "ecommerce", label: "E-commerce & automation" },
  { value: "marketing", label: "Marketing & growth" },
  { value: "technology", label: "Web & app development" },
  { value: "finance", label: "Finance, legal & compliance" },
  { value: "operations", label: "Operations & strategy" },
  { value: "other", label: "Other specialist services" },
] as const

export type InvestorType = (typeof INVESTOR_TYPES)[number]["value"]
export type Specialty = (typeof SPECIALTIES)[number]["value"]

export const JOURNEY_STEPS = [
  { number: "01", name: "Build your presence" },
  { number: "02", name: "Share your journey" },
  { number: "03", name: "Get discovered" },
] as const

export const INFO_DIALOGS = {
  platform: {
    label: "The platform / 01",
    heading: "Progress, made visible.",
    description:
      "FounderIn is being developed as a dedicated space to showcase startups, share founder journeys, and build investor-ready startup profiles over time. The platform is currently in its early community phase.",
  },
  investors: {
    label: "For investors / 02",
    heading: "Discover what’s being built.",
    description:
      "FounderIn aims to help investors find emerging startups through founder updates, structured company profiles, and evidence of progress. Investor discovery features are planned; this page does not imply an existing investor network.",
  },
} as const

export const ROADMAP = [
  {
    status: "live",
    title: "Founding community",
    description: "Meet early members on WhatsApp and help shape the platform.",
  },
  {
    status: "next",
    title: "Startup profiles",
    description: "A structured home for what you're building — team, traction, milestones.",
  },
  {
    status: "planned",
    title: "Journey updates",
    description: "Document progress publicly and build a visible track record.",
  },
  {
    status: "planned",
    title: "Discovery",
    description: "Help the right investors, mentors and specialists find you.",
  },
] as const
