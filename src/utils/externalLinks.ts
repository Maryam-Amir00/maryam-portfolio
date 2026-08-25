const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
])

const YOUTUBE_VIDEO_ID = /^[\w-]{11}$/
const YOUTUBE_PATH_PREFIXES = new Set(["embed", "shorts", "live", "v"])

export function isSafeHttpUrl(value: string | undefined): value is string {
  if (!value) {
    return false
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return false
  }

  try {
    const url = new URL(trimmed)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function isSafeHttpsUrl(value: string | undefined): value is string {
  if (!isSafeHttpUrl(value)) {
    return false
  }

  try {
    return new URL(value.trim()).protocol === "https:"
  } catch {
    return false
  }
}

export function extractYouTubeVideoId(value: string): string | undefined {
  if (!isSafeHttpUrl(value)) {
    return undefined
  }

  try {
    const url = new URL(value.trim())
    const host = url.hostname.toLowerCase()

    if (!YOUTUBE_HOSTS.has(host)) {
      return undefined
    }

    if (host === "youtu.be" || host === "www.youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0]
      return asYouTubeVideoId(id)
    }

    const fromQuery = url.searchParams.get("v")
    const queryId = asYouTubeVideoId(fromQuery)
    if (queryId) {
      return queryId
    }

    const parts = url.pathname.split("/").filter(Boolean)
    if (parts.length >= 2 && YOUTUBE_PATH_PREFIXES.has(parts[0] ?? "")) {
      return asYouTubeVideoId(parts[1])
    }

    return undefined
  } catch {
    return undefined
  }
}

function asYouTubeVideoId(value: string | undefined | null) {
  if (!value) {
    return undefined
  }

  return YOUTUBE_VIDEO_ID.test(value) ? value : undefined
}
