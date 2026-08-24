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
    "Have a project, development opportunity, or engineering role you'd like to discuss? Send a message through the form, or email me directly.",
  composeNote:
    "This will open your default email app with the message pre-filled.",
  privacyNote:
    "Nothing is submitted to this website. Your message is passed to your email app.",
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
