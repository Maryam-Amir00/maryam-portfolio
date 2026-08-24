export function EmptyEditor() {
  return (
    <div className="workspace-scroll min-h-0 min-w-0 flex-1 overflow-auto bg-editor">
      <div className="px-4 py-10 md:px-8">
        <p className="text-sm text-fg-secondary">No file open</p>
        <p className="mt-2 max-w-[22rem] text-[13px] leading-5 text-fg-muted">
          Select a file from Explorer or use Command Palette.
        </p>
      </div>
    </div>
  )
}
