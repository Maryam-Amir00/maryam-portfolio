let overlayTrigger: HTMLElement | null = null

export function captureOverlayTrigger() {
  const active = document.activeElement
  overlayTrigger = active instanceof HTMLElement ? active : null
}

export function restoreOverlayTrigger() {
  const element = overlayTrigger
  overlayTrigger = null

  if (!element || !document.contains(element)) {
    return
  }

  element.focus()
}

export function clearOverlayTrigger() {
  overlayTrigger = null
}
