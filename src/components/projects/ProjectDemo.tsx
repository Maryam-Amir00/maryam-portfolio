import { ExternalLink } from "lucide-react"
import { ProjectSectionHeading } from "./ProjectSectionHeading"
import { STUDYSYNC_DEMO_SECTION_ID } from "./ProjectExternalActions"

export function ProjectDemo({
  intro,
  youtubeUrl,
  videoId,
  iframeTitle = "StudySync project demo",
  sectionId = STUDYSYNC_DEMO_SECTION_ID,
  maxWidthClass = "max-w-[56rem]",
  headingProminence = "strong",
}: {
  intro: string
  youtubeUrl: string
  videoId?: string
  iframeTitle?: string
  sectionId?: string
  maxWidthClass?: string
  headingProminence?: "default" | "strong"
}) {
  return (
    <section
      id={sectionId}
      tabIndex={-1}
      className="mt-10 scroll-mt-4 outline-none md:mt-12"
    >
      <ProjectSectionHeading comment="project demo" prominence={headingProminence}>
        Project Demo
      </ProjectSectionHeading>
      <p className="max-w-[46rem] text-[14px] leading-6 text-fg-secondary">
        {intro}
      </p>
      {videoId ? (
        <div
          className={`mt-5 w-full overflow-hidden border border-subtle bg-tab ${maxWidthClass}`}
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={iframeTitle}
              loading="lazy"
              allow="encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      ) : null}
      <p className="mt-3">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 text-[13px] text-fg-secondary ui-transition hover:text-fg md:min-h-0"
        >
          Watch on YouTube
          <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </p>
    </section>
  )
}
