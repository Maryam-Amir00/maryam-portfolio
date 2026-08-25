import { ArrowDown, ArrowRight } from "lucide-react"
import { Fragment } from "react"
import { studySyncProject } from "../../../data/projectsData"
import { ArchitectureFlow } from "../../projects/ArchitectureFlow"
import { DataFlow } from "../../projects/DataFlow"
import { EngineeringDecisionList } from "../../projects/EngineeringDecisionList"
import { ProjectDemo } from "../../projects/ProjectDemo"
import { ProjectExternalActions } from "../../projects/ProjectExternalActions"
import { ProjectHeader } from "../../projects/ProjectHeader"
import { ProjectMeta } from "../../projects/ProjectMeta"
import { ProjectNavigation } from "../../projects/ProjectNavigation"
import { ProjectSectionHeading } from "../../projects/ProjectSectionHeading"
import { getSafeProjectLinks } from "../../projects/projectLinks"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"

const project = studySyncProject
const links = getSafeProjectLinks(project)

export function StudySyncView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "projects" },
          { label: project.fileName, current: true },
        ]}
      />
      <article className="@container mr-auto min-w-0 w-full max-w-[86rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <div className="border-b border-subtle pb-10 md:pb-14">
          <CodeIntro />
          <ProjectHeader project={project} />
          <ProjectMeta items={project.metadata} />
          {links.youtube && project.demoIntro ? (
            <ProjectDemo
              intro={project.demoIntro}
              youtubeUrl={links.youtube}
              videoId={links.videoId}
            />
          ) : null}
        </div>

        <div className="border-b border-subtle py-10 md:py-16">
          <ArchitectureSection />
          <CapabilitiesSection />
        </div>

        <div className="border-b border-subtle py-10 md:py-16">
          <DecisionsSection />
        </div>

        <div className="border-b border-subtle py-10 md:py-16">
          <DataFlowSection />
          {project.authFlow && project.authFlowDescription ? (
            <AuthFlowSection />
          ) : null}
          <ChallengesSection />
        </div>

        <div className="py-10 md:py-16">
          <AnalyticsSection />
          <DemonstratesSection />
          <div className="mt-10 md:mt-12">
            <ProjectExternalActions project={project} />
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
      className="code-scroll max-w-[46rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg md:text-[13px]"
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
    <section>
      <ProjectSectionHeading comment="architecture" prominence="strong">
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
    <section className="mt-10 md:mt-16">
      <ProjectSectionHeading comment="core capabilities" prominence="strong">
        Core Capabilities
      </ProjectSectionHeading>
      <ol className="divide-y divide-subtle border-y border-subtle">
        {project.features.map((feature) => (
          <li
            key={feature.id}
            className="grid gap-1 py-4 @min-[40rem]:grid-cols-[2.25rem_minmax(0,16rem)_minmax(0,1fr)] @min-[40rem]:items-baseline @min-[40rem]:gap-4"
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
    <section>
      <ProjectSectionHeading comment="engineering decisions" prominence="strong">
        Engineering Decisions
      </ProjectSectionHeading>
      <EngineeringDecisionList
        decisions={project.engineeringDecisions}
        roomy
      />
    </section>
  )
}

function DataFlowSection() {
  return (
    <section>
      <ProjectSectionHeading comment="application data flow" prominence="strong">
        Full Stack Data Flow
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
    <section className="mt-10 md:mt-16">
      <ProjectSectionHeading comment="authentication" prominence="strong">
        Authentication Flow
      </ProjectSectionHeading>
      <p className="mb-5 max-w-[46rem] text-[14px] leading-6 text-fg-secondary">
        {description}
      </p>
      <ol className="flex min-w-0 flex-col gap-2 @min-[42rem]:flex-row @min-[42rem]:flex-wrap @min-[42rem]:items-center @min-[42rem]:gap-x-3 @min-[42rem]:gap-y-3">
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <li className="min-w-0 break-words font-mono text-[13px] text-fg-secondary">
              <span className="text-fg-muted">{stage.index}</span>
              {"  "}
              {stage.label}
            </li>
            {index < stages.length - 1 ? (
              <li
                aria-hidden="true"
                className="flex justify-center text-fg-muted @min-[42rem]:items-center"
              >
                <ArrowDown
                  size={14}
                  strokeWidth={1.75}
                  className="@min-[42rem]:hidden"
                />
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="hidden @min-[42rem]:block"
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
    <section className="mt-10 md:mt-16">
      <ProjectSectionHeading comment="technical challenges" prominence="strong">
        Technical Challenges
      </ProjectSectionHeading>
      <ul className="divide-y divide-subtle border-y border-subtle">
        {project.challenges.map((item) => (
          <li key={item.id} className="py-5">
            <h3 className="text-[1.02rem] font-medium text-fg">{item.title}</h3>
            <dl className="mt-3 grid gap-5 @min-[48rem]:grid-cols-2 @min-[48rem]:gap-8">
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
                <dd className="mt-1.5 max-w-[36rem] text-[14px] leading-6 text-fg">
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
    <section>
      <ProjectSectionHeading comment="analytics" prominence="strong">
        {project.analytics.heading}
      </ProjectSectionHeading>
      <p className="max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary">
        {project.analytics.description}
      </p>
      <pre
        aria-hidden="true"
        className="code-scroll mt-5 max-w-[32rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg md:text-[13px]"
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
    <section className="mt-10 border-t border-subtle pt-10 md:mt-12 md:pt-16">
      <ProjectSectionHeading comment="coverage" prominence="strong">
        What This Project Demonstrates
      </ProjectSectionHeading>
      <p className="max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary">
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
