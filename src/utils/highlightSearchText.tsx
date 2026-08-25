import type { ReactNode } from "react"

function mergeRanges(ranges: { start: number; end: number }[]) {
  if (ranges.length === 0) {
    return []
  }

  const sorted = [...ranges].sort((left, right) => left.start - right.start)
  const merged = [sorted[0]]

  for (const range of sorted.slice(1)) {
    const last = merged[merged.length - 1]
    if (!last || !range) {
      continue
    }

    if (range.start <= last.end) {
      last.end = Math.max(last.end, range.end)
    } else {
      merged.push({ ...range })
    }
  }

  return merged
}

export function highlightSearchText(
  text: string,
  tokens: readonly string[],
): ReactNode {
  const meaningful = tokens.filter((token) => token.length > 0)

  if (meaningful.length === 0) {
    return text
  }

  const lower = text.toLowerCase()
  const ranges: { start: number; end: number }[] = []

  for (const token of meaningful) {
    let from = 0

    while (from < lower.length) {
      const index = lower.indexOf(token, from)
      if (index === -1) {
        break
      }

      ranges.push({ start: index, end: index + token.length })
      from = index + token.length
    }
  }

  const merged = mergeRanges(ranges)

  if (merged.length === 0) {
    return text
  }

  const parts: ReactNode[] = []
  let cursor = 0

  for (const range of merged) {
    if (range.start > cursor) {
      parts.push(text.slice(cursor, range.start))
    }

    parts.push(
      <mark
        key={`${range.start}-${range.end}`}
        className="bg-transparent font-medium text-accent/90"
      >
        {text.slice(range.start, range.end)}
      </mark>,
    )
    cursor = range.end
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor))
  }

  return parts
}
