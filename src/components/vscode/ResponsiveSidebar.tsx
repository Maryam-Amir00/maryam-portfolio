import { useEffect, useRef, type MouseEvent, type ReactNode } from "react"
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
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || !isOverlay) {
      return
    }

    if (activeSidebarView !== "search") {
      const aside = panelRef.current?.querySelector("aside[aria-label]")
      if (aside instanceof HTMLElement) {
        aside.focus()
      }
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
  }, [activeSidebarView, closeSidebar, isOverlay, open])

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
          className="absolute inset-0 z-[var(--z-sidebar-backdrop)] bg-black/20 max-md:bg-black/35 lg:bg-transparent xl:hidden"
          onClick={handleBackdropClick}
        />
      ) : null}
      <div
        ref={panelRef}
        className={
          open
            ? [
                "relative z-[var(--z-sidebar)] flex min-h-0 min-w-0",
                "max-xl:absolute max-xl:inset-y-0 max-xl:left-0",
                "lg:max-xl:w-[min(18.75rem,82vw)]",
                "md:max-lg:w-[min(82vw,20rem)]",
                "max-md:inset-x-2 max-md:top-2 max-md:bottom-2 max-md:w-auto",
                "max-xl:shadow-[4px_0_24px_rgba(0,0,0,0.28)]",
                "max-md:shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
                "max-xl:sidebar-overlay-in",
              ].join(" ")
            : "hidden"
        }
      >
        {children}
      </div>
    </>
  )
}
