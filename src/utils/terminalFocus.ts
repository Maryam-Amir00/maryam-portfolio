export function focusTerminalTrigger() {
  const triggers = document.querySelectorAll<HTMLElement>(
    "[data-terminal-trigger]",
  )

  for (const trigger of triggers) {
    if (trigger.getClientRects().length > 0) {
      trigger.focus()
      return
    }
  }
}
