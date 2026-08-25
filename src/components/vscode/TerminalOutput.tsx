import { personalInfo } from "../../data/personalInfo"
import {
  helpRows,
  projectRows,
  whoamiLines,
} from "../../data/terminalCommands"
import type { TerminalEntry } from "../../types/terminal"
import { TerminalPrompt } from "./TerminalPrompt"

export function TerminalOutput({ entries }: { entries: readonly TerminalEntry[] }) {
  return (
    <div className="break-words">
      {entries.map((entry) => (
        <TerminalEntryView key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

function entrySpacing(kind: TerminalEntry["kind"]) {
  if (kind === "welcome") {
    return "mb-3"
  }

  if (kind === "command") {
    return "mb-1"
  }

  return "mb-2.5"
}

function listingClass(name: string) {
  if (name.endsWith("/")) {
    return "text-file-folder"
  }

  if (name.endsWith(".tsx")) {
    return "text-file-tsx"
  }

  if (name.endsWith(".jsx")) {
    return "text-file-jsx"
  }

  if (name.endsWith(".ts")) {
    return "text-file-ts"
  }

  if (name.endsWith(".md")) {
    return "text-file-md"
  }

  if (name.endsWith(".json")) {
    return "text-file-json"
  }

  if (name.endsWith(".pdf")) {
    return "text-file-pdf"
  }

  return "text-fg"
}

function TerminalEntryView({ entry }: { entry: TerminalEntry }) {
  const spacing = entrySpacing(entry.kind)

  switch (entry.kind) {
    case "welcome":
      return (
        <div className={spacing}>
          <p className="text-fg">Maryam Portfolio Terminal</p>
          <p className="text-fg-muted">
            Type &quot;help&quot; to see available commands.
          </p>
        </div>
      )
    case "command":
      return (
        <p className={`flex min-w-0 items-baseline gap-[5px] ${spacing}`}>
          <span aria-hidden="true">
            <TerminalPrompt />
          </span>
          <span className="min-w-0 break-words text-fg">{entry.value}</span>
        </p>
      )
    case "text":
      return (
        <pre
          className={`m-0 font-[inherit] whitespace-pre-wrap text-fg ${spacing}`}
        >
          {entry.lines.join("\n")}
        </pre>
      )
    case "error":
      return (
        <pre
          className={`m-0 font-[inherit] whitespace-pre-wrap ${spacing}`}
        >
          {entry.lines.map((line, index) => (
            <span
              key={`${index}-${line}`}
              className={index === 0 ? "text-error" : "text-fg-muted"}
            >
              {line}
              {index < entry.lines.length - 1 ? "\n" : null}
            </span>
          ))}
        </pre>
      )
    case "help":
      return (
        <div className={spacing}>
          <HelpOutput />
        </div>
      )
    case "whoami":
      return (
        <div className={spacing}>
          {whoamiLines().map((line, index) => (
            <p
              key={`${index}-${line}`}
              className={index === 0 ? "text-fg" : "text-fg-secondary"}
            >
              {line}
            </p>
          ))}
        </div>
      )
    case "ls":
      return (
        <ul className={`list-none ${spacing}`}>
          {entry.names.map((name) => (
            <li key={name} className={listingClass(name)}>
              {name}
            </li>
          ))}
        </ul>
      )
    case "projects":
      return (
        <div className={spacing}>
          <ProjectsOutput />
        </div>
      )
    case "history":
      return entry.commands.length === 0 ? (
        <p className={`text-fg-secondary ${spacing}`}>No commands yet.</p>
      ) : (
        <ol className={`list-none ${spacing}`}>
          {entry.commands.map((command, index) => (
            <li key={`${index}-${command}`} className="flex gap-3">
              <span className="w-6 shrink-0 text-right text-fg-muted">
                {index + 1}
              </span>
              <span className="min-w-0 break-words text-fg">{command}</span>
            </li>
          ))}
        </ol>
      )
    case "email":
      return (
        <p className={spacing}>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-accent underline-offset-2 interactive-text hover:underline"
          >
            {personalInfo.email}
          </a>
        </p>
      )
  }
}

function HelpOutput() {
  const rows = helpRows()

  return (
    <div>
      <p className="mb-1 text-fg">Available commands:</p>
      <dl>
        {rows.map((row) => (
          <div
            key={row.name}
            className="flex min-w-0 flex-col sm:flex-row sm:gap-x-4"
          >
            <dt className="shrink-0 text-fg sm:w-[11ch]">{row.name}</dt>
            <dd className="min-w-0 break-words text-fg-secondary">
              {row.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ProjectsOutput() {
  return (
    <div>
      <p className={listingClass("projects/")}>projects/</p>
      {projectRows().map((project) => (
        <p key={project.fileName} className={listingClass(project.fileName)}>
          {`  ${project.fileName}`}
        </p>
      ))}
    </div>
  )
}
