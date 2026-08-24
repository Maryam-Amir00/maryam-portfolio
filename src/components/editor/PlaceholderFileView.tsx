import type { PortfolioFile } from "../../types/workspace"

export function PlaceholderFileView({ file }: { file: PortfolioFile }) {
  return (
    <div className="min-w-0 px-6 py-6">
      <h1 className="text-base font-medium text-fg">{file.name}</h1>
      <p className="mt-3 max-w-xl text-[13px] leading-6 text-fg-secondary">
        This file is not available in the workspace.
      </p>
    </div>
  )
}
