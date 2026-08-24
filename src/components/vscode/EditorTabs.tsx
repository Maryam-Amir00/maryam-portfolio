import { X } from "lucide-react"
import { useEffect, useRef, type MouseEvent } from "react"
import { useWorkspace } from "../../hooks/useWorkspace"
import { EDITOR_CONTENT_ID } from "../../utils/focusEditor"
import { FileIcon } from "./FileIcon"

export function EditorTabs() {
  const { openFiles, activeFileId, activateFile, closeFile } = useWorkspace()

  function handleClose(event: MouseEvent<HTMLButtonElement>, fileId: string) {
    event.stopPropagation()
    const index = openFiles.findIndex((file) => file.id === fileId)
    const nextFile = openFiles[index + 1] ?? openFiles[index - 1] ?? null
    closeFile(fileId)

    requestAnimationFrame(() => {
      if (nextFile) {
        document.getElementById(`editor-tab-${nextFile.id}`)?.focus()
        return
      }

      document.getElementById(EDITOR_CONTENT_ID)?.focus()
    })
  }

  return (
    <div
      aria-label="Open editors"
      className="workspace-tabs flex h-10 shrink-0 items-stretch overflow-x-auto overflow-y-hidden p-px whitespace-nowrap border-b border-subtle bg-tab md:h-9"
    >
      {openFiles.map((file) => {
        const isActive = file.id === activeFileId

        return (
          <EditorTab
            key={file.id}
            fileId={file.id}
            fileName={file.name}
            extension={file.extension}
            isActive={isActive}
            onActivate={() => {
              activateFile(file.id)
            }}
            onClose={(event) => {
              handleClose(event, file.id)
            }}
          />
        )
      })}
    </div>
  )
}

function EditorTab({
  extension,
  fileId,
  fileName,
  isActive,
  onActivate,
  onClose,
}: {
  extension: string
  fileId: string
  fileName: string
  isActive: boolean
  onActivate: () => void
  onClose: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const tabRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) {
      return
    }

    tabRef.current?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    })
  }, [isActive])

  return (
    <div
      ref={tabRef}
      className="group relative flex h-full max-w-[11rem] shrink-0 md:max-w-[220px]"
    >
      <button
        id={`editor-tab-${fileId}`}
        type="button"
        aria-pressed={isActive}
        aria-label={isActive ? `${fileName}, active file` : fileName}
        title={fileName}
        onClick={onActivate}
        className={[
          "relative flex h-full min-w-0 cursor-pointer items-center gap-2 pl-3 text-[13px] ui-transition",
          isActive
            ? "bg-tab-active pr-10 text-fg md:pr-7"
            : "pr-3 text-fg-muted hover:bg-hover hover:text-fg-secondary md:pr-7",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "absolute inset-x-0 top-0 h-0.5 bg-accent ui-transition",
            isActive ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <FileIcon extension={extension} />
        <span className="truncate">{fileName}</span>
      </button>
      <button
        type="button"
        aria-label={`Close ${fileName}`}
        onClick={onClose}
        className={[
          "absolute top-1/2 right-0.5 -translate-y-1/2 cursor-pointer rounded-sm text-fg-muted ui-transition hover:bg-hover hover:text-fg",
          isActive
            ? "inline-flex size-9 items-center justify-center opacity-100 md:right-1 md:size-auto md:p-0.5"
            : "hidden opacity-0 md:inline-flex md:right-1 md:p-0.5 group-hover:opacity-100 group-focus-within:opacity-100",
        ].join(" ")}
      >
        <X size={12} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}
