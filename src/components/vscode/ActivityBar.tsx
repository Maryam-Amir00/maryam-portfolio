import {
  Blocks,
  CircleUser,
  Files,
  GitBranch,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { useWorkspace } from "../../hooks/useWorkspace"

type ActivityItem = {
  id: "explorer" | "search" | "source-control" | "extensions"
  label: string
  icon: LucideIcon
}

const topItems: ActivityItem[] = [
  { id: "explorer", label: "Explorer", icon: Files },
  { id: "search", label: "Search", icon: Search },
  { id: "source-control", label: "Source Control", icon: GitBranch },
  { id: "extensions", label: "Extensions: Developer Toolbox", icon: Blocks },
]

export function ActivityBar() {
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

  return (
    <nav
      aria-label="Activity bar"
      className="hidden w-12 shrink-0 flex-col border-r border-subtle bg-activity md:flex"
      data-workspace-desktop-chrome=""
    >
      <div className="flex flex-col p-px">
        {topItems.map((item) => {
          const active =
            (item.id === "explorer" && explorerVisible) ||
            (item.id === "search" && searchVisible) ||
            (item.id === "source-control" && sourceControlVisible) ||
            (item.id === "extensions" && extensionsVisible)
          const onClick =
            item.id === "explorer"
              ? toggleExplorer
              : item.id === "search"
                ? toggleSearch
                : item.id === "source-control"
                  ? toggleSourceControl
                  : toggleExtensions
          const Icon = item.icon

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-pressed={active}
              onClick={onClick}
              className={[
                "relative flex h-12 w-full items-center justify-center ui-transition",
                active ? "text-fg" : "text-fg-muted hover:bg-hover/40 hover:text-fg",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={[
                  "absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 bg-accent ui-transition",
                  active ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          )
        })}
      </div>
      <div
        aria-hidden="true"
        className="mt-auto flex flex-col pb-2 text-fg-muted/45"
      >
        <span className="flex h-12 w-full items-center justify-center">
          <CircleUser size={22} strokeWidth={1.5} />
        </span>
        <span className="flex h-12 w-full items-center justify-center">
          <Settings size={22} strokeWidth={1.5} />
        </span>
      </div>
    </nav>
  )
}
