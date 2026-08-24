import { personalInfo } from "./personalInfo"

export const aboutIntro = {
  paragraphs: [
    "Maryam Amir is a Full-Stack Developer working primarily with React and Django. Her work sits across the parts of a product that have to stay in agreement: interfaces, REST APIs, authentication, dashboards, and PostgreSQL-backed data.",
    "She is more interested in software that stays readable and useful than in surfaces that only look finished. That means paying attention to how a feature is structured, how data moves, and how the next change will land.",
  ],
  quote:
    "I like understanding how the whole product fits together — from the interface a user touches to the API and data behind it.",
}

export const whatIBuild = {
  intro:
    "Most of the work she takes on is full-stack in a practical sense: a React interface talking to a Django API, with auth, data, and an operational or analytics view on top.",
  items: [
    "responsive React interfaces",
    "REST API-driven applications",
    "authentication and role-based flows",
    "analytics dashboards and data visualization",
    "database-backed web applications",
    "reusable frontend components",
  ],
}

export const engineeringPrinciples = [
  {
    id: "01",
    title: "Maintainability",
    body: "Prefer reusable components and clear boundaries over duplicated UI and one-off logic.",
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
    body: "Build, test, improve, and refactor rather than trying to over-engineer the first version.",
  },
] as const

export const currentFocus = {
  intro:
    "She is currently focused on deepening full-stack application architecture — moving from making features work toward clearer patterns around scalability, maintainability, and production practices.",
  items: [
    "full-stack architecture",
    "scalable React patterns",
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
  { label: "stack", value: personalInfo.specialization },
  { label: "database", value: "PostgreSQL" },
  { label: "location", value: personalInfo.location },
  { label: "education", value: "BS Information Technology" },
] as const
