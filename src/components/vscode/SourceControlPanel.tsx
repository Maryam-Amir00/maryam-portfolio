import type { ReactNode } from "react"
import {
  careerMilestones,
  currentSnapshot,
  educationMilestones,
  projectSnapshots,
  type PortfolioHistoryEntry,
} from "../../data/portfolioHistory"
import { findFileById, openedFileLabel } from "../../data/portfolioFiles"
import { useWorkspace } from "../../hooks/useWorkspace"
import type { PortfolioFile } from "../../types/workspace"
import { FileIcon } from "./FileIcon"
import { SidebarPanel } from "./SidebarPanel"

const sectionHeadingClass =
  "text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase"

const milestoneTitleClass =
  "block text-[13px] leading-5 break-words text-fg group-hover:font-medium group-focus-visible:font-medium"

const supportingClass =
  "mt-0.5 block text-[12px] leading-4 break-words text-fg-secondary"

const metaClass = "block text-[11px] leading-4 break-words text-fg-muted"

export function SourceControlPanel() {
  const { sourceControlVisible, openFile, activeFileId } = useWorkspace()

  if (!sourceControlVisible) {
    return null
  }

  const snapshotFile = findFileById(currentSnapshot.relatedFileId)
  const snapshotActive = activeFileId === currentSnapshot.relatedFileId

  return (
    <SidebarPanel
      label="Source Control portfolio history"
      header="Source Control"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <PortfolioHistoryNotice />
        <div className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-6">
          <section
            className="px-3 pt-3 xl:px-4"
            aria-labelledby="source-control-current-snapshot"
          >
            <h3
              id="source-control-current-snapshot"
              className={sectionHeadingClass}
            >
              Current Snapshot
            </h3>
            {snapshotFile ? (
              <MilestoneButton
                file={snapshotFile}
                heading={currentSnapshot.name}
                isActive={snapshotActive}
                showConnector={false}
                onOpen={() => {
                  openFile(currentSnapshot.relatedFileId)
                }}
              >
                <span
                  className={[
                    milestoneTitleClass,
                    snapshotActive ? "font-medium" : "",
                  ].join(" ")}
                >
                  {currentSnapshot.name}
                </span>
                <span className={supportingClass}>{currentSnapshot.role}</span>
                <span className={`mt-1 ${metaClass}`}>{currentSnapshot.stack}</span>
                <span className={metaClass}>{currentSnapshot.location}</span>
              </MilestoneButton>
            ) : null}
          </section>
          <HistorySection heading="Career" entries={careerMilestones} />
          <HistorySection heading="Education" entries={educationMilestones} />
          <HistorySection heading="Project Snapshots" entries={projectSnapshots} />
        </div>
      </div>
    </SidebarPanel>
  )
}

function PortfolioHistoryNotice() {
  return (
    <div className="shrink-0 border-b border-subtle px-3 py-2 xl:px-4">
      <h2 className="text-[11px] font-medium tracking-[0.14em] text-fg-secondary uppercase">
        Portfolio History
      </h2>
    </div>
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
    <section className="px-3 pt-3 xl:px-4" aria-labelledby={headingId}>
      <h3 id={headingId} className={sectionHeadingClass}>
        {heading}
      </h3>
      <ul>
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

  if (!file) {
    return null
  }

  return (
    <li>
      <MilestoneButton
        file={file}
        heading={entry.title}
        isActive={isActive}
        showConnector={!isLast}
        onOpen={() => {
          openFile(entry.relatedFileId)
        }}
      >
        <span
          className={[milestoneTitleClass, isActive ? "font-medium" : ""].join(
            " ",
          )}
        >
          {entry.title}
        </span>
        {entry.subtitle ? (
          <span className={supportingClass}>{entry.subtitle}</span>
        ) : null}
        {entry.period ? (
          <span className={`mt-1 font-mono ${metaClass}`}>{entry.period}</span>
        ) : null}
        {entry.location ? <span className={metaClass}>{entry.location}</span> : null}
        {entry.proof ? (
          <span className={`mt-1 ${metaClass}`}>{entry.proof}</span>
        ) : null}
        {entry.technologies && entry.technologies.length > 0 ? (
          <span className={`${entry.proof ? "mt-0.5" : "mt-1"} ${metaClass}`}>
            {entry.technologies.join(" · ")}
          </span>
        ) : null}
      </MilestoneButton>
    </li>
  )
}

function MilestoneButton({
  children,
  file,
  heading,
  isActive,
  onOpen,
  showConnector,
}: {
  children: ReactNode
  file: PortfolioFile
  heading: string
  isActive: boolean
  onOpen: () => void
  showConnector: boolean
}) {
  const pathLabel = openedFileLabel(file)

  return (
    <button
      type="button"
      data-source-control-milestone=""
      onClick={onOpen}
      aria-current={isActive ? "page" : undefined}
      aria-label={`Open ${heading}, ${pathLabel}`}
      className={[
        "group relative mt-0.5 flex min-h-11 w-full cursor-pointer gap-2 py-2 pr-1.5 pl-1 text-left hover:bg-hover focus-visible:bg-hover md:min-h-0 md:py-1.5",
        isActive ? "bg-hover" : "",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-accent",
          isActive ? "opacity-100" : "opacity-0 group-focus-visible:opacity-100",
        ].join(" ")}
      />
      <span
        aria-hidden="true"
        className="flex w-2.5 shrink-0 flex-col items-center self-stretch pt-[7px] md:w-3"
      >
        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
        {showConnector ? <span className="w-px flex-1 bg-subtle" /> : null}
      </span>
      <span className="min-w-0 flex-1">
        {children}
        <span
          className={[
            "mt-1.5 flex min-w-0 items-start gap-1.5",
            isActive
              ? "text-fg"
              : "text-fg-secondary group-hover:text-fg group-focus-visible:text-fg",
          ].join(" ")}
        >
          <FileIcon
            extension={file.extension}
            size={12}
            className="mt-px shrink-0"
          />
          <span className="min-w-0 break-words font-mono text-[11px] leading-4">
            {pathLabel}
          </span>
        </span>
      </span>
    </button>
  )
}
