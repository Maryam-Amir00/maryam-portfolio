import { useEffect, type MouseEvent, type ReactNode } from "react"
import { OVERLAY_MEDIA_QUERY } from "../../config/breakpoints"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useWorkspace } from "../../hooks/useWorkspace"
import {
  restoreOverlayTrigger,
} from "../../utils/overlayFocus"

export function ResponsiveSidebar({ children }: { children: ReactNode }) {
  const { activeSidebarView, closeSidebar } = useWorkspace()
  const isOverlay = useMediaQuery(OVERLAY_MEDIA_QUERY)
  const open = activeSidebarView !== null

  useEffect(() => {
    if (!open || !isOverlay) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return
      }

      if (document.querySelector("[data-command-palette]")) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      closeSidebar()
      restoreOverlayTrigger()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [closeSidebar, isOverlay, open])

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return
    }

    closeSidebar()
    restoreOverlayTrigger()
  }

  return (
    <>
      {open ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[var(--z-sidebar-backdrop)] bg-transparent max-md:bg-black/35 lg:hidden"
          onClick={handleBackdropClick}
        />
      ) : null}
      <div
        className={
          open
            ? [
                "relative z-[var(--z-sidebar)] flex min-h-0 min-w-0",
                "max-lg:absolute max-lg:inset-y-0 max-lg:left-0",
                "max-md:inset-x-2 max-md:top-2 max-md:bottom-2",
                "max-lg:shadow-[4px_0_24px_rgba(0,0,0,0.28)]",
                "max-md:shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
                "max-lg:sidebar-overlay-in",
              ].join(" ")
            : "max-lg:hidden"
        }
      >
        {children}
      </div>
    </>
  )
}
