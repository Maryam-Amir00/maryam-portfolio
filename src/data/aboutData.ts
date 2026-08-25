import { personalInfo } from "./personalInfo"

export const aboutIntro = {
  paragraphs: [
    "I am a Full Stack Developer building across frontend and backend with React, JavaScript, Django, and PostgreSQL.",
    "My work focuses on how interfaces, APIs, authentication, data, and application structure fit together as one system.",
  ],
  quote:
    "I like understanding how the whole product fits together, from the interface a user touches to the API and data behind it.",
}

export const whatIBuild = {
  intro:
    "Most of the work I take on connects a React interface to a Django API, with authentication, data, and an operational or analytics view on top.",
  items: [
    "responsive React interfaces",
    "REST API applications",
    "authentication and role based flows",
    "analytics dashboards",
    "database backed applications",
    "reusable component systems",
  ],
}

export const engineeringPrinciples = [
  {
    id: "01",
    title: "Maintainability",
    body: "Prefer reusable components and clear boundaries over duplicated UI and one off logic.",
  },
  {
    id: "02",
    title: "Product thinking",
    body: "Understand the user journey and what the feature is actually trying to accomplish before deciding how to build it.",
  },
  {
    id: "03",
    title: "Performance",
    body: "Pay attention to data fetching, avoidable rendering work, and requests that do not need to happen.",
  },
  {
    id: "04",
    title: "Security",
    body: "Treat authentication, permissions, and protected flows as part of the architecture, not something added at the end.",
  },
  {
    id: "05",
    title: "Iteration",
    body: "Build, test, improve, and refactor rather than trying to over engineer the first version.",
  },
] as const

export const currentFocus = {
  intro:
    "I am focused on building complete web applications across frontend and backend, using React for client interfaces, Django REST Framework for APIs, and PostgreSQL for data.",
  items: [
    "frontend development",
    "backend development",
    "REST API design",
    "PostgreSQL",
    "production engineering",
  ],
} as const

export const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Superior University, Gold Campus",
  dates: "2023 → 2027",
  location: personalInfo.location,
}

export const quickProfile = [
  { label: "role", value: personalInfo.role },
  { label: "stack", value: "React · JavaScript · Django" },
  { label: "database", value: "PostgreSQL" },
  { label: "location", value: personalInfo.location },
  { label: "education", value: "BS Information Technology" },
] as const
