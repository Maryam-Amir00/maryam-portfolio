import { ChevronRight, Search, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { MOBILE_MEDIA_QUERY } from "../../config/breakpoints"
import { portfolioSearchIndex } from "../../data/portfolioSearchIndex"
import { useMediaQuery } from "../../hooks/useMediaQuery"
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

const QUICK_SEARCHES = [
  "React",
  "JavaScript",
  "Django",
  "PostgreSQL",
  "Authentication",
  "Projects",
] as const

export function SearchPanel() {
  const { searchVisible, openFile } = useWorkspace()
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchVisible && !isMobile) {
      inputRef.current?.focus()
    }
  }, [isMobile, searchVisible])

  const normalizedQuery = normalizeSearchQuery(query)
  const tokens = normalizedQuery ? normalizedQuery.split(" ") : []
  const results = useMemo(
    () => (normalizedQuery ? searchPortfolio(portfolioSearchIndex, query) : []),
    [normalizedQuery, query],
  )
  const groups = useMemo(() => groupSearchResultsByFile(results), [results])

  function clearSearch() {
    setQuery("")
    inputRef.current?.focus()
  }

  function applyQuickSearch(term: string) {
    setQuery(term)
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
        <div className="shrink-0 px-3 pb-2 xl:px-4">
          <div
            data-workspace-search=""
            className="relative flex items-center rounded-[4px] border border-subtle bg-app shadow-none"
          >
            <Search
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute left-2 shrink-0 text-fg-muted"
            />
            <input
              ref={inputRef}
              id={WORKSPACE_SEARCH_INPUT_ID}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search portfolio"
              placeholder="Search portfolio"
              autoComplete="off"
              spellCheck={false}
              autoCapitalize="none"
              className="h-10 min-w-0 w-full rounded-[4px] border-0 bg-transparent py-0 pr-10 pl-7 text-base text-fg shadow-none outline-none ring-0 caret-accent placeholder:text-fg-muted focus-visible:outline-none md:h-8 md:pr-7 md:text-[12px]"
            />
            {query.length > 0 ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={clearSearch}
                className="absolute top-1/2 right-0.5 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-sm text-fg-muted hover:text-fg focus-visible:text-fg md:right-0.5 md:size-auto md:p-0.5"
              >
                <X size={12} strokeWidth={1.75} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
        {normalizedQuery && results.length > 0 ? (
          <p
            className="shrink-0 px-3 pb-2 text-[11px] text-fg-muted xl:px-4"
            aria-live="polite"
          >
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
        ) : null}
        <div className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-4">
          {!normalizedQuery ? (
            <QuickSearches onSelect={applyQuickSearch} />
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

function QuickSearches({ onSelect }: { onSelect: (term: string) => void }) {
  return (
    <div className="pt-1">
      <p className="px-3 text-[11px] tracking-[0.14em] text-fg-muted uppercase xl:px-4">
        Quick Searches
      </p>
      <ul className="mt-1">
        {QUICK_SEARCHES.map((term) => (
          <li key={term}>
            <button
              type="button"
              data-workspace-search-row=""
              onClick={() => onSelect(term)}
              aria-label={`Search for ${term}`}
              className="group flex h-11 w-full cursor-pointer items-center gap-1.5 px-3 text-left text-[12px] text-fg-muted ui-transition hover:bg-hover hover:text-fg focus-visible:bg-hover focus-visible:text-fg md:h-8 xl:px-4"
            >
              <ChevronRight
                size={12}
                strokeWidth={1.75}
                aria-hidden="true"
                className="shrink-0 text-fg-muted ui-transition group-hover:text-fg group-focus-visible:text-fg"
              />
              <span>{term}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="px-3 py-2 xl:px-4" role="status" aria-live="polite">
      <p className="text-[12px] break-words text-fg">
        No results for &quot;{query}&quot;
      </p>
      <p className="mt-1 text-[12px] text-fg-muted">Try another term.</p>
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
      <h2 className="flex items-center gap-1.5 px-3 py-1 xl:px-4">
        <FileIcon extension={group.extension} size={13} />
        <span className="min-w-0 truncate font-mono text-[11px] text-fg-secondary">
          {group.fileName}
        </span>
      </h2>
      <ul>
        {group.results.map((result) => {
          const heading =
            result.entry.title !== result.entry.section
              ? result.entry.title
              : result.entry.section

          return (
            <li key={result.entry.id}>
              <button
                type="button"
                data-workspace-search-row=""
                onClick={() => onOpen(result.entry.fileId)}
                aria-label={`Open ${result.entry.fileName}: ${heading}`}
                className="group relative w-full min-h-11 cursor-pointer px-3 py-2.5 text-left ui-transition hover:bg-hover focus-visible:bg-hover md:min-h-0 md:py-1.5 xl:px-4"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 bg-accent opacity-0 group-focus-visible:opacity-100"
                />
                <span className="block text-[12px] break-words text-fg group-hover:text-fg group-focus-visible:text-fg">
                  {highlightSearchText(heading, tokens)}
                </span>
                <span className="mt-0.5 line-clamp-2 block text-[11px] leading-4 break-words text-fg-muted group-hover:text-fg-secondary group-focus-visible:text-fg-secondary">
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
