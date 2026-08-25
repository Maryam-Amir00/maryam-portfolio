import { OVERLAY_MEDIA_QUERY } from "../../config/breakpoints"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useWorkspace } from "../../hooks/useWorkspace"
import { EDITOR_CONTENT_ID } from "../../utils/focusEditor"
import { FileRenderer } from "./FileRenderer"
import { EditorTabs } from "../vscode/EditorTabs"

export function EditorWorkspace() {
  const { activeSidebarView } = useWorkspace()
  const isOverlay = useMediaQuery(OVERLAY_MEDIA_QUERY)
  const overlayOpen = isOverlay && activeSidebarView !== null

  return (
    <div
      className="flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col overflow-hidden"
      inert={overlayOpen}
    >
      <EditorTabs />
      <main
        id={EDITOR_CONTENT_ID}
        tabIndex={-1}
        className="editor-main flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col overflow-hidden"
      >
        <FileRenderer />
      </main>
    </div>
  )
}
