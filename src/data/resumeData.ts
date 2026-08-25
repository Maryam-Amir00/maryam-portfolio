import { personalInfo } from "./personalInfo"

export const resumeData = {
  fileName: "Maryam-Amir-Resume.pdf",
  virtualFileName: "Maryam_Amir_Resume.pdf",
  displayName: "Maryam Amir Resume",
  assetPath: "/resume/Maryam-Amir-Resume.pdf",
  mimeType: "application/pdf",
  previewLabel: "Maryam Amir Resume PDF preview",
  focus: "React · JavaScript · Django",
} as const

export const resumeCopy = {
  kicker: "PDF Document",
  heading: "Resume",
  previewComment: "// document preview",
  fallbackTitle: "Preview unavailable.",
  fallbackBody:
    "Open the file in a new tab or download it.",
  mobileHint:
    "Open the Resume in your browser or download it for the best reading experience.",
  documentType: "PDF document",
  backLabel: "Back to Contact",
} as const

export const resumeMeta = [
  { id: "file", label: "File", value: resumeData.fileName },
  { id: "type", label: "Type", value: "PDF" },
  { id: "profile", label: "Profile", value: personalInfo.role },
  { id: "focus", label: "Focus", value: resumeData.focus },
] as const
