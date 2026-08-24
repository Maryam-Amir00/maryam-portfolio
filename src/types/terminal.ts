export const TERMINAL_MENU_BUTTON_ID = "workspace-terminal-menu"
export const VIRTUAL_WORKSPACE_PATH = "/maryam-portfolio"

export type TerminalEntryDraft =
  | { kind: "welcome" }
  | { kind: "command"; value: string }
  | { kind: "text"; lines: readonly string[] }
  | { kind: "error"; lines: readonly string[] }
  | { kind: "help" }
  | { kind: "whoami" }
  | { kind: "ls"; names: readonly string[] }
  | { kind: "projects" }
  | { kind: "history"; commands: readonly string[] }
  | { kind: "email" }

export type TerminalEntry = TerminalEntryDraft & { id: string }

export type TerminalCommandDefinition = {
  name: string
  aliases?: readonly string[]
  description: string
  usage?: string
}

export type CommandExecution = {
  entries: TerminalEntryDraft[]
  clear?: boolean
  openFileId?: string
}

export type CommandContext = {
  history: readonly string[]
}
