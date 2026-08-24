import { ArrowUpRight, Code2 } from "lucide-react"
import {
  formatProjectIndex,
  type PortfolioProject,
} from "../../data/projectsData"

export function ProjectHeader({ project }: { project: PortfolioProject }) {
  const hasLiveUrl = Boolean(project.liveUrl)
  const hasGithubUrl = Boolean(project.githubUrl)

  return (
    <header className="mt-8 min-w-0 md:mt-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
          {project.kicker ??
            (project.featured ? "Featured Project" : "Project")}
        </p>
        <p className="font-mono text-[12px] text-fg-muted">
          PROJECT {formatProjectIndex(project)}
        </p>
      </div>
      <h1 className="mt-3 text-[clamp(1.9rem,3.8vw,2.75rem)] leading-tight font-semibold tracking-tight text-fg">
        {project.name}
      </h1>
      <p className="mt-2 text-[1.05rem] text-fg-secondary">{project.subtitle}</p>
      <p className="mt-5 max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        {project.summary}
      </p>
      {hasLiveUrl || hasGithubUrl ? (
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-[4px] border border-subtle px-3 py-1.5 text-[13px] text-fg-secondary ui-transition hover:bg-hover hover:text-fg md:min-h-0"
            >
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
              Live Demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-[4px] border border-subtle px-3 py-1.5 text-[13px] text-fg-secondary ui-transition hover:bg-hover hover:text-fg md:min-h-0"
            >
              <Code2 size={14} strokeWidth={1.75} aria-hidden="true" />
              Source Code
            </a>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
