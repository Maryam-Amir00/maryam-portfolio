import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes, type Ref } from "react"
import { Check, Copy, Mail, MapPin } from "lucide-react"
import {
  CONTACT_LIMITS,
  contactCopy,
  contactGreetingName,
  contactRecipient,
} from "../../../data/contactData"
import {
  getVisibleSocialLinks,
  personalInfo,
} from "../../../data/personalInfo"
import {
  FILE_RESUME,
  FILE_STUDYSYNC,
} from "../../../data/portfolioFiles"
import {
  buildContactMailto,
  firstContactErrorField,
  validateContactForm,
  type ContactFormValues,
} from "../../../utils/contactValidation"
import { ProjectNavigation } from "../../projects/ProjectNavigation"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"

const emptyForm: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export function ContactView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "contact.tsx", current: true },
        ]}
      />
      <article className="mr-auto min-w-0 w-full max-w-[70rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <CodeIntro />
        <Header />
        <div className="mt-8 grid min-w-0 items-start gap-10 min-[900px]:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
          <ContactDetails />
          <ContactForm />
        </div>
        <ProjectNavigation
          next={{
            fileId: FILE_RESUME,
            actionLabel: "Open Resume",
          }}
          back={{
            fileId: FILE_STUDYSYNC,
            actionLabel: "Back to Projects",
          }}
        />
      </article>
    </div>
  )
}

function CodeIntro() {
  return (
    <div
      aria-hidden="true"
      className="max-w-[42rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg md:text-[13px]"
    >
      <p>
        <span className="text-syntax-keyword">const</span>
        {" contact = {"}
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">name</span>
        {": "}
        <span className="text-syntax-string">"{personalInfo.name}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">role</span>
        {": "}
        <span className="text-syntax-string">"{personalInfo.role}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">email</span>
        {": "}
        <span className="text-syntax-string">"{personalInfo.email}"</span>,
      </p>
      <p>{"};"}</p>
      <p className="mt-1">
        <span className="text-syntax-keyword">export default</span>
        {" contact;"}
      </p>
    </div>
  )
}

function Header() {
  return (
    <header className="mt-8 min-w-0 md:mt-10">
      <p className="font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
        {contactCopy.kicker}
      </p>
      <h1 className="mt-3 text-[clamp(1.8rem,3.4vw,2.45rem)] leading-tight font-semibold tracking-tight text-fg">
        {contactCopy.heading}
      </h1>
      <p className="mt-4 max-w-[40rem] text-[15px] leading-[1.7] text-fg-secondary">
        {contactCopy.intro}
      </p>
    </header>
  )
}

function ContactDetails() {
  const socialLinks = getVisibleSocialLinks()

  return (
    <section aria-label="Contact details" className="min-w-0">
      <dl className="divide-y divide-subtle border-y border-subtle">
        <div className="py-3.5">
          <dt className="font-mono text-[12px] text-syntax-property">
            contact.email
          </dt>
          <dd className="mt-1.5 min-w-0">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-block max-w-full text-[14px] leading-6 break-all text-fg-secondary ui-transition hover:text-accent"
            >
              {personalInfo.email}
            </a>
          </dd>
        </div>
        <div className="py-3.5">
          <dt className="font-mono text-[12px] text-syntax-property">
            contact.location
          </dt>
          <dd className="mt-1.5 flex min-w-0 items-start gap-1.5 text-[14px] leading-6 text-fg-secondary">
            <MapPin size={14} strokeWidth={1.75} className="mt-1 shrink-0" aria-hidden="true" />
            {personalInfo.location}
          </dd>
        </div>
        <div className="py-3.5">
          <dt className="font-mono text-[12px] text-syntax-property">
            contact.role
          </dt>
          <dd className="mt-1.5 text-[14px] leading-6 text-fg-secondary">
            {personalInfo.role}
          </dd>
        </div>
      </dl>
      <CopyEmailButton />
      {socialLinks.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${personalInfo.name}'s ${link.label} profile`}
                className="font-mono text-[13px] text-fg-secondary ui-transition hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle")

  useEffect(() => {
    if (status === "idle") {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("idle")
    }, CONTACT_LIMITS.copyResetMs)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [status])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
  }

  const liveMessage =
    status === "copied"
      ? "Email copied to clipboard."
      : status === "failed"
        ? "Could not copy email. The address remains selectable."
        : ""

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => {
          void copyEmail()
        }}
        className="inline-flex min-h-11 w-full max-w-full cursor-pointer items-center justify-center gap-1.5 rounded-[4px] border border-subtle px-3 py-1.5 text-[13px] text-fg-secondary ui-transition hover:bg-hover hover:text-fg md:w-auto"
      >
        {status === "copied" ? (
          <Check size={14} strokeWidth={1.75} className="text-success" aria-hidden="true" />
        ) : (
          <Copy size={14} strokeWidth={1.75} aria-hidden="true" />
        )}
        {status === "copied" ? "Copied" : "Copy Email"}
      </button>
      <p aria-live="polite" className="mt-2 min-h-5 text-[12px] text-fg-muted">
        {status === "copied" ? (
          <span className="text-success">{liveMessage}</span>
        ) : (
          liveMessage
        )}
      </p>
    </div>
  )
}

function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyForm)
  const [errors, setErrors] = useState<ReturnType<typeof validateContactForm>>(
    {},
  )
  const [submitted, setSubmitted] = useState(false)
  const [formAlert, setFormAlert] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  function updateField(field: keyof ContactFormValues, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)

    if (submitted) {
      const nextErrors = validateContactForm(next)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length === 0) {
        setFormAlert("")
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)

    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)

    const firstInvalid = firstContactErrorField(nextErrors)

    if (firstInvalid) {
      setFormAlert("Please fix the highlighted fields.")
      const targets = {
        name: nameRef,
        email: emailRef,
        subject: subjectRef,
        message: messageRef,
      }
      targets[firstInvalid].current?.focus()
      return
    }

    setFormAlert("")

    window.location.href = buildContactMailto(
      contactRecipient,
      values,
      contactGreetingName,
    )
  }

  return (
    <section aria-label="Message composer" className="min-w-0">
      <p aria-hidden="true" className="font-mono text-[13px] text-syntax-comment">
        {"// compose message"}
      </p>
      <form className="mt-4" noValidate onSubmit={handleSubmit}>
        {formAlert ? (
          <p role="alert" className="mb-3 text-[13px] leading-5 text-error">
            {formAlert}
          </p>
        ) : null}
        <ContactField
          ref={nameRef}
          id="contact-name"
          codeLabel={contactCopy.fieldKeys.name}
          label={contactCopy.fieldLabels.name}
          type="text"
          autoComplete="name"
          placeholder={contactCopy.placeholders.name}
          maxLength={CONTACT_LIMITS.nameMax}
          value={values.name}
          error={errors.name}
          submitted={submitted}
          required
          onChange={(value) => {
            updateField("name", value)
          }}
        />
        <ContactField
          ref={emailRef}
          id="contact-email"
          codeLabel={contactCopy.fieldKeys.email}
          label={contactCopy.fieldLabels.email}
          type="email"
          autoComplete="email"
          placeholder={contactCopy.placeholders.email}
          value={values.email}
          error={errors.email}
          submitted={submitted}
          required
          onChange={(value) => {
            updateField("email", value)
          }}
        />
        <ContactField
          ref={subjectRef}
          id="contact-subject"
          codeLabel={contactCopy.fieldKeys.subject}
          label={contactCopy.fieldLabels.subject}
          type="text"
          placeholder={contactCopy.placeholders.subject}
          maxLength={CONTACT_LIMITS.subjectMax}
          value={values.subject}
          error={errors.subject}
          submitted={submitted}
          required
          onChange={(value) => {
            updateField("subject", value)
          }}
        />
        <MessageField
          ref={messageRef}
          value={values.message}
          error={errors.message}
          submitted={submitted}
          onChange={(value) => {
            updateField("message", value)
          }}
        />
        <div className="mt-5">
          <button
            type="submit"
            aria-describedby="contact-compose-note"
            className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 md:w-auto md:justify-start"
          >
            <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
            Compose Email
          </button>
          <p
            id="contact-compose-note"
            className="mt-2 max-w-[32rem] text-[12px] leading-5 text-fg-muted"
          >
            {contactCopy.composeNote}
          </p>
          <p className="mt-1 max-w-[32rem] text-[12px] leading-5 text-fg-muted">
            {contactCopy.privacyNote}
          </p>
        </div>
      </form>
    </section>
  )
}

function ContactField({
  id,
  label,
  codeLabel,
  error,
  submitted = false,
  onChange,
  ref,
  ...inputProps
}: {
  id: string
  label: string
  codeLabel: string
  error?: string
  submitted?: boolean
  onChange: (value: string) => void
  ref: Ref<HTMLInputElement>
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "onChange" | "aria-invalid" | "aria-describedby"
>) {
  const errorId = `${id}-error`
  const invalid = Boolean(error)

  return (
    <div className="mt-4 first:mt-0">
      <label htmlFor={id} className="block">
        <span className="font-mono text-[12px] text-fg">
          {label}
        </span>
        <span aria-hidden="true" className="ml-2 font-mono text-[12px] text-syntax-property">
          {codeLabel}
        </span>
      </label>
      <input
        {...inputProps}
        id={id}
        ref={ref}
        aria-invalid={submitted ? invalid : undefined}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        className={`a11y-scroll-target mt-1.5 w-full rounded-[4px] border bg-tab px-3 py-2 text-base text-fg caret-accent ui-transition placeholder:text-fg-muted md:text-[14px] ${
          invalid ? "border-error" : "border-subtle"
        }`}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12px] leading-5 text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function MessageField({
  ref,
  value,
  error,
  submitted = false,
  onChange,
}: {
  ref: Ref<HTMLTextAreaElement>
  value: string
  error?: string
  submitted?: boolean
  onChange: (value: string) => void
}) {
  const errorId = "contact-message-error"
  const invalid = Boolean(error)

  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor="contact-message" className="block">
          <span className="font-mono text-[12px] text-fg">
            {contactCopy.fieldLabels.message}
          </span>
          <span
            aria-hidden="true"
            className="ml-2 font-mono text-[12px] text-syntax-property"
          >
            {contactCopy.fieldKeys.message}
          </span>
        </label>
        <p className="font-mono text-[11px] text-fg-muted">
          {value.length} / {CONTACT_LIMITS.messageMax}
        </p>
      </div>
      <textarea
        id="contact-message"
        ref={ref}
        rows={7}
        required
        maxLength={CONTACT_LIMITS.messageMax}
        placeholder={contactCopy.placeholders.message}
        value={value}
        aria-invalid={submitted ? invalid : undefined}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        className={`a11y-scroll-target mt-1.5 min-h-[10.5rem] w-full resize-y rounded-[4px] border bg-tab px-3 py-2 text-base leading-6 text-fg caret-accent ui-transition placeholder:text-fg-muted md:min-h-0 md:text-[14px] ${
          invalid ? "border-error" : "border-subtle"
        }`}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12px] leading-5 text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
