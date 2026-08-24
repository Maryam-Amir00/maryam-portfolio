import { EDITOR_CONTENT_ID } from "../../utils/focusEditor"
import { FileRenderer } from "./FileRenderer"
import { EditorTabs } from "../vscode/EditorTabs"

export function EditorWorkspace() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <EditorTabs />
      <main
        id={EDITOR_CONTENT_ID}
        tabIndex={-1}
        className="editor-main flex min-h-0 min-w-0 flex-1 flex-col"
      >
        <FileRenderer />
      </main>
    </div>
  )
}
