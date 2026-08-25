import {
  Blocks,
  Braces,
  BriefcaseBusiness,
  Code2,
  Copy,
  ExternalLink,
  FileDown,
  Files,
  FileText,
  GitBranch,
  Home,
  Mail,
  Phone,
  Search,
  Send,
  SquareTerminal,
} from "lucide-react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from "react"
import {
  motionDuration,
  motionEase,
  paletteOverlay,
} from "../../config/motion"
import { CATEGORY_HINT } from "../../data/commandPaletteActions"
import { useCommandPalette } from "../../hooks/useCommandPalette"
import { useWorkspace } from "../../hooks/useWorkspace"
import type {
  CommandPaletteAction,
  CommandPaletteGroup,
  CommandPaletteIconName,
} from "../../types/commandPalette"
import { COMMAND_PALETTE_LISTBOX_ID } from "../../types/commandPalette"

const optionId = (actionId: string) => `command-palette-option-${actionId}`

function scrollOptionIntoList(option: HTMLElement) {
  const scroller = option.closest(`#${COMMAND_PALETTE_LISTBOX_ID}`)
  if (!(scroller instanceof HTMLElement)) {
    return
  }

  const optionRect = option.getBoundingClientRect()
  const scrollerRect = scroller.getBoundingClientRect()

  if (optionRect.top < scrollerRect.top) {
    scroller.scrollTop += optionRect.top - scrollerRect.top
    return
  }

  if (optionRect.bottom > scrollerRect.bottom) {
    scroller.scrollTop += optionRect.bottom - scrollerRect.bottom
  }
}

function isPaletteShortcut(event: globalThis.KeyboardEvent) {
  return (
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    !event.altKey &&
    event.code === "KeyP"
  )
}

export function CommandPalette() {
  const { commandPaletteVisible, openCommandPalette } = useWorkspace()
  const {
    closeAndReset,
    executeAction,
    groups,
    isSearching,
    moveSelection,
    query,
    selectedAction,
    selectedIndex,
    setQuery,
    setSelectedIndex,
    status,
    submitSelected,
    visibleActions,
  } = useCommandPalette()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedOptionRef = useRef<HTMLDivElement | null>(null)
  const wasVisibleRef = useRef(false)
  const navigationSourceRef = useRef<"keyboard" | "pointer">("keyboard")

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (!isPaletteShortcut(event)) {
        return
      }

      event.preventDefault()

      if (commandPaletteVisible) {
        inputRef.current?.focus()
        return
      }

      openCommandPalette()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [commandPaletteVisible, openCommandPalette])

  useEffect(() => {
    if (commandPaletteVisible && !wasVisibleRef.current) {
      navigationSourceRef.current = "keyboard"
      inputRef.current?.focus()
    }

    wasVisibleRef.current = commandPaletteVisible
  }, [commandPaletteVisible])

  useEffect(() => {
    if (!commandPaletteVisible) {
      return
    }

    if (navigationSourceRef.current !== "keyboard") {
      return
    }

    if (selectedOptionRef.current) {
      scrollOptionIntoList(selectedOptionRef.current)
    }
  }, [commandPaletteVisible, selectedIndex])

  useEffect(() => {
    if (!commandPaletteVisible) {
      return
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
      closeAndReset(true)
    }

    window.addEventListener("keydown", onKeyDown, true)
    return () => {
      window.removeEventListener("keydown", onKeyDown, true)
    }
  }, [closeAndReset, commandPaletteVisible])

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      navigationSourceRef.current = "keyboard"
      moveSelection(1)
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      navigationSourceRef.current = "keyboard"
      moveSelection(-1)
      return
    }

    if (event.key === "Enter") {
      event.preventDefault()
      submitSelected()
      return
    }

    if (event.key === "Tab") {
      event.preventDefault()
    }
  }

  function highlightFromPointer(index: number) {
    navigationSourceRef.current = "pointer"
    setSelectedIndex(index)
  }

  function handleOverlayMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closeAndReset(true)
    }
  }

  const selectedId = selectedAction ? optionId(selectedAction.id) : undefined
  const reduceMotion = useReducedMotion()

  return (
    <>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {status}
      </div>
      <AnimatePresence>
        {commandPaletteVisible ? (
          <m.div
            key="command-palette"
            className="isolate fixed inset-0 z-[var(--z-command-palette)] overflow-hidden bg-black/40"
            initial={paletteOverlay.initial}
            animate={paletteOverlay.animate}
            exit={{
              ...paletteOverlay.exit,
              transition: {
                duration: reduceMotion ? 0 : motionDuration.paletteExit,
                ease: motionEase,
              },
            }}
            transition={{
              duration: reduceMotion ? 0 : motionDuration.overlay,
              ease: motionEase,
            }}
            onMouseDown={handleOverlayMouseDown}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Command Palette"
              data-command-palette=""
              className="palette-surface-in mx-auto mt-[max(2.75rem,8vh)] w-[min(620px,calc(100vw-2rem))] max-h-[min(72dvh,40rem)] overflow-hidden rounded-[6px] border border-subtle bg-editor shadow-[0_12px_40px_rgba(0,0,0,0.45)] max-md:mt-[calc(env(safe-area-inset-top)+3.75rem)] max-md:max-h-[min(68dvh,32rem)] max-md:w-[calc(100vw-1.5rem)]"
              onMouseDown={(event) => event.stopPropagation()}
            >
            <div className="flex items-center gap-2 border-b border-subtle px-3 focus-within:border-accent">
              <span aria-hidden="true" className="select-none text-fg-muted">
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-label="Search commands and files"
                aria-expanded="true"
                aria-controls={COMMAND_PALETTE_LISTBOX_ID}
                aria-activedescendant={selectedId}
                aria-autocomplete="list"
                placeholder="Search commands and files..."
                value={query}
                onChange={(event) => {
                  navigationSourceRef.current = "keyboard"
                  setQuery(event.target.value)
                }}
                onKeyDown={handleInputKeyDown}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="h-11 min-w-0 flex-1 border-0 bg-transparent text-base text-fg caret-accent placeholder:text-fg-muted focus-visible:outline-none md:text-[13px]"
              />
            </div>

            <CommandPaletteResults
              groups={groups}
              isSearching={isSearching}
              selectedActionId={selectedAction?.id ?? null}
              selectedOptionRef={selectedOptionRef}
              selectedIndex={selectedIndex}
              visibleActions={visibleActions}
              onHighlight={highlightFromPointer}
              onSelect={(action) => {
                void executeAction(action)
              }}
            />

            <CommandPaletteFooter />
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function CommandPaletteResults({
  groups,
  isSearching,
  onHighlight,
  onSelect,
  selectedActionId,
  selectedIndex,
  selectedOptionRef,
  visibleActions,
}: {
  groups: readonly CommandPaletteGroup[]
  isSearching: boolean
  onHighlight: (index: number) => void
  onSelect: (action: CommandPaletteAction) => void
  selectedActionId: string | null
  selectedIndex: number
  selectedOptionRef: RefObject<HTMLDivElement | null>
  visibleActions: readonly CommandPaletteAction[]
}) {
  if (visibleActions.length === 0) {
    return (
      <div
        id={COMMAND_PALETTE_LISTBOX_ID}
        role="listbox"
        aria-label="Commands"
        className="px-4 py-6"
      >
        <p className="text-[13px] text-fg">No matching commands.</p>
        <p className="mt-1 text-[12px] text-fg-muted">
          Try searching for &quot;projects&quot;, &quot;resume&quot;, or
          &quot;contact&quot;.
        </p>
      </div>
    )
  }

  return (
    <div
      id={COMMAND_PALETTE_LISTBOX_ID}
      role="listbox"
      aria-label="Commands"
      className="workspace-scroll max-h-[min(380px,48vh)] overflow-y-auto overscroll-contain py-1 [scrollbar-gutter:stable] max-md:max-h-[min(48dvh,22rem)] [@media(max-height:699px)]:max-h-[min(240px,40vh)]"
    >
      {isSearching
        ? visibleActions.map((action, index) => (
            <CommandPaletteItem
              key={action.id}
              action={action}
              index={index}
              selected={action.id === selectedActionId}
              selectedOptionRef={selectedIndex === index ? selectedOptionRef : undefined}
              onHighlight={onHighlight}
              onSelect={onSelect}
            />
          ))
        : groups.map((group) => (
            <div key={group.id} role="group" aria-label={group.heading} className="pt-1">
              <p className="px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] text-fg-muted uppercase">
                {group.heading}
              </p>
              {group.actions.map((action) => {
                const index = visibleActions.findIndex((item) => item.id === action.id)

                return (
                  <CommandPaletteItem
                    key={action.id}
                    action={action}
                    index={index}
                    selected={action.id === selectedActionId}
                    selectedOptionRef={
                      selectedIndex === index ? selectedOptionRef : undefined
                    }
                    onHighlight={onHighlight}
                    onSelect={onSelect}
                  />
                )
              })}
            </div>
          ))}
    </div>
  )
}

function CommandPaletteItem({
  action,
  index,
  onHighlight,
  onSelect,
  selected,
  selectedOptionRef,
}: {
  action: CommandPaletteAction
  index: number
  onHighlight: (index: number) => void
  onSelect: (action: CommandPaletteAction) => void
  selected: boolean
  selectedOptionRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={selectedOptionRef}
      id={optionId(action.id)}
      role="option"
      aria-selected={selected}
      onMouseDown={(event) => {
        event.preventDefault()
      }}
      onMouseEnter={() => onHighlight(index)}
      onClick={() => onSelect(action)}
      className={[
        "relative flex min-h-11 cursor-pointer items-center gap-2.5 px-3 py-2.5 md:min-h-0 md:py-1.5",
        selected ? "bg-hover text-fg" : "text-fg-secondary",
        "ui-transition",
      ].join(" ")}
    >
      {selected ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 bg-accent"
        />
      ) : null}
      <PaletteIcon name={action.icon} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] text-fg">{action.label}</span>
        {action.description ? (
          <span className="block truncate font-mono text-[11px] text-fg-muted">
            {action.description}
          </span>
        ) : null}
      </span>
      <span className="hidden shrink-0 text-[11px] text-fg-muted md:block">
        {action.shortcut ?? CATEGORY_HINT[action.category]}
      </span>
    </div>
  )
}

function PaletteIcon({ name }: { name: CommandPaletteIconName }) {
  const props = {
    size: 15,
    strokeWidth: 1.75,
    "aria-hidden": true as const,
    className: "shrink-0 text-fg-muted",
  }

  switch (name) {
    case "home":
      return <Home {...props} />
    case "about":
      return <FileText {...props} />
    case "experience":
      return <BriefcaseBusiness {...props} />
    case "skills":
      return <Braces {...props} />
    case "project":
      return <Code2 {...props} />
    case "contact":
      return <Mail {...props} />
    case "resume":
      return <FileDown {...props} />
    case "terminal":
      return <SquareTerminal {...props} />
    case "explorer":
      return <Files {...props} />
    case "search":
      return <Search {...props} />
    case "source-control":
      return <GitBranch {...props} />
    case "extensions":
      return <Blocks {...props} />
    case "copy":
      return <Copy {...props} />
    case "phone":
      return <Phone {...props} />
    case "send":
      return <Send {...props} />
    case "external":
      return <ExternalLink {...props} />
  }
}

function CommandPaletteFooter() {
  return (
    <div className="hidden items-center gap-3 border-t border-subtle px-3 py-1.5 text-[11px] text-fg-muted md:flex">
      <span>↑↓ Navigate</span>
      <span>Enter Select</span>
      <span>Esc Close</span>
      <span className="ml-auto hidden min-[640px]:inline">
        Ctrl/Cmd + Shift + P
      </span>
    </div>
  )
}
