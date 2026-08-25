import { personalInfo } from "./personalInfo"

export const CONTACT_LIMITS = {
  nameMax: 80,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 2000,
  copyResetMs: 2000,
} as const

export const contactCopy = {
  kicker: "Contact",
  heading: "Let's connect.",
  intro:
    "Have a project, development opportunity, or engineering role to discuss? You can reach me directly or compose a message below.",
  composeNote:
    "Your email app will open with this message ready to send. Nothing is sent or stored by this website.",
  channelsComment: "// direct channels",
  composeComment: "// compose message",
  linkedinAction: "LinkedIn Profile",
  githubAction: "GitHub Profile",
  copyEmail: "Copy Email",
  copyPhone: "Copy Phone",
  copied: "Copied",
  placeholders: {
    name: "Your name",
    email: "you@example.com",
    subject: "What's this about?",
    message: "Tell me a little about the project or opportunity...",
  },
  fieldLabels: {
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
  },
  fieldKeys: {
    name: "sender.name",
    email: "sender.email",
    subject: "message.subject",
    message: "message.body",
  },
} as const

export const contactRecipient = personalInfo.email
export const contactGreetingName = personalInfo.name
