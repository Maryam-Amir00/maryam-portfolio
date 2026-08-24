import { personalInfo } from "./personalInfo"

export const resumeData = {
  fileName: "Maryam-Amir-Resume.pdf",
  displayName: "Maryam Amir Resume",
  assetPath: "/resume/Maryam-Amir-Resume.pdf",
  mimeType: "application/pdf",
  previewLabel: "Maryam Amir Resume PDF",
} as const

export const resumeMeta = [
  { id: "file", label: "File", value: resumeData.fileName },
  { id: "type", label: "Type", value: "PDF" },
  { id: "profile", label: "Profile", value: personalInfo.role },
  { id: "focus", label: "Focus", value: personalInfo.specialization },
] as const
