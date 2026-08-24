import { Code2, Search, SquareTerminal } from "lucide-react"
import { workspaceTitle } from "../../data/portfolioFiles"
import { useWorkspace } from "../../hooks/useWorkspace"

export function MobileWorkspaceHeader() {
  const {
    terminalVisible,
    commandPaletteVisible,
    openCommandPalette,
    toggleTerminal,
  } = useWorkspace()

  return (
    <div className="shrink-0 bg-topbar pt-[env(safe-area-inset-top)] md:hidden">
      <header className="flex h-11 items-center gap-2 border-b border-subtle pr-1 pl-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Code2
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-accent"
            aria-hidden="true"
          />
          <p className="min-w-0 truncate font-mono text-[13px] text-fg">
            {workspaceTitle}
          </p>
        </div>
        <button
          type="button"
          aria-label="Open Command Palette"
          aria-pressed={commandPaletteVisible}
          onClick={openCommandPalette}
          className="inline-flex size-11 shrink-0 items-center justify-center text-fg-muted ui-transition hover:bg-hover hover:text-fg"
        >
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          data-terminal-trigger=""
          aria-label={terminalVisible ? "Close Terminal" : "Open Terminal"}
          aria-pressed={terminalVisible}
          onClick={toggleTerminal}
          className="inline-flex size-11 shrink-0 items-center justify-center text-fg-muted ui-transition hover:bg-hover hover:text-fg"
        >
          <SquareTerminal size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </header>
    </div>
  )
}
