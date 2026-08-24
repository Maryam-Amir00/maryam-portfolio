export const COMMAND_PALETTE_LISTBOX_ID = "command-palette-listbox"

export type CommandPaletteCategory = "file" | "project" | "workspace" | "contact"

export type CommandPaletteIconName =
  | "home"
  | "about"
  | "experience"
  | "skills"
  | "project"
  | "contact"
  | "resume"
  | "terminal"
  | "explorer"
  | "copy"
  | "search"
  | "source-control"
  | "extensions"

export type CommandPaletteTarget =
  | { type: "open-file"; fileId: string }
  | { type: "set-terminal"; visible: boolean }
  | { type: "set-explorer"; visible: boolean }
  | { type: "show-search" }
  | { type: "show-source-control" }
  | { type: "show-extensions" }
  | { type: "copy-email" }

export type CommandPaletteAction = {
  id: string
  label: string
  description?: string
  category: CommandPaletteCategory
  keywords: readonly string[]
  icon: CommandPaletteIconName
  shortcut?: string
  target: CommandPaletteTarget
}

export type CommandPaletteGroup = {
  id: string
  heading: string
  actions: CommandPaletteAction[]
}

export type PaletteExecuteResult = {
  restoreFocus: boolean
  status?: string
  focusSearch?: boolean
  focusToolbox?: boolean
}

export type PaletteExecuteContext = {
  openFile: (fileId: string) => void
  openTerminal: () => void
  closeTerminal: () => void
  showExplorer: () => void
  closeSidebar: () => void
  showSearch: () => void
  showSourceControl: () => void
  showExtensions: () => void
}
