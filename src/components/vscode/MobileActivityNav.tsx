import {
  Blocks,
  Files,
  GitBranch,
  Search,
  type LucideIcon,
} from "lucide-react"
import { useWorkspace } from "../../hooks/useWorkspace"
import type { SidebarView } from "../../types/workspace"

type MobileTool = {
  view: Exclude<SidebarView, null>
  label: string
  accessibleName: string
  icon: LucideIcon
  toggle: () => void
}

export function MobileActivityNav() {
  const {
    explorerVisible,
    searchVisible,
    sourceControlVisible,
    extensionsVisible,
    toggleExplorer,
    toggleSearch,
    toggleSourceControl,
    toggleExtensions,
  } = useWorkspace()

  const tools: MobileTool[] = [
    {
      view: "explorer",
      label: "Files",
      accessibleName: "Explorer",
      icon: Files,
      toggle: toggleExplorer,
    },
    {
      view: "search",
      label: "Search",
      accessibleName: "Search",
      icon: Search,
      toggle: toggleSearch,
    },
    {
      view: "source-control",
      label: "History",
      accessibleName: "Source Control: Portfolio History",
      icon: GitBranch,
      toggle: toggleSourceControl,
    },
    {
      view: "extensions",
      label: "Toolbox",
      accessibleName: "Extensions: Developer Toolbox",
      icon: Blocks,
      toggle: toggleExtensions,
    },
  ]

  return (
    <nav
      aria-label="Workspace tools"
      className="shrink-0 border-t border-subtle bg-activity pb-[env(safe-area-inset-bottom)] md:hidden"
      data-workspace-mobile-chrome=""
    >
      <div className="flex min-h-[52px] [@media(max-height:500px)]:min-h-11">
      {tools.map((tool) => {
        const Icon = tool.icon
        const pressed =
          (tool.view === "explorer" && explorerVisible) ||
          (tool.view === "search" && searchVisible) ||
          (tool.view === "source-control" && sourceControlVisible) ||
          (tool.view === "extensions" && extensionsVisible)

        return (
          <button
            key={tool.view}
            type="button"
            aria-label={tool.accessibleName}
            aria-pressed={pressed}
            onClick={tool.toggle}
            className={[
              "relative flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-fg-muted ui-transition [@media(max-height:500px)]:min-h-11",
              pressed ? "font-medium text-fg" : "hover:text-fg",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={[
                "absolute inset-x-4 top-0 h-0.5 bg-accent ui-transition",
                pressed ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            <span className="text-[10px] leading-none tracking-wide">
              {tool.label}
            </span>
          </button>
        )
      })}
      </div>
    </nav>
  )
}
