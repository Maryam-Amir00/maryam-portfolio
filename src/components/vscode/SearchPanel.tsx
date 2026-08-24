import { X } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { portfolioSearchIndex } from "../../data/portfolioSearchIndex"
import { useWorkspace } from "../../hooks/useWorkspace"
import type { SearchResultGroup } from "../../types/search"
import { WORKSPACE_SEARCH_INPUT_ID } from "../../types/search"
import { highlightSearchText } from "../../utils/highlightSearchText"
import { normalizeSearchQuery } from "../../utils/rankCommandActions"
import {
  groupSearchResultsByFile,
  searchPortfolio,
} from "../../utils/searchPortfolio"
import { FileIcon } from "./FileIcon"
import { SidebarPanel } from "./SidebarPanel"

const EXAMPLE_QUERIES = ["React", "Django", "Projects", "Authentication", "PostgreSQL"]

export function SearchPanel() {
  const { searchVisible, openFile } = useWorkspace()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchVisible) {
      inputRef.current?.focus()
    }
  }, [searchVisible])

  const normalizedQuery = normalizeSearchQuery(query)
  const tokens = normalizedQuery ? normalizedQuery.split(" ") : []
  const results = useMemo(
    () => (normalizedQuery ? searchPortfolio(portfolioSearchIndex, query) : []),
    [normalizedQuery, query],
  )
  const groups = useMemo(() => groupSearchResultsByFile(results), [results])
  const fileCount = groups.length

  function clearSearch() {
    setQuery("")
    inputRef.current?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && query.length > 0) {
      event.preventDefault()
      event.stopPropagation()
      clearSearch()
    }
  }

  return (
    <div className={searchVisible ? "contents" : "hidden"}>
    <SidebarPanel label="Portfolio search" header="Search">
      <div className="shrink-0 px-3 pb-2">
        <div className="relative">
          <input
            ref={inputRef}
            id={WORKSPACE_SEARCH_INPUT_ID}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search portfolio content"
            placeholder="Search portfolio"
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            className="h-10 w-full rounded-[4px] border border-subtle bg-app px-2 pr-11 text-base text-fg caret-accent ui-transition placeholder:text-fg-muted md:h-8 md:pr-7 md:text-[12px]"
          />
          {query.length > 0 ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={clearSearch}
              className="absolute top-1/2 right-0.5 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-sm text-fg-muted ui-transition hover:text-fg md:right-1 md:size-auto md:p-0.5"
            >
              <X size={12} strokeWidth={1.75} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
      {normalizedQuery ? (
        <p className="shrink-0 px-3 pb-2 text-[11px] text-fg-muted">
          {results.length === 0
            ? null
            : `${results.length} result${results.length === 1 ? "" : "s"} in ${fileCount} file${fileCount === 1 ? "" : "s"}`}
        </p>
      ) : null}
      <div className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-1 pb-3">
        {!normalizedQuery ? (
          <SearchEmptyState />
        ) : results.length === 0 ? (
          <NoResults query={query.trim()} />
        ) : (
          groups.map((group) => (
            <SearchGroup
              key={group.fileId}
              group={group}
              tokens={tokens}
              onOpen={openFile}
            />
          ))
        )}
      </div>
    </SidebarPanel>
    </div>
  )
}

function SearchEmptyState() {
  return (
    <div className="px-3 py-2">
      <p className="text-[12px] text-fg-secondary">Search portfolio content</p>
      <p className="mt-3 text-[11px] tracking-[0.12em] text-fg-muted uppercase">
        Try
      </p>
      <ul className="mt-1 text-[12px] text-fg-muted">
        {EXAMPLE_QUERIES.map((example) => (
          <li key={example}>{example}</li>
        ))}
      </ul>
    </div>
  )
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="px-3 py-2">
      <p className="text-[12px] break-words text-fg">
        No results found for &quot;{query}&quot;.
      </p>
      <p className="mt-2 text-[12px] text-fg-muted">
        Try a technology, project, or experience keyword.
      </p>
    </div>
  )
}

function SearchGroup({
  group,
  onOpen,
  tokens,
}: {
  group: SearchResultGroup
  onOpen: (fileId: string) => void
  tokens: readonly string[]
}) {
  return (
    <section className="mb-2">
      <h2 className="flex items-center gap-1.5 px-2 py-1.5">
        <FileIcon extension={group.extension} size={13} />
        <span className="min-w-0 truncate text-[12px] text-fg">{group.fileName}</span>
        <span className="ml-auto shrink-0 text-[11px] text-fg-muted">
          {group.results.length} {group.results.length === 1 ? "result" : "results"}
        </span>
      </h2>
      <ul>
        {group.results.map((result) => {
          const heading =
            result.entry.title !== result.entry.section
              ? result.entry.title
              : result.entry.section
          const context =
            result.entry.title !== result.entry.section
              ? result.entry.section
              : null

          return (
            <li key={result.entry.id}>
              <button
                type="button"
                onClick={() => onOpen(result.entry.fileId)}
                aria-label={`Open ${result.entry.fileName}: ${heading}`}
                className="w-full min-h-11 rounded-[4px] px-2 py-2.5 text-left ui-transition hover:bg-hover md:min-h-0 md:py-1.5"
              >
                {context ? (
                  <span className="block text-[10px] tracking-[0.08em] text-fg-muted uppercase">
                    {highlightSearchText(context, tokens)}
                  </span>
                ) : null}
                <span className="block text-[12px] break-words text-fg">
                  {highlightSearchText(heading, tokens)}
                </span>
                <span className="mt-0.5 line-clamp-3 block text-[11px] leading-4 break-words text-fg-secondary">
                  {highlightSearchText(result.entry.text, tokens)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
