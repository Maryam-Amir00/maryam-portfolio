import { Info } from "lucide-react"
import {
  careerMilestones,
  currentSnapshot,
  educationMilestones,
  projectSnapshots,
  type PortfolioHistoryEntry,
} from "../../data/portfolioHistory"
import { findFileById, openedFileLabel } from "../../data/portfolioFiles"
import { useWorkspace } from "../../hooks/useWorkspace"
import { FileIcon } from "./FileIcon"
import { SidebarPanel } from "./SidebarPanel"
import { accessibleMetricValue } from "../../utils/accessibleMetric"

export function SourceControlPanel() {
  const { sourceControlVisible, openFile, activeFileId } = useWorkspace()

  if (!sourceControlVisible) {
    return null
  }

  return (
    <SidebarPanel
      label="Source Control portfolio history"
      header="Source Control"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <PortfolioHistoryNotice />
        <div className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-3">
          <CurrentSnapshot
            isActive={activeFileId === currentSnapshot.relatedFileId}
            onOpen={() => {
              openFile(currentSnapshot.relatedFileId)
            }}
          />
          <HistorySection heading="Career" entries={careerMilestones} />
          <HistorySection heading="Education" entries={educationMilestones} />
          <HistorySection heading="Project Snapshots" entries={projectSnapshots} />
          <p className="mt-4 px-3 text-[11px] leading-4 text-fg-muted">
            Open any snapshot to inspect the related portfolio file.
          </p>
        </div>
      </div>
    </SidebarPanel>
  )
}

function PortfolioHistoryNotice() {
  return (
    <div className="shrink-0 border-b border-subtle px-3 pb-3">
      <h2 className="text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase">
        Portfolio History
      </h2>
      <p className="mt-1.5 flex gap-1.5 text-[11px] leading-4 text-fg-muted">
        <Info
          size={12}
          strokeWidth={1.75}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <span>
          Git inspired portfolio milestones. These entries are not repository
          commits.
        </span>
      </p>
    </div>
  )
}

function CurrentSnapshot({
  isActive,
  onOpen,
}: {
  isActive: boolean
  onOpen: () => void
}) {
  const file = findFileById(currentSnapshot.relatedFileId)

  return (
    <section className="px-3 pt-3" aria-labelledby="source-control-current-snapshot">
      <h3
        id="source-control-current-snapshot"
        className="text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase"
      >
        Current Snapshot
      </h3>
      <button
        type="button"
        onClick={onOpen}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Open ${file?.name ?? "experience.ts"} for ${currentSnapshot.role} at ${currentSnapshot.name}`}
        className={[
          "group mt-2 w-full rounded-sm px-1.5 py-3 text-left ui-transition hover:bg-hover md:py-2",
          isActive ? "bg-hover" : "",
        ].join(" ")}
      >
        <span className="flex min-w-0 items-start gap-2">
          <span
            aria-hidden="true"
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
              Current
            </span>
            <span
              className={[
                "mt-0.5 block text-[13px] leading-5 break-words",
                isActive ? "text-fg" : "text-fg-secondary group-hover:text-fg ui-transition",
              ].join(" ")}
            >
              {currentSnapshot.name}
            </span>
            <span className="mt-0.5 block text-[12px] leading-4 break-words text-fg-secondary">
              {currentSnapshot.role}
            </span>
            <span className="mt-1 block text-[11px] leading-4 text-fg-muted">
              {currentSnapshot.direction}
            </span>
            <span className="block text-[11px] leading-4 text-fg-muted">
              {currentSnapshot.location}
            </span>
            {file ? <FilePathRow file={file} /> : null}
          </span>
        </span>
      </button>
    </section>
  )
}

function HistorySection({
  heading,
  entries,
}: {
  heading: string
  entries: readonly PortfolioHistoryEntry[]
}) {
  const headingId = `source-control-${heading.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <section className="px-3 pt-4" aria-labelledby={headingId}>
      <h3
        id={headingId}
        className="text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase"
      >
        {heading}
      </h3>
      <ul className="mt-1">
        {entries.map((entry, index) => (
          <HistoryEntry
            key={entry.id}
            entry={entry}
            isLast={index === entries.length - 1}
          />
        ))}
      </ul>
    </section>
  )
}

function HistoryEntry({
  entry,
  isLast,
}: {
  entry: PortfolioHistoryEntry
  isLast: boolean
}) {
  const { openFile, activeFileId } = useWorkspace()
  const file = findFileById(entry.relatedFileId)
  const isActive = activeFileId === entry.relatedFileId

  return (
    <li className="relative flex gap-2">
      <span
        aria-hidden="true"
        className="flex w-3 shrink-0 flex-col items-center"
      >
        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
        {isLast ? null : (
          <span className="mt-1 w-px flex-1 bg-subtle" />
        )}
      </span>
      <button
        type="button"
        onClick={() => {
          openFile(entry.relatedFileId)
        }}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Open ${file?.name ?? "related file"} for ${entry.title}`}
        className={[
          "group mb-1 min-w-0 flex-1 rounded-sm px-1.5 py-3 text-left ui-transition hover:bg-hover md:py-2",
          isActive ? "bg-hover" : "",
        ].join(" ")}
      >
        {entry.isCurrent ? (
          <span className="mb-1 inline-block font-mono text-[10px] tracking-[0.12em] text-accent uppercase">
            Current
          </span>
        ) : null}
        <span
          className={[
            "block text-[13px] leading-5 break-words",
            isActive ? "text-fg" : "text-fg-secondary ui-transition group-hover:text-fg",
          ].join(" ")}
        >
          {entry.title}
        </span>
        {entry.subtitle ? (
          <span className="mt-0.5 block text-[12px] leading-4 break-words text-fg-secondary">
            {entry.subtitle}
          </span>
        ) : null}
        {entry.focus ? (
          <span className="mt-0.5 block text-[11px] leading-4 text-fg-muted">
            {entry.focus}
          </span>
        ) : null}
        {entry.period ? (
          <span className="mt-1 block font-mono text-[11px] leading-4 text-fg-muted">
            {entry.period}
          </span>
        ) : null}
        {entry.location ? (
          <span className="block text-[11px] leading-4 text-fg-muted">
            {entry.location}
          </span>
        ) : null}
        {entry.kind === "project" ? (
          <span className="mt-1.5 block text-[11px] leading-4 break-words text-fg-muted">
            {entry.summary}
          </span>
        ) : null}
        {entry.highlights ? (
          <span className="mt-1.5 block text-[11px] leading-4 text-fg-secondary">
            {entry.highlights.map((highlight) => (
              <span key={highlight} className="block">
                {highlight}
              </span>
            ))}
          </span>
        ) : null}
        {entry.technologies ? (
          <span className="mt-1 block text-[11px] leading-4 break-words text-fg-muted">
            {entry.technologies.join(" · ")}
          </span>
        ) : null}
        {entry.metric ? (
          <span className="mt-1 block text-[11px] leading-4 text-fg-secondary">
            <span className="sr-only">{accessibleMetricValue(entry.metric)}</span>
            <span aria-hidden="true">{entry.metric}</span>
          </span>
        ) : null}
        {file ? <FilePathRow file={file} /> : null}
      </button>
    </li>
  )
}

function FilePathRow({
  file,
}: {
  file: NonNullable<ReturnType<typeof findFileById>>
}) {
  const pathLabel = openedFileLabel(file)

  return (
    <span className="mt-2 flex min-w-0 items-center gap-1 text-fg-muted ui-transition group-hover:text-fg-secondary">
      <FileIcon extension={file.extension} size={12} className="shrink-0" />
      <span className="min-w-0 truncate font-mono text-[11px]" title={pathLabel}>
        {pathLabel}
      </span>
    </span>
  )
}
