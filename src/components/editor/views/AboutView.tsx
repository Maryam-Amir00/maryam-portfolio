import type { ReactNode } from "react"
import {
  aboutIntro,
  currentFocus,
  education,
  engineeringPrinciples,
  quickProfile,
  whatIBuild,
} from "../../../data/aboutData"
import { FILE_EXPERIENCE, FILE_STUDYSYNC } from "../../../data/portfolioFiles"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"

export function AboutView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "about.md", current: true },
        ]}
      />
      <article className="mr-auto min-w-0 w-full max-w-[52rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <Intro />
        <WhatIBuild />
        <Approach />
        <CurrentFocus />
        <Education />
        <QuickProfile />
        <NextActions />
      </article>
    </div>
  )
}

function MdMark({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="mr-2 font-mono font-normal text-[0.72em] text-accent/80"
    >
      {children}
    </span>
  )
}

function Heading({
  level,
  children,
}: {
  level: 1 | 2 | 3
  children: ReactNode
}) {
  if (level === 1) {
    return (
      <h1 className="text-[clamp(1.85rem,3vw,2.5rem)] leading-tight font-semibold tracking-tight text-fg">
        <MdMark>#</MdMark>
        {children}
      </h1>
    )
  }

  if (level === 2) {
    return (
      <h2 className="mt-10 text-[clamp(1.2rem,2vw,1.4rem)] font-semibold tracking-tight text-fg">
        <MdMark>##</MdMark>
        {children}
      </h2>
    )
  }

  return (
    <h3 className="text-[15px] font-medium text-fg">
      {children}
    </h3>
  )
}

function Code({ children }: { children: string }) {
  return (
    <code className="rounded-sm bg-hover px-1 py-0.5 font-mono text-[0.86em] text-syntax-property">
      {children}
    </code>
  )
}

function Intro() {
  return (
    <header>
      <Heading level={1}>About Me</Heading>
      <div className="mt-5 max-w-[68ch] space-y-4 text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        {aboutIntro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <blockquote className="mt-6 max-w-[68ch] border-l-2 border-accent/70 pl-4 text-[15px] leading-[1.7] text-fg-secondary">
        <p>{aboutIntro.quote}</p>
      </blockquote>
      <hr className="mt-8 border-subtle" />
    </header>
  )
}

function WhatIBuild() {
  return (
    <section>
      <Heading level={2}>What I Build</Heading>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        {whatIBuild.intro}
      </p>
      <ul className="mt-4 max-w-[68ch] space-y-1.5 text-[15px] leading-[1.7] text-fg-secondary">
        {whatIBuild.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="font-mono text-fg-muted">
              -
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        The recurring stack is <Code>React</Code>,{" "}
        <Code>Django REST Framework</Code>, <Code>REST APIs</Code>, and{" "}
        <Code>PostgreSQL</Code> — used together rather than as isolated pieces.
      </p>
    </section>
  )
}

function Approach() {
  return (
    <section>
      <Heading level={2}>How I Approach Engineering</Heading>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        These are working habits, not a manifesto. They describe how she tries to
        build software while still growing production-level judgment.
      </p>
      <ul className="mt-6 max-w-[68ch] list-none space-y-5">
        {engineeringPrinciples.map((principle) => (
          <li key={principle.id}>
            <Heading level={3}>
              <span className="font-mono text-[12px] font-normal text-fg-muted">
                {principle.id}.
              </span>{" "}
              {principle.title}
            </Heading>
            <p className="mt-1.5 text-[15px] leading-[1.7] text-fg-secondary">
              {principle.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CurrentFocus() {
  return (
    <section>
      <Heading level={2}>Current Focus</Heading>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        {currentFocus.intro}
      </p>
      <pre className="mt-5 max-w-[68ch] overflow-x-auto rounded-sm border border-subtle bg-tab px-4 py-3 font-mono text-[13px] leading-6 whitespace-pre-wrap">
        <code>
          <span className="text-syntax-keyword">const</span>
          {" currentFocus = ["}
          {"\n"}
          {currentFocus.items.map((item) => (
            <span key={item}>
              {"  "}
              <span className="text-syntax-string">"{item}"</span>,{"\n"}
            </span>
          ))}
          {"];"}
        </code>
      </pre>
    </section>
  )
}

function Education() {
  return (
    <section>
      <Heading level={2}>Education</Heading>
      <div className="mt-4 max-w-[68ch]">
        <Heading level={3}>{education.degree}</Heading>
        <p className="mt-1.5 text-[15px] leading-[1.7] text-fg-secondary">
          {education.school}
        </p>
        <p className="mt-1 font-mono text-[13px] text-fg-muted">
          {education.dates} · {education.location}
        </p>
      </div>
    </section>
  )
}

function QuickProfile() {
  return (
    <section>
      <Heading level={2}>Quick Profile</Heading>
      <dl className="mt-4 max-w-[68ch] divide-y divide-subtle">
        {quickProfile.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 py-2.5 min-[560px]:grid-cols-[9.5rem_minmax(0,1fr)] min-[560px]:items-baseline min-[560px]:gap-4"
          >
            <dt className="font-mono text-[13px] text-fg-muted">{row.label}:</dt>
            <dd className="text-[15px] text-fg-secondary">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function NextActions() {
  const { openFile } = useWorkspace()

  return (
    <footer className="mt-10 border-t border-subtle pt-6">
      <p className="font-mono text-[13px] text-fg-muted">
        <span aria-hidden="true">{"> next: "}</span>
        <span className="text-fg-secondary">experience.ts</span>
      </p>
      <div className="mt-3 flex flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center">
        <button
          type="button"
          onClick={() => {
            openFile(FILE_EXPERIENCE)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 md:min-h-0"
        >
          Open Experience
        </button>
        <button
          type="button"
          onClick={() => {
            openFile(FILE_STUDYSYNC)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] px-2 py-1.5 text-[13px] text-fg-muted ui-transition hover:text-fg md:min-h-0"
        >
          View Projects
        </button>
      </div>
    </footer>
  )
}
