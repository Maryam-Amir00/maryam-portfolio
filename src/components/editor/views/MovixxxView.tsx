import { ArrowDown, ArrowRight } from "lucide-react"
import { Fragment } from "react"
import {
  formatProjectIndex,
  movixxxProject,
  type DebounceComparisonColumn,
  type FlowStage,
} from "../../../data/projectsData"
import { EngineeringDecisionList } from "../../projects/EngineeringDecisionList"
import { ProjectDemo } from "../../projects/ProjectDemo"
import {
  MOVIXXX_DEMO_SECTION_ID,
  ProjectExternalActions,
} from "../../projects/ProjectExternalActions"
import { ProjectMeta } from "../../projects/ProjectMeta"
import { ProjectNavigation } from "../../projects/ProjectNavigation"
import { ProjectSectionHeading } from "../../projects/ProjectSectionHeading"
import { getSafeProjectLinks } from "../../projects/projectLinks"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"
import { accessibleMetricValue } from "../../../utils/accessibleMetric"

const project = movixxxProject
const links = getSafeProjectLinks(project)

export function MovixxxView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "projects" },
          { label: project.fileName, current: true },
        ]}
      />
      <article className="@container mr-auto min-w-0 w-full max-w-[64rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <div className="border-b border-subtle pb-10 md:pb-12">
          <CodeIntro />
          <Header />
          <ProjectMeta items={project.metadata} emphasizeValues />
          {links.youtube && project.demoIntro ? (
            <ProjectDemo
              intro={project.demoIntro}
              youtubeUrl={links.youtube}
              videoId={links.videoId}
              iframeTitle="Movixxx project demo"
              sectionId={MOVIXXX_DEMO_SECTION_ID}
              maxWidthClass="max-w-[52rem]"
              headingProminence="default"
            />
          ) : null}
        </div>

        <div className="border-b border-subtle py-10 md:py-14">
          <SearchFlowSection />
          <WatchlistSection />
        </div>

        <div className="border-b border-subtle py-10 md:py-14">
          <LoadingSection />
          <ResponsiveSection />
          <HighlightsSection />
        </div>

        <div className="border-b border-subtle py-10 md:py-14">
          <DataConcernsSection />
          <DecisionsSection />
        </div>

        <div className="py-10 md:py-14">
          <StackSection />
          <DemonstratesSection />
          <div className="mt-10 md:mt-12">
            <ProjectExternalActions
              project={project}
              demoSectionId={MOVIXXX_DEMO_SECTION_ID}
            />
          </div>
        </div>

        <ProjectNavigation next={project.next} back={project.back} />
      </article>
    </div>
  )
}

function CodeIntro() {
  return (
    <div
      aria-hidden="true"
      className="code-scroll max-w-[42rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg md:text-[13px]"
    >
      <p className="text-syntax-comment">{"// movixxx.jsx"}</p>
      <p className="mt-1">
        <span className="text-syntax-keyword">const</span>
        {" movieSearch = {"}
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">app</span>
        {": "}
        <span className="text-syntax-string">"{project.intro.app}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">source</span>
        {": "}
        <span className="text-syntax-string">"{project.intro.source}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">focus</span>
        {": "}
        <span className="text-syntax-string">"{project.intro.focus}"</span>,
      </p>
      <p>{"};"}</p>
      <p className="mt-1">
        <span className="text-syntax-keyword">export default</span>
        {" movieSearch;"}
      </p>
    </div>
  )
}

function Header() {
  return (
    <header className="mt-8 min-w-0 md:mt-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
          {project.kicker}
        </p>
        <p className="font-mono text-[12px] text-fg-muted">
          PROJECT {formatProjectIndex(project)}
        </p>
      </div>
      <h1 className="mt-3 text-[clamp(1.8rem,3.4vw,2.45rem)] leading-tight font-semibold tracking-tight text-fg">
        {project.name}
      </h1>
      <p className="mt-2 text-[1.02rem] text-fg-secondary">{project.subtitle}</p>
      <p className="mt-5 max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.summary}
      </p>
      <div className="mt-5">
        <ProjectExternalActions
          project={project}
          demoSectionId={MOVIXXX_DEMO_SECTION_ID}
        />
      </div>
    </header>
  )
}

function EventPipeline({
  stages,
  description,
}: {
  stages: readonly FlowStage[]
  description: string
}) {
  return (
    <div>
      <p className="sr-only">{description}</p>
      <ol
        aria-hidden="true"
        className="grid min-w-0 grid-cols-1 @min-[40rem]:grid-cols-2 @min-[64rem]:flex @min-[64rem]:flex-row @min-[64rem]:items-stretch"
      >
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 border-l border-subtle py-2 pl-3 @min-[40rem]:border-t @min-[40rem]:border-l-0 @min-[40rem]:px-0 @min-[40rem]:pt-3 @min-[40rem]:pb-2 @min-[64rem]:flex-1 @min-[64rem]:pb-0">
              <p className="font-mono text-[11px] text-fg-muted">{stage.index}</p>
              <p className="mt-1.5 font-mono text-[12px] font-medium tracking-[0.12em] text-fg uppercase">
                {stage.label}
              </p>
              {stage.detail ? (
                <p className="mt-1.5 text-[13px] leading-5 break-words text-fg-secondary">
                  {stage.detail}
                </p>
              ) : null}
            </li>
            {index < stages.length - 1 ? (
              <li className="flex shrink-0 items-center px-0 py-2 pl-3 @min-[40rem]:hidden @min-[64rem]:flex @min-[64rem]:px-2.5 @min-[64rem]:py-0 @min-[64rem]:pl-0">
                <ArrowDown
                  size={16}
                  strokeWidth={1.75}
                  className="text-fg-muted @min-[64rem]:hidden"
                />
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="hidden text-fg-muted @min-[64rem]:block"
                />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

function SearchFlowSection() {
  return (
    <section>
      <ProjectSectionHeading comment="debounced search flow">
        Search Request Flow
      </ProjectSectionHeading>
      <EventPipeline
        stages={project.searchFlow}
        description={project.searchFlowDescription}
      />
      <div className="mt-6 border-l border-subtle pl-4">
        <p className="font-mono text-[12px] text-fg-muted">Debounced requests</p>
        <p className="mt-1.5 text-[1.75rem] leading-none font-semibold tracking-tight text-fg">
          <span className="sr-only">
            {accessibleMetricValue(project.metric.value)} {project.metric.label},{" "}
            {project.metric.context}
          </span>
          <span aria-hidden="true">{project.metric.value}</span>
        </p>
        <p className="mt-2 text-[13px] leading-5 text-fg-secondary" aria-hidden="true">
          {project.metric.label}
        </p>
      </div>
      <p className="mt-6 max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.debounceExplanation}
      </p>
      <p className="sr-only">{project.debounceComparison.description}</p>
      <div className="mt-8 grid gap-8 @min-[48rem]:grid-cols-2 @min-[48rem]:gap-x-12">
        <ComparisonColumn column={project.debounceComparison.without} showRequest />
        <ComparisonColumn column={project.debounceComparison.with} />
      </div>
    </section>
  )
}

function ComparisonColumn({
  column,
  showRequest = false,
}: {
  column: DebounceComparisonColumn
  showRequest?: boolean
}) {
  return (
    <div aria-hidden="true" className="min-w-0 border-t border-subtle pt-4">
      <p className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
        {column.label}
      </p>
      <p className="mt-2 font-mono text-[13px] text-syntax-string">
        {column.prompt}
      </p>
      <ul className="mt-3 font-mono text-[13px] leading-6">
        {column.keystrokes.map((keystroke) => (
          <li key={keystroke} className="flex min-w-0 items-baseline gap-3">
            <span className="w-12 shrink-0 text-fg">{keystroke}</span>
            {showRequest ? (
              <span className="text-fg-muted">→ request</span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-baseline gap-2 font-mono text-[13px] text-syntax-comment">
        <span aria-hidden="true">↓</span>
        <span>{column.result}</span>
      </p>
    </div>
  )
}

function WatchlistSection() {
  return (
    <section className="mt-10 md:mt-14">
      <ProjectSectionHeading comment="persistent watchlist">
        Persistent Watchlist
      </ProjectSectionHeading>
      <p className="max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.watchlist.summary}
      </p>
      <p className="mt-3 max-w-[42rem] font-mono text-[12px] leading-5 text-syntax-comment">
        {"// "}
        {project.watchlist.persistenceNote}
      </p>
      <p className="sr-only">{project.watchlist.flowDescription}</p>
      <div
        aria-hidden="true"
        className="mt-6 grid gap-8 @min-[48rem]:grid-cols-2 @min-[48rem]:gap-x-12"
      >
        <FlowList
          heading="this session"
          stages={project.watchlist.persistFlow}
        />
        <FlowList
          heading="next session"
          stages={project.watchlist.restoreFlow}
        />
      </div>
      <dl className="mt-8 grid gap-5 @min-[48rem]:grid-cols-2 @min-[48rem]:gap-x-12">
        {project.watchlist.roles.map((item) => (
          <div key={item.id} className="min-w-0 border-t border-subtle pt-3">
            <dt className="font-mono text-[13px] text-syntax-property">
              {item.name}
            </dt>
            <dd className="mt-1 max-w-[28rem] text-[14px] leading-6 text-fg-secondary">
              {item.role}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function FlowList({
  heading,
  stages,
}: {
  heading: string
  stages: readonly FlowStage[]
}) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[11px] font-medium tracking-[0.12em] text-fg uppercase">
        {heading}
      </p>
      <ol className="mt-3">
        {stages.map((stage, index) => (
          <li key={stage.id} className="flex min-w-0 flex-col">
            <span className="font-mono text-[13px] text-fg-secondary">
              <span className="text-fg-muted">{stage.index}</span>
              {"  "}
              {stage.label}
            </span>
            {index < stages.length - 1 ? (
              <span className="py-1 pl-1 text-fg-muted" aria-hidden="true">
                <ArrowDown size={12} strokeWidth={1.75} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

function LoadingSection() {
  return (
    <section>
      <ProjectSectionHeading comment="loading states">
        Loading and Feedback States
      </ProjectSectionHeading>
      <p className="max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.loading.summary}
      </p>
      <div
        aria-hidden="true"
        className="mt-5 w-full min-w-0 max-w-[22rem] border border-subtle px-4 py-3"
      >
        <p className="font-mono text-[12px] text-syntax-comment">
          {project.loading.status}
        </p>
        <div className="mt-2 flex h-1.5 overflow-hidden bg-hover">
          <span className="w-2/5 bg-fg-muted" />
        </div>
        <p className="mt-2 font-mono text-[12px] text-fg-muted">
          {project.loading.detail}
        </p>
      </div>
    </section>
  )
}

function ResponsiveSection() {
  return (
    <section className="mt-10 md:mt-14">
      <ProjectSectionHeading comment="result experience">
        Responsive Result Experience
      </ProjectSectionHeading>
      <p className="max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.responsive.summary}
      </p>
      <ul className="mt-4 max-w-[42rem]">
        {project.responsive.points.map((point) => (
          <li
            key={point}
            className="border-t border-subtle py-2 font-mono text-[13px] text-fg-secondary last:border-b"
          >
            {point}
          </li>
        ))}
      </ul>
    </section>
  )
}

function HighlightsSection() {
  return (
    <section className="mt-10 md:mt-14">
      <ProjectSectionHeading comment="engineering highlights">
        Engineering Highlights
      </ProjectSectionHeading>
      <ol className="divide-y divide-subtle border-y border-subtle">
        {project.features.map((feature) => (
          <li
            key={feature.id}
            className="grid gap-1 py-3 @min-[40rem]:grid-cols-[2.25rem_minmax(0,14rem)_minmax(0,1fr)] @min-[40rem]:items-baseline @min-[40rem]:gap-4"
          >
            <span className="font-mono text-[12px] text-fg-muted">
              {feature.index}
            </span>
            <h3 className="min-w-0 text-[15px] font-medium text-fg">
              {feature.title}
            </h3>
            <p className="min-w-0 max-w-[38rem] text-[14px] leading-6 text-fg-secondary">
              {feature.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function InlineFlow({
  stages,
  description,
}: {
  stages: readonly FlowStage[]
  description: string
}) {
  return (
    <div className="mt-3">
      <p className="sr-only">{description}</p>
      <ol
        aria-hidden="true"
        className="flex min-w-0 flex-col gap-1 @min-[40rem]:flex-row @min-[40rem]:flex-wrap @min-[40rem]:items-center @min-[40rem]:gap-x-2 @min-[40rem]:gap-y-2"
      >
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 font-mono text-[13px] text-fg-secondary">
              {stage.label}
            </li>
            {index < stages.length - 1 ? (
              <li className="flex text-fg-muted @min-[40rem]:items-center">
                <ArrowDown
                  size={12}
                  strokeWidth={1.75}
                  className="@min-[40rem]:hidden"
                />
                <ArrowRight
                  size={12}
                  strokeWidth={1.75}
                  className="hidden @min-[40rem]:block"
                />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

function DataConcernsSection() {
  return (
    <section>
      <ProjectSectionHeading comment="data flow">
        Remote Data vs Local State
      </ProjectSectionHeading>
      <p className="max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.dataNote}
      </p>
      <div className="mt-6 grid gap-8 @min-[52rem]:grid-cols-2 @min-[52rem]:gap-0">
        <div className="min-w-0 @min-[52rem]:pr-10">
          <h3 className="font-mono text-[12px] font-medium tracking-[0.12em] text-fg uppercase">
            Remote / API
          </h3>
          <InlineFlow
            stages={project.searchDataFlow}
            description={project.searchDataFlowDescription}
          />
        </div>
        <div className="min-w-0 border-t border-subtle pt-6 @min-[52rem]:border-t-0 @min-[52rem]:border-l @min-[52rem]:pt-0 @min-[52rem]:pl-10">
          <h3 className="font-mono text-[12px] font-medium tracking-[0.12em] text-fg uppercase">
            Local / Persistent
          </h3>
          <InlineFlow
            stages={project.watchlistDataFlow}
            description={project.watchlistDataFlowDescription}
          />
        </div>
      </div>
    </section>
  )
}

function DecisionsSection() {
  return (
    <section className="mt-10 md:mt-14">
      <ProjectSectionHeading comment="engineering decisions">
        Engineering Decisions
      </ProjectSectionHeading>
      <EngineeringDecisionList
        decisions={project.engineeringDecisions}
        outcomeLabel="impact"
        stackUntilWide
      />
    </section>
  )
}

function StackSection() {
  return (
    <section>
      <ProjectSectionHeading comment="stack">
        Project Stack
      </ProjectSectionHeading>
      <dl className="grid gap-x-10 gap-y-4 @min-[42rem]:grid-cols-2">
        {project.stackGroups.map((item) => (
          <div key={item.id} className="min-w-0 border-t border-subtle pt-3">
            <dt className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-[13px] text-fg">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function DemonstratesSection() {
  return (
    <section className="mt-10 md:mt-14">
      <ProjectSectionHeading comment="coverage">
        What This Project Demonstrates
      </ProjectSectionHeading>
      <p className="max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.demonstratesIntro}
      </p>
      <dl className="mt-6 grid gap-x-10 gap-y-4 @min-[42rem]:grid-cols-2 @min-[56.25rem]:grid-cols-3">
        {project.demonstrates.map((item) => (
          <div key={item.id} className="min-w-0 border-t border-subtle pt-3">
            <dt className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-[13px] leading-6 break-words text-fg-secondary">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
