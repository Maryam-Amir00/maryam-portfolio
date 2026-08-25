import { ChevronRight, Search, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { MOBILE_MEDIA_QUERY } from "../../config/breakpoints"
import {
  FILE_SKILLS,
  findFileById,
  openedFileLabel,
} from "../../data/portfolioFiles"
import {
  filterToolboxCategories,
  toolboxCategories,
  WORKSPACE_TOOLBOX_INPUT_ID,
  type ToolboxCategory,
  type ToolboxEntry,
} from "../../data/toolboxMeta"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useWorkspace } from "../../hooks/useWorkspace"
import { FileIcon } from "./FileIcon"
import { SidebarPanel } from "./SidebarPanel"

const VISIBLE_EVIDENCE = 3

export function ExtensionsPanel() {
  const { extensionsVisible, openFile } = useWorkspace()
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
  const [query, setQuery] = useState("")
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(() => new Set())
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (extensionsVisible && !isMobile) {
      inputRef.current?.focus()
    }
  }, [extensionsVisible, isMobile])

  const isFiltering = query.trim().length > 0
  const categories = useMemo(
    () => (isFiltering ? filterToolboxCategories(query) : toolboxCategories),
    [isFiltering, query],
  )
  const matchCount = categories.reduce(
    (total, category) => total + category.entries.length,
    0,
  )

  function clearFilter() {
    setQuery("")
    inputRef.current?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && query.length > 0) {
      event.preventDefault()
      event.stopPropagation()
      clearFilter()
    }
  }

  function toggleCategory(categoryId: string) {
    setCollapsedIds((current) => {
      const next = new Set(current)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  return (
    <div className={extensionsVisible ? "contents" : "hidden"}>
      <SidebarPanel label="Developer toolbox" header="Extensions">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="shrink-0 px-3 pb-2 xl:px-4">
            <h2 className="pb-2 text-[11px] font-medium tracking-[0.14em] text-fg-secondary uppercase">
              Developer Toolbox
            </h2>
            <div
              data-workspace-toolbox=""
              className="relative flex items-center rounded-[4px] border border-subtle bg-app shadow-none"
            >
              <Search
                size={14}
                strokeWidth={1.75}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 shrink-0 text-fg-muted"
              />
              <input
                ref={inputRef}
                id={WORKSPACE_TOOLBOX_INPUT_ID}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Filter technologies"
                placeholder="Filter technologies"
                autoComplete="off"
                spellCheck={false}
                autoCapitalize="none"
                className="h-10 min-w-0 w-full rounded-[4px] border-0 bg-transparent py-0 pr-10 pl-7 text-base text-fg shadow-none outline-none ring-0 caret-accent placeholder:text-fg-muted focus-visible:outline-none md:h-8 md:pr-7 md:text-[12px]"
              />
              {query.length > 0 ? (
                <button
                  type="button"
                  aria-label="Clear technology filter"
                  onClick={clearFilter}
                  className="absolute top-1/2 right-0.5 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-sm text-fg-muted hover:text-fg focus-visible:text-fg md:right-0.5 md:size-auto md:p-0.5"
                >
                  <X size={12} strokeWidth={1.75} aria-hidden="true" />
                </button>
              ) : null}
            </div>
            {isFiltering && matchCount > 0 ? (
              <p className="pt-2 text-[11px] text-fg-muted" aria-live="polite">
                {matchCount} technolog{matchCount === 1 ? "y" : "ies"}
              </p>
            ) : null}
          </div>
          <div className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-6">
            {isFiltering && matchCount === 0 ? (
              <div className="px-3 py-2 xl:px-4" role="status" aria-live="polite">
                <p className="text-[12px] break-words text-fg">
                  No technologies found for &quot;{query.trim()}&quot;
                </p>
                <p className="mt-1 text-[12px] text-fg-muted">Try another term.</p>
              </div>
            ) : (
              categories.map((category) => (
                <ToolboxCategoryGroup
                  key={category.id}
                  category={category}
                  expanded={isFiltering || !collapsedIds.has(category.id)}
                  collapsible={!isFiltering}
                  onToggle={() => {
                    toggleCategory(category.id)
                  }}
                  onOpenFile={openFile}
                />
              ))
            )}
          </div>
        </div>
      </SidebarPanel>
    </div>
  )
}

function ToolboxCategoryGroup({
  category,
  expanded,
  collapsible,
  onToggle,
  onOpenFile,
}: {
  category: ToolboxCategory
  expanded: boolean
  collapsible: boolean
  onToggle: () => void
  onOpenFile: (fileId: string) => void
}) {
  const headingId = `toolbox-${category.id}`
  const headingClass =
    "flex min-h-11 w-full items-center gap-1 px-3 py-1 text-left font-mono text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase md:min-h-0 xl:px-4"

  return (
    <section className="pt-2" aria-labelledby={headingId}>
      <h3 id={headingId} className="m-0">
        {collapsible ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={`toolbox-category-${category.id}`}
            aria-label={`${category.heading} technologies`}
            onClick={onToggle}
            className={`${headingClass} hover:text-fg-secondary focus-visible:bg-hover focus-visible:text-fg-secondary focus-visible:outline-none`}
            data-workspace-toolbox-section=""
          >
            <ChevronRight
              size={12}
              strokeWidth={1.75}
              aria-hidden="true"
              className={expanded ? "rotate-90" : ""}
            />
            <span className="min-w-0 flex-1 truncate">{category.heading}</span>
            <span className="shrink-0 font-normal tracking-normal tabular-nums text-fg-muted">
              {category.entries.length}
            </span>
          </button>
        ) : (
          <span className={headingClass}>
            <ChevronRight
              size={12}
              strokeWidth={1.75}
              aria-hidden="true"
              className="rotate-90"
            />
            <span className="min-w-0 flex-1 truncate">{category.heading}</span>
            <span className="shrink-0 font-normal tracking-normal tabular-nums text-fg-muted">
              {category.entries.length}
            </span>
          </span>
        )}
      </h3>
      <ul
        id={`toolbox-category-${category.id}`}
        hidden={!expanded}
        className={expanded ? undefined : "hidden"}
      >
        {category.entries.map((entry) => (
          <li key={entry.id}>
            <ToolboxTechnology entry={entry} onOpenFile={onOpenFile} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ToolboxTechnology({
  entry,
  onOpenFile,
}: {
  entry: ToolboxEntry
  onOpenFile: (fileId: string) => void
}) {
  const evidenceFiles = entry.evidenceFileIds.flatMap((fileId) => {
    const file = findFileById(fileId)
    return file ? [file] : []
  })
  const visibleEvidence = evidenceFiles.slice(0, VISIBLE_EVIDENCE)
  const hiddenCount = evidenceFiles.length - visibleEvidence.length

  return (
    <div className="group border-b border-subtle/80 px-3 py-1.5 ui-transition hover:bg-hover md:py-1 xl:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center rounded-[4px] border border-subtle bg-app font-mono text-[9px] leading-none tracking-wide text-fg-secondary"
        >
          {entry.marker}
        </span>
        <p className="min-w-0 flex-1 text-[12px] leading-4 break-words text-fg">
          {entry.name}
        </p>
        {entry.isCore ? (
          <span className="shrink-0 self-center font-mono text-[9px] leading-none tracking-[0.12em] text-accent uppercase">
            Core
          </span>
        ) : null}
      </div>
      <div className="min-w-0 pl-8">
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 break-words text-fg-muted group-hover:text-fg-secondary">
          {entry.description}
        </p>
        <button
          type="button"
          data-workspace-toolbox-link=""
          onClick={() => {
            onOpenFile(FILE_SKILLS)
          }}
          aria-label="Open skills.json"
          className="mt-0.5 inline-flex min-h-8 cursor-pointer items-center gap-1 bg-transparent p-0 font-mono text-[11px] leading-4 text-fg-muted hover:text-fg focus-visible:text-fg md:min-h-0"
        >
          <FileIcon
            extension="json"
            size={12}
            className="shrink-0 opacity-70"
          />
          skills.json
        </button>
        {visibleEvidence.length > 0 ? (
          <p className="mt-0.5 text-[11px] leading-4 break-words text-fg-secondary">
            <span>Used in </span>
            {visibleEvidence.map((file, index) => (
              <span key={file.id}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                <button
                  type="button"
                  data-workspace-toolbox-link=""
                  title={openedFileLabel(file)}
                  aria-label={`Open ${openedFileLabel(file)}`}
                  onClick={() => {
                    onOpenFile(file.id)
                  }}
                  className="inline min-h-8 cursor-pointer bg-transparent p-0 font-mono text-[11px] leading-4 text-fg-secondary hover:text-fg focus-visible:text-fg md:min-h-0"
                >
                  {file.name}
                </button>
              </span>
            ))}
            {hiddenCount > 0 ? (
              <span className="text-fg-muted">{` +${hiddenCount} more`}</span>
            ) : null}
          </p>
        ) : null}
      </div>
    </div>
  )
}
