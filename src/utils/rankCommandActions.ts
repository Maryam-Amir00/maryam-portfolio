import type { CommandPaletteAction } from "../types/commandPalette"

export function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase().replace(/\s+/g, " ")
}

function sequentialMatch(query: string, text: string) {
  if (query.length < 3) {
    return false
  }

  let index = 0

  for (const character of text) {
    if (character === query[index]) {
      index += 1
      if (index === query.length) {
        return true
      }
    }
  }

  return false
}

function tokenScore(token: string, action: CommandPaletteAction) {
  const label = action.label.toLowerCase()
  const description = (action.description ?? "").toLowerCase()
  const keywords = action.keywords.map((keyword) => keyword.toLowerCase())
  const words = label.split(/\s+/)

  if (label === token) {
    return 100
  }

  if (label.startsWith(token)) {
    return 90
  }

  if (words.some((word) => word === token || word.startsWith(token))) {
    return 80
  }

  if (description === token || description.startsWith(token)) {
    return 75
  }

  if (label.includes(token)) {
    return 60
  }

  if (description.includes(token)) {
    return 55
  }

  if (keywords.some((keyword) => keyword === token)) {
    return 50
  }

  if (keywords.some((keyword) => keyword.startsWith(token) || keyword.includes(token))) {
    return 40
  }

  if (sequentialMatch(token, label)) {
    return 20
  }

  return null
}

export function rankCommandActions(
  actions: readonly CommandPaletteAction[],
  query: string,
) {
  const normalized = normalizeSearchQuery(query)

  if (!normalized) {
    return [...actions]
  }

  const tokens = normalized.split(" ")
  const scored: { action: CommandPaletteAction; score: number; index: number }[] =
    []

  for (const [index, action] of actions.entries()) {
    const label = action.label.toLowerCase()
    let score = 0

    if (label === normalized) {
      score = 1000
    } else if (label.startsWith(normalized)) {
      score = 900
    } else {
      let matched = true

      for (const token of tokens) {
        const tokenMatch = tokenScore(token, action)

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

    scored.push({ action, score, index })
  }

  scored.sort((left, right) => right.score - left.score || left.index - right.index)

  return scored.map((entry) => entry.action)
}
