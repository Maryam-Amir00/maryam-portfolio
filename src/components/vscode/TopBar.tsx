import { LayoutPanelLeft, Search } from "lucide-react"
import { workspaceTitle } from "../../data/portfolioFiles"
import { useWorkspace } from "../../hooks/useWorkspace"
import { TERMINAL_MENU_BUTTON_ID } from "../../types/terminal"

const menuItems = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
] as const

const desktopOnly = new Set<(typeof menuItems)[number]>([
  "Edit",
  "Selection",
  "Go",
  "Run",
  "Help",
])

const compactPlus = new Set<(typeof menuItems)[number]>(["View"])

export function TopBar() {
  const {
    activeFile,
    explorerVisible,
    terminalVisible,
    toggleExplorer,
    toggleTerminal,
    openCommandPalette,
  } = useWorkspace()
  const title = activeFile
    ? `${activeFile.name} — ${workspaceTitle}`
    : workspaceTitle

  return (
    <header className="relative hidden h-9 min-w-0 shrink-0 items-center overflow-hidden border-b border-subtle bg-topbar px-2 text-[13px] select-none md:flex" data-workspace-desktop-chrome="">
      <div className="z-10 flex min-w-0 items-center">
        {menuItems.map((item) =>
          item === "Terminal" ? (
            <button
              key={item}
              id={TERMINAL_MENU_BUTTON_ID}
              data-terminal-trigger=""
              type="button"
              aria-label={terminalVisible ? "Close Terminal" : "Open Terminal"}
              aria-pressed={terminalVisible}
              onClick={toggleTerminal}
              className={[
                "rounded-sm px-2 py-0.5 text-fg-secondary ui-transition hover:bg-hover hover:text-fg",
                terminalVisible ? "bg-hover text-fg" : "",
              ].join(" ")}
            >
              Terminal
            </button>
          ) : (
            <span
              key={item}
              aria-hidden="true"
              className={[
                "px-2 py-0.5 text-fg-secondary",
                desktopOnly.has(item)
                  ? "hidden xl:inline"
                  : compactPlus.has(item)
                    ? "hidden lg:inline"
                    : "",
              ].join(" ")}
            >
              {item}
            </span>
          ),
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 hidden min-w-0 items-center justify-center px-12 min-[520px]:flex xl:px-28">
        <button
          type="button"
          onClick={openCommandPalette}
          aria-label="Open Command Palette"
          className="pointer-events-auto flex min-w-0 w-[min(100%,18rem)] max-w-[min(22rem,calc(100vw-14rem))] items-center gap-1.5 rounded-[4px] border border-subtle bg-app px-2 py-0.5 text-xs text-fg-secondary ui-transition hover:border-fg-muted hover:bg-hover hover:text-fg lg:max-xl:max-w-[min(20rem,calc(100vw-16rem))] xl:w-[min(100%,20rem)]"
        >
          <Search size={12} strokeWidth={1.75} aria-hidden="true" />
          <span className="min-w-0 truncate">{title}</span>
          <span className="hidden shrink-0 text-[10px] text-fg-muted min-[900px]:inline">
            Ctrl/Cmd+Shift+P
          </span>
        </button>
      </div>

      <div className="z-10 ml-auto flex items-center gap-0.5 text-fg-muted">
        <button
          type="button"
          aria-label="Open Command Palette"
          onClick={openCommandPalette}
          className="rounded-sm p-1 ui-transition hover:bg-hover hover:text-fg min-[520px]:hidden"
        >
          <Search size={14} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Toggle Explorer"
          aria-pressed={explorerVisible}
          onClick={toggleExplorer}
          className="rounded-sm p-1 ui-transition hover:bg-hover hover:text-fg"
        >
          <LayoutPanelLeft size={14} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
