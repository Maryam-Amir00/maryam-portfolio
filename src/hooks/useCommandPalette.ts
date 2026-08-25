import { useCallback, useMemo, useState } from "react"
import {
  executeCommandPaletteAction,
  getCommandPaletteActions,
  groupCommandPaletteActions,
} from "../data/commandPaletteActions"
import { WORKSPACE_TOOLBOX_INPUT_ID } from "../data/toolboxMeta"
import type {
  CommandPaletteAction,
  CommandPaletteGroup,
} from "../types/commandPalette"
import { restoreCommandPaletteFocus } from "../utils/commandPaletteFocus"
import { focusEditorContent } from "../utils/focusEditor"
import {
  normalizeSearchQuery,
  rankCommandActions,
} from "../utils/rankCommandActions"
import { useWorkspace } from "./useWorkspace"

const RECENT_LIMIT = 5

export function useCommandPalette() {
  const {
    closeCommandPalette,
    closeTerminal,
    explorerVisible,
    searchVisible,
    sourceControlVisible,
    extensionsVisible,
    openFile,
    openTerminal,
    showExplorer,
    closeSidebar,
    showSearch,
    showSourceControl,
    showExtensions,
    terminalVisible,
  } = useWorkspace()
  const [query, setQueryState] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentIds, setRecentIds] = useState<string[]>([])
  const [status, setStatus] = useState("")

  const setQuery = useCallback((value: string) => {
    setQueryState(value)
    setSelectedIndex(0)
  }, [])

  const actions = useMemo(
    () =>
      getCommandPaletteActions({
        terminalVisible,
        explorerVisible,
        searchVisible,
        sourceControlVisible,
        extensionsVisible,
      }),
    [
      explorerVisible,
      extensionsVisible,
      searchVisible,
      sourceControlVisible,
      terminalVisible,
    ],
  )

  const normalizedQuery = normalizeSearchQuery(query)
  const isSearching = normalizedQuery.length > 0

  const rankedActions = useMemo(
    () => (isSearching ? rankCommandActions(actions, normalizedQuery) : []),
    [actions, isSearching, normalizedQuery],
  )

  const recentActions = useMemo(
    () =>
      recentIds.flatMap((id) => {
        const action = actions.find((item) => item.id === id)
        return action ? [action] : []
      }),
    [actions, recentIds],
  )

  const groups = useMemo((): CommandPaletteGroup[] => {
    if (isSearching) {
      return []
    }

    const recentIdSet = new Set(recentActions.map((action) => action.id))
    const remaining = actions.filter((action) => !recentIdSet.has(action.id))
    const categoryGroups = groupCommandPaletteActions(remaining)

    if (recentActions.length === 0) {
      return categoryGroups
    }

    return [
      { id: "recent", heading: "Recent", actions: recentActions },
      ...categoryGroups,
    ]
  }, [actions, isSearching, recentActions])

  const visibleActions = isSearching
    ? rankedActions
    : groups.flatMap((group) => group.actions)

  const selectedIndexSafe =
    visibleActions.length === 0
      ? -1
      : Math.min(Math.max(selectedIndex, 0), visibleActions.length - 1)

  const selectedAction =
    selectedIndexSafe >= 0 ? (visibleActions[selectedIndexSafe] ?? null) : null

  const liveStatus =
    isSearching && visibleActions.length === 0
      ? "No matching commands."
      : status

  const closeAndReset = useCallback(
    (restoreFocus: boolean) => {
      setQueryState("")
      setSelectedIndex(0)
      closeCommandPalette()

      if (restoreFocus) {
        restoreCommandPaletteFocus()
      }
    },
    [closeCommandPalette],
  )

  const executeAction = useCallback(
    async (action: CommandPaletteAction) => {
      const result = await executeCommandPaletteAction(action, {
        openFile,
        openTerminal,
        closeTerminal,
        showExplorer,
        closeSidebar,
        showSearch,
        showSourceControl,
        showExtensions,
      })

      setRecentIds((current) =>
        [action.id, ...current.filter((id) => id !== action.id)].slice(
          0,
          RECENT_LIMIT,
        ),
      )

      if (result.status) {
        setStatus(result.status)
      }

      if (result.keepOpen) {
        return
      }

      closeAndReset(result.restoreFocus)

      if (action.target.type === "open-file") {
        requestAnimationFrame(() => {
          focusEditorContent()
        })
      }

      if (result.focusSearch) {
        requestAnimationFrame(() => {
          document.getElementById("workspace-search-input")?.focus()
        })
      }

      if (result.focusToolbox) {
        requestAnimationFrame(() => {
          document.getElementById(WORKSPACE_TOOLBOX_INPUT_ID)?.focus()
        })
      }
    },
    [
      closeAndReset,
      closeSidebar,
      closeTerminal,
      openFile,
      openTerminal,
      showExplorer,
      showSearch,
      showSourceControl,
      showExtensions,
    ],
  )

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (visibleActions.length === 0) {
        return
      }

      setSelectedIndex((current) => {
        const start = current < 0 ? 0 : current
        return (start + direction + visibleActions.length) % visibleActions.length
      })
    },
    [visibleActions.length],
  )

  const submitSelected = useCallback(() => {
    if (!selectedAction) {
      return
    }

    void executeAction(selectedAction)
  }, [executeAction, selectedAction])

  return {
    closeAndReset,
    executeAction,
    groups,
    isSearching,
    moveSelection,
    query,
    selectedAction,
    selectedIndex: selectedIndexSafe,
    setQuery,
    setSelectedIndex,
    status: liveStatus,
    submitSelected,
    visibleActions,
  }
}
