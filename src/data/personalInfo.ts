export type SocialLinkId = "github" | "linkedin"

export type SocialLinks = Record<SocialLinkId, string>

export type PersonalInfo = {
  name: string
  role: string
  specialization: string
  email: string
  location: string
  headline: string
  summary: string
  focus: string
  stack: readonly string[]
  displayStack: readonly string[]
  introStack: readonly string[]
  additionalStack: readonly string[]
  socialLinks: SocialLinks
}

export const personalInfo = {
  name: "Maryam Amir",
  role: "Full-Stack Developer",
  specialization: "React + Django",
  email: "maryamamir.dev@gmail.com",
  location: "Lahore, Pakistan",
  headline: "Building scalable web applications from interface to API.",
  summary:
    "I build responsive frontends, secure APIs, and data-driven web experiences using React, Django, and PostgreSQL.",
  focus: "Full-Stack Web Development",
  stack: [
    "React",
    "TypeScript",
    "Django REST Framework",
    "PostgreSQL",
  ],
  displayStack: ["React", "TypeScript", "Django", "PostgreSQL"],
  introStack: ["React", "Django", "PostgreSQL"],
  additionalStack: [
    "Tailwind CSS",
    "TanStack Query",
    "Docker",
    "REST APIs",
  ],
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
