import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import { announceEntry, executeCommand } from "../data/terminalCommands"
import type { TerminalEntry } from "../types/terminal"
import { useWorkspace } from "./useWorkspace"

const MAX_TERMINAL_ENTRIES = 250
const MAX_COMMAND_HISTORY = 250

const welcomeEntry: TerminalEntry = {
  id: "t0",
  kind: "welcome",
}

export function useTerminal() {
  const { openFile } = useWorkspace()
  const [entries, setEntries] = useState<TerminalEntry[]>([welcomeEntry])
  const [history, setHistory] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [draft, setDraft] = useState("")
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [announcement, setAnnouncement] = useState("")
  const nextIdRef = useRef(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const nextId = useCallback(() => {
    const id = `t${nextIdRef.current}`
    nextIdRef.current += 1
    return id
  }, [])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const scrollToBottom = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) {
      return
    }

    scroller.scrollTop = scroller.scrollHeight
  }, [])

  const clearOutput = useCallback(() => {
    setEntries([])
    setAnnouncement("Terminal cleared.")
    focusInput()
  }, [focusInput])

  const submit = useCallback(() => {
    const trimmed = input.trim()

    if (!trimmed) {
      return
    }

    const nextHistory = [...history, trimmed].slice(-MAX_COMMAND_HISTORY)
    const result = executeCommand(trimmed, { history: nextHistory })

    setHistory(nextHistory)
    setInput("")
    setDraft("")
    setHistoryIndex(-1)

    if (result.clear) {
      setEntries([])
      setAnnouncement("Terminal cleared.")
      focusInput()
      return
    }

    const commandEntry: TerminalEntry = {
      id: nextId(),
      kind: "command",
      value: trimmed,
    }
    const outputEntries: TerminalEntry[] = result.entries.map((entry) => ({
      ...entry,
      id: nextId(),
    }))

    setEntries((current) =>
      [...current, commandEntry, ...outputEntries].slice(-MAX_TERMINAL_ENTRIES),
    )

    const spoken = outputEntries
      .map((entry) => announceEntry(entry))
      .filter((value) => value.length > 0)
      .join(" ")

    setAnnouncement(spoken)

    if (result.openFileId) {
      openFile(result.openFileId)
    }

    focusInput()
  }, [focusInput, history, input, nextId, openFile])

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        event.preventDefault()

        if (history.length === 0) {
          return
        }

        if (historyIndex === -1) {
          setDraft(input)
        }

        const nextIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)

        setHistoryIndex(nextIndex)
        setInput(history[nextIndex] ?? "")
        return
      }

      if (event.key === "ArrowDown") {
        event.preventDefault()

        if (historyIndex === -1) {
          return
        }

        if (historyIndex >= history.length - 1) {
          setHistoryIndex(-1)
          setInput(draft)
          return
        }

        const nextIndex = historyIndex + 1
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex] ?? "")
      }
    },
    [draft, history, historyIndex, input],
  )

  return {
    announcement,
    scrollerRef,
    clearOutput,
    entries,
    focusInput,
    handleInputKeyDown,
    input,
    inputRef,
    scrollToBottom,
    setInput,
    submit,
  }
}
