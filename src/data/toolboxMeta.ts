import {
  FILE_EXPERIENCE,
  FILE_MOVIXXX,
  FILE_STUDYSYNC,
  FILE_STYLIQUE,
} from "./portfolioFiles"
import { primaryStack, skillGroups, type Skill } from "./skillsData"

export const WORKSPACE_TOOLBOX_INPUT_ID = "workspace-toolbox-filter"

export type ToolboxSkillId =
  | "react"
  | "typescript"
  | "drf"
  | "postgresql"
  | "javascript"
  | "tailwind"
  | "tanstack-query"
  | "tanstack-router"
  | "context-api"
  | "framer-motion"
  | "gsap"
  | "python"
  | "jwt"
  | "rest-design"
  | "axios"
  | "supabase"
  | "git-github"
  | "docker"
  | "vite"
  | "vercel"
  | "render"
  | "netlify"

type ToolboxSkillMeta = {
  marker: string
  description: string
  keywords: readonly string[]
  evidenceFileIds: readonly string[]
}

export type ToolboxEntry = {
  id: ToolboxSkillId
  name: string
  marker: string
  description: string
  isCore: boolean
  keywords: readonly string[]
  categoryTerms: readonly string[]
  evidenceFileIds: readonly string[]
}

export type ToolboxCategory = {
  id: string
  heading: string
  categoryTerms: readonly string[]
  entries: ToolboxEntry[]
}

const toolboxMeta: Record<ToolboxSkillId, ToolboxSkillMeta> = {
  react: {
    marker: "Rx",
    description: "Component driven frontend applications",
    keywords: ["frontend", "components", "ui", "interface"],
    evidenceFileIds: [FILE_EXPERIENCE, FILE_STUDYSYNC, FILE_MOVIXXX],
  },
  typescript: {
    marker: "TS",
    description: "Typed JavaScript development",
    keywords: ["typed", "types", "typescript"],
    evidenceFileIds: [FILE_STUDYSYNC],
  },
  drf: {
    marker: "DJ",
    description: "REST API development",
    keywords: ["django", "backend", "api", "rest", "drf"],
    evidenceFileIds: [FILE_STUDYSYNC],
  },
  postgresql: {
    marker: "PG",
    description: "Relational application data",
    keywords: ["database", "sql", "data"],
    evidenceFileIds: [FILE_EXPERIENCE, FILE_STUDYSYNC],
  },
  javascript: {
    marker: "JS",
    description: "Frontend application logic and development",
    keywords: ["frontend", "logic", "javascript", "js"],
    evidenceFileIds: [FILE_MOVIXXX, FILE_STYLIQUE],
  },
  tailwind: {
    marker: "TW",
    description: "Responsive UI styling",
    keywords: ["css", "styling", "ui", "responsive"],
    evidenceFileIds: [FILE_STUDYSYNC, FILE_MOVIXXX, FILE_STYLIQUE],
  },
  "tanstack-query": {
    marker: "TQ",
    description: "Server state and data fetching",
    keywords: ["state", "server", "fetching", "query"],
    evidenceFileIds: [FILE_EXPERIENCE, FILE_STUDYSYNC],
  },
  "tanstack-router": {
    marker: "TR",
    description: "Type safe client side routing",
    keywords: ["routing", "router", "navigation"],
    evidenceFileIds: [FILE_STUDYSYNC],
  },
  "context-api": {
    marker: "CTX",
    description: "Shared React state",
    keywords: ["state", "shared", "client"],
    evidenceFileIds: [FILE_MOVIXXX, FILE_STYLIQUE],
  },
  "framer-motion": {
    marker: "FM",
    description: "Interface motion",
    keywords: ["animation", "motion", "ui"],
    evidenceFileIds: [],
  },
  gsap: {
    marker: "GS",
    description: "Interactive animation",
    keywords: ["animation", "motion"],
    evidenceFileIds: [FILE_EXPERIENCE],
  },
  python: {
    marker: "PY",
    description: "Backend development",
    keywords: ["backend"],
    evidenceFileIds: [],
  },
  jwt: {
    marker: "JWT",
    description: "Authentication flows",
    keywords: ["auth", "authentication", "authorization", "token", "security"],
    evidenceFileIds: [FILE_EXPERIENCE, FILE_STUDYSYNC],
  },
  "rest-design": {
    marker: "API",
    description: "Frontend/backend contracts",
    keywords: ["api", "rest", "backend", "contracts"],
    evidenceFileIds: [FILE_EXPERIENCE, FILE_STUDYSYNC],
  },
  axios: {
    marker: "AX",
    description: "HTTP integration",
    keywords: ["api", "http", "request", "client"],
    evidenceFileIds: [],
  },
  supabase: {
    marker: "SB",
    description: "Database/platform integration",
    keywords: ["database", "sql", "platform", "data"],
    evidenceFileIds: [FILE_EXPERIENCE],
  },
  "git-github": {
    marker: "GT",
    description: "Version control and collaboration",
    keywords: ["git", "github", "version", "control"],
    evidenceFileIds: [FILE_EXPERIENCE],
  },
  docker: {
    marker: "DK",
    description: "Containerized development",
    keywords: ["container", "tooling", "development"],
    evidenceFileIds: [FILE_EXPERIENCE],
  },
  vite: {
    marker: "VT",
    description: "Frontend tooling and builds",
    keywords: ["build", "tooling", "bundler"],
    evidenceFileIds: [FILE_STUDYSYNC],
  },
  vercel: {
    marker: "VL",
    description: "Frontend deployment",
    keywords: ["deployment", "hosting", "platform"],
    evidenceFileIds: [],
  },
  render: {
    marker: "RN",
    description: "Application deployment",
    keywords: ["deployment", "hosting", "platform"],
    evidenceFileIds: [],
  },
  netlify: {
    marker: "NL",
    description: "Frontend deployment",
    keywords: ["deployment", "hosting", "platform"],
    evidenceFileIds: [],
  },
}

const skillsById = new Map<string, Skill>(
  [...primaryStack, ...skillGroups.flatMap((group) => group.skills)].map(
    (skill) => [skill.id, skill],
  ),
)

function entryFor(
  id: ToolboxSkillId,
  categoryTerms: readonly string[],
  isCore = false,
): ToolboxEntry {
  const skill = skillsById.get(id)
  const meta = toolboxMeta[id]

  return {
    id,
    name: skill?.name ?? id,
    marker: meta.marker,
    description: meta.description,
    isCore,
    keywords: meta.keywords,
    categoryTerms,
    evidenceFileIds: meta.evidenceFileIds,
  }
}

const CATEGORY_DEFS = [
  {
    id: "core-stack",
    heading: "Core Stack",
    categoryTerms: ["core", "core stack", "stack"],
    skillIds: ["react", "javascript", "drf", "postgresql"] as const,
    isCore: true,
  },
  {
    id: "frontend",
    heading: "Frontend",
    categoryTerms: ["frontend"],
    skillIds: [
      "typescript",
      "tailwind",
      "tanstack-query",
      "tanstack-router",
      "context-api",
      "framer-motion",
      "gsap",
    ] as const,
    isCore: false,
  },
  {
    id: "backend-api",
    heading: "Backend & APIs",
    categoryTerms: ["backend"],
    skillIds: ["python", "jwt", "rest-design", "axios"] as const,
    isCore: false,
  },
  {
    id: "data-platform",
    heading: "Data & Platform",
    categoryTerms: ["data", "platform"],
    skillIds: ["supabase"] as const,
    isCore: false,
  },
  {
    id: "tooling",
    heading: "Tooling",
    categoryTerms: ["tooling"],
    skillIds: ["git-github", "docker", "vite"] as const,
    isCore: false,
  },
  {
    id: "deployment",
    heading: "Deployment",
    categoryTerms: ["deployment"],
    skillIds: ["vercel", "render", "netlify"] as const,
    isCore: false,
  },
] as const

export const toolboxCategories: readonly ToolboxCategory[] = CATEGORY_DEFS.map(
  (category) => ({
    id: category.id,
    heading: category.heading,
    categoryTerms: category.categoryTerms,
    entries: category.skillIds.map((skillId) =>
      entryFor(skillId, category.categoryTerms, category.isCore),
    ),
  }),
)

export function technologyMatchesQuery(entry: ToolboxEntry, query: string) {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return true
  }

  const fields = [
    entry.name,
    entry.description,
    ...entry.categoryTerms,
    ...entry.keywords,
  ]

  return fields.some((field) => field.toLowerCase().includes(normalized))
}

export function filterToolboxCategories(query: string): ToolboxCategory[] {
  return toolboxCategories.flatMap((category) => {
    const entries = category.entries.filter((entry) =>
      technologyMatchesQuery(entry, query),
    )

    return entries.length > 0 ? [{ ...category, entries }] : []
  })
}
