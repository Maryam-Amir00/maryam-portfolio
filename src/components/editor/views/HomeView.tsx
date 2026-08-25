import type { ReactNode } from "react"
import {
  ArrowRight,
  ExternalLink,
  FileText,
  FolderOpen,
  UserRound,
} from "lucide-react"
import {
  getContactGitHubUrl,
  getContactLinkedInUrl,
  personalInfo,
} from "../../../data/personalInfo"
import {
  currentExperience,
  formatExperiencePeriod,
} from "../../../data/experienceData"
import {
  FILE_ABOUT,
  FILE_RESUME,
  FILE_STUDYSYNC,
  findFileById,
  openedFileLabel,
} from "../../../data/portfolioFiles"
import { studySyncProject } from "../../../data/projectsData"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"
import { EditorGutter } from "../EditorGutter"

export function HomeView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "home.tsx" },
          { label: personalInfo.name, current: true },
        ]}
      />
      <div className="relative min-w-0 flex-1">
        <EditorGutter />
        <div className="mr-auto min-w-0 w-full max-w-[74rem] px-[clamp(1rem,3.5vw,2.25rem)] py-5 pb-10 min-[900px]:pl-16 md:py-7">
          <CodeIntro />
          <div className="mt-8 grid min-w-0 items-start gap-10 xl:mt-9 xl:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.65fr)] xl:gap-x-12">
            <div className="min-w-0">
              <HeroIntro />
              <TechStack />
              <HomeActions />
            </div>
            <HomeProof />
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeIntro() {
  return (
    <div
      aria-hidden="true"
      className="code-scroll min-w-0 w-full max-w-full overflow-x-auto font-mono text-[13px] leading-6 whitespace-nowrap text-fg"
    >
      <p>
        <span className="text-syntax-comment">
          {"// hello, I'm Maryam"}
        </span>
      </p>
      <p>
        <span className="text-syntax-keyword">const</span>
        {" "}
        <span className="text-fg">developer</span>
        {" = "}
        <span className="text-fg">{"{"}</span>
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">name</span>
        {": "}
        <span className="text-syntax-string">"{personalInfo.name}"</span>
        <span className="text-fg-muted">,</span>
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
      <p>
        {"  "}
        <span className="text-syntax-property">focus</span>
        {": ["}
        {personalInfo.introFocus.map((item, index) => (
          <span key={item}>
            {index > 0 ? ", " : null}
            <span className="text-syntax-string">"{item}"</span>
          </span>
        ))}
        {"],"}
      </p>
      <p className="bg-hover/20">
        <span className="text-fg">{"}"}</span>
        <span className="text-fg-muted">;</span>
        <span className="home-editor-caret" aria-hidden="true" />
      </p>
    </div>
  )
}

const HERO_EMPHASIS = [
  { value: "React", className: "text-syntax-string" },
  { value: "Django", className: "text-syntax-keyword" },
  { value: "backend", className: "text-syntax-property" },
] as const

function emphasizedHeadline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let remaining = text

  for (const mark of HERO_EMPHASIS) {
    const index = remaining.indexOf(mark.value)

    if (index === -1) {
      continue
    }

    if (index > 0) {
      nodes.push(remaining.slice(0, index))
    }

    nodes.push(
      <span key={mark.value} className={mark.className}>
        {mark.value}
      </span>,
    )
    remaining = remaining.slice(index + mark.value.length)
  }

  if (remaining) {
    nodes.push(remaining)
  }

  return nodes
}

function HeroIntro() {
  return (
    <section className="min-w-0">
      <h1 className="text-[clamp(1.875rem,5.2vw,3.25rem)] leading-[1.08] font-semibold tracking-tight text-fg">
        {personalInfo.name}
      </h1>
      <p className="mt-2.5 text-[1.05rem] leading-7 font-medium text-fg">
        {personalInfo.role}
      </p>
      <p className="mt-4 max-w-[38rem] text-[15px] leading-[1.7] text-fg/80 md:text-[16px]">
        {emphasizedHeadline(personalInfo.headline)}
      </p>
    </section>
  )
}

function TechStack() {
  return (
    <div className="mt-8">
      <ol className="flex flex-wrap gap-x-7 gap-y-2">
        {personalInfo.displayStack.map((item, index) => (
          <li key={item} className="flex items-baseline gap-2.5">
            <span className="font-mono text-[11px] text-syntax-comment">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[13px] font-medium text-fg">{item}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3.5 max-w-[38rem] font-mono text-[12px] leading-5">
        <span className="text-syntax-comment">{"//"}</span>
        <span className="text-fg-muted">
          {" "}
          {personalInfo.additionalStack.join(" · ")}
        </span>
      </p>
    </div>
  )
}

function HomeActions() {
  const { openFile } = useWorkspace()
  const github = getContactGitHubUrl()
  const linkedin = getContactLinkedInUrl()

  return (
    <div className="mt-9">
      <div className="flex flex-col items-stretch gap-2.5 min-[360px]:flex-row min-[360px]:flex-wrap min-[360px]:items-center">
        <button
          type="button"
          onClick={() => {
            openFile(FILE_STUDYSYNC)
          }}
          className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 min-[480px]:w-auto md:min-h-0"
        >
          <FolderOpen
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="ui-transition-transform motion-safe:group-hover:translate-x-px motion-safe:group-focus-visible:translate-x-px"
          />
          View Projects
        </button>
        <button
          type="button"
          onClick={() => {
            openFile(FILE_ABOUT)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-[4px] border border-fg-muted/55 bg-tab px-3.5 py-1.5 text-[13px] text-fg ui-transition hover:border-fg-muted hover:bg-hover hover:text-fg active:bg-hover md:min-h-0"
        >
          <UserRound size={14} strokeWidth={1.75} aria-hidden="true" />
          About Me
        </button>
        <button
          type="button"
          onClick={() => {
            openFile(FILE_RESUME)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-[4px] border border-fg-muted/55 bg-transparent px-3.5 py-1.5 text-[13px] text-fg/85 ui-transition hover:border-fg-muted hover:bg-hover hover:text-fg active:bg-hover md:min-h-0"
        >
          <FileText size={14} strokeWidth={1.75} aria-hidden="true" />
          Open Resume
        </button>
      </div>

      {github || linkedin ? (
        <nav
          aria-label="Professional profiles"
          className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-1 pb-1"
        >
          {github ? (
            <HomeProfileLink href={github} label="GitHub" />
          ) : null}
          {linkedin ? (
            <HomeProfileLink href={linkedin} label="LinkedIn" />
          ) : null}
        </nav>
      ) : null}

      <p className="mt-3.5 font-mono text-[13px]">
        <span aria-hidden="true" className="text-accent">
          {">"}
        </span>
        <span aria-hidden="true" className="text-fg-muted">
          {" contact: "}
        </span>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-[13px] break-all text-fg ui-transition hover:text-accent hover:underline hover:decoration-accent/50 hover:underline-offset-2"
        >
          {personalInfo.email}
        </a>
      </p>
    </div>
  )
}

function HomeProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${personalInfo.name} ${label} profile`}
      className="inline-flex min-h-11 cursor-pointer items-center gap-1 font-mono text-[12px] leading-none text-fg-secondary no-underline ui-transition [@media(hover:hover)]:hover:text-accent focus-visible:text-accent md:min-h-0 md:py-0.5"
      data-home-profile=""
    >
      <span>{label}</span>
      <ExternalLink
        size={12}
        strokeWidth={1.75}
        aria-hidden="true"
        className="shrink-0"
      />
    </a>
  )
}

function HomeProof() {
  const { openFile } = useWorkspace()
  const studySyncFile = findFileById(FILE_STUDYSYNC)
  const studySyncPath = studySyncFile
    ? openedFileLabel(studySyncFile)
    : `projects/${studySyncProject.fileName}`

  return (
    <aside
      aria-label="Workspace proof"
      className="relative min-w-0 border-t border-subtle pt-8 xl:border-t-0 xl:border-l xl:pt-1 xl:pl-8"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-[-1px] hidden h-5 w-px bg-accent/55 xl:block"
      />
      <ProofItem index="01" label="Experience" interactive>
        <p className="text-[13px] leading-5 font-medium break-words text-fg">
          {currentExperience.role}
        </p>
        <p className="mt-1 text-[13px] leading-5 text-fg-secondary">
          {currentExperience.company}
        </p>
        <p className="mt-1.5 font-mono text-[12px] leading-5 text-fg-muted">
          {formatExperiencePeriod(currentExperience)}
        </p>
      </ProofItem>

      <ProofItem index="02" label="Featured Project" interactive>
        <p className="text-[14px] leading-5 font-semibold text-fg">
          {studySyncProject.name}
        </p>
        <p className="mt-1 text-[13px] leading-5 text-fg-secondary">
          {studySyncProject.subtitle}
        </p>
        <p className="mt-1.5 font-mono text-[12px] leading-5 text-fg-muted">
          {studySyncProject.introStack.join(" · ")}
        </p>
        <p className="mt-1 font-mono text-[11px] leading-4 text-fg-muted/80">
          {studySyncPath}
        </p>
        <button
          type="button"
          onClick={() => {
            openFile(FILE_STUDYSYNC)
          }}
          aria-label={`Open ${studySyncProject.name}`}
          className="group/project mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap text-[13px] text-accent ui-transition hover:text-fg focus-visible:text-fg md:min-h-0"
        >
          <span>Open Project</span>
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="shrink-0 ui-transition-transform motion-safe:group-hover/project:translate-x-[3px] motion-safe:group-focus-visible/project:translate-x-[3px]"
          />
        </button>
      </ProofItem>

      <ProofItem index="03" label="Location" isLast>
        <p className="text-[13px] leading-5 text-fg-secondary">
          {personalInfo.location}
        </p>
      </ProofItem>
    </aside>
  )
}

function ProofItem({
  index,
  label,
  children,
  isLast = false,
  interactive = false,
}: {
  index: string
  label: string
  children: ReactNode
  isLast?: boolean
  interactive?: boolean
}) {
  return (
    <section
      className={[
        isLast ? undefined : "mb-5 border-b border-subtle pb-5",
        interactive
          ? "group/proof ui-transition [@media(hover:hover)]:hover:border-fg-muted/60"
          : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="flex items-baseline gap-3 font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase">
        <span className="text-accent">{index}</span>
        <span
          className={
            interactive
              ? "ui-transition [@media(hover:hover)]:group-hover/proof:text-fg-secondary"
              : undefined
          }
        >
          {label}
        </span>
      </h2>
      <div className="mt-2.5">{children}</div>
    </section>
  )
}
