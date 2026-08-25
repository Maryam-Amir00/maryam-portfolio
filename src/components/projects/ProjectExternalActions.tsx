import { ExternalLink, PlayCircle } from "lucide-react"
import { scrollEditorSection } from "../../utils/scrollEditorSection"
import { getSafeProjectLinks } from "./projectLinks"
import type { PortfolioProject } from "../../data/projectsData"

const actionBase =
  "group inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-[4px] px-3.5 py-1.5 text-[13px] ui-transition md:min-h-0"
const primaryAction = `${actionBase} bg-accent font-medium text-app hover:bg-accent/90 active:bg-accent/80`
const secondaryAction = `${actionBase} border border-subtle bg-tab text-fg-secondary hover:border-fg-muted hover:bg-hover hover:text-fg active:bg-hover`

export const STUDYSYNC_DEMO_SECTION_ID = "studysync-project-demo"
export const MOVIXXX_DEMO_SECTION_ID = "movixxx-project-demo"
export const STYLIQUE_DEMO_SECTION_ID = "stylique-project-demo"

export function ProjectExternalActions({
  project,
  demoSectionId = STUDYSYNC_DEMO_SECTION_ID,
}: {
  project: PortfolioProject
  demoSectionId?: string
}) {
  const links = getSafeProjectLinks(project)

  if (!links.live && !links.github && !links.youtube) {
    return null
  }

  return (
    <div className="flex flex-col items-stretch gap-2.5 min-[430px]:flex-row min-[430px]:flex-wrap min-[430px]:items-center">
      {links.live ? (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          className={primaryAction}
        >
          <ExternalLink
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="motion-nudge-x"
          />
          View Live
        </a>
      ) : null}
      {links.github ? (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryAction}
        >
          <GitHubMark />
          GitHub
        </a>
      ) : null}
      {links.youtube ? (
        links.videoId ? (
          <button
            type="button"
            className={secondaryAction}
            onClick={() => {
              scrollEditorSection(demoSectionId)
            }}
          >
            <PlayCircle
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="motion-nudge-x"
            />
            Watch Demo
          </button>
        ) : (
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryAction}
          >
            <PlayCircle
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="motion-nudge-x"
            />
            Watch Demo
          </a>
        )
      ) : null}
    </div>
  )
}

function GitHubMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
      className="motion-nudge-x"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.7 7.7 0 0 1 8 4.51c.68.003 1.36.092 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}
