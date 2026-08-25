import { Download, ExternalLink } from "lucide-react"
import {
  FILE_CONTACT,
  FILE_RESUME,
  findFileById,
  workspaceName,
} from "../../../data/portfolioFiles"
import {
  resumeCopy,
  resumeData,
  resumeMeta,
} from "../../../data/resumeData"
import { DESKTOP_RESUME_PREVIEW_QUERY } from "../../../config/breakpoints"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"

const previewFrameClass =
  "min-h-0 min-w-0 flex-1 overflow-hidden border border-fg-muted/40 bg-tab"

export function ResumeView() {
  const workspaceFile = findFileById(FILE_RESUME)

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto lg:overflow-hidden">
      <EditorBreadcrumbs
        items={[
          { label: workspaceName },
          {
            label: workspaceFile?.name ?? resumeData.virtualFileName,
            current: true,
          },
        ]}
      />
      <ResumeToolbar
        virtualFileName={workspaceFile?.name ?? resumeData.virtualFileName}
      />
      <ResumePreview />
      <ResumeFooter />
    </div>
  )
}

function ResumeToolbar({ virtualFileName }: { virtualFileName: string }) {
  return (
    <header className="shrink-0 border-b border-subtle px-[clamp(1rem,3vw,2.25rem)] py-3 md:py-3.5">
      <div className="flex min-w-0 flex-col gap-3 min-[720px]:flex-row min-[720px]:items-start min-[720px]:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
            {resumeCopy.kicker}
          </p>
          <h1 className="mt-1 text-[1.2rem] leading-tight font-semibold tracking-tight text-fg">
            {resumeCopy.heading}
          </h1>
          <p
            className="mt-1 font-mono text-[12px] break-all text-fg-secondary"
            title={virtualFileName}
          >
            {virtualFileName}
          </p>
        </div>
        <ResumeActions />
      </div>
      <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 min-[520px]:grid-cols-2 lg:grid-cols-4">
        {resumeMeta.map((item) => (
          <div key={item.id} className="min-w-0">
            <dt className="font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
              {item.label}
            </dt>
            <dd className="mt-1 text-[13px] leading-5 break-words text-fg">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  )
}

function ResumeActions({
  stacked = false,
  quiet = false,
}: {
  stacked?: boolean
  quiet?: boolean
}) {
  const layout = stacked
    ? "flex w-full min-w-0 flex-col gap-2"
    : "flex min-w-0 flex-wrap items-center gap-2"

  const downloadClass = quiet
    ? "inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-mono text-[13px] text-fg-secondary ui-transition hover:text-fg md:min-h-0"
    : "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 md:min-h-0"

  const openClass = quiet
    ? "inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-mono text-[13px] text-fg-secondary ui-transition hover:text-fg md:min-h-0"
    : "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-[4px] border border-fg-muted/55 bg-tab px-3.5 py-1.5 text-[13px] text-fg ui-transition hover:border-fg-muted hover:bg-hover hover:text-fg active:bg-hover md:min-h-0"

  const downloadLink = (
    <a
      href={resumeData.assetPath}
      download={resumeData.fileName}
      aria-label="Download Maryam Amir's resume"
      className={`${downloadClass} ${stacked && !quiet ? "w-full" : ""}`}
    >
      <Download size={14} strokeWidth={1.75} aria-hidden="true" />
      Download Resume
    </a>
  )

  const openLink = (
    <a
      href={resumeData.assetPath}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Maryam Amir's resume PDF in a new tab"
      className={`${openClass} ${stacked && !quiet ? "w-full" : ""}`}
    >
      <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
      Open PDF
    </a>
  )

  return (
    <div className={layout}>
      {quiet ? (
        <>
          {openLink}
          {downloadLink}
        </>
      ) : (
        <>
          {downloadLink}
          {openLink}
        </>
      )}
    </div>
  )
}

function ResumePreview() {
  const { commandPaletteVisible } = useWorkspace()
  const isDesktopPreview = useMediaQuery(DESKTOP_RESUME_PREVIEW_QUERY)

  if (!isDesktopPreview) {
    return (
      <div className="min-w-0 px-[clamp(1rem,3.5vw,2.5rem)] py-6">
        <MobileResumePanel />
      </div>
    )
  }

  return (
    <div className="relative z-0 flex min-h-0 min-w-0 flex-1 flex-col px-3 pt-3 pb-3 md:px-4">
      <p aria-hidden="true" className="mb-2 shrink-0 font-mono text-[13px] leading-5 text-[color-mix(in_srgb,var(--syntax-comment)_68%,white)]">
        {resumeCopy.previewComment}
      </p>
      <div className={previewFrameClass}>
        {commandPaletteVisible ? (
          <div className="h-full w-full bg-tab" aria-hidden="true" />
        ) : (
          <object
            data={resumeData.assetPath}
            type={resumeData.mimeType}
            title={resumeData.previewLabel}
            aria-label={resumeData.previewLabel}
            className="block h-full w-full"
          >
            <ResumeFallback />
          </object>
        )}
      </div>
    </div>
  )
}

function ResumeFallback() {
  return (
    <div className="flex h-full min-h-[16rem] flex-col justify-center gap-4 px-5 py-6">
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-fg">{resumeCopy.fallbackTitle}</p>
        <p className="mt-1.5 max-w-[28rem] text-[13px] leading-5 text-fg-secondary">
          {resumeCopy.fallbackBody}
        </p>
      </div>
      <ResumeActions />
    </div>
  )
}

function MobileResumePanel() {
  return (
    <section aria-label={resumeData.displayName} className="w-full min-w-0 max-w-[36rem]">
      <p aria-hidden="true" className="font-mono text-[13px] leading-5 text-[color-mix(in_srgb,var(--syntax-comment)_68%,white)]">
        {resumeCopy.previewComment}
      </p>
      <div className="mt-3 border border-fg-muted/40 px-4 py-4">
        <p
          className="font-mono text-[13px] break-all text-fg"
          title={resumeData.virtualFileName}
        >
          {resumeData.virtualFileName}
        </p>
        <p className="mt-1 font-mono text-[12px] text-fg-muted">
          {resumeCopy.documentType}
        </p>
        <p className="mt-3 max-w-[28rem] text-[13px] leading-5 text-fg-secondary">
          {resumeCopy.mobileHint}
        </p>
        <div className="mt-4">
          <ResumeActions quiet />
        </div>
      </div>
    </section>
  )
}

function ResumeFooter() {
  const { openFile } = useWorkspace()

  return (
    <footer className="shrink-0 border-t border-subtle px-[clamp(1rem,3vw,2.25rem)] py-3">
      <button
        type="button"
        onClick={() => {
          openFile(FILE_CONTACT)
        }}
        className="inline-flex min-h-11 cursor-pointer items-center font-mono text-[12px] text-fg-muted ui-transition hover:text-fg md:min-h-0"
      >
        <span aria-hidden="true">{"< "}</span>
        {resumeCopy.backLabel}
      </button>
    </footer>
  )
}
