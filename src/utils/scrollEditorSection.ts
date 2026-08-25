export function scrollEditorSection(id: string) {
  const target = document.getElementById(id)
  if (!(target instanceof HTMLElement)) {
    return
  }

  const scroller = target.closest(".workspace-scroll")
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth"

  if (scroller instanceof HTMLElement) {
    const offset =
      target.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      8
    scroller.scrollTo({ top: Math.max(0, offset), behavior })
  } else {
    target.scrollIntoView({ behavior, block: "start" })
  }

  target.focus({ preventScroll: true })
}
