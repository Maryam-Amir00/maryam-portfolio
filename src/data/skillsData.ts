import { personalInfo } from "./personalInfo"

export type Skill = {
  id: string
  name: string
  context: string
}

export type SkillGroup = {
  id: string
  key: string
  skills: Skill[]
}

export const skillsIntro = {
  developer: personalInfo.name,
  role: personalInfo.role,
  primaryNames: ["React", "TypeScript", "Django REST Framework", "PostgreSQL"] as const,
  summary:
    "Maryam works primarily across React-based frontend development and Django REST APIs, with PostgreSQL and modern tooling supporting the full application lifecycle.",
  note: "tools evolve; engineering fundamentals stay useful.",
}

export const primaryStack: Skill[] = [
  {
    id: "react",
    name: "React",
    context: "Component-driven frontend applications",
  },
  {
    id: "typescript",
    name: "TypeScript",
    context: "Typed frontend architecture and safer application code",
  },
  {
    id: "drf",
    name: "Django REST Framework",
    context: "REST API development and backend integration",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    context: "Relational application data",
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    key: "frontend",
    skills: [
      { id: "javascript", name: "JavaScript", context: "application logic" },
      { id: "tailwind", name: "Tailwind CSS", context: "styling systems" },
      {
        id: "tanstack-query",
        name: "TanStack Query",
        context: "server-state / data fetching",
      },
      { id: "tanstack-router", name: "TanStack Router", context: "routing" },
      { id: "context-api", name: "Context API", context: "shared client state" },
      { id: "framer-motion", name: "Framer Motion", context: "UI motion" },
      { id: "gsap", name: "GSAP", context: "advanced animation" },
    ],
  },
  {
    id: "backend-api",
    key: "backendApi",
    skills: [
      { id: "python", name: "Python", context: "backend development" },
      {
        id: "rest-design",
        name: "REST API Design",
        context: "client/server contracts",
      },
      {
        id: "jwt",
        name: "JWT / SimpleJWT",
        context: "authentication flows",
      },
      { id: "axios", name: "Axios", context: "HTTP integration" },
    ],
  },
  {
    id: "data-platform",
    key: "dataPlatform",
    skills: [
      {
        id: "supabase",
        name: "Supabase",
        context: "database / platform integration",
      },
    ],
  },
  {
    id: "tooling",
    key: "tooling",
    skills: [
      { id: "git-github", name: "Git / GitHub", context: "version control" },
      { id: "docker", name: "Docker", context: "containerized development" },
      { id: "vite", name: "Vite", context: "frontend tooling / build" },
    ],
  },
  {
    id: "deployment",
    key: "deployment",
    skills: [
      { id: "vercel", name: "Vercel", context: "frontend deployment" },
      { id: "render", name: "Render", context: "application hosting" },
      { id: "netlify", name: "Netlify", context: "static / frontend hosting" },
    ],
  },
]
