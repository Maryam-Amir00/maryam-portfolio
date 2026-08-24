let returnFocus: HTMLElement | null = null

export function captureCommandPaletteFocus() {
  const active = document.activeElement
  returnFocus = active instanceof HTMLElement ? active : null
}

export function restoreCommandPaletteFocus() {
  const element = returnFocus
  returnFocus = null

  if (!element || !document.contains(element)) {
    return
  }

  element.focus()
}

export function clearCommandPaletteFocus() {
  returnFocus = null
}
