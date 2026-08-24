import type {
  PortfolioSearchResult,
  SearchEntry,
  SearchResultGroup,
} from "../types/search"
import { findFileById } from "../data/portfolioFiles"
import { normalizeSearchQuery } from "./rankCommandActions"

const RESULT_LIMIT = 25

function combinedText(entry: SearchEntry) {
  return [entry.title, entry.section, entry.text, ...entry.keywords]
    .join(" ")
    .toLowerCase()
}

function tokenScore(token: string, entry: SearchEntry) {
  const title = entry.title.toLowerCase()
  const section = entry.section.toLowerCase()
  const text = entry.text.toLowerCase()
  const keywords = entry.keywords.map((keyword) => keyword.toLowerCase())
  const titleWords = title.split(/[^a-z0-9+%]+/).filter(Boolean)
  const sectionWords = section.split(/[^a-z0-9+%]+/).filter(Boolean)

  if (title === token || section === token) {
    return 100
  }

  if (title.startsWith(token) || section.startsWith(token)) {
    return 90
  }

  if (
    titleWords.some((word) => word === token || word.startsWith(token)) ||
    sectionWords.some((word) => word === token || word.startsWith(token))
  ) {
    return 80
  }

  if (text.includes(token)) {
    return 60
  }

  if (keywords.some((keyword) => keyword === token)) {
    return 50
  }

  if (keywords.some((keyword) => keyword.startsWith(token) || keyword.includes(token))) {
    return 40
  }

  if (combinedText(entry).includes(token)) {
    return 30
  }

  return null
}

export function searchPortfolio(
  entries: readonly SearchEntry[],
  query: string,
): PortfolioSearchResult[] {
  const normalized = normalizeSearchQuery(query)

  if (!normalized) {
    return []
  }

  const tokens = normalized.split(" ")
  const scored: PortfolioSearchResult[] = []

  for (const entry of entries) {
    const title = entry.title.toLowerCase()
    let score = 0

    if (title === normalized || entry.section.toLowerCase() === normalized) {
      score = 1000
    } else if (title.startsWith(normalized)) {
      score = 900
    } else {
      let matched = true

      for (const token of tokens) {
        const tokenMatch = tokenScore(token, entry)

        if (tokenMatch === null) {
          matched = false
          break
        }

        score += tokenMatch
      }

      if (!matched) {
        continue
      }
    }

    scored.push({ entry, score })
  }

  scored.sort((left, right) => right.score - left.score || left.entry.id.localeCompare(right.entry.id))

  return limitResultsPerFile(scored, 3).slice(0, RESULT_LIMIT)
}

function limitResultsPerFile(
  results: readonly PortfolioSearchResult[],
  maxPerFile: number,
) {
  const counts = new Map<string, number>()
  const limited: PortfolioSearchResult[] = []

  for (const result of results) {
    const count = counts.get(result.entry.fileId) ?? 0

    if (count >= maxPerFile) {
      continue
    }

    counts.set(result.entry.fileId, count + 1)
    limited.push(result)
  }

  return limited
}

export function groupSearchResultsByFile(
  results: readonly PortfolioSearchResult[],
): SearchResultGroup[] {
  const groups: SearchResultGroup[] = []
  const indexByFile = new Map<string, number>()

  for (const result of results) {
    const existingIndex = indexByFile.get(result.entry.fileId)

    if (existingIndex !== undefined) {
      const group = groups[existingIndex]
      if (group) {
        group.results.push(result)
      }
      continue
    }

    const file = findFileById(result.entry.fileId)

    indexByFile.set(result.entry.fileId, groups.length)
    groups.push({
      fileId: result.entry.fileId,
      fileName: result.entry.fileName,
      path: result.entry.path,
      extension: file?.extension ?? "",
      bestScore: result.score,
      results: [result],
    })
  }

  return groups
}
