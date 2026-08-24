import { EDITOR_CONTENT_ID, focusEditorContent } from "../../utils/focusEditor"

export function SkipLink() {
  return (
    <a
      href={`#${EDITOR_CONTENT_ID}`}
      className="skip-link"
      onClick={(event) => {
        event.preventDefault()
        focusEditorContent()
      }}
    >
      Skip to editor content
    </a>
  )
}
