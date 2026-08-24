export type FileIconType =
  | "ts"
  | "tsx"
  | "js"
  | "jsx"
  | "json"
  | "md"
  | "pdf"
  | "unknown"

export type PortfolioFile = {
  id: string
  name: string
  type: "file"
  extension: string
  language: string
  path: string
  title?: string
}

export type PortfolioFolder = {
  id: string
  name: string
  type: "folder"
  children: PortfolioNode[]
}

export type PortfolioNode = PortfolioFile | PortfolioFolder

export type SidebarView =
  | "explorer"
  | "search"
  | "source-control"
  | "extensions"
  | null

export type WorkspaceState = {
  activeFileId: string | null
  openFileIds: string[]
  expandedFolderIds: string[]
  activeSidebarView: SidebarView
  terminalVisible: boolean
  commandPaletteVisible: boolean
}

export type WorkspaceAction =
  | { type: "OPEN_FILE"; fileId: string }
  | { type: "ACTIVATE_FILE"; fileId: string }
  | { type: "CLOSE_FILE"; fileId: string }
  | { type: "TOGGLE_FOLDER"; folderId: string }
  | { type: "TOGGLE_EXPLORER" }
  | { type: "SET_EXPLORER_VISIBLE"; visible: boolean }
  | { type: "TOGGLE_SEARCH" }
  | { type: "TOGGLE_SOURCE_CONTROL" }
  | { type: "TOGGLE_EXTENSIONS" }
  | { type: "SET_SIDEBAR_VIEW"; view: SidebarView }
  | { type: "TOGGLE_TERMINAL" }
  | { type: "SET_TERMINAL_VISIBLE"; visible: boolean }
  | { type: "TOGGLE_COMMAND_PALETTE" }
  | { type: "SET_COMMAND_PALETTE_VISIBLE"; visible: boolean }

export type WorkspaceContextValue = WorkspaceState & {
  activeFile: PortfolioFile | null
  openFiles: PortfolioFile[]
  explorerVisible: boolean
  searchVisible: boolean
  sourceControlVisible: boolean
  extensionsVisible: boolean
  openFile: (fileId: string) => void
  activateFile: (fileId: string) => void
  closeFile: (fileId: string) => void
  toggleFolder: (folderId: string) => void
  toggleExplorer: () => void
  setExplorerVisible: (visible: boolean) => void
  showExplorer: () => void
  toggleSearch: () => void
  showSearch: () => void
  toggleSourceControl: () => void
  showSourceControl: () => void
  toggleExtensions: () => void
  showExtensions: () => void
  closeSidebar: () => void
  toggleTerminal: () => void
  openTerminal: () => void
  closeTerminal: () => void
  toggleCommandPalette: () => void
  openCommandPalette: () => void
  closeCommandPalette: () => void
}
