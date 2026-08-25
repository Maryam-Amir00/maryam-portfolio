import { X } from "lucide-react"
import type { ReactNode } from "react"
import { useWorkspace } from "../../hooks/useWorkspace"
import { restoreOverlayTrigger } from "../../utils/overlayFocus"
import { SidebarContentTransition } from "../motion/SidebarContentTransition"

const CLOSE_LABELS: Record<string, string> = {
  Explorer: "Close Explorer",
  Search: "Close Search",
  "Source Control": "Close Portfolio History",
  Extensions: "Close Developer Toolbox",
}

export function SidebarPanel({
  label,
  header,
  children,
}: {
  label: string
  header: string
  children: ReactNode
}) {
  const { closeSidebar } = useWorkspace()

  function handleClose() {
    closeSidebar()
    restoreOverlayTrigger()
  }

  return (
    <aside
      aria-label={label}
      tabIndex={-1}
      className="flex h-full w-full min-h-0 min-w-0 shrink-0 flex-col overflow-hidden border-r border-subtle bg-sidebar outline-none max-md:border max-md:border-subtle md:w-full xl:w-[260px]"
    >
      <div className="flex min-h-11 shrink-0 items-center px-3 xl:h-9 xl:min-h-9 xl:px-4">
        <p className="text-[11px] font-medium tracking-wide text-fg-secondary uppercase">
          {header}
        </p>
        <button
          type="button"
          aria-label={CLOSE_LABELS[header] ?? `Close ${header}`}
          onClick={handleClose}
          className="ml-auto inline-flex size-11 items-center justify-center text-fg-muted ui-transition hover:bg-hover hover:text-fg xl:hidden"
        >
          <X size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      <SidebarContentTransition>{children}</SidebarContentTransition>
    </aside>
  )
}
