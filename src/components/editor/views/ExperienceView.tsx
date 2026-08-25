import {
  currentExperience,
  formatExperiencePeriod,
  type ExperienceEntry,
} from "../../../data/experienceData"
import { FILE_SKILLS, FILE_STUDYSYNC } from "../../../data/portfolioFiles"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"
import { accessibleMetricValue } from "../../../utils/accessibleMetric"

const experience = currentExperience
const period = formatExperiencePeriod(experience)

export function ExperienceView() {
  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
      <EditorBreadcrumbs
        items={[
          { label: "src" },
          { label: "experience.ts", current: true },
        ]}
      />
      <article className="@container mr-auto min-w-0 w-full max-w-[64rem] px-[clamp(1rem,3.5vw,2.5rem)] py-6 md:py-9">
        <RoleCodeIntro entry={experience} />
        <RoleHeader />
        <ImpactSummary />
        <Highlights />
        <Workflow />
        <NextActions />
      </article>
    </div>
  )
}

function RoleCodeIntro({ entry }: { entry: ExperienceEntry }) {
  return (
    <pre
      aria-hidden="true"
      className="code-scroll max-w-[42rem] overflow-x-auto font-mono text-[12px] leading-6 text-fg whitespace-pre md:text-[13px]"
    >
      <code>
        <span className="text-syntax-keyword">export const</span>
        {" role = {\n"}
        {"  "}
        <span className="text-syntax-property">position</span>
        {": "}
        <span className="text-syntax-string">"{entry.role}"</span>,{"\n"}
        {"  "}
        <span className="text-syntax-property">company</span>
        {": "}
        <span className="text-syntax-string">"{entry.company}"</span>,{"\n"}
        {"  "}
        <span className="text-syntax-property">location</span>
        {": "}
        <span className="text-syntax-string">"{entry.location}"</span>,{"\n"}
        {"  "}
        <span className="text-syntax-property">product</span>
        {": "}
        <span className="text-syntax-string">"{entry.productContext}"</span>,{"\n"}
        {"  "}
        <span className="text-syntax-property">period</span>
        {": "}
        <span className="text-syntax-string">"{period}"</span>,{"\n"}
        {"  "}
        <span className="text-syntax-property">status</span>
        {": "}
        <span className="text-syntax-string">"{entry.employmentStatus}"</span>,{"\n"}
        {"} "}
        <span className="text-syntax-keyword">as const</span>
        {";"}
      </code>
    </pre>
  )
}

function RoleHeader() {
  return (
    <header className="mt-8 min-w-0 md:mt-10">
      <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
        {experience.employmentStatus === "current" ? (
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-accent"
          />
        ) : null}
        {experience.employmentStatus === "current"
          ? "Current Role"
          : "Professional Experience"}
      </p>
      <h1 className="mt-3 text-[clamp(1.75rem,3.4vw,2.35rem)] leading-tight font-semibold tracking-tight break-words text-fg">
        {experience.role}
      </h1>
      <p className="mt-2 text-[1.05rem] text-fg-secondary">{experience.company}</p>
      <p className="mt-2 font-mono text-[13px] text-fg-muted">
        <time dateTime={experience.startDate}>{experience.startDateDisplay}</time>
        {" → "}
        {experience.endDate === "present" ? (
          experience.endDateDisplay
        ) : (
          <time dateTime={experience.endDate}>{experience.endDateDisplay}</time>
        )}
        {" · "}
        {experience.location}
      </p>
      <p className="mt-5 max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        {experience.summary}
      </p>
    </header>
  )
}

function ImpactSummary() {
  return (
    <section aria-label="Impact summary" className="mt-8 border-y border-subtle">
      <dl className="grid grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-4">
        {experience.metrics.map((metric) => (
          <div
            key={metric.id}
            className="border-subtle px-3 py-4 sm:px-4 max-[359px]:border-b max-[359px]:last:border-b-0 min-[360px]:max-xl:border-b min-[360px]:max-xl:odd:border-r min-[360px]:max-xl:[&:nth-last-child(-n+2)]:border-b-0 xl:border-r xl:last:border-r-0"
          >
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <p className="text-[1.35rem] font-semibold tracking-tight text-fg sm:text-[1.5rem]">
                <span className="sr-only">
                  {accessibleMetricValue(metric.value)}
                  {metric.qualifier ? `, ${metric.qualifier}` : ""}
                </span>
                <span aria-hidden="true">{metric.value}</span>
              </p>
              <p className="mt-1 text-[12px] leading-5 text-fg-secondary" aria-hidden="true">
                {metric.label}
              </p>
              {metric.qualifier ? (
                <p className="mt-1 font-mono text-[11px] text-fg-muted" aria-hidden="true">
                  {metric.qualifier}
                </p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Highlights() {
  return (
    <section className="mt-10">
      <h2 className="text-[1.05rem] font-medium tracking-tight text-fg">
        <span className="sr-only">Engineering highlights</span>
        <span aria-hidden="true" className="font-mono text-[13px] font-normal text-syntax-comment">
          {"// engineering highlights"}
        </span>
      </h2>
      <ol className="relative mt-5 ml-0 md:ml-2">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-subtle"
        />
        {experience.highlights.map((highlight) => (
          <li key={highlight.id} className="relative pb-8 pl-4 last:pb-0 md:pl-6">
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-0 size-2 -translate-x-1/2 rounded-full border border-accent bg-editor"
            />
            <p className="font-mono text-[12px] text-fg-muted">
              {highlight.index}
            </p>
            <h3 className="mt-1 text-[1.02rem] font-medium text-fg">
              {highlight.title}
            </h3>
            <p className="mt-2 max-w-[52rem] text-[15px] leading-[1.7] text-fg-secondary">
              {highlight.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {highlight.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-[3px] border border-subtle px-1.5 py-0.5 font-mono text-[11px] text-fg-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Workflow() {
  return (
    <section className="mt-4">
      <h2 className="text-[1.05rem] font-medium tracking-tight text-fg">
        <span className="sr-only">Development workflow</span>
        <span aria-hidden="true" className="font-mono text-[13px] font-normal text-syntax-comment">
          {"// development workflow"}
        </span>
      </h2>
      <dl className="mt-4 max-w-[46rem] divide-y divide-subtle">
        {experience.workflow.map((item) => (
          <div
            key={item.id}
            className="grid gap-1 py-2.5 @min-[40rem]:grid-cols-[13.5rem_minmax(0,1fr)] @min-[40rem]:items-baseline @min-[40rem]:gap-4"
          >
            <dt className="font-mono text-[13px] text-syntax-property">
              {item.key}
            </dt>
            <dd className="font-mono text-[13px] text-syntax-string">
              "{item.value}"
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
    <footer className="mt-10 border-t border-subtle pt-6">
      <p className="font-mono text-[13px] text-fg-muted">
        <span aria-hidden="true">{"> next: "}</span>
        <span className="text-fg-secondary">skills.json</span>
      </p>
      <div className="mt-3 flex flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center">
        <button
          type="button"
          onClick={() => {
            openFile(FILE_SKILLS)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 md:min-h-0"
        >
          Open Skills
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
