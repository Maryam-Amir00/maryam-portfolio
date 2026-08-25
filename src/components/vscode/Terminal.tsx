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
import { OVERLAY_MEDIA_QUERY } from "../../config/breakpoints"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useTerminal } from "../../hooks/useTerminal"
import { useWorkspace } from "../../hooks/useWorkspace"
import type { TerminalEntry } from "../../types/terminal"
import { focusTerminalTrigger } from "../../utils/terminalFocus"
import { TerminalOutput } from "./TerminalOutput"
import { TerminalPrompt } from "./TerminalPrompt"

export function Terminal() {
  const { terminalVisible, closeTerminal } = useWorkspace()
  const isOverlay = useMediaQuery(OVERLAY_MEDIA_QUERY)
  const {
    announcement,
    clearOutput,
    entries,
    focusInput,
    handleInputKeyDown,
    input,
    inputRef,
    scrollToBottom,
    scrollerRef,
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
    if (!terminalVisible || !isOverlay) {
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
  }, [closeTerminal, isOverlay, terminalVisible])

  return (
    <section
      ref={panelRef}
      data-terminal=""
      aria-label="Portfolio terminal"
      inert={!terminalVisible}
      className={
        terminalVisible
          ? [
              "terminal-mono flex min-w-0 flex-col overflow-hidden border-t border-subtle bg-app text-[13px] leading-[1.5]",
              "xl:h-[clamp(190px,22vh,230px)] xl:shrink-0",
              "max-xl:terminal-overlay-in max-xl:absolute max-xl:inset-x-0 max-xl:bottom-0 max-xl:z-[var(--z-terminal)] max-xl:h-[min(36dvh,280px)] max-xl:shadow-[0_-8px_24px_rgba(0,0,0,0.28)]",
              "max-md:h-[min(52dvh,24rem)]",
              "[@media(max-height:699px)]:xl:h-[clamp(160px,22vh,190px)]",
              "[@media(max-height:699px)]:max-xl:h-[min(32dvh,200px)]",
              "[@media(max-height:699px)]:max-md:h-[min(46dvh,11.5rem)]",
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
          entries={entries}
          focusInput={focusInput}
          handleInputKeyDown={handleInputKeyDown}
          input={input}
          inputRef={inputRef}
          scrollerRef={scrollerRef}
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
      <div className="flex h-full min-w-0 items-center gap-3">
        <p className="relative flex h-full items-center text-[11px] font-medium tracking-[0.12em] text-fg uppercase after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-accent">
          Terminal
        </p>
        <p className="hidden text-[11px] text-fg-muted/75 min-[520px]:block">
          {workspaceTitle}
        </p>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <p className="hidden text-[10px] text-fg-muted/70 md:block">
          Ctrl/Cmd + `
        </p>
        <div className="flex items-center text-fg-muted/70">
          <button
            type="button"
            aria-label="Clear terminal"
            onClick={onClear}
            className="inline-flex size-11 items-center justify-center rounded-sm ui-transition hover:bg-hover hover:text-fg focus-visible:text-fg md:size-auto md:p-1"
          >
            <Trash2 size={14} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Close terminal"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-sm ui-transition hover:bg-hover hover:text-fg focus-visible:text-fg md:size-auto md:p-1"
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
  entries,
  focusInput,
  handleInputKeyDown,
  input,
  inputRef,
  scrollerRef,
  setInput,
  submit,
}: {
  announcement: string
  entries: readonly TerminalEntry[]
  focusInput: () => void
  handleInputKeyDown: ReturnType<typeof useTerminal>["handleInputKeyDown"]
  input: string
  inputRef: RefObject<HTMLInputElement | null>
  scrollerRef: RefObject<HTMLDivElement | null>
  setInput: (value: string) => void
  submit: () => void
}) {
  function handlePromptLineClick(event: MouseEvent<HTMLFormElement>) {
    const target = event.target
    if (!(target instanceof Element) || target.closest("input")) {
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
      ref={scrollerRef}
      className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-2 py-2 md:px-3"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      <TerminalOutput entries={entries} />
      <form
        className="group/prompt mt-0.5 flex min-w-0 cursor-text items-baseline gap-[5px] rounded-none py-px focus-within:bg-[color-mix(in_srgb,var(--bg-hover)_10%,transparent)]"
        onClick={handlePromptLineClick}
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
          className="min-w-0 flex-1 appearance-none rounded-none border-0 bg-transparent p-0 font-[inherit] text-base leading-[inherit] text-fg shadow-none outline-none ring-0 caret-accent focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 md:text-[13px]"
        />
      </form>
    </div>
  )
}
