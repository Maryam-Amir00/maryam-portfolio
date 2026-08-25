import { ExternalLink, Play } from "lucide-react"
import { useState } from "react"
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
        <DemoPlayer
          videoId={videoId}
          iframeTitle={iframeTitle}
          maxWidthClass={maxWidthClass}
        />
      ) : null}
      <p className="mt-3">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-1.5 text-[13px] text-fg-secondary ui-transition hover:text-fg md:min-h-0"
        >
          Watch on YouTube
          <ExternalLink
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="motion-nudge-x"
          />
        </a>
      </p>
    </section>
  )
}

function DemoPlayer({
  videoId,
  iframeTitle,
  maxWidthClass,
}: {
  videoId: string
  iframeTitle: string
  maxWidthClass: string
}) {
  const [playing, setPlaying] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)

  return (
    <div
      className={`mt-5 w-full overflow-hidden border border-subtle bg-tab ${maxWidthClass}`}
    >
      <div className="relative aspect-video w-full">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={iframeTitle}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 block h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlaying(true)
            }}
            aria-label={`Play ${iframeTitle}`}
            className="absolute inset-0 cursor-pointer"
          >
            {thumbFailed ? (
              <span className="absolute inset-x-4 top-[calc(50%-3.25rem)] text-center text-[13px] leading-5 text-fg-secondary">
                {iframeTitle}
              </span>
            ) : (
              <img
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt=""
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                onError={() => {
                  setThumbFailed(true)
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 bg-black/35" aria-hidden="true" />
            <span className="absolute top-1/2 left-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-app">
              <Play
                size={22}
                strokeWidth={2}
                fill="currentColor"
                aria-hidden="true"
              />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
