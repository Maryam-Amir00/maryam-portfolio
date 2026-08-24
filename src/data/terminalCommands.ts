import { personalInfo } from "./personalInfo"
import {
  findFileByQuery,
  listProjectFileNames,
  listProjectSummaries,
  listSrcNames,
  listWorkspaceRootNames,
  openedFileLabel,
} from "./portfolioFiles"
import type {
  CommandContext,
  CommandExecution,
  TerminalCommandDefinition,
  TerminalEntryDraft,
} from "../types/terminal"
import { VIRTUAL_WORKSPACE_PATH } from "../types/terminal"

type CommandHandler = (
  args: readonly string[],
  context: CommandContext,
) => CommandExecution

type RegisteredCommand = TerminalCommandDefinition & {
  execute: CommandHandler
}

function text(lines: string[]): CommandExecution {
  return { entries: [{ kind: "text", lines }] }
}

function error(lines: string[]): CommandExecution {
  return { entries: [{ kind: "error", lines }] }
}

function openNamed(query: string): CommandExecution {
  const file = findFileByQuery(query)

  if (!file) {
    return error([
      `open: file not found: ${query}`,
      'Type "ls" to view available files.',
    ])
  }

  return {
    openFileId: file.id,
    entries: [{ kind: "text", lines: [`Opened ${openedFileLabel(file)}`] }],
  }
}

function normalizeLsPath(args: readonly string[]) {
  return args
    .join(" ")
    .trim()
    .toLowerCase()
    .replace(/^\.\//, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
}

function listPath(args: readonly string[]): CommandExecution {
  const path = normalizeLsPath(args)

  if (
    path === "" ||
    path === "." ||
    path === "maryam-portfolio" ||
    path === VIRTUAL_WORKSPACE_PATH.slice(1)
  ) {
    return { entries: [{ kind: "ls", names: listWorkspaceRootNames() }] }
  }

  if (path === "src") {
    return { entries: [{ kind: "ls", names: listSrcNames() }] }
  }

  if (path === "projects" || path === "src/projects") {
    return { entries: [{ kind: "ls", names: listProjectFileNames() }] }
  }

  return error([`ls: path not found: ${args.join(" ")}`])
}

function executeHelp(args: readonly string[]): CommandExecution {
  if (!args[0]) {
    return { entries: [{ kind: "help" }] }
  }

  const command = resolveCommand(args[0])

  if (!command) {
    return error([`help: unknown command: ${args[0]}`])
  }

  return text([`Usage: ${command.usage ?? command.name}`])
}

const registeredCommands: RegisteredCommand[] = [
  {
    name: "help",
    description: "Show this command list",
    usage: "help",
    execute: executeHelp,
  },
  {
    name: "whoami",
    aliases: ["me"],
    description: "About the developer",
    usage: "whoami",
    execute: () => ({ entries: [{ kind: "whoami" }] }),
  },
  {
    name: "pwd",
    description: "Print workspace path",
    usage: "pwd",
    execute: () => text([VIRTUAL_WORKSPACE_PATH]),
  },
  {
    name: "ls",
    description: "List portfolio files",
    usage: "ls [path]",
    execute: (args) => listPath(args),
  },
  {
    name: "home",
    description: "Open home.tsx",
    usage: "home",
    execute: () => openNamed("home.tsx"),
  },
  {
    name: "about",
    description: "Open about.md",
    usage: "about",
    execute: () => openNamed("about.md"),
  },
  {
    name: "experience",
    description: "Open experience.ts",
    usage: "experience",
    execute: () => openNamed("experience.ts"),
  },
  {
    name: "skills",
    description: "Open skills.json",
    usage: "skills",
    execute: () => openNamed("skills.json"),
  },
  {
    name: "projects",
    description: "List project files",
    usage: "projects",
    execute: () => ({ entries: [{ kind: "projects" }] }),
  },
  {
    name: "studysync",
    description: "Open studysync.tsx",
    usage: "studysync",
    execute: () => openNamed("studysync.tsx"),
  },
  {
    name: "movixxx",
    description: "Open movixxx.jsx",
    usage: "movixxx",
    execute: () => openNamed("movixxx.jsx"),
  },
  {
    name: "stylique",
    description: "Open stylique.jsx",
    usage: "stylique",
    execute: () => openNamed("stylique.jsx"),
  },
  {
    name: "contact",
    description: "Open contact.tsx",
    usage: "contact",
    execute: () => openNamed("contact.tsx"),
  },
  {
    name: "resume",
    aliases: ["cv"],
    description: "Open resume.pdf",
    usage: "resume",
    execute: () => openNamed("resume"),
  },
  {
    name: "open",
    description: "Open a portfolio file",
    usage: "open <file>",
    execute: (args) => {
      if (args.length === 0) {
        return error(["Usage: open <file>"])
      }

      return openNamed(args.join(" "))
    },
  },
  {
    name: "email",
    description: "Show contact email",
    usage: "email",
    execute: () => ({ entries: [{ kind: "email" }] }),
  },
  {
    name: "history",
    description: "Show command history",
    usage: "history",
    execute: (_args, context) => ({
      entries: [{ kind: "history", commands: context.history }],
    }),
  },
  {
    name: "clear",
    aliases: ["cls"],
    description: "Clear terminal",
    usage: "clear",
    execute: () => ({ entries: [], clear: true }),
  },
]

const commandMap = new Map<string, RegisteredCommand>()

for (const command of registeredCommands) {
  commandMap.set(command.name, command)

  for (const alias of command.aliases ?? []) {
    commandMap.set(alias, command)
  }
}

export const TERMINAL_COMMANDS: readonly TerminalCommandDefinition[] =
  registeredCommands.map(({ name, aliases, description, usage }) => ({
    name,
    aliases,
    description,
    usage,
  }))

export function helpRows() {
  return TERMINAL_COMMANDS.map((command) => ({
    name: command.name,
    description: command.aliases?.length
      ? `${command.description} (alias: ${command.aliases.join(", ")})`
      : command.description,
  }))
}

export function projectRows() {
  return listProjectSummaries()
}

export function whoamiLines() {
  return [
    personalInfo.name,
    personalInfo.role,
    "",
    "Primary stack:",
    personalInfo.stack.join(" · "),
    "",
    "Location:",
    personalInfo.location,
  ]
}

function resolveCommand(name: string) {
  return commandMap.get(name.trim().toLowerCase())
}

export function parseCommandLine(input: string) {
  const parts = input.trim().split(/\s+/)
  const [name = "", ...args] = parts

  return {
    name: name.toLowerCase(),
    args,
  }
}

export function executeCommand(
  input: string,
  context: CommandContext,
): CommandExecution {
  const { name, args } = parseCommandLine(input)
  const command = commandMap.get(name)

  if (!command) {
    return error([
      `command not found: ${name}`,
      'Type "help" to see available portfolio commands.',
    ])
  }

  return command.execute(args, context)
}

export function announceEntry(entry: TerminalEntryDraft) {
  switch (entry.kind) {
    case "welcome":
      return "Maryam Portfolio Terminal. Type help to explore."
    case "command":
      return ""
    case "text":
    case "error":
      return entry.lines.join(" ")
    case "help":
      return "Available commands listed."
    case "whoami":
      return `${personalInfo.name}. ${personalInfo.role}.`
    case "ls":
      return entry.names.join(", ")
    case "projects":
      return "Projects listed. Use open filename to open a project."
    case "history":
      return entry.commands.length > 0
        ? `Command history: ${entry.commands.join(", ")}`
        : "No command history."
    case "email":
      return personalInfo.email
  }
}
