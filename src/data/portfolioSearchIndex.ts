import { aboutIntro, currentFocus, education, engineeringPrinciples, whatIBuild } from "./aboutData"
import { contactCopy } from "./contactData"
import { currentExperience } from "./experienceData"
import { personalInfo } from "./personalInfo"
import {
  FILE_ABOUT,
  FILE_CONTACT,
  FILE_EXPERIENCE,
  FILE_HOME,
  FILE_MOVIXXX,
  FILE_RESUME,
  FILE_SKILLS,
  FILE_STUDYSYNC,
  FILE_STYLIQUE,
  findFileById,
  openedFileLabel,
} from "./portfolioFiles"
import { movixxxProject, studySyncProject, styliqueProject } from "./projectsData"
import { resumeData, resumeMeta } from "./resumeData"
import { primaryStack, skillGroups, skillsIntro } from "./skillsData"
import type { SearchEntry, SearchEntryKind } from "../types/search"

const skillGroupLabels: Record<string, string> = {
  frontend: "Frontend",
  backendApi: "Backend & APIs",
  dataPlatform: "Data & Platform",
  tooling: "Tooling",
  deployment: "Deployment",
}

function entry(
  id: string,
  fileId: string,
  kind: SearchEntryKind,
  section: string,
  title: string,
  text: string,
  keywords: readonly string[] = [],
): SearchEntry | null {
  const file = findFileById(fileId)

  if (!file) {
    return null
  }

  return {
    id,
    fileId,
    fileName: file.name,
    path: openedFileLabel(file),
    section,
    title,
    text,
    keywords,
    kind,
  }
}

function collect(entries: Array<SearchEntry | null>): SearchEntry[] {
  return entries.flatMap((item) => (item ? [item] : []))
}

const homeEntries = collect([
  entry(
    "home-identity",
    FILE_HOME,
    "identity",
    "Identity",
    personalInfo.name,
    `${personalInfo.role}. ${personalInfo.specialization}.`,
    [
      personalInfo.role,
      personalInfo.specialization,
      personalInfo.focus,
      "home",
      "frontend",
      "backend",
      ...personalInfo.introFocus,
      ...personalInfo.stack,
    ],
  ),
  entry(
    "home-stack",
    FILE_HOME,
    "identity",
    "Primary stack",
    personalInfo.displayStack.join(" · "),
    personalInfo.stack.join(" · "),
    [...personalInfo.stack, ...personalInfo.additionalStack],
  ),
  entry(
    "home-location",
    FILE_HOME,
    "identity",
    "Location",
    personalInfo.location,
    personalInfo.location,
    ["lahore", "pakistan"],
  ),
])

const aboutEntries = collect([
  entry(
    "about-me",
    FILE_ABOUT,
    "about",
    "About Me",
    "About Me",
    aboutIntro.paragraphs[0],
    ["full stack development", "full-stack development", "react", "django", "authentication", "dashboards", "postgresql", "about"],
  ),
  entry(
    "about-build",
    FILE_ABOUT,
    "about",
    "What I Build",
    "What I Build",
    whatIBuild.items.join(", "),
    ["react", "rest api", "authentication", "dashboards", "postgresql"],
  ),
  ...engineeringPrinciples.map((principle) =>
    entry(
      `about-principle-${principle.id}`,
      FILE_ABOUT,
      "about",
      "Engineering Approach",
      principle.title,
      principle.body,
      [principle.title],
    ),
  ),
  entry(
    "about-focus",
    FILE_ABOUT,
    "about",
    "Current Focus",
    "Current Focus",
    `${currentFocus.intro} ${currentFocus.items.join(", ")}`,
    [...currentFocus.items, "scalability"],
  ),
  entry(
    "about-education",
    FILE_ABOUT,
    "about",
    "Education",
    education.school,
    `${education.degree} at ${education.school}.`,
    ["superior university", "bs information technology", education.location],
  ),
])

const experienceEntries = collect([
  entry(
    "experience-role",
    FILE_EXPERIENCE,
    "experience",
    currentExperience.company,
    `${currentExperience.role} · ${currentExperience.company}`,
    `${currentExperience.summary} Product: ${currentExperience.productContext}.`,
    [
      currentExperience.company,
      currentExperience.productContext,
      currentExperience.role,
      currentExperience.location,
      "experience",
      "intern",
      "agile",
      ...currentExperience.stack,
    ],
  ),
  ...currentExperience.highlights.map((highlight) =>
    entry(
      `experience-highlight-${highlight.id}`,
      FILE_EXPERIENCE,
      "experience",
      highlight.title,
      highlight.title,
      highlight.description,
      highlight.technologies,
    ),
  ),
  entry(
    "experience-metric-ui",
    FILE_EXPERIENCE,
    "experience",
    "Reusable UI Architecture",
    "Less duplicate UI code",
    "Built a reusable React component library, reducing duplicate interface code by an estimated 30%.",
    ["30%", "~30%", "duplicate ui"],
  ),
  entry(
    "experience-metric-dashboards",
    FILE_EXPERIENCE,
    "experience",
    "Interactive SaaS Dashboards",
    "5+ interactive dashboards",
    "Built 5+ interactive dashboards using React, Recharts, and GSAP.",
    ["dashboard", "5+", "recharts", "gsap"],
  ),
  entry(
    "experience-metric-api",
    FILE_EXPERIENCE,
    "experience",
    "API Data Flow Optimization",
    "Fewer unnecessary API refetches",
    "Optimized frontend data fetching with TanStack Query, reducing unnecessary API refetches by an estimated 20%.",
    ["20%", "~20%", "tanstack query", "react query"],
  ),
  entry(
    "experience-metric-rbac",
    FILE_EXPERIENCE,
    "experience",
    "Authentication and Access Control",
    "User roles with RBAC",
    "Role based access control across 3+ user roles with JWT authentication and protected routes.",
    ["3+", "rbac", "jwt"],
  ),
])

const skillEntries = collect([
  entry(
    "skills-overview",
    FILE_SKILLS,
    "skill",
    "Skills",
    "Core Stack",
    skillsIntro.summary,
    ["skills", "stack", "technology", "tech", ...skillsIntro.primaryNames],
  ),
  ...primaryStack.map((skill) =>
    entry(
      `skill-core-${skill.id}`,
      FILE_SKILLS,
      "skill",
      "Core Stack",
      skill.name,
      skill.context,
      [skill.name],
    ),
  ),
  ...skillGroups.flatMap((group) =>
    group.skills.map((skill) =>
      entry(
        `skill-${group.id}-${skill.id}`,
        FILE_SKILLS,
        "skill",
        skillGroupLabels[group.key] ?? group.key,
        skill.name,
        skill.context,
        skill.name === "Git / GitHub"
          ? ["git", "github"]
          : skill.name === "JWT / SimpleJWT"
            ? ["jwt", "simplejwt", "authentication"]
            : skill.name === "TanStack Query"
              ? ["tanstack query", "react query"]
              : skill.name === "TanStack Router"
                ? ["tanstack router", "routing"]
                : [skill.name],
      ),
    ),
  ),
])

const studySyncEntries = collect([
  entry(
    "studysync-overview",
    FILE_STUDYSYNC,
    "project",
    studySyncProject.name,
    `${studySyncProject.name} · ${studySyncProject.subtitle}`,
    studySyncProject.summary,
    [
      studySyncProject.name,
      studySyncProject.subtitle,
      ...studySyncProject.introStack,
      "rest apis",
      "communities",
    ],
  ),
  ...studySyncProject.features.map((feature) =>
    entry(
      `studysync-feature-${feature.id}`,
      FILE_STUDYSYNC,
      "project",
      feature.title,
      feature.title,
      feature.description,
      feature.id === "analytics" ? ["dashboard", "analytics"] : [feature.title],
    ),
  ),
  entry(
    "studysync-routing",
    FILE_STUDYSYNC,
    "project",
    "Type Safe Routing",
    "Type Safe Routing",
    studySyncProject.engineeringDecisions[0]?.outcome ??
      "Used TanStack Router to implement type safe routing.",
    ["tanstack router", "routing"],
  ),
  entry(
    "studysync-server-state",
    FILE_STUDYSYNC,
    "project",
    "Server State Management",
    "Server State Management",
    "Used TanStack Query to manage and optimize server state and data fetching behavior.",
    ["tanstack query", "react query", "server-state"],
  ),
  entry(
    "studysync-auth",
    FILE_STUDYSYNC,
    "project",
    "Secure Authentication",
    "JWT authentication",
    "Integrated JWT authentication to secure application access and API interactions.",
    ["jwt", "authentication", "rest apis"],
  ),
])

const movixxxEntries = collect([
  entry(
    "movixxx-overview",
    FILE_MOVIXXX,
    "project",
    movixxxProject.name,
    `${movixxxProject.name} · ${movixxxProject.subtitle}`,
    movixxxProject.summary,
    ["movixxx", "movie search app", "react", "omdb", "watchlist"],
  ),
  entry(
    "movixxx-debounce",
    FILE_MOVIXXX,
    "project",
    "Debounced Search",
    "~40% fewer redundant API calls through debounced search",
    `${movixxxProject.metric.value} ${movixxxProject.metric.label} ${movixxxProject.metric.context}. ${movixxxProject.features[0]?.description ?? ""}`,
    ["40%", "~40%", "debounce", "debouncing", "omdb"],
  ),
  entry(
    "movixxx-omdb",
    FILE_MOVIXXX,
    "project",
    "API Integration",
    "OMDb API",
    "Integrates movie search data through the OMDb API.",
    ["omdb", "api"],
  ),
  entry(
    "movixxx-watchlist",
    FILE_MOVIXXX,
    "project",
    "Persistent Watchlist",
    "Context API + localStorage",
    movixxxProject.features[2]?.description ??
      "Uses Context API and localStorage to preserve user selected movies across sessions.",
    ["context api", "localstorage", "watchlist", "persistent state"],
  ),
  entry(
    "movixxx-ui",
    FILE_MOVIXXX,
    "project",
    "Responsive Results",
    "Loading states and sortable UI",
    "Implemented loading states and a responsive, sortable movie result UI.",
    ["loading states", "responsive ui", "sortable ui"],
  ),
])

const styliqueEntries = collect([
  entry(
    "stylique-overview",
    FILE_STYLIQUE,
    "project",
    styliqueProject.name,
    `${styliqueProject.name} · ${styliqueProject.subtitle}`,
    styliqueProject.summary,
    ["stylique", "ecommerce", "cart", "wishlist", "react"],
  ),
  entry(
    "stylique-routing",
    FILE_STYLIQUE,
    "project",
    "Client side routing",
    "10+ client side routed views",
    `${styliqueProject.routing.metricValue} ${styliqueProject.routing.metricLabel}, ${styliqueProject.routing.metricContext}.`,
    ["10+", "react router", "routing"],
  ),
  entry(
    "stylique-api",
    FILE_STYLIQUE,
    "project",
    "Product Data",
    "Fake Store API",
    "Fake Store API supplies product data for the storefront.",
    ["fake store api", "api"],
  ),
  entry(
    "stylique-state",
    FILE_STYLIQUE,
    "project",
    "Shared State",
    "Cart and wishlist",
    "Context API manages shared cart and wishlist state with persistent browser storage.",
    ["cart", "wishlist", "context api", "persistent storage"],
  ),
  entry(
    "stylique-mobile",
    FILE_STYLIQUE,
    "project",
    "Mobile first layout",
    "Mobile first",
    styliqueProject.mobileFirst.summary,
    ["mobile-first", "reusable components"],
  ),
])

const contactEntries = collect([
  entry(
    "contact-overview",
    FILE_CONTACT,
    "contact",
    "Contact",
    contactCopy.kicker,
    contactCopy.intro,
    ["contact", "message", "compose email"],
  ),
  entry(
    "contact-email",
    FILE_CONTACT,
    "contact",
    "Email",
    personalInfo.email,
    "Copy Email or compose a message to reach Maryam directly.",
    ["email", "copy email", "compose email", personalInfo.email],
  ),
])

const resumeEntries = collect([
  entry(
    "resume-meta",
    FILE_RESUME,
    "resume",
    "Resume",
    resumeData.displayName,
    `${personalInfo.name}, ${personalInfo.role}. ${personalInfo.specialization}. ${resumeMeta[1]?.value ?? "PDF"}.`,
    ["resume", "cv", "pdf", "email", personalInfo.email],
  ),
])

export const portfolioSearchIndex: SearchEntry[] = [
  ...homeEntries,
  ...aboutEntries,
  ...experienceEntries,
  ...skillEntries,
  ...studySyncEntries,
  ...movixxxEntries,
  ...styliqueEntries,
  ...contactEntries,
  ...resumeEntries,
]
