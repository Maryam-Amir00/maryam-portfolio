import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react"
import {
  Check,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react"
import {
  CONTACT_LIMITS,
  contactCopy,
  contactGreetingName,
  contactRecipient,
} from "../../../data/contactData"
import {
  getContactGitHubUrl,
  getContactLinkedInUrl,
  getContactPhone,
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

const sectionCommentClass =
  "font-mono text-[13px] leading-5 text-[color-mix(in_srgb,var(--syntax-comment)_68%,white)]"

const fieldSurfaceClass =
  "a11y-scroll-target mt-1.5 box-border w-full max-w-full rounded-[4px] border bg-app px-3 py-2 text-base text-fg caret-accent ui-transition placeholder:text-fg-muted focus-visible:border-accent md:text-[14px]"

export function ContactView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "contact.tsx", current: true },
        ]}
      />
      <article className="@container mr-auto min-w-0 w-full max-w-[70rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <CodeIntro />
        <Header />
        <div className="mt-8 grid min-w-0 items-stretch gap-10 @min-[56.25rem]:grid-cols-[minmax(15rem,0.32fr)_minmax(0,0.68fr)] @min-[56.25rem]:gap-0">
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
  const phone = getContactPhone()
  const linkedin = getContactLinkedInUrl()
  const github = getContactGitHubUrl()
  const properties = [
    { key: "name", value: personalInfo.name },
    { key: "role", value: personalInfo.role },
    { key: "email", value: personalInfo.email },
    ...(phone ? [{ key: "phone", value: phone.display }] : []),
    { key: "location", value: personalInfo.location },
    ...(linkedin ? [{ key: "linkedin", value: "LinkedIn" }] : []),
    ...(github ? [{ key: "github", value: "GitHub" }] : []),
  ]

  return (
    <div
      aria-hidden="true"
      className="code-scroll max-w-[42rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg md:text-[13px]"
    >
      <p>
        <span className="text-syntax-keyword">const</span>
        {" contact = {"}
      </p>
      {properties.map((property) => (
        <p key={property.key}>
          {"  "}
          <span className="text-syntax-property">{property.key}</span>
          {": "}
          <span className="text-syntax-string">"{property.value}"</span>,
        </p>
      ))}
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
  const phone = getContactPhone()
  const linkedin = getContactLinkedInUrl()
  const github = getContactGitHubUrl()

  return (
    <section
      aria-label="Direct channels"
      className="min-w-0 @min-[56.25rem]:pr-8 @min-[60rem]:pr-10"
    >
      <p aria-hidden="true" className={sectionCommentClass}>
        {contactCopy.channelsComment}
      </p>
      <dl className="mt-4 divide-y divide-subtle border-y border-subtle">
        <CopyableChannelRow
          code="contact.email"
          icon={<Mail size={14} strokeWidth={1.75} aria-hidden="true" />}
          copyValue={personalInfo.email}
          copyIdleLabel={contactCopy.copyEmail}
          copiedAnnouncement="Email copied to clipboard."
          failedAnnouncement="Could not copy email. The address remains selectable."
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-block max-w-full break-all text-fg ui-transition hover:text-accent"
          >
            {personalInfo.email}
          </a>
        </CopyableChannelRow>
        {phone ? (
          <CopyableChannelRow
            code="contact.phone"
            icon={<Phone size={14} strokeWidth={1.75} aria-hidden="true" />}
            copyValue={phone.display}
            copyIdleLabel={contactCopy.copyPhone}
            copiedAnnouncement="Phone number copied to clipboard."
            failedAnnouncement="Could not copy phone number. The number remains selectable."
          >
            <a
              href={phone.href}
              className="inline-block max-w-full break-words text-fg ui-transition hover:text-accent"
            >
              {phone.display}
            </a>
          </CopyableChannelRow>
        ) : null}
        {linkedin ? (
          <ChannelRow code="contact.linkedin">
            <ProfileLink
              href={linkedin}
              label={contactCopy.linkedinAction}
            />
          </ChannelRow>
        ) : null}
        {github ? (
          <ChannelRow code="contact.github">
            <ProfileLink
              href={github}
              label={contactCopy.githubAction}
            />
          </ChannelRow>
        ) : null}
        <ChannelRow
          code="contact.location"
          icon={<MapPin size={14} strokeWidth={1.75} aria-hidden="true" />}
        >
          {personalInfo.location}
        </ChannelRow>
        <ChannelRow
          code="contact.role"
          icon={<UserRound size={14} strokeWidth={1.75} aria-hidden="true" />}
        >
          {personalInfo.role}
        </ChannelRow>
      </dl>
    </section>
  )
}

function CopyableChannelRow({
  code,
  icon,
  copyValue,
  copyIdleLabel,
  copiedAnnouncement,
  failedAnnouncement,
  children,
}: {
  code: string
  icon: ReactNode
  copyValue: string
  copyIdleLabel: string
  copiedAnnouncement: string
  failedAnnouncement: string
  children: ReactNode
}) {
  const clipboard = useClipboardStatus()
  const liveMessage =
    clipboard.status === "copied"
      ? copiedAnnouncement
      : clipboard.status === "failed"
        ? failedAnnouncement
        : ""

  return (
    <div className="py-4">
      <dt className="flex items-center gap-1.5 font-mono text-[12px] text-syntax-property">
        <span className="text-fg-muted">{icon}</span>
        {code}
      </dt>
      <dd className="mt-2 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="min-w-0 flex-1 text-[14px] leading-6 text-fg">
            {children}
          </div>
          <CopyValueButton
            idleLabel={copyIdleLabel}
            status={clipboard.status}
            onCopy={() => {
              void clipboard.copy(copyValue)
            }}
          />
        </div>
      </dd>
      <p
        aria-live="polite"
        className={liveMessage ? "mt-1.5 text-[12px] text-fg-muted" : "sr-only"}
      >
        {clipboard.status === "copied" ? (
          <span className="text-success">{liveMessage}</span>
        ) : (
          liveMessage
        )}
      </p>
    </div>
  )
}

function ChannelRow({
  code,
  icon,
  children,
}: {
  code: string
  icon?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="py-4">
      <dt className="flex items-center gap-1.5 font-mono text-[12px] text-syntax-property">
        {icon ? <span className="text-fg-muted">{icon}</span> : null}
        {code}
      </dt>
      <dd className="mt-2 min-w-0 text-[14px] leading-6 text-fg">{children}</dd>
    </div>
  )
}

function ProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 w-full max-w-full items-center justify-between gap-3 text-fg-secondary ui-transition hover:text-fg focus-visible:text-fg md:min-h-0"
    >
      <span>{label}</span>
      <ExternalLink
        size={14}
        strokeWidth={1.75}
        aria-hidden="true"
        className="motion-nudge-x shrink-0 text-fg-muted ui-transition group-hover:text-fg group-focus-visible:text-fg"
      />
    </a>
  )
}

function useClipboardStatus() {
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

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
  }

  return { status, copy }
}

function CopyValueButton({
  idleLabel,
  status,
  onCopy,
}: {
  idleLabel: string
  status: "idle" | "copied" | "failed"
  onCopy: () => void
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[3px] border border-subtle bg-tab px-2 py-0.5 text-[11px] text-fg-muted ui-transition hover:border-fg-muted hover:bg-hover hover:text-fg md:min-h-7"
    >
      {status === "copied" ? (
        <Check size={13} strokeWidth={1.75} className="text-success" aria-hidden="true" />
      ) : (
        <Copy size={13} strokeWidth={1.75} aria-hidden="true" />
      )}
      {status === "copied" ? contactCopy.copied : idleLabel}
    </button>
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
    <section
      aria-label="Message composer"
      className="min-w-0 @min-[56.25rem]:border-l @min-[56.25rem]:border-subtle @min-[56.25rem]:pl-8 @min-[60rem]:pl-10"
    >
      <p aria-hidden="true" className={sectionCommentClass}>
        {contactCopy.composeComment}
      </p>
      <form className="mt-4 max-w-[38rem]" noValidate onSubmit={handleSubmit}>
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
            className="mt-2.5 max-w-[28rem] text-[12px] leading-[1.45] text-fg-muted"
          >
            {contactCopy.composeNote}
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
        className={`${fieldSurfaceClass} ${invalid ? "border-error" : "border-fg-muted/45"}`}
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
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <label htmlFor="contact-message" className="min-w-0">
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
        <p className="shrink-0 font-mono text-[11px] leading-4 text-fg-muted">
          {value.length} / {CONTACT_LIMITS.messageMax}
        </p>
      </div>
      <textarea
        id="contact-message"
        ref={ref}
        rows={6}
        required
        maxLength={CONTACT_LIMITS.messageMax}
        placeholder={contactCopy.placeholders.message}
        value={value}
        aria-invalid={submitted ? invalid : undefined}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        className={`${fieldSurfaceClass} min-h-[8rem] resize-y leading-6 md:min-h-[10.5rem] ${
          invalid ? "border-error" : "border-fg-muted/45"
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
