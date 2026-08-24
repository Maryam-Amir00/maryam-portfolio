import { workspaceRoot } from "../../../data/portfolioFiles"
import { ExplorerFolder } from "./ExplorerFolder"

export function ExplorerTree() {
  return (
    <div className="workspace-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-2">
      <ul className="m-0 list-none p-0">
        <ExplorerFolder folder={workspaceRoot} depth={0} isRoot />
      </ul>
    </div>
  )
}
