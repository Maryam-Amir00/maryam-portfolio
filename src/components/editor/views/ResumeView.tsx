import { Download, ExternalLink, FileText } from "lucide-react"
import { personalInfo } from "../../../data/personalInfo"
import {
  FILE_CONTACT,
  FILE_RESUME,
  findFileById,
  workspaceName,
} from "../../../data/portfolioFiles"
import { resumeData, resumeMeta } from "../../../data/resumeData"
import { useWorkspace } from "../../../hooks/useWorkspace"
import { EditorBreadcrumbs } from "../EditorBreadcrumbs"

export function ResumeView() {
  const workspaceFile = findFileById(FILE_RESUME)

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <EditorBreadcrumbs
        items={[
          { label: workspaceName },
          {
            label: workspaceFile?.name ?? resumeData.fileName,
            current: true,
          },
        ]}
      />
      <ResumeToolbar />
      <ResumePreview />
      <ResumeFooter />
    </div>
  )
}

function ResumeToolbar() {
  return (
    <header className="shrink-0 border-b border-subtle px-[clamp(1rem,3vw,2.25rem)] py-3">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase">
            PDF Document
          </p>
          <h1 className="mt-1 text-[1.05rem] font-medium tracking-tight text-fg">
            Resume
          </h1>
          <p
            className="mt-0.5 truncate font-mono text-[12px] text-fg-muted"
            title={resumeData.fileName}
          >
            {resumeData.fileName}
          </p>
        </div>
        <ResumeActions />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 min-[900px]:grid-cols-4">
        {resumeMeta.map((item) => (
          <div key={item.id} className="min-w-0">
            <dt className="font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
              {item.label}
            </dt>
            <dd className="mt-0.5 truncate text-[12px] text-fg-secondary" title={item.value}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  )
}

function ResumeActions({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={
        stacked
          ? "flex w-full min-w-0 flex-col gap-2"
          : "flex min-w-0 flex-wrap items-center gap-2"
      }
    >
      <a
        href={resumeData.assetPath}
        download={resumeData.fileName}
        aria-label="Download Maryam Amir's resume"
        className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[4px] bg-accent px-3.5 py-1.5 text-[13px] font-medium text-app ui-transition hover:bg-accent/90 active:bg-accent/80 ${stacked ? "w-full" : ""}`}
      >
        <Download size={14} strokeWidth={1.75} aria-hidden="true" />
        Download Resume
      </a>
      <a
        href={resumeData.assetPath}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Maryam Amir's resume PDF in a new tab"
        className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[4px] border border-subtle px-3.5 py-1.5 text-[13px] text-fg-secondary ui-transition hover:bg-hover hover:text-fg ${stacked ? "w-full" : ""}`}
      >
        <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
        Open PDF
      </a>
    </div>
  )
}

function ResumePreview() {
  const { commandPaletteVisible } = useWorkspace()

  return (
    <>
      <div className="relative z-0 hidden min-h-0 min-w-0 flex-1 flex-col px-[clamp(1rem,3vw,2.25rem)] py-3 min-[768px]:flex">
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden border border-subtle bg-tab">
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
      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center px-[clamp(1rem,3.5vw,2.5rem)] py-8 min-[768px]:hidden">
        <MobileResumePanel />
      </div>
    </>
  )
}

function ResumeFallback() {
  return (
    <div className="flex h-full min-h-[16rem] flex-col justify-center gap-4 px-5 py-6">
      <p className="max-w-[28rem] text-[14px] leading-6 text-fg-secondary">
        PDF preview isn't available in this browser.
      </p>
      <ResumeActions />
    </div>
  )
}

function MobileResumePanel() {
  return (
    <section
      aria-label={resumeData.displayName}
      className="mx-auto w-full max-w-[24rem] border border-subtle px-5 py-6"
    >
      <FileText
        size={28}
        strokeWidth={1.5}
        className="text-file-pdf"
        aria-hidden="true"
      />
      <p
        className="mt-4 font-mono text-[13px] break-words text-fg"
        title={resumeData.fileName}
      >
        {resumeData.fileName}
      </p>
      <p className="mt-3 text-[15px] font-medium text-fg">{personalInfo.name}</p>
      <p className="mt-1 text-[13px] text-fg-secondary">{personalInfo.role}</p>
      <div className="mt-5">
        <ResumeActions stacked />
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
        className="cursor-pointer font-mono text-[12px] text-fg-muted ui-transition hover:text-fg max-md:inline-flex max-md:min-h-11 max-md:items-center"
      >
        Back to Contact
      </button>
    </footer>
  )
}
