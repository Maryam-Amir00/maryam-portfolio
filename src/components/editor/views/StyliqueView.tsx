import { ArrowDown, ArrowRight } from "lucide-react"
import { Fragment } from "react"
import {
  formatProjectIndex,
  styliqueProject,
  type ArchitectureBranch,
  type FlowStage,
} from "../../../data/projectsData"
import { EngineeringDecisionList } from "../../projects/EngineeringDecisionList"
import { ProjectMeta } from "../../projects/ProjectMeta"
import { ProjectNavigation } from "../../projects/ProjectNavigation"
import { ProjectSectionHeading } from "../../projects/ProjectSectionHeading"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"
import { accessibleMetricValue } from "../../../utils/accessibleMetric"

const project = styliqueProject

export function StyliqueView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "projects" },
          { label: project.fileName, current: true },
        ]}
      />
      <article className="mr-auto min-w-0 w-full max-w-[68rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <CodeIntro />
        <Header />
        <ProjectMeta items={project.metadata} />
        <ArchitectureSection />
        <RoutingSection />
        <ShoppingStateSection />
        <PersistenceSection />
        <ReuseSection />
        <MobileFirstSection />
        <ProductDataSection />
        <HighlightsSection />
        <ApplicationFlowSection />
        <DecisionsSection />
        <ChallengesSection />
        <StackSection />
        <DemonstratesSection />
        <ProjectNavigation
          next={project.next}
          back={project.back}
          tertiary={project.tertiary}
        />
      </article>
    </div>
  )
}

function CodeIntro() {
  return (
    <div
      aria-hidden="true"
      className="max-w-[44rem] font-mono text-[12px] leading-6 text-fg md:text-[13px]"
    >
      <p className="text-syntax-comment">{"// stylique.jsx"}</p>
      <p className="mt-1">
        <span className="text-syntax-keyword">const</span>
        {" storefront = {"}
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">name</span>
        {": "}
        <span className="text-syntax-string">"{project.intro.name}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">type</span>
        {": "}
        <span className="text-syntax-string">"{project.intro.type}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">architecture</span>
        {": "}
        <span className="text-syntax-string">
          "{project.intro.architecture}"
        </span>
        ,
      </p>
      <p>{"};"}</p>
      <p className="mt-1">
        <span className="text-syntax-keyword">export default</span>
        {" storefront;"}
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
      <p className="mt-5 max-w-[44rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.summary}
      </p>
    </header>
  )
}

function StructureTree({
  root,
  branches,
  description,
}: {
  root: string
  branches: readonly ArchitectureBranch[]
  description: string
}) {
  return (
    <div>
      <p className="sr-only">{description}</p>
      <div
        aria-hidden="true"
        className="flex min-w-0 flex-col gap-3 min-[880px]:flex-row min-[880px]:items-start min-[880px]:gap-6"
      >
        <p className="shrink-0 border border-subtle px-3 py-2 font-mono text-[13px] text-fg">
          {root}
        </p>
        <ul className="min-w-0 font-mono text-[13px] leading-7">
          {branches.map((branch, index) => (
            <li
              key={branch.id}
              className="min-w-0 break-words text-fg-secondary max-md:border-b max-md:border-subtle max-md:py-2.5 max-md:last:border-b-0 min-[880px]:py-0"
            >
              <span className="hidden text-fg-muted md:inline">
                {index === branches.length - 1 ? "└─ " : "├─ "}
              </span>
              <span className="block text-syntax-property md:inline">
                {branch.label}
              </span>
              <span className="hidden text-fg-muted md:inline">{" → "}</span>
              <span className="block text-syntax-string md:inline">
                {branch.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ArchitectureSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="application architecture">
        Application Structure
      </ProjectSectionHeading>
      <StructureTree
        root={project.architectureTree.root}
        branches={project.architectureTree.branches}
        description={project.architectureTree.description}
      />
    </section>
  )
}

function RoutingSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="routing architecture">
        Routing Architecture
      </ProjectSectionHeading>
      <div className="grid gap-6 min-[800px]:grid-cols-[auto_minmax(0,1fr)] min-[800px]:items-start">
        <div className="min-w-0 border-l border-subtle pl-4">
          <p className="text-[1.75rem] leading-none font-semibold tracking-tight text-fg">
            <span className="sr-only">
              {accessibleMetricValue(project.routing.metricValue)}{" "}
              {project.routing.metricLabel}, {project.routing.metricContext}
            </span>
            <span aria-hidden="true">{project.routing.metricValue}</span>
          </p>
          <p className="mt-2 text-[13px] leading-5 text-fg-secondary" aria-hidden="true">
            {project.routing.metricLabel}
          </p>
          <p className="mt-1 font-mono text-[12px] text-fg-muted" aria-hidden="true">
            {project.routing.metricContext}
          </p>
        </div>
        <p className="max-w-[42rem] text-[15px] leading-[1.7] text-fg-secondary">
          {project.routing.summary}
        </p>
      </div>
      <div className="mt-6">
        <p className="sr-only">{project.routing.areasDescription}</p>
        <p
          aria-hidden="true"
          className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase"
        >
          application
        </p>
        <ul
          aria-hidden="true"
          className="mt-2 font-mono text-[13px] leading-7 text-fg-secondary"
        >
          {project.routing.areas.map((area, index) => (
            <li key={area.id} className="min-w-0 break-words">
              <span className="text-fg-muted">
                {index === project.routing.areas.length - 1 ? "└─ " : "├─ "}
              </span>
              {area.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ShoppingStateSection() {
  const flow = project.shoppingState.flow
  const branchIndex = flow.findIndex((stage) => stage.id === "state")

  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="shopping state">
        Shared Shopping State
      </ProjectSectionHeading>
      <p className="max-w-[44rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.shoppingState.summary}
      </p>
      <p className="sr-only">{project.shoppingState.flowDescription}</p>
      <ol aria-hidden="true" className="mt-6 max-w-[28rem]">
        {flow.map((stage, index) => (
          <li key={stage.id} className="min-w-0">
            <p className="font-mono text-[13px] text-fg-secondary">
              <span className="text-fg-muted">{stage.index}</span>
              {"  "}
              {stage.label}
            </p>
            {index === branchIndex ? (
              <ul className="ml-6 border-l border-subtle py-1 pl-3 font-mono text-[12px] text-syntax-string">
                {project.shoppingState.branches.map((branch) => (
                  <li key={branch}>{branch}</li>
                ))}
              </ul>
            ) : null}
            {index < flow.length - 1 ? (
              <p className="py-1 pl-1 text-fg-muted">
                <ArrowDown size={12} strokeWidth={1.75} />
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

function PersistenceSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="state persistence">
        State Persistence
      </ProjectSectionHeading>
      <p className="max-w-[44rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.persistence.summary}
      </p>
      <p className="sr-only">{project.persistence.flowDescription}</p>
      <div
        aria-hidden="true"
        className="mt-6 flex min-w-0 flex-col gap-5 min-[880px]:flex-row min-[880px]:items-start"
      >
        <StageColumn
          heading="during the session"
          stages={project.persistence.persistFlow}
        />
        <div className="flex shrink-0 items-center justify-center px-1 text-fg-muted min-[880px]:pt-8">
          <ArrowDown size={14} strokeWidth={1.75} className="min-[880px]:hidden" />
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            className="hidden min-[880px]:block"
          />
        </div>
        <StageColumn
          heading="shopping continues"
          stages={project.persistence.restoreFlow}
        />
      </div>
      <dl className="mt-8 grid gap-5 min-[800px]:grid-cols-2">
        <div className="min-w-0 border-t border-subtle pt-3">
          <dt className="font-mono text-[13px] text-syntax-property">
            Shared state
          </dt>
          <dd className="mt-1.5 max-w-[28rem] text-[14px] leading-6 text-fg-secondary">
            {project.persistence.sharedRole}
          </dd>
        </div>
        <div className="min-w-0 border-t border-subtle pt-3">
          <dt className="font-mono text-[13px] text-syntax-property">
            Persistence
          </dt>
          <dd className="mt-1.5 max-w-[28rem] text-[14px] leading-6 text-fg-secondary">
            {project.persistence.persistedRole}
          </dd>
        </div>
      </dl>
    </section>
  )
}

function StageColumn({
  heading,
  stages,
}: {
  heading: string
  stages: readonly FlowStage[]
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
        {heading}
      </p>
      <ol className="mt-3 font-mono text-[13px] leading-7 text-fg-secondary">
        {stages.map((stage, index) => (
          <li key={stage.id} className="min-w-0 break-words">
            <span className="text-fg-muted">
              {index === stages.length - 1 ? "└─ " : "├─ "}
            </span>
            {stage.label}
          </li>
        ))}
      </ol>
    </div>
  )
}

function ReuseSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="reusable UI architecture">
        Reusable UI Architecture
      </ProjectSectionHeading>
      <p className="max-w-[44rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.reuse.summary}
      </p>
      <p className="sr-only">{project.reuse.comparisonDescription}</p>
      <div
        aria-hidden="true"
        className="mt-6 grid gap-8 min-[800px]:grid-cols-2"
      >
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
            Without reuse
          </p>
          <ul className="mt-3 font-mono text-[13px] leading-7 text-fg-secondary">
            {project.reuse.without.map((item) => (
              <li key={item} className="min-w-0 break-words">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
            With reusable components
          </p>
          <p className="mt-3 font-mono text-[13px] text-fg">
            {project.reuse.withRoot}
          </p>
          <ul className="mt-1 font-mono text-[13px] leading-7 text-fg-secondary">
            {project.reuse.withViews.map((view, index) => (
              <li key={view}>
                <span className="text-fg-muted">
                  {index === project.reuse.withViews.length - 1
                    ? "└─ "
                    : "├─ "}
                </span>
                {view}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 max-w-[44rem] font-mono text-[12px] leading-5 text-syntax-comment">
        {"// "}
        {project.reuse.note}
      </p>
    </section>
  )
}

function MobileFirstSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="mobile-first">
        Mobile-First UI
      </ProjectSectionHeading>
      <p className="max-w-[44rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.mobileFirst.summary}
      </p>
      <p className="sr-only">{project.mobileFirst.description}</p>
      <ol
        aria-hidden="true"
        className="mt-6 flex min-w-0 flex-col min-[800px]:flex-row min-[800px]:items-stretch"
      >
        {project.mobileFirst.stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 flex-1 border-l border-subtle py-1 pl-3 min-[800px]:border-t min-[800px]:border-l-0 min-[800px]:px-0 min-[800px]:pt-3 min-[800px]:pb-0">
              <p className="font-mono text-[11px] tracking-[0.12em] text-syntax-property uppercase">
                {stage.label}
              </p>
              <p className="mt-1 text-[13px] leading-5 text-fg-secondary">
                {stage.detail}
              </p>
            </li>
            {index < project.mobileFirst.stages.length - 1 ? (
              <li className="flex shrink-0 items-center px-0 py-1 pl-3 min-[800px]:px-2 min-[800px]:py-0 min-[800px]:pl-0">
                <ArrowDown
                  size={14}
                  strokeWidth={1.75}
                  className="text-fg-muted min-[800px]:hidden"
                />
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="hidden text-fg-muted min-[800px]:block"
                />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </section>
  )
}

function ProductDataSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="product data">
        External Product Data
      </ProjectSectionHeading>
      <p className="max-w-[44rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.productData.summary}
      </p>
      <InlineFlow
        stages={project.productData.flow}
        description={project.productData.flowDescription}
      />
    </section>
  )
}

function HighlightsSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="engineering highlights">
        Engineering Highlights
      </ProjectSectionHeading>
      <ol className="divide-y divide-subtle border-y border-subtle">
        {project.features.map((feature) => (
          <li
            key={feature.id}
            className="grid gap-1 py-3 min-[640px]:grid-cols-[2.25rem_minmax(0,15rem)_minmax(0,1fr)] min-[640px]:items-baseline min-[640px]:gap-4"
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

function ApplicationFlowSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="application flow">
        Application Flow
      </ProjectSectionHeading>
      <InlineFlow
        stages={project.applicationFlow}
        description={project.applicationFlowDescription}
      />
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
    <div className="mt-4">
      <p className="sr-only">{description}</p>
      <ol
        aria-hidden="true"
        className="flex min-w-0 flex-col gap-1 min-[800px]:flex-row min-[800px]:flex-wrap min-[800px]:items-center min-[800px]:gap-x-2 min-[800px]:gap-y-2"
      >
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 font-mono text-[13px] text-fg-secondary">
              {stage.label}
            </li>
            {index < stages.length - 1 ? (
              <li className="flex text-fg-muted min-[800px]:items-center">
                <ArrowDown
                  size={12}
                  strokeWidth={1.75}
                  className="min-[800px]:hidden"
                />
                <ArrowRight
                  size={12}
                  strokeWidth={1.75}
                  className="hidden min-[800px]:block"
                />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

function DecisionsSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="engineering decisions">
        Engineering Decisions
      </ProjectSectionHeading>
      <EngineeringDecisionList
        decisions={project.engineeringDecisions}
        problemLabel="constraint"
        approachLabel="choice"
        outcomeLabel="reason"
      />
    </section>
  )
}

function ChallengesSection() {
  const challenges = project.challenges

  if (!challenges) {
    return null
  }

  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="architecture challenges">
        Frontend Architecture Challenges
      </ProjectSectionHeading>
      <ul className="divide-y divide-subtle border-y border-subtle">
        {challenges.map((item) => (
          <li
            key={item.id}
            className="grid gap-3 py-4 min-[800px]:grid-cols-2 min-[800px]:gap-8"
          >
            <div className="min-w-0">
              <p className="font-mono text-[11px] tracking-[0.08em] text-syntax-property">
                challenge
              </p>
              <h3 className="mt-1 text-[15px] font-medium text-fg">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-6 text-fg-secondary">
                {item.challenge}
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[11px] tracking-[0.08em] text-syntax-property">
                solution direction
              </p>
              <p className="mt-1.5 text-[14px] leading-6 text-fg-secondary">
                {item.approach}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StackSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="stack">
        Project Stack
      </ProjectSectionHeading>
      <dl className="grid gap-x-10 gap-y-4 min-[720px]:grid-cols-2 min-[1080px]:grid-cols-3">
        {project.stackGroups.map((item) => (
          <div key={item.id} className="min-w-0 border-t border-subtle pt-3">
            <dt className="font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-[13px] text-fg-secondary">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function DemonstratesSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="coverage">
        What This Project Demonstrates
      </ProjectSectionHeading>
      <p className="max-w-[44rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.demonstratesIntro}
      </p>
      <dl className="mt-6 grid gap-x-10 gap-y-4 min-[720px]:grid-cols-2 min-[1080px]:grid-cols-3">
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
