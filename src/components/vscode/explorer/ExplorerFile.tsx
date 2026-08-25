import type { PortfolioFile } from "../../../types/workspace"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { FileIcon } from "../FileIcon"

type ExplorerFileProps = {
  file: PortfolioFile
  depth: number
}

export function ExplorerFile({ file, depth }: ExplorerFileProps) {
  const { activeFileId, openFile } = useWorkspace()
  const isActive = file.id === activeFileId

  return (
    <li>
      <button
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => {
          openFile(file.id)
        }}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={[
          "group flex min-h-11 w-full cursor-pointer items-center gap-1 py-1 text-[13px] ui-transition hover:bg-hover md:min-h-6 md:py-0",
          isActive ? "bg-hover font-medium text-fg" : "text-fg-secondary hover:text-fg",
        ].join(" ")}
      >
        <span className="inline-block w-3 shrink-0" aria-hidden="true" />
        <FileIcon
          extension={file.extension}
          className="size-3.5 shrink-0 ui-transition group-hover:opacity-100 opacity-90"
        />
        <span className="truncate">{file.name}</span>
      </button>
    </li>
  )
}
