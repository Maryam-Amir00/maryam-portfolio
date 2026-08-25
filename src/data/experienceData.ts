export type ExperienceMetric = {
  id: string
  value: string
  label: string
  qualifier?: string
}

export type ExperienceHighlight = {
  id: string
  index: string
  title: string
  description: string
  technologies: string[]
}

export type WorkflowItem = {
  id: string
  key: string
  value: string
}

export type ExperienceEntry = {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  startDateDisplay: string
  endDate: string
  endDateDisplay: string
  employmentStatus: "current" | "previous"
  productContext: string
  summary: string
  note: string
  metrics: ExperienceMetric[]
  highlights: ExperienceHighlight[]
  workflow: WorkflowItem[]
  stack: string[]
}

export const currentExperience: ExperienceEntry = {
  id: "utility-access-services",
  role: "Frontend Developer Intern",
  company: "Utility Access Services",
  location: "Lahore, Pakistan",
  startDate: "2026-05",
  startDateDisplay: "May 2026",
  endDate: "2026-07",
  endDateDisplay: "July 2026",
  employmentStatus: "previous",
  productContext: "multi tenant POS SaaS platform",
  summary:
    "I contributed to frontend development for a multi tenant POS SaaS platform, working across reusable UI architecture, authentication flows, dashboards, REST API integrations, and application data fetching performance.",
  note: "Production UI is an engineering system, not a collection of screens.",
  metrics: [
    {
      id: "ui-duplication",
      value: "~30%",
      label: "Less duplicate UI code",
    },
    {
      id: "dashboards",
      value: "5+",
      label: "Interactive dashboards",
    },
    {
      id: "api-refetch",
      value: "~20%",
      label: "Fewer unnecessary API refetches",
    },
    {
      id: "rbac-roles",
      value: "3+",
      label: "User roles with RBAC",
    },
  ],
  highlights: [
    {
      id: "reusable-ui",
      index: "01",
      title: "Reusable UI Architecture",
      description:
        "Built a reusable React component library for client facing modules of the multi tenant POS SaaS platform, reducing duplicate interface code by an estimated 30%.",
      technologies: ["React"],
    },
    {
      id: "auth-rbac",
      index: "02",
      title: "Authentication and Access Control",
      description:
        "Implemented frontend JWT authentication flows, protected routes, and role based access control across 3+ user roles, integrated with backend REST APIs.",
      technologies: ["JWT", "REST APIs", "Protected Routes", "RBAC"],
    },
    {
      id: "saas-dashboards",
      index: "03",
      title: "Interactive SaaS Dashboards",
      description:
        "Built 5+ interactive dashboards using React, Recharts, and GSAP, improving visibility into business metrics for platform users.",
      technologies: ["React", "Recharts", "GSAP"],
    },
    {
      id: "data-fetching",
      index: "04",
      title: "API Data Flow Optimization",
      description:
        "Optimized frontend data fetching patterns with TanStack Query and token refresh logic, reducing unnecessary API refetches by an estimated 20%.",
      technologies: ["TanStack Query", "REST APIs", "Token Refresh"],
    },
  ],
  workflow: [
    { id: "agile", key: "workflow.agile", value: "2 week Agile sprints" },
    { id: "versioning", key: "workflow.versioning", value: "Git" },
    { id: "containers", key: "workflow.containers", value: "Docker" },
    { id: "data", key: "workflow.data", value: "PostgreSQL / Supabase" },
    { id: "apis", key: "workflow.apis", value: "REST" },
    { id: "frontend-data", key: "workflow.frontendData", value: "TanStack Query" },
  ],
  stack: [
    "React",
    "TanStack Query",
    "JWT",
    "REST APIs",
    "Recharts",
    "GSAP",
    "Git",
    "Docker",
    "PostgreSQL",
    "Supabase",
  ],
}

export function formatExperiencePeriod(entry: ExperienceEntry) {
  return `${entry.startDateDisplay} → ${entry.endDateDisplay}`
}
