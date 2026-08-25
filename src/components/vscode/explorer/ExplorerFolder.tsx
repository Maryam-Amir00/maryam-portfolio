import { ChevronRight, Folder, FolderOpen } from "lucide-react"
import type { PortfolioFolder } from "../../../types/workspace"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { ExplorerFile } from "./ExplorerFile"

type ExplorerFolderProps = {
  folder: PortfolioFolder
  depth: number
  isRoot?: boolean
}

export function ExplorerFolder({
  folder,
  depth,
  isRoot = false,
}: ExplorerFolderProps) {
  const { expandedFolderIds, toggleFolder } = useWorkspace()
  const expanded = expandedFolderIds.includes(folder.id)

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => {
          toggleFolder(folder.id)
        }}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={[
          "flex min-h-11 w-full cursor-pointer items-center gap-1 py-1 text-[13px] ui-transition hover:bg-hover md:min-h-6 md:py-0",
          isRoot ? "font-medium text-fg" : "text-fg-secondary",
        ].join(" ")}
      >
        <ChevronRight
          size={12}
          strokeWidth={2}
          className={[
            "shrink-0 text-fg-muted ui-transition-transform",
            expanded ? "rotate-90" : "",
          ].join(" ")}
          aria-hidden="true"
        />
        {isRoot ? null : expanded ? (
          <FolderOpen
            size={14}
            strokeWidth={1.75}
            className="shrink-0 text-file-folder"
            aria-hidden="true"
          />
        ) : (
          <Folder
            size={14}
            strokeWidth={1.75}
            className="shrink-0 text-file-folder"
            aria-hidden="true"
          />
        )}
        <span className={`truncate ${isRoot ? "tracking-wide uppercase" : ""}`}>
          {folder.name}
        </span>
      </button>

      {expanded ? (
        <ul className="m-0 list-none p-0">
          {folder.children.map((child) =>
            child.type === "folder" ? (
              <ExplorerFolder key={child.id} folder={child} depth={depth + 1} />
            ) : (
              <ExplorerFile key={child.id} file={child} depth={depth + 1} />
            ),
          )}
        </ul>
      ) : null}
    </li>
  )
}
