import { useEffect, useRef } from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)"
const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const TEXT_SELECTOR = "input, textarea, select, [contenteditable='true']"
const MEDIA_SELECTOR = "iframe, object, embed"
const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "summary",
  "[role='button']",
  "[role='option']",
  "[role='menuitem']",
  "[role='tab']",
  "[data-cursor-interactive]",
].join(",")

const FOLLOW = 0.55
const SETTLE = 0.12

type CursorKind = "idle" | "interactive" | "text"

function kindFromTarget(target: EventTarget | null): CursorKind | "media" {
  if (!(target instanceof Element)) {
    return "idle"
  }

  if (target.closest(MEDIA_SELECTOR)) {
    return "media"
  }

  if (target.closest(TEXT_SELECTOR)) {
    return "text"
  }

  if (target.closest(INTERACTIVE_SELECTOR)) {
    return "interactive"
  }

  return "idle"
}

function bindCursorRing(host: HTMLDivElement, marker: HTMLSpanElement) {
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0
  let rafId = 0
  let hasPoint = false
  let visible = false

  function setVisible(next: boolean) {
    if (visible === next) {
      return
    }
    visible = next
    host.dataset.visible = next ? "true" : "false"
  }

  function setKind(kind: CursorKind) {
    if (marker.dataset.kind !== kind) {
      marker.dataset.kind = kind
    }
  }

  function stopRaf() {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    host.style.willChange = "auto"
  }

  function tick() {
    currentX += (targetX - currentX) * FOLLOW
    currentY += (targetY - currentY) * FOLLOW

    if (
      Math.abs(targetX - currentX) < SETTLE &&
      Math.abs(targetY - currentY) < SETTLE
    ) {
      currentX = targetX
      currentY = targetY
      host.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      stopRaf()
      return
    }

    host.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
    rafId = requestAnimationFrame(tick)
  }

  function startRaf() {
    if (rafId) {
      return
    }
    host.style.willChange = "transform"
    rafId = requestAnimationFrame(tick)
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === "touch") {
      setVisible(false)
      stopRaf()
      return
    }

    targetX = event.clientX
    targetY = event.clientY

    if (!hasPoint) {
      hasPoint = true
      currentX = targetX
      currentY = targetY
      host.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
    }

    const kind = kindFromTarget(event.target)
    if (kind === "media") {
      setVisible(false)
      stopRaf()
      return
    }

    setKind(kind)
    setVisible(true)
    startRaf()
  }

  function onPointerOut(event: PointerEvent) {
    if (event.relatedTarget === null) {
      setVisible(false)
      stopRaf()
    }
  }

  function onVisibilityChange() {
    if (document.visibilityState !== "visible") {
      setVisible(false)
      stopRaf()
    }
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true })
  document.addEventListener("pointerout", onPointerOut)
  document.addEventListener("visibilitychange", onVisibilityChange)

  return () => {
    stopRaf()
    window.removeEventListener("pointermove", onPointerMove)
    document.removeEventListener("pointerout", onPointerOut)
    document.removeEventListener("visibilitychange", onVisibilityChange)
  }
}

function CursorRing() {
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const host = rootRef.current
    const marker = ringRef.current
    if (!host || !marker) {
      return
    }

    return bindCursorRing(host, marker)
  }, [])

  return (
    <div
      ref={rootRef}
      className="cursor-enhancement"
      data-visible="false"
      aria-hidden="true"
    >
      <span
        ref={ringRef}
        className="cursor-enhancement__ring"
        data-kind="idle"
      />
    </div>
  )
}

export function CursorEnhancement() {
  const finePointer = useMediaQuery(FINE_POINTER_QUERY)
  const reduceMotion = useMediaQuery(REDUCE_MOTION_QUERY)

  if (!finePointer || reduceMotion) {
    return null
  }

  return <CursorRing />
}
