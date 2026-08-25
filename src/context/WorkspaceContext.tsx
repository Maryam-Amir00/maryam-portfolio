import { useCallback, useEffect, useReducer, type ReactNode } from "react"
import { OVERLAY_MEDIA_QUERY } from "../config/breakpoints"
import { findFileById } from "../data/portfolioFiles"
import { siteConfig } from "../config/site"
import { useMediaQuery } from "../hooks/useMediaQuery"
import type { WorkspaceContextValue, WorkspaceState } from "../types/workspace"
import { captureCommandPaletteFocus } from "../utils/commandPaletteFocus"
import { captureOverlayTrigger, clearOverlayTrigger } from "../utils/overlayFocus"
import { focusEditorContent } from "../utils/focusEditor"
import { WorkspaceContext } from "./workspace-context"
import {
  initialWorkspaceState,
  workspaceReducer,
} from "./workspaceReducer"

function createInitialWorkspaceState(
  baseState: WorkspaceState,
): WorkspaceState {
  return {
    ...baseState,
    activeSidebarView:
      typeof window !== "undefined" &&
      window.matchMedia(OVERLAY_MEDIA_QUERY).matches
        ? null
        : baseState.activeSidebarView,
  }
}

function isCommandPaletteMounted() {
  return Boolean(document.querySelector("[data-command-palette]"))
}

function isFocusInsideCommandPalette() {
  const active = document.activeElement
  return (
    active instanceof Element && Boolean(active.closest("[data-command-palette]"))
  )
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    initialWorkspaceState,
    createInitialWorkspaceState,
  )
  const isOverlay = useMediaQuery(OVERLAY_MEDIA_QUERY)

  const activeFile = state.activeFileId
    ? (findFileById(state.activeFileId) ?? null)
    : null

  const openFiles = state.openFileIds.flatMap((id) => {
    const file = findFileById(id)
    return file ? [file] : []
  })

  useEffect(() => {
    document.title = activeFile
      ? `${activeFile.name} | ${siteConfig.name}`
      : siteConfig.title
  }, [activeFile])

  useEffect(() => {
    if (!isOverlay) {
      return
    }

    if (state.activeSidebarView !== null && state.terminalVisible) {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
  }, [isOverlay, state.activeSidebarView, state.terminalVisible])

  const openFile = useCallback(
    (fileId: string) => {
      dispatch({ type: "OPEN_FILE", fileId })
      if (isOverlay) {
        dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
        clearOverlayTrigger()
        requestAnimationFrame(() => {
          focusEditorContent()
        })
      }
    },
    [isOverlay],
  )

  const activateFile = useCallback((fileId: string) => {
    dispatch({ type: "ACTIVATE_FILE", fileId })
  }, [])

  const closeFile = useCallback((fileId: string) => {
    dispatch({ type: "CLOSE_FILE", fileId })
  }, [])

  const toggleFolder = useCallback((folderId: string) => {
    dispatch({ type: "TOGGLE_FOLDER", folderId })
  }, [])

  const toggleExplorer = useCallback(() => {
    if (isOverlay && state.activeSidebarView !== "explorer") {
      captureOverlayTrigger()
    }
    dispatch({ type: "TOGGLE_EXPLORER" })
  }, [isOverlay, state.activeSidebarView])

  const setExplorerVisible = useCallback(
    (visible: boolean) => {
      if (isOverlay && visible) {
        captureOverlayTrigger()
      }
      dispatch({ type: "SET_EXPLORER_VISIBLE", visible })
    },
    [isOverlay],
  )

  const toggleSearch = useCallback(() => {
    if (isOverlay && state.activeSidebarView !== "search") {
      captureOverlayTrigger()
    }
    dispatch({ type: "TOGGLE_SEARCH" })
  }, [isOverlay, state.activeSidebarView])

  const showExplorer = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "explorer" })
  }, [isOverlay])

  const showSearch = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "search" })
  }, [isOverlay])

  const toggleSourceControl = useCallback(() => {
    if (isOverlay && state.activeSidebarView !== "source-control") {
      captureOverlayTrigger()
    }
    dispatch({ type: "TOGGLE_SOURCE_CONTROL" })
  }, [isOverlay, state.activeSidebarView])

  const showSourceControl = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "source-control" })
  }, [isOverlay])

  const toggleExtensions = useCallback(() => {
    if (isOverlay && state.activeSidebarView !== "extensions") {
      captureOverlayTrigger()
    }
    dispatch({ type: "TOGGLE_EXTENSIONS" })
  }, [isOverlay, state.activeSidebarView])

  const showExtensions = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "extensions" })
  }, [isOverlay])

  const closeSidebar = useCallback(() => {
    dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
  }, [])

  const toggleTerminal = useCallback(() => {
    if (isOverlay && !state.terminalVisible) {
      dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
    }
    dispatch({ type: "TOGGLE_TERMINAL" })
  }, [isOverlay, state.terminalVisible])

  const openTerminal = useCallback(() => {
    if (isOverlay) {
      dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
    }
    dispatch({ type: "SET_TERMINAL_VISIBLE", visible: true })
  }, [isOverlay])

  const closeTerminal = useCallback(() => {
    dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
  }, [])

  const toggleCommandPalette = useCallback(() => {
    if (!isCommandPaletteMounted()) {
      captureCommandPaletteFocus()
    }
    dispatch({ type: "TOGGLE_COMMAND_PALETTE" })
  }, [])

  const openCommandPalette = useCallback(() => {
    if (!isFocusInsideCommandPalette()) {
      captureCommandPaletteFocus()
    }
    dispatch({ type: "SET_COMMAND_PALETTE_VISIBLE", visible: true })
  }, [])

  const closeCommandPalette = useCallback(() => {
    dispatch({ type: "SET_COMMAND_PALETTE_VISIBLE", visible: false })
  }, [])

  const value: WorkspaceContextValue = {
    ...state,
    explorerVisible: state.activeSidebarView === "explorer",
    searchVisible: state.activeSidebarView === "search",
    sourceControlVisible: state.activeSidebarView === "source-control",
    extensionsVisible: state.activeSidebarView === "extensions",
    activeFile,
    openFiles,
    openFile,
    activateFile,
    closeFile,
    toggleFolder,
    toggleExplorer,
    setExplorerVisible,
    showExplorer,
    toggleSearch,
    showSearch,
    toggleSourceControl,
    showSourceControl,
    toggleExtensions,
    showExtensions,
    closeSidebar,
    toggleTerminal,
    openTerminal,
    closeTerminal,
    toggleCommandPalette,
    openCommandPalette,
    closeCommandPalette,
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
