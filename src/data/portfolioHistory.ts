import { education } from "./aboutData"
import {
  currentExperience,
  formatExperiencePeriod,
} from "./experienceData"
import { personalInfo } from "./personalInfo"
import {
  FILE_ABOUT,
  FILE_EXPERIENCE,
  FILE_HOME,
  FILE_MOVIXXX,
  FILE_STUDYSYNC,
  FILE_STYLIQUE,
} from "./portfolioFiles"
import {
  movixxxProject,
  studySyncProject,
  styliqueProject,
} from "./projectsData"

export type PortfolioHistoryKind = "career" | "education" | "project"

export type CurrentSnapshot = {
  name: string
  role: string
  direction: string
  location: string
  relatedFileId: string
}

export type PortfolioHistoryEntry = {
  id: string
  kind: PortfolioHistoryKind
  title: string
  subtitle?: string
  focus?: string
  period?: string
  location?: string
  summary: string
  highlights?: readonly string[]
  technologies?: readonly string[]
  metric?: string
  isCurrent?: boolean
  relatedFileId: string
}

export const currentSnapshot: CurrentSnapshot = {
  name: personalInfo.name,
  role: personalInfo.role,
  direction: personalInfo.specialization,
  location: personalInfo.location,
  relatedFileId: FILE_HOME,
}

export const careerMilestones: readonly PortfolioHistoryEntry[] = [
  {
    id: `career-${currentExperience.id}`,
    kind: "career",
    title: currentExperience.role,
    subtitle: currentExperience.company,
    period: formatExperiencePeriod(currentExperience),
    location: currentExperience.location,
    summary:
      "Frontend engineering for a multi tenant POS SaaS environment across reusable UI architecture, authentication, dashboards, and API driven application flows.",
    highlights: [
      "Reusable React architecture",
      "JWT / RBAC flows",
      "Dashboard and API driven UI",
    ],
    technologies: ["React", "JWT", "TanStack Query"],
    isCurrent: currentExperience.employmentStatus === "current",
    relatedFileId: FILE_EXPERIENCE,
  },
]

export const educationMilestones: readonly PortfolioHistoryEntry[] = [
  {
    id: "education-bs-it",
    kind: "education",
    title: education.degree,
    subtitle: education.school,
    period: education.dates,
    location: education.location,
    summary: `${education.degree} at ${education.school}.`,
    relatedFileId: FILE_ABOUT,
  },
]

export const projectSnapshots: readonly PortfolioHistoryEntry[] = [
  {
    id: `project-${studySyncProject.id}`,
    kind: "project",
    title: studySyncProject.name,
    subtitle: studySyncProject.subtitle,
    focus: "Full Stack Engineering",
    summary:
      "React + Django REST Framework application using PostgreSQL, TanStack Query, TanStack Router and JWT based authentication.",
    technologies: studySyncProject.introStack,
    relatedFileId: FILE_STUDYSYNC,
  },
  {
    id: `project-${movixxxProject.id}`,
    kind: "project",
    title: movixxxProject.name,
    subtitle: movixxxProject.subtitle,
    focus: "Frontend Data Flow",
    summary:
      "React application using the OMDb API, debounced search and persistent watchlist state.",
    technologies: ["React", "OMDb API", "Context API"],
    metric: `${movixxxProject.metric.value} ${movixxxProject.metric.label}`,
    relatedFileId: FILE_MOVIXXX,
  },
  {
    id: `project-${styliqueProject.id}`,
    kind: "project",
    title: styliqueProject.name,
    subtitle: styliqueProject.subtitle,
    focus: styliqueProject.role,
    summary:
      "React storefront using Context API, React Router, persistent cart/wishlist state and a mobile first reusable UI structure.",
    technologies: styliqueProject.introStack,
    metric: "10+ routed views",
    relatedFileId: FILE_STYLIQUE,
  },
]
