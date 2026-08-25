import type { ReactNode } from "react"
import {
  primaryStack,
  skillGroups,
  skillsIntro,
  type Skill,
  type SkillGroup,
} from "../../../data/skillsData"
import { FILE_EXPERIENCE, FILE_STUDYSYNC } from "../../../data/portfolioFiles"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"

export function SkillsView() {
  const pairedGroups = skillGroups.filter((group) => group.key !== "deployment")
  const deployment = skillGroups.find((group) => group.key === "deployment")

  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "skills.json", current: true },
        ]}
      />
      <article className="mr-auto min-w-0 w-full max-w-[68rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <JsonIntro />
        <Header />
        <PrimaryStack />
        <div className="mt-2 grid min-w-0 gap-x-16 gap-y-2 xl:grid-cols-2">
          {pairedGroups.map((group) => (
            <SkillCategory key={group.id} group={group} />
          ))}
        </div>
        {deployment ? <SkillCategory group={deployment} layout="wide" /> : null}
        <NextActions />
      </article>
    </div>
  )
}

function Punct({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="text-fg-muted">
      {children}
    </span>
  )
}

function JsonIntro() {
  return (
    <pre
      aria-hidden="true"
      className="max-w-[42rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg whitespace-pre-wrap md:text-[13px]"
    >
      <code>
        <Punct>{"{\n"}</Punct>
        {"  "}
        <span className="text-syntax-property">"developer"</span>
        <Punct>: </Punct>
        <span className="text-syntax-string">"{skillsIntro.developer}"</span>
        <Punct>,{"\n"}</Punct>
        {"  "}
        <span className="text-syntax-property">"role"</span>
        <Punct>: </Punct>
        <span className="text-syntax-string">"{skillsIntro.role}"</span>
        <Punct>,{"\n"}</Punct>
        {"  "}
        <span className="text-syntax-property">"primaryStack"</span>
        <Punct>: [</Punct>
        {skillsIntro.primaryNames.map((name, index) => (
          <span key={name}>
            {index > 0 ? <Punct>, </Punct> : null}
            <span className="text-syntax-string">"{name}"</span>
          </span>
        ))}
        <Punct>{"]\n}"}</Punct>
      </code>
    </pre>
  )
}

function Header() {
  return (
    <header className="mt-8 min-w-0 md:mt-10">
      <p className="font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
        skills.json
      </p>
      <h1 className="mt-3 text-[clamp(1.75rem,3.4vw,2.35rem)] leading-tight font-semibold tracking-tight text-fg">
        Technical Stack
      </h1>
      <p className="mt-3 max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        {skillsIntro.summary}
      </p>
    </header>
  )
}

function PrimaryStack() {
  return (
    <section className="mt-8">
      <h2 className="font-mono text-[13px]">
        <span className="sr-only">Primary stack</span>
        <span aria-hidden="true">
          <Punct>"</Punct>
          <span className="text-syntax-property">primaryStack</span>
          <Punct>": [</Punct>
        </span>
      </h2>
      <ol className="mt-3 divide-y divide-subtle border-y border-subtle">
        {primaryStack.map((skill, index) => (
          <li
            key={skill.id}
            className="grid gap-1 py-3.5 min-[640px]:grid-cols-[2.25rem_minmax(12rem,22rem)_minmax(0,1fr)] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span
              aria-hidden="true"
              className="font-mono text-[12px] text-fg-muted"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="min-w-0 text-[15px] font-medium text-fg">
              {skill.name}
            </h3>
            <p className="min-w-0 text-[13px] leading-6 text-fg-secondary">
              {skill.context}
            </p>
          </li>
        ))}
      </ol>
      <p aria-hidden="true" className="mt-2 font-mono text-[13px] text-fg-muted">
        ],
      </p>
    </section>
  )
}

const SKILL_GROUP_HEADINGS: Record<string, string> = {
  frontend: "Frontend",
  backendApi: "Backend and APIs",
  dataPlatform: "Data platform",
  tooling: "Tooling",
  deployment: "Deployment",
}

function SkillCategory({
  group,
  layout = "default",
}: {
  group: SkillGroup
  layout?: "default" | "wide"
}) {
  return (
    <section className="min-w-0 pt-6">
      <h2 className="font-mono text-[13px]">
        <span className="sr-only">
          {SKILL_GROUP_HEADINGS[group.key] ?? group.key}
        </span>
        <span aria-hidden="true">
          <Punct>"</Punct>
          <span className="text-syntax-property">{group.key}</span>
          <Punct>": [</Punct>
        </span>
      </h2>
      <ul
        className={
          layout === "wide"
            ? "mt-2 grid min-w-0 gap-x-10 gap-y-1 min-[720px]:grid-cols-3"
            : "mt-2"
        }
      >
        {group.skills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} />
        ))}
      </ul>
      <p aria-hidden="true" className="mt-1 font-mono text-[13px] text-fg-muted">
        ],
      </p>
    </section>
  )
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <li className="min-w-0 py-2">
      <span className="block min-w-0 font-mono text-[12px] leading-5 text-syntax-comment">
        <span aria-hidden="true">{"// "}</span>
        {skill.context}
      </span>
      <span className="mt-0.5 block min-w-0 font-mono text-[13px] break-words text-syntax-string">
        <Punct>"</Punct>
        {skill.name}
        <Punct>"</Punct>
      </span>
    </li>
  )
}

function NextActions() {
  const { openFile } = useWorkspace()

  return (
    <footer className="mt-10 border-t border-subtle pt-6">
      <p className="font-mono text-[13px] text-fg-muted">
        <span aria-hidden="true">{"> next: "}</span>
        <span className="text-fg-secondary">projects/studysync.tsx</span>
      </p>
      <div className="mt-3 flex flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center">
        <button
          type="button"
          onClick={() => {
            openFile(FILE_STUDYSYNC)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 md:min-h-0"
        >
          Open Featured Project
        </button>
        <button
          type="button"
          onClick={() => {
            openFile(FILE_EXPERIENCE)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] px-2 py-1.5 text-[13px] text-fg-muted ui-transition hover:text-fg md:min-h-0"
        >
          Back to Experience
        </button>
      </div>
    </footer>
  )
}
