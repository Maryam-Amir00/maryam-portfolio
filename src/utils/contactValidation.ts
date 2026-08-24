import { CONTACT_LIMITS } from "../data/contactData"

export type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isBlank(value: string) {
  return value.trim().length === 0
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (isBlank(values.name)) {
    errors.name = "Enter your name."
  } else if (values.name.trim().length > CONTACT_LIMITS.nameMax) {
    errors.name = `Please keep your name under ${CONTACT_LIMITS.nameMax} characters.`
  }

  if (isBlank(values.email)) {
    errors.email = "Enter your email address."
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address."
  }

  if (isBlank(values.subject)) {
    errors.subject = "Enter a subject."
  } else if (values.subject.trim().length > CONTACT_LIMITS.subjectMax) {
    errors.subject = `Please keep the subject under ${CONTACT_LIMITS.subjectMax} characters.`
  }

  if (isBlank(values.message)) {
    errors.message = "Enter a message."
  } else if (values.message.trim().length < CONTACT_LIMITS.messageMin) {
    errors.message = `Message must contain at least ${CONTACT_LIMITS.messageMin} characters.`
  } else if (values.message.trim().length > CONTACT_LIMITS.messageMax) {
    errors.message = `Please keep the message under ${CONTACT_LIMITS.messageMax} characters.`
  }

  return errors
}

export function firstContactErrorField(
  errors: ContactFormErrors,
): keyof ContactFormValues | undefined {
  const order: (keyof ContactFormValues)[] = [
    "name",
    "email",
    "subject",
    "message",
  ]

  return order.find((field) => errors[field])
}

export function buildContactMailto(
  recipient: string,
  values: ContactFormValues,
  greetingName: string,
) {
  const firstName = greetingName.trim().split(/\s+/)[0] || greetingName
  const subject = encodeURIComponent(values.subject.trim())
  const body = encodeURIComponent(
    `Hi ${firstName},\n\n${values.message.trim()}\n\nFrom:\n${values.name.trim()}\n${values.email.trim()}`,
  )

  return `mailto:${recipient}?subject=${subject}&body=${body}`
}
