import { isSafeHttpsUrl } from "../utils/externalLinks"

export type SocialLinkId = "github" | "linkedin"

export type SocialLinks = Record<SocialLinkId, string>

export type PersonalInfo = {
  name: string
  role: string
  specialization: string
  email: string
  phone: string
  location: string
  headline: string
  summary: string
  focus: string
  stack: readonly string[]
  displayStack: readonly string[]
  introStack: readonly string[]
  additionalStack: readonly string[]
  introFocus: readonly string[]
  linkedin: string
  github: string
  socialLinks: SocialLinks
}

export const personalInfo = {
  name: "Maryam Amir",
  role: "Full Stack Developer",
  specialization: "React + Django",
  email: "maryamamir.dev@gmail.com",
  phone: "+92 326 4769007",
  location: "Lahore, Pakistan",
  headline:
    "I build full stack web applications, from responsive React interfaces to Django APIs and database driven backend systems.",
  summary:
    "I build full stack web applications, from responsive React interfaces to Django APIs and database driven backend systems.",
  focus: "Full Stack Web Development",
  introFocus: ["Frontend", "Backend", "APIs"],
  stack: [
    "React",
    "JavaScript",
    "Django REST Framework",
    "PostgreSQL",
  ],
  displayStack: ["React", "JavaScript", "Django", "PostgreSQL"],
  introStack: ["React", "JavaScript", "Django", "PostgreSQL"],
  additionalStack: [
    "TypeScript",
    "Tailwind CSS",
    "TanStack Query",
    "Docker",
    "REST APIs",
  ],
  linkedin: "https://www.linkedin.com/in/maryam-amir-798348312/",
  github: "https://github.com/Maryam-Amir00",
  socialLinks: {
    github: "",
    linkedin: "",
  },
} as const satisfies PersonalInfo

const socialLabels: Record<SocialLinkId, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
}

export function getVisibleSocialLinks() {
  return (Object.keys(personalInfo.socialLinks) as SocialLinkId[])
    .map((id) => {
      const href = personalInfo.socialLinks[id].trim()
      return href ? { id, href, label: socialLabels[id] } : null
    })
    .filter((link) => link !== null)
}

export function getContactEmail() {
  const email = personalInfo.email.trim()
  return email ? email : undefined
}

export function getContactPhone() {
  const display = personalInfo.phone.trim()
  const href = toTelHref(display)

  return display && href ? { display, href } : undefined
}

export function getContactLinkedInUrl() {
  return toSafeHttpsUrl(personalInfo.linkedin)
}

export function getContactGitHubUrl() {
  return toSafeHttpsUrl(personalInfo.github)
}

function toSafeHttpsUrl(value: string) {
  const trimmed = value.trim()
  return isSafeHttpsUrl(trimmed) ? trimmed : undefined
}

function toTelHref(value: string) {
  if (!value) {
    return undefined
  }

  const compact = value.replace(/[^\d+]/g, "")

  if (!/^\+\d{8,15}$/.test(compact)) {
    return undefined
  }

  return `tel:${compact}`
}
