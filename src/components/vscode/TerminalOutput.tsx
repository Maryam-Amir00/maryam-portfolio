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
    <div className="space-y-2 break-words">
      {entries.map((entry) => (
        <TerminalEntryView key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

function TerminalEntryView({ entry }: { entry: TerminalEntry }) {
  switch (entry.kind) {
    case "welcome":
      return (
        <p className="text-fg-secondary">
          Maryam Portfolio Terminal
          <br />
          Type &quot;help&quot; to explore.
        </p>
      )
    case "command":
      return (
        <p className="flex flex-wrap items-baseline gap-x-2">
          <TerminalPrompt />
          <span className="min-w-0 text-fg">{entry.value}</span>
        </p>
      )
    case "text":
      return (
        <pre className="m-0 font-[inherit] whitespace-pre-wrap text-fg">
          {entry.lines.join("\n")}
        </pre>
      )
    case "error":
      return (
        <pre className="m-0 font-[inherit] whitespace-pre-wrap text-error">
          {entry.lines.join("\n")}
        </pre>
      )
    case "help":
      return <HelpOutput />
    case "whoami":
      return (
        <pre className="m-0 font-[inherit] whitespace-pre-wrap text-fg">
          {whoamiLines().join("\n")}
        </pre>
      )
    case "ls":
      return (
        <ul className="list-none">
          {entry.names.map((name) => (
            <li
              key={name}
              className={name.endsWith("/") ? "text-file-folder" : "text-fg"}
            >
              {name}
            </li>
          ))}
        </ul>
      )
    case "projects":
      return <ProjectsOutput />
    case "history":
      return entry.commands.length === 0 ? (
        <p className="text-fg-secondary">No commands yet.</p>
      ) : (
        <ol className="list-none">
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
        <p>
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
  return (
    <div>
      <p className="mb-2 text-fg">Available commands</p>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-[minmax(7rem,max-content)_minmax(0,1fr)]">
        {helpRows().map((row) => (
          <div key={row.name} className="contents">
            <dt className="text-fg">{row.name}</dt>
            <dd className="min-w-0 text-fg-secondary">{row.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ProjectsOutput() {
  return (
    <div>
      <p className="mb-2 text-fg">Projects</p>
      <ol className="list-none">
        {projectRows().map((project, index) => (
          <li key={project.fileName} className="flex flex-wrap gap-x-4">
            <span className="text-fg-muted">{index + 1}.</span>
            <span className="text-fg">{project.name}</span>
            <span className="text-fg-secondary">{project.fileName}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-fg-secondary">
        Use:
        <br />
        open &lt;filename&gt;
      </p>
    </div>
  )
}
