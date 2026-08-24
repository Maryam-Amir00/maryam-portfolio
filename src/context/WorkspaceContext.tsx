import { useCallback, useEffect, useReducer, type ReactNode } from "react"
import { MOBILE_MEDIA_QUERY, OVERLAY_MEDIA_QUERY } from "../config/breakpoints"
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
      window.matchMedia(MOBILE_MEDIA_QUERY).matches
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
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
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
    if (!isMobile) {
      return
    }

    if (state.activeSidebarView !== null && state.terminalVisible) {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
  }, [isMobile, state.activeSidebarView, state.terminalVisible])

  const openFile = useCallback(
    (fileId: string) => {
      dispatch({ type: "OPEN_FILE", fileId })
      if (isMobile) {
        dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
        clearOverlayTrigger()
        requestAnimationFrame(() => {
          focusEditorContent()
        })
      }
    },
    [isMobile],
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
    if (isMobile && state.activeSidebarView !== "explorer") {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "TOGGLE_EXPLORER" })
  }, [isMobile, isOverlay, state.activeSidebarView])

  const setExplorerVisible = useCallback(
    (visible: boolean) => {
      if (isOverlay && visible) {
        captureOverlayTrigger()
      }
      if (isMobile && visible) {
        dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
      }
      dispatch({ type: "SET_EXPLORER_VISIBLE", visible })
    },
    [isMobile, isOverlay],
  )

  const toggleSearch = useCallback(() => {
    if (isOverlay && state.activeSidebarView !== "search") {
      captureOverlayTrigger()
    }
    if (isMobile && state.activeSidebarView !== "search") {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "TOGGLE_SEARCH" })
  }, [isMobile, isOverlay, state.activeSidebarView])

  const showExplorer = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    if (isMobile) {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "explorer" })
  }, [isMobile, isOverlay])

  const showSearch = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    if (isMobile) {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "search" })
  }, [isMobile, isOverlay])

  const toggleSourceControl = useCallback(() => {
    if (isOverlay && state.activeSidebarView !== "source-control") {
      captureOverlayTrigger()
    }
    if (isMobile && state.activeSidebarView !== "source-control") {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "TOGGLE_SOURCE_CONTROL" })
  }, [isMobile, isOverlay, state.activeSidebarView])

  const showSourceControl = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    if (isMobile) {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "source-control" })
  }, [isMobile, isOverlay])

  const toggleExtensions = useCallback(() => {
    if (isOverlay && state.activeSidebarView !== "extensions") {
      captureOverlayTrigger()
    }
    if (isMobile && state.activeSidebarView !== "extensions") {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "TOGGLE_EXTENSIONS" })
  }, [isMobile, isOverlay, state.activeSidebarView])

  const showExtensions = useCallback(() => {
    if (isOverlay) {
      captureOverlayTrigger()
    }
    if (isMobile) {
      dispatch({ type: "SET_TERMINAL_VISIBLE", visible: false })
    }
    dispatch({ type: "SET_SIDEBAR_VIEW", view: "extensions" })
  }, [isMobile, isOverlay])

  const closeSidebar = useCallback(() => {
    dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
  }, [])

  const toggleTerminal = useCallback(() => {
    if (isMobile && !state.terminalVisible) {
      dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
    }
    dispatch({ type: "TOGGLE_TERMINAL" })
  }, [isMobile, state.terminalVisible])

  const openTerminal = useCallback(() => {
    if (isMobile) {
      dispatch({ type: "SET_SIDEBAR_VIEW", view: null })
    }
    dispatch({ type: "SET_TERMINAL_VISIBLE", visible: true })
  }, [isMobile])

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
