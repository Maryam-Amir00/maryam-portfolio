import { findFileById } from "../../data/portfolioFiles"
import type { ProjectNavigationTarget } from "../../data/projectsData"
import { useWorkspace } from "../../hooks/useWorkspace"

export function ProjectNavigation({
  next,
  back,
  tertiary,
}: {
  next: ProjectNavigationTarget
  back: ProjectNavigationTarget
  tertiary?: ProjectNavigationTarget
}) {
  const { openFile } = useWorkspace()
  const nextFile = findFileById(next.fileId)

  return (
    <footer className="mt-10 border-t border-subtle pt-6">
      <p className="font-mono text-[13px] text-fg-muted">
        <span aria-hidden="true">{"> next: "}</span>
        <span className="text-fg-secondary">{nextFile?.name ?? next.fileId}</span>
      </p>
      <div className="mt-3 flex flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center">
        <button
          type="button"
          onClick={() => {
            openFile(next.fileId)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 md:min-h-0"
        >
          {next.actionLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            openFile(back.fileId)
          }}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[4px] px-2 py-1.5 text-[13px] text-fg-muted ui-transition hover:text-fg md:min-h-0"
        >
          {back.actionLabel}
        </button>
      </div>
      {tertiary ? (
        <button
          type="button"
          onClick={() => {
            openFile(tertiary.fileId)
          }}
          className="mt-3 inline-flex min-h-11 cursor-pointer items-center font-mono text-[12px] text-fg-muted ui-transition hover:text-fg md:min-h-0"
        >
          {tertiary.actionLabel}
        </button>
      ) : null}
    </footer>
  )
}
