export const WORKSPACE_SEARCH_INPUT_ID = "workspace-search-input"

export type SearchEntryKind =
  | "identity"
  | "about"
  | "experience"
  | "skill"
  | "project"
  | "contact"
  | "resume"

export type SearchEntry = {
  id: string
  fileId: string
  fileName: string
  path: string
  section: string
  title: string
  text: string
  keywords: readonly string[]
  kind: SearchEntryKind
}

export type PortfolioSearchResult = {
  entry: SearchEntry
  score: number
}

export type SearchResultGroup = {
  fileId: string
  fileName: string
  path: string
  extension: string
  bestScore: number
  results: PortfolioSearchResult[]
}
