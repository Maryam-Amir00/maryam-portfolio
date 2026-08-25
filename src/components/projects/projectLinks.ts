import {
  resolveProjectLinks,
  type PortfolioProject,
} from "../../data/projectsData"
import {
  extractYouTubeVideoId,
  isSafeHttpUrl,
} from "../../utils/externalLinks"

export type SafeProjectLinks = {
  live?: string
  github?: string
  youtube?: string
  videoId?: string
}

export function getSafeProjectLinks(project: PortfolioProject): SafeProjectLinks {
  const raw = resolveProjectLinks(project)
  const live = sanitize(raw.live)
  const github = sanitize(raw.github)
  const youtube = sanitize(raw.youtube)

  return {
    live,
    github,
    youtube,
    videoId: youtube ? extractYouTubeVideoId(youtube) : undefined,
  }
}

function sanitize(value: string | undefined) {
  if (!isSafeHttpUrl(value)) {
    return undefined
  }

  return value.trim()
}
