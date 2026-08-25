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

const prose =
  "max-w-[68ch] text-[15px] leading-[1.7] text-fg/90 md:text-[16px]"

export function AboutView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "about.md", current: true },
        ]}
      />
      <article className="mr-auto min-w-0 w-full max-w-[72rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-8">
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
      <h2 className="mt-8 text-[clamp(1.2rem,2vw,1.4rem)] font-semibold tracking-tight text-fg md:mt-10">
        <MdMark>##</MdMark>
        {children}
      </h2>
    )
  }

  return <h3 className="text-[15px] font-medium text-fg">{children}</h3>
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
    <header className="border-b border-subtle pb-8 md:pb-10">
      <Heading level={1}>About Me</Heading>
      <div className={`mt-5 space-y-4 ${prose}`}>
        {aboutIntro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <blockquote className="mt-6 max-w-[68ch] border-l-2 border-accent py-1 pl-4 text-[15px] leading-[1.7] text-fg md:text-[16px]">
        <p>{aboutIntro.quote}</p>
      </blockquote>
    </header>
  )
}

function WhatIBuild() {
  return (
    <section>
      <Heading level={2}>What I Build</Heading>
      <p className={`mt-3.5 ${prose}`}>{whatIBuild.intro}</p>
      <ul className="mt-4 max-w-[68ch] list-none space-y-2.5 text-[15px] leading-[1.7] text-fg/90">
        {whatIBuild.items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true" className="font-mono text-accent/80">
              ›
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className={`mt-5 ${prose}`}>
        The recurring stack is <Code>React</Code>, <Code>JavaScript</Code>,{" "}
        <Code>Django REST Framework</Code>, and <Code>PostgreSQL</Code>.
      </p>
    </section>
  )
}

function Approach() {
  return (
    <section>
      <Heading level={2}>How I Approach Engineering</Heading>
      <p className={`mt-3.5 ${prose}`}>
        These are working habits, not a manifesto. They describe how I try to
        build software while still growing production judgment.
      </p>
      <ul className="mt-6 grid list-none gap-x-12 gap-y-7 xl:grid-cols-2">
        {engineeringPrinciples.map((principle) => (
          <li key={principle.id} className="min-w-0">
            <Heading level={3}>
              <span className="font-mono text-[12px] font-normal text-fg-muted">
                {principle.id}.
              </span>{" "}
              {principle.title}
            </Heading>
            <p className="mt-1.5 max-w-[42rem] text-[15px] leading-[1.7] text-fg/90">
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
      <div className="mt-3.5 grid min-w-0 items-start gap-6 xl:grid-cols-2 xl:gap-10">
        <p className={prose}>{currentFocus.intro}</p>
        <pre className="overflow-x-auto rounded-sm border border-subtle bg-tab px-4 py-3 font-mono text-[13px] leading-6 whitespace-pre-wrap">
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
      </div>
    </section>
  )
}

function Education() {
  return (
    <section>
      <Heading level={2}>Education</Heading>
      <div className="mt-3.5 max-w-[68ch]">
        <p className="text-[1.05rem] leading-7 font-medium text-fg">
          {education.degree}
        </p>
        <p className="mt-1.5 text-[15px] leading-[1.7] text-fg/90">
          {education.school}
        </p>
        <p className="mt-1.5 font-mono text-[13px] text-fg-muted">
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
      <dl className="mt-4 max-w-[40rem] divide-y divide-subtle">
        {quickProfile.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 py-2.5 min-[560px]:grid-cols-[9.5rem_minmax(0,1fr)] min-[560px]:items-baseline min-[560px]:gap-4"
          >
            <dt className="font-mono text-[12px] text-fg-muted">{row.label}:</dt>
            <dd className="text-[15px] font-medium break-words text-fg">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function NextActions() {
  const { openFile } = useWorkspace()

  return (
    <footer className="mt-10 border-t border-subtle pt-6 md:mt-12">
      <p className="font-mono text-[13px]">
        <span aria-hidden="true" className="text-accent">
          {">"}
        </span>
        <span aria-hidden="true" className="text-fg-muted">
          {" next: "}
        </span>
        <span className="text-fg">experience.ts</span>
      </p>
      <div className="mt-4 flex flex-col items-stretch gap-2.5 min-[430px]:flex-row min-[430px]:flex-wrap min-[430px]:items-center">
        <button
          type="button"
          onClick={() => {
            openFile(FILE_EXPERIENCE)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 xl:min-h-0"
        >
          Open Experience
        </button>
        <button
          type="button"
          onClick={() => {
            openFile(FILE_STUDYSYNC)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] border border-subtle px-3.5 py-1.5 text-[13px] text-fg-secondary ui-transition hover:border-fg-muted hover:bg-hover hover:text-fg xl:min-h-0"
        >
          View Projects
        </button>
      </div>
    </footer>
  )
}
