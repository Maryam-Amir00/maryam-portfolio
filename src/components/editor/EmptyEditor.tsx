import { FileText, FolderOpen, House } from "lucide-react"
import {
  FILE_HOME,
  FILE_RESUME,
  FILE_STUDYSYNC,
  workspaceTitle,
} from "../../data/portfolioFiles"
import { useWorkspace } from "../../hooks/useWorkspace"

const actionClass =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-[4px] px-3.5 py-1.5 text-[13px] ui-transition md:min-h-0"

export function EmptyEditor() {
  const { openCommandPalette, openFile } = useWorkspace()

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-x-clip overflow-y-auto bg-editor px-4 pt-6 pb-[clamp(4.75rem,14vh,6.5rem)] md:px-6">
      <section
        aria-label="No file is currently open"
        className="w-full max-w-[30rem]"
      >
        <div className="mx-auto max-w-[26rem] text-center">
          <p
            aria-hidden="true"
            className="font-mono text-[1.25rem] leading-none text-fg-muted/50"
          >
            {"{ }"}
          </p>
          <p className="mt-4 font-mono text-[15px] text-fg md:text-[16px]">
            {workspaceTitle}
          </p>
          <h1 className="mt-5 text-[15px] font-medium text-fg-secondary">
            No file is currently open.
          </h1>
          <p className="mt-2 text-[13px] leading-5 text-fg-muted">
            Select a file from Explorer, use a quick action, or open the Command
            Palette.
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-2 min-[430px]:flex-row min-[430px]:flex-wrap min-[430px]:items-center min-[430px]:justify-center">
            <button
              type="button"
              onClick={() => {
                openFile(FILE_HOME)
              }}
              className={`${actionClass} bg-accent font-medium text-app hover:bg-accent/90 active:bg-accent/80`}
            >
              <House size={14} strokeWidth={1.75} aria-hidden="true" />
              Open Home
            </button>
            <button
              type="button"
              onClick={() => {
                openFile(FILE_STUDYSYNC)
              }}
              className={`${actionClass} border border-fg-muted/55 bg-tab text-fg hover:border-fg-muted hover:bg-hover hover:text-fg active:bg-hover`}
            >
              <FolderOpen size={14} strokeWidth={1.75} aria-hidden="true" />
              View Projects
            </button>
            <button
              type="button"
              onClick={() => {
                openFile(FILE_RESUME)
              }}
              className={`${actionClass} border border-fg-muted/55 bg-transparent text-fg/85 hover:border-fg-muted hover:bg-hover hover:text-fg active:bg-hover`}
            >
              <FileText size={14} strokeWidth={1.75} aria-hidden="true" />
              Open Resume
            </button>
          </div>

          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open Command Palette"
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[12px] text-fg-muted ui-transition hover:text-fg-secondary"
          >
            <kbd className="rounded-[3px] border border-subtle px-1.5 py-0.5 font-mono text-[11px] font-normal text-fg-muted">
              Ctrl/Cmd+Shift+P
            </kbd>
            <span>Command Palette</span>
          </button>
        </div>
      </section>
    </div>
  )
}
