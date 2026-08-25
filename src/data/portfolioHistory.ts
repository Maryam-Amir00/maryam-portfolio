import { education, quickProfile } from "./aboutData"
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
  stack: string
  location: string
  relatedFileId: string
}

export type PortfolioHistoryEntry = {
  id: string
  kind: PortfolioHistoryKind
  title: string
  subtitle?: string
  period?: string
  location?: string
  proof?: string
  technologies?: readonly string[]
  relatedFileId: string
}

const educationTitle =
  quickProfile.find((item) => item.label === "education")?.value ??
  education.degree

export const currentSnapshot: CurrentSnapshot = {
  name: personalInfo.name,
  role: personalInfo.role,
  stack: personalInfo.displayStack.slice(0, 3).join(" · "),
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
    proof: "Reusable UI, authentication, dashboards",
    technologies: ["React", "JWT", "TanStack Query"],
    relatedFileId: FILE_EXPERIENCE,
  },
]

export const educationMilestones: readonly PortfolioHistoryEntry[] = [
  {
    id: "education-bs-it",
    kind: "education",
    title: educationTitle,
    subtitle: education.school,
    period: education.dates,
    location: education.location,
    relatedFileId: FILE_ABOUT,
  },
]

export const projectSnapshots: readonly PortfolioHistoryEntry[] = [
  {
    id: `project-${studySyncProject.id}`,
    kind: "project",
    title: studySyncProject.name,
    subtitle: studySyncProject.subtitle,
    technologies: studySyncProject.introStack.slice(0, 4),
    relatedFileId: FILE_STUDYSYNC,
  },
  {
    id: `project-${movixxxProject.id}`,
    kind: "project",
    title: movixxxProject.name,
    subtitle: movixxxProject.subtitle,
    technologies: ["React", "OMDb API", "Context API"],
    relatedFileId: FILE_MOVIXXX,
  },
  {
    id: `project-${styliqueProject.id}`,
    kind: "project",
    title: styliqueProject.name,
    subtitle: styliqueProject.subtitle,
    technologies: styliqueProject.introStack.slice(0, 4),
    relatedFileId: FILE_STYLIQUE,
  },
]
