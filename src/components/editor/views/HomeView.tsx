import { MapPin } from "lucide-react"
import {
  getVisibleSocialLinks,
  personalInfo,
} from "../../../data/personalInfo"
import { FILE_RESUME, FILE_STUDYSYNC } from "../../../data/portfolioFiles"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"
import { EditorGutter } from "../EditorGutter"

export function HomeView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "home.tsx" },
          { label: personalInfo.name, current: true },
        ]}
      />
      <div className="relative min-w-0 flex-1">
        <EditorGutter />
        <div className="mr-auto min-w-0 max-w-[66rem] px-[clamp(1rem,3.5vw,2.25rem)] py-5 min-[900px]:pl-16 md:py-7">
          <CodeIntro />
          <HeroIntro />
          <TechStack />
          <HomeActions />
          <HomeMeta />
        </div>
      </div>
    </div>
  )
}

function CodeIntro() {
  return (
    <div
      aria-hidden="true"
      className="overflow-x-auto font-mono text-[13px] leading-6 text-fg"
    >
      <p>
        <span className="text-syntax-comment">
          {"// hello, I'm Maryam"}
        </span>
      </p>
      <p>&nbsp;</p>
      <p>
        <span className="text-syntax-keyword">const</span>
        {" developer = {"}
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
        <span className="text-syntax-property">stack</span>
        {": ["}
        {personalInfo.introStack.map((item, index) => (
          <span key={item}>
            {index > 0 ? ", " : null}
            <span className="text-syntax-string">"{item}"</span>
          </span>
        ))}
        {"],"}
      </p>
      <p>{"};"}</p>
    </div>
  )
}

function HeroIntro() {
  return (
    <section className="mt-8 min-w-0 md:mt-10">
      <h1 className="text-[clamp(1.875rem,5.2vw,3.25rem)] leading-[1.08] font-semibold tracking-tight text-fg">
        {personalInfo.name}
      </h1>
      <p className="mt-3 text-[1.05rem] text-fg-secondary">{personalInfo.role}</p>
      <p className="mt-4 max-w-[34rem] text-[1.05rem] leading-7 text-fg">
        {personalInfo.headline}
      </p>
      <p className="mt-3 max-w-[38rem] text-[15px] leading-7 text-fg-secondary">
        {personalInfo.summary}
      </p>
    </section>
  )
}

function TechStack() {
  return (
    <div className="mt-7">
      <ol className="flex flex-wrap gap-x-6 gap-y-2">
        {personalInfo.displayStack.map((item, index) => (
          <li key={item} className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] text-fg-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[13px] text-fg-secondary">{item}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 font-mono text-[12px] text-fg-muted">
        {"// "}
        {personalInfo.additionalStack.join(" · ")}
      </p>
    </div>
  )
}

function HomeActions() {
  const { openFile } = useWorkspace()
  const socialLinks = getVisibleSocialLinks()

  return (
    <div className="mt-8">
      <div className="flex flex-col items-stretch gap-2.5 md:flex-row md:flex-wrap md:items-center">
        <button
          type="button"
          onClick={() => {
            openFile(FILE_STUDYSYNC)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 md:min-h-0"
        >
          View Projects
        </button>
        <button
          type="button"
          onClick={() => {
            openFile(FILE_RESUME)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] border border-subtle bg-transparent px-3.5 py-1.5 text-[13px] text-fg-secondary ui-transition hover:bg-hover hover:text-fg active:bg-hover md:min-h-0"
        >
          Open Resume
        </button>
      </div>

      <p className="mt-4 font-mono text-[13px] text-fg-muted">
        <span aria-hidden="true">{"> contact: "}</span>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-[13px] break-all text-fg-secondary ui-transition hover:text-accent"
        >
          {personalInfo.email}
        </a>
      </p>

      {socialLinks.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${personalInfo.name}'s ${link.label} profile`}
                className="font-mono text-[12px] text-fg-muted ui-transition hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function HomeMeta() {
  return (
    <dl className="mt-10 grid gap-5 border-t border-subtle pt-5 min-[720px]:grid-cols-3">
      <div>
        <dt className="font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase">
          Focus
        </dt>
        <dd className="mt-1.5 text-[13px] text-fg-secondary">
          {personalInfo.focus}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase">
          Stack
        </dt>
        <dd className="mt-1.5 text-[13px] text-fg-secondary">
          {personalInfo.specialization}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase">
          Location
        </dt>
        <dd className="mt-1.5 flex items-center gap-1.5 text-[13px] text-fg-secondary">
          <MapPin size={13} strokeWidth={1.75} aria-hidden="true" />
          {personalInfo.location}
        </dd>
      </div>
    </dl>
  )
}
