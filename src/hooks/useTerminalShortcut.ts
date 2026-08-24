import { useEffect } from "react"
import { useWorkspace } from "./useWorkspace"

export function useTerminalShortcut() {
  const { commandPaletteVisible, toggleTerminal } = useWorkspace()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (commandPaletteVisible) {
        return
      }

      if (event.key !== "`" && event.code !== "Backquote") {
        return
      }

      if (!event.ctrlKey && !event.metaKey) {
        return
      }

      if (event.altKey) {
        return
      }

      event.preventDefault()
      toggleTerminal()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [commandPaletteVisible, toggleTerminal])
}
