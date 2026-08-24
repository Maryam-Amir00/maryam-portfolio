import { Trash2, X } from "lucide-react"
import { m, useReducedMotion } from "framer-motion"
import {
  useEffect,
  useRef,
  type FormEvent,
  type MouseEvent,
  type RefObject,
} from "react"
import {
  motionDuration,
  motionEase,
  terminalEnter,
  terminalEnterReduced,
} from "../../config/motion"
import { workspaceTitle } from "../../data/portfolioFiles"
import { MOBILE_MEDIA_QUERY } from "../../config/breakpoints"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useTerminal } from "../../hooks/useTerminal"
import { useWorkspace } from "../../hooks/useWorkspace"
import type { TerminalEntry } from "../../types/terminal"
import { focusTerminalTrigger } from "../../utils/terminalFocus"
import { TerminalOutput } from "./TerminalOutput"
import { TerminalPrompt } from "./TerminalPrompt"

export function Terminal() {
  const { terminalVisible, closeTerminal } = useWorkspace()
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
  const {
    announcement,
    bottomRef,
    clearOutput,
    entries,
    focusInput,
    handleInputKeyDown,
    input,
    inputRef,
    scrollToBottom,
    setInput,
    submit,
  } = useTerminal()
  const panelRef = useRef<HTMLElement>(null)
  const wasVisibleRef = useRef(false)
  const reduceMotion = useReducedMotion()
  const enter = reduceMotion ? terminalEnterReduced : terminalEnter

  useEffect(() => {
    if (terminalVisible && !wasVisibleRef.current) {
      focusInput()
      scrollToBottom()
    }

    if (!terminalVisible && wasVisibleRef.current) {
      const active = document.activeElement
      if (panelRef.current?.contains(active)) {
        focusTerminalTrigger()
      }
    }

    wasVisibleRef.current = terminalVisible
  }, [focusInput, scrollToBottom, terminalVisible])

  useEffect(() => {
    if (!terminalVisible) {
      return
    }

    scrollToBottom()
  }, [entries, scrollToBottom, terminalVisible])

  useEffect(() => {
    if (!terminalVisible || !isMobile) {
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
      closeTerminal()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [closeTerminal, isMobile, terminalVisible])

  return (
    <section
      ref={panelRef}
      aria-label="Portfolio terminal"
      inert={!terminalVisible}
      className={
        terminalVisible
          ? [
              "terminal-mono flex shrink-0 flex-col border-t border-subtle bg-editor text-[13px] leading-relaxed",
              "h-[clamp(180px,32dvh,260px)] lg:h-[clamp(180px,30vh,250px)]",
              "max-md:terminal-overlay-in max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:z-[var(--z-terminal)] max-md:h-[min(55dvh,420px)] max-md:shadow-[0_-8px_24px_rgba(0,0,0,0.28)]",
            ].join(" ")
          : "hidden"
      }
    >
      <m.div
        key={terminalVisible ? "terminal-open" : "terminal-closed"}
        className="flex min-h-0 flex-1 flex-col"
        initial={enter.initial}
        animate={enter.animate}
        transition={{
          duration: reduceMotion ? 0 : motionDuration.terminal,
          ease: motionEase,
        }}
      >
        <TerminalHeader onClear={clearOutput} onClose={closeTerminal} />
        <TerminalBody
          announcement={announcement}
          bottomRef={bottomRef}
          entries={entries}
          focusInput={focusInput}
          handleInputKeyDown={handleInputKeyDown}
          input={input}
          inputRef={inputRef}
          setInput={setInput}
          submit={submit}
        />
      </m.div>
    </section>
  )
}

function TerminalHeader({
  onClear,
  onClose,
}: {
  onClear: () => void
  onClose: () => void
}) {
  return (
    <header className="flex h-11 shrink-0 items-center gap-3 border-b border-subtle bg-tab px-2 md:h-9 md:px-3">
      <div className="flex min-w-0 items-end gap-3">
        <p className="border-b-2 border-accent pb-1 text-[11px] font-medium tracking-[0.12em] text-fg uppercase">
          Terminal
        </p>
        <p className="hidden pb-1 text-[11px] text-fg-muted min-[520px]:block">
          {workspaceTitle}
        </p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <p className="hidden text-[11px] text-fg-muted md:block">
          Ctrl/Cmd + `
        </p>
        <div className="flex items-center gap-0.5 text-fg-muted">
          <button
            type="button"
            aria-label="Clear terminal"
            onClick={onClear}
            className="inline-flex size-11 items-center justify-center rounded-sm ui-transition hover:bg-hover hover:text-fg md:size-auto md:p-1"
          >
            <Trash2 size={14} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Close terminal"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-sm ui-transition hover:bg-hover hover:text-fg md:size-auto md:p-1"
          >
            <X size={14} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

function TerminalBody({
  announcement,
  bottomRef,
  entries,
  focusInput,
  handleInputKeyDown,
  input,
  inputRef,
  setInput,
  submit,
}: {
  announcement: string
  bottomRef: RefObject<HTMLDivElement | null>
  entries: readonly TerminalEntry[]
  focusInput: () => void
  handleInputKeyDown: ReturnType<typeof useTerminal>["handleInputKeyDown"]
  input: string
  inputRef: RefObject<HTMLInputElement | null>
  setInput: (value: string) => void
  submit: () => void
}) {
  function handleBodyClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target
    if (!(target instanceof Element)) {
      return
    }

    if (target.closest("a, button")) {
      return
    }

    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      return
    }

    focusInput()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <div
      className="workspace-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2"
      onClick={handleBodyClick}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      <TerminalOutput entries={entries} />
      <form
        className="mt-2 flex min-w-0 items-baseline gap-2 overflow-x-auto"
        onSubmit={handleSubmit}
      >
        <span aria-hidden="true">
          <TerminalPrompt />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleInputKeyDown}
          aria-label="Terminal command"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="min-w-0 flex-1 border-0 bg-transparent p-0 font-[inherit] text-base text-fg caret-accent md:text-[13px]"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  )
}
