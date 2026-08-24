import { Braces, CircleX, GitBranch, TriangleAlert } from "lucide-react"
import {
  showsEncoding,
  showsLineEnding,
  showsSpacesIndent,
} from "../../data/portfolioFiles"
import { useWorkspace } from "../../hooks/useWorkspace"

export function StatusBar() {
  const { activeFile } = useWorkspace()

  return (
    <footer
      aria-label="Workspace status"
      className="flex h-5 shrink-0 items-center justify-between bg-status px-1 text-[11px] text-status-fg select-none md:h-6"
    >
      <div className="flex min-w-0 items-center">
        <span className="hidden items-center gap-1 px-1.5 py-0.5 md:flex">
          <GitBranch size={12} strokeWidth={2} aria-hidden="true" />
          <span>main</span>
        </span>
        <span className="hidden items-center gap-1 px-1.5 py-0.5 md:flex">
          <CircleX size={12} strokeWidth={2} aria-hidden="true" />
          <span>0</span>
        </span>
        <span className="hidden items-center gap-1 px-1.5 py-0.5 md:flex">
          <TriangleAlert size={12} strokeWidth={2} aria-hidden="true" />
          <span>0</span>
        </span>
        {activeFile ? (
          <span className="truncate px-1.5 md:hidden">{activeFile.language}</span>
        ) : (
          <span className="truncate px-1.5 text-status-fg/80 md:hidden">
            Editor
          </span>
        )}
      </div>

      {activeFile ? (
        <div className="flex min-w-0 items-center">
          {activeFile.extension !== "pdf" ? (
            <span className="hidden px-1.5 py-0.5 lg:inline">Ln 1, Col 1</span>
          ) : null}
          {showsSpacesIndent(activeFile) ? (
            <span className="hidden px-1.5 py-0.5 lg:inline">Spaces: 2</span>
          ) : null}
          {showsEncoding(activeFile) ? (
            <span className="px-1.5 py-0.5">UTF-8</span>
          ) : null}
          {showsLineEnding(activeFile) ? (
            <span className="hidden px-1.5 py-0.5 md:inline">LF</span>
          ) : null}
          <span className="hidden items-center gap-1 px-1.5 py-0.5 md:flex">
            <Braces size={12} strokeWidth={2} aria-hidden="true" />
            <span className="truncate">{activeFile.language}</span>
          </span>
        </div>
      ) : null}
    </footer>
  )
}
