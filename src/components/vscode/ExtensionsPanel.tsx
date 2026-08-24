import { ChevronRight, Info, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { FILE_SKILLS, findFileById, openedFileLabel } from "../../data/portfolioFiles"
import {
  filterToolboxCategories,
  toolboxCategories,
  WORKSPACE_TOOLBOX_INPUT_ID,
  type ToolboxCategory,
  type ToolboxEntry,
} from "../../data/toolboxMeta"
import { useWorkspace } from "../../hooks/useWorkspace"
import { SidebarPanel } from "./SidebarPanel"

export function ExtensionsPanel() {
  const { extensionsVisible, openFile } = useWorkspace()
  const [query, setQuery] = useState("")
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(() => new Set())
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (extensionsVisible) {
      inputRef.current?.focus()
    }
  }, [extensionsVisible])

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
        <div className="shrink-0 border-b border-subtle px-3 pb-3">
          <h2 className="text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase">
            Developer Toolbox
          </h2>
          <p className="mt-1.5 flex gap-1.5 text-[11px] leading-4 text-fg-muted">
            <Info
              size={12}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <span>Portfolio technologies, not marketplace extensions.</span>
          </p>
          <div className="relative mt-2.5">
            <input
              ref={inputRef}
              id={WORKSPACE_TOOLBOX_INPUT_ID}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Filter developer technologies"
              placeholder="Filter technologies"
              autoComplete="off"
              spellCheck={false}
              autoCapitalize="none"
              className="h-10 w-full rounded-[4px] border border-subtle bg-app px-2 pr-11 text-base text-fg caret-accent ui-transition placeholder:text-fg-muted md:h-8 md:pr-7 md:text-[12px]"
            />
            {query.length > 0 ? (
              <button
                type="button"
                aria-label="Clear technology filter"
                onClick={clearFilter}
                className="absolute top-1/2 right-0.5 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-sm text-fg-muted ui-transition hover:text-fg md:right-1 md:size-auto md:p-0.5"
              >
                <X size={12} strokeWidth={1.75} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          {isFiltering && matchCount > 0 ? (
            <p className="mt-2 text-[11px] text-fg-muted">
              {matchCount} technolog{matchCount === 1 ? "y" : "ies"}
            </p>
          ) : null}
        </div>
        <div className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-3">
          {isFiltering && matchCount === 0 ? (
            <div className="px-3 pt-4">
              <p className="text-[12px] text-fg-secondary">
                No matching technologies.
              </p>
              <p className="mt-2 text-[11px] leading-4 text-fg-muted">
                Try React, Django, API, or deployment.
              </p>
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
            className="flex w-full items-center gap-1 px-3 py-2.5 text-left text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase ui-transition hover:text-fg-secondary md:py-1"
          >
            <ChevronRight
              size={12}
              strokeWidth={1.75}
              aria-hidden="true"
              className={[
                "ui-transition-transform",
                expanded ? "rotate-90" : "",
              ].join(" ")}
            />
            <span className="min-w-0 flex-1 truncate">{category.heading}</span>
            <span className="shrink-0 font-normal tracking-normal text-fg-muted">
              {category.entries.length}
            </span>
          </button>
        ) : (
          <span className="flex items-center gap-1 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-fg-muted uppercase">
            <ChevronRight
              size={12}
              strokeWidth={1.75}
              aria-hidden="true"
              className="rotate-90"
            />
            <span className="min-w-0 flex-1 truncate">{category.heading}</span>
            <span className="shrink-0 font-normal tracking-normal text-fg-muted">
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

  return (
    <div
      className={[
        "relative border-b border-subtle px-3 py-3 ui-transition hover:bg-hover/50 md:py-2",
        entry.isCore ? "pl-[13px]" : "",
      ].join(" ")}
    >
      {entry.isCore ? (
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-accent"
        />
      ) : null}
      <div className="flex min-w-0 items-start gap-2">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] border border-subtle bg-app font-mono text-[9px] tracking-wide text-fg-secondary"
        >
          {entry.marker}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-1.5">
            <p
              className={[
                "min-w-0 text-[12px] leading-4 break-words",
                entry.isCore ? "text-fg" : "text-fg-secondary",
              ].join(" ")}
            >
              {entry.name}
            </p>
            {entry.isCore ? (
              <span className="mt-px shrink-0 font-mono text-[9px] tracking-[0.12em] text-accent uppercase">
                Core
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-[11px] leading-4 break-words text-fg-muted">
            {entry.description}
          </p>
          <button
            type="button"
            onClick={() => {
              onOpenFile(FILE_SKILLS)
            }}
            aria-label="Open skills.json"
            className="mt-1.5 inline-flex min-h-11 items-center font-mono text-[11px] text-fg-muted ui-transition hover:text-fg md:min-h-0"
          >
            skills.json
          </button>
          {evidenceFiles.length > 0 ? (
            <div className="mt-1.5">
              <p className="text-[10px] tracking-[0.08em] text-fg-muted uppercase">
                Used in
              </p>
              <ul className="mt-0.5 flex flex-col items-start gap-0.5">
                {evidenceFiles.map((file) => (
                  <li key={file.id}>
                    <button
                      type="button"
                      title={openedFileLabel(file)}
                      aria-label={`Open ${file.title ?? file.name} showing ${entry.name} usage`}
                      onClick={() => {
                        onOpenFile(file.id)
                      }}
                      className="inline-flex max-w-full min-h-11 items-center truncate font-mono text-[11px] text-fg-muted ui-transition hover:text-fg md:min-h-0"
                    >
                      {file.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
