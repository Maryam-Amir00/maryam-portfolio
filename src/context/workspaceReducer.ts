import {
  findFileById,
  findFolderById,
  FILE_HOME,
  FOLDER_PROJECTS,
  FOLDER_SRC,
  FOLDER_WORKSPACE,
} from "../data/portfolioFiles"
import type { WorkspaceAction, WorkspaceState } from "../types/workspace"

export const initialWorkspaceState: WorkspaceState = {
  activeFileId: FILE_HOME,
  openFileIds: [FILE_HOME],
  expandedFolderIds: [FOLDER_WORKSPACE, FOLDER_SRC, FOLDER_PROJECTS],
  activeSidebarView: "explorer",
  terminalVisible: false,
  commandPaletteVisible: false,
}

export function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction,
): WorkspaceState {
  switch (action.type) {
    case "OPEN_FILE": {
      if (!findFileById(action.fileId)) {
        return state
      }

      if (state.openFileIds.includes(action.fileId)) {
        return {
          ...state,
          activeFileId: action.fileId,
        }
      }

      return {
        ...state,
        openFileIds: [...state.openFileIds, action.fileId],
        activeFileId: action.fileId,
      }
    }
    case "ACTIVATE_FILE": {
      if (!state.openFileIds.includes(action.fileId)) {
        return state
      }

      return {
        ...state,
        activeFileId: action.fileId,
      }
    }
    case "CLOSE_FILE": {
      const index = state.openFileIds.indexOf(action.fileId)
      if (index === -1) {
        return state
      }

      const openFileIds = state.openFileIds.filter((id) => id !== action.fileId)

      if (state.activeFileId !== action.fileId) {
        return { ...state, openFileIds }
      }

      const nextActiveId = openFileIds[index] ?? openFileIds[index - 1] ?? null

      return {
        ...state,
        openFileIds,
        activeFileId: nextActiveId,
      }
    }
    case "TOGGLE_FOLDER": {
      if (!findFolderById(action.folderId)) {
        return state
      }

      const isExpanded = state.expandedFolderIds.includes(action.folderId)

      return {
        ...state,
        expandedFolderIds: isExpanded
          ? state.expandedFolderIds.filter((id) => id !== action.folderId)
          : [...state.expandedFolderIds, action.folderId],
      }
    }
    case "TOGGLE_EXPLORER":
      return {
        ...state,
        activeSidebarView:
          state.activeSidebarView === "explorer" ? null : "explorer",
      }
    case "SET_EXPLORER_VISIBLE":
      return {
        ...state,
        activeSidebarView: action.visible
          ? "explorer"
          : state.activeSidebarView === "explorer"
            ? null
            : state.activeSidebarView,
      }
    case "TOGGLE_SEARCH":
      return {
        ...state,
        activeSidebarView: state.activeSidebarView === "search" ? null : "search",
      }
    case "TOGGLE_SOURCE_CONTROL":
      return {
        ...state,
        activeSidebarView:
          state.activeSidebarView === "source-control" ? null : "source-control",
      }
    case "TOGGLE_EXTENSIONS":
      return {
        ...state,
        activeSidebarView:
          state.activeSidebarView === "extensions" ? null : "extensions",
      }
    case "SET_SIDEBAR_VIEW":
      return {
        ...state,
        activeSidebarView: action.view,
      }
    case "TOGGLE_TERMINAL":
      return {
        ...state,
        terminalVisible: !state.terminalVisible,
      }
    case "SET_TERMINAL_VISIBLE":
      return {
        ...state,
        terminalVisible: action.visible,
      }
    case "TOGGLE_COMMAND_PALETTE":
      return {
        ...state,
        commandPaletteVisible: !state.commandPaletteVisible,
      }
    case "SET_COMMAND_PALETTE_VISIBLE":
      return {
        ...state,
        commandPaletteVisible: action.visible,
      }
  }
}
