import {
  formatProjectIndex,
  type PortfolioProject,
} from "../../data/projectsData"
import { ProjectExternalActions } from "./ProjectExternalActions"

export function ProjectHeader({ project }: { project: PortfolioProject }) {
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
      <p className="mt-3 font-mono text-[12px] text-fg-muted">{project.type}</p>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {project.introStack.map((item) => (
          <li
            key={item}
            className="font-mono text-[12px] text-syntax-property"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-[46rem] text-[15px] leading-[1.7] text-fg-secondary md:text-[16px]">
        {project.summary}
      </p>
      <div className="mt-5">
        <ProjectExternalActions project={project} />
      </div>
    </header>
  )
}
