import { ArrowDown, ArrowRight } from "lucide-react"
import { Fragment } from "react"
import { studySyncProject } from "../../../data/projectsData"
import { ArchitectureFlow } from "../../projects/ArchitectureFlow"
import { DataFlow } from "../../projects/DataFlow"
import { EngineeringDecisionList } from "../../projects/EngineeringDecisionList"
import { ProjectHeader } from "../../projects/ProjectHeader"
import { ProjectMeta } from "../../projects/ProjectMeta"
import { ProjectNavigation } from "../../projects/ProjectNavigation"
import { ProjectSectionHeading } from "../../projects/ProjectSectionHeading"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"

const project = studySyncProject

export function StudySyncView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "projects" },
          { label: project.fileName, current: true },
        ]}
      />
      <article className="mr-auto min-w-0 w-full max-w-[72rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <CodeIntro />
        <ProjectHeader project={project} />
        <ProjectMeta items={project.metadata} />
        <ArchitectureSection />
        <CapabilitiesSection />
        <DecisionsSection />
        <DataFlowSection />
        {project.authFlow && project.authFlowDescription ? (
          <AuthFlowSection />
        ) : null}
        <ChallengesSection />
        <AnalyticsSection />
        <DemonstratesSection />
        <ProjectNavigation next={project.next} back={project.back} />
      </article>
    </div>
  )
}

function CodeIntro() {
  return (
    <div
      aria-hidden="true"
      className="max-w-[46rem] font-mono text-[12px] leading-6 text-fg md:text-[13px]"
    >
      <p>
        <span className="text-syntax-keyword">const</span>
        {" project = {"}
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">name</span>
        {": "}
        <span className="text-syntax-string">"{project.name}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">type</span>
        {": "}
        <span className="text-syntax-string">"{project.type}"</span>,
      </p>
      <p>
        {"  "}
        <span className="text-syntax-property">stack</span>
        {": ["}
        {project.introStack.map((item, index) => (
          <span key={item}>
            {index > 0 ? ", " : null}
            <span className="text-syntax-string">"{item}"</span>
          </span>
        ))}
        {"],"}
      </p>
      <p>{"};"}</p>
      <p className="mt-1">
        <span className="text-syntax-keyword">export default</span>
        {" project;"}
      </p>
    </div>
  )
}

function ArchitectureSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="architecture">
        Tech Architecture
      </ProjectSectionHeading>
      <ArchitectureFlow
        layers={project.architecture}
        description={project.architectureDescription}
      />
    </section>
  )
}

function CapabilitiesSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="core capabilities">
        Core Capabilities
      </ProjectSectionHeading>
      <ol className="divide-y divide-subtle border-y border-subtle">
        {project.features.map((feature) => (
          <li
            key={feature.id}
            className="grid gap-1 py-4 min-[640px]:grid-cols-[2.25rem_minmax(0,16rem)_minmax(0,1fr)] min-[640px]:items-baseline min-[640px]:gap-4"
          >
            <span className="font-mono text-[12px] text-fg-muted">
              {feature.index}
            </span>
            <h3 className="min-w-0 text-[15px] font-medium text-fg">
              {feature.title}
            </h3>
            <p className="min-w-0 max-w-[42rem] text-[14px] leading-6 text-fg-secondary">
              {feature.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function DecisionsSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="engineering decisions">
        Engineering Decisions
      </ProjectSectionHeading>
      <EngineeringDecisionList decisions={project.engineeringDecisions} />
    </section>
  )
}

function DataFlowSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="application data flow">
        Full-Stack Data Flow
      </ProjectSectionHeading>
      <DataFlow
        stages={project.dataFlow}
        description={project.dataFlowDescription}
      />
    </section>
  )
}

function AuthFlowSection() {
  const stages = project.authFlow
  const description = project.authFlowDescription

  if (!stages || !description) {
    return null
  }

  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="authentication">
        Authentication Flow
      </ProjectSectionHeading>
      <p className="sr-only">{description}</p>
      <ol
        aria-hidden="true"
        className="flex min-w-0 flex-col gap-2 min-[720px]:flex-row min-[720px]:flex-wrap min-[720px]:items-center min-[720px]:gap-x-2 min-[720px]:gap-y-3"
      >
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 font-mono text-[13px] text-fg-secondary">
              <span className="text-fg-muted">{stage.index}</span>
              {"  "}
              {stage.label}
            </li>
            {index < stages.length - 1 ? (
              <li className="flex justify-center text-fg-muted min-[720px]:items-center">
                <ArrowDown
                  size={14}
                  strokeWidth={1.75}
                  className="min-[720px]:hidden"
                />
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="hidden min-[720px]:block"
                />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </section>
  )
}

function ChallengesSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="technical challenges">
        Technical Challenges
      </ProjectSectionHeading>
      <ul className="divide-y divide-subtle border-y border-subtle">
        {project.challenges.map((item) => (
          <li key={item.id} className="py-5">
            <h3 className="text-[1.02rem] font-medium text-fg">{item.title}</h3>
            <dl className="mt-3 grid gap-4 min-[800px]:grid-cols-2">
              <div className="min-w-0">
                <dt className="font-mono text-[11px] tracking-[0.08em] text-syntax-property">
                  challenge
                </dt>
                <dd className="mt-1.5 max-w-[36rem] text-[14px] leading-6 text-fg-secondary">
                  {item.challenge}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="font-mono text-[11px] tracking-[0.08em] text-syntax-property">
                  approach
                </dt>
                <dd className="mt-1.5 max-w-[36rem] text-[14px] leading-6 text-fg-secondary">
                  {item.approach}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}

function AnalyticsSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="analytics">
        {project.analytics.heading}
      </ProjectSectionHeading>
      <p className="max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.analytics.description}
      </p>
      <pre
        aria-hidden="true"
        className="mt-5 max-w-[32rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg md:text-[13px]"
      >
        <code>
          <span className="text-syntax-property">analytics</span>
          {".track(["}
          {"\n"}
          {project.analytics.tracks.map((track, index) => (
            <span key={track}>
              {"  "}
              <span className="text-syntax-string">"{track}"</span>
              {index < project.analytics.tracks.length - 1 ? "," : ""}
              {"\n"}
            </span>
          ))}
          {"]);"}
        </code>
      </pre>
    </section>
  )
}

function DemonstratesSection() {
  return (
    <section className="mt-10">
      <ProjectSectionHeading comment="coverage">
        What This Project Demonstrates
      </ProjectSectionHeading>
      <p className="max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary">
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
