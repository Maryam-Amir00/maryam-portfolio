import { useWorkspace } from "../../hooks/useWorkspace"
import { ExplorerTree } from "./explorer/ExplorerTree"
import { SidebarPanel } from "./SidebarPanel"

export function Explorer() {
  const { explorerVisible } = useWorkspace()

  if (!explorerVisible) {
    return null
  }

  return (
    <SidebarPanel label="Explorer" header="Explorer">
      <ExplorerTree />
    </SidebarPanel>
  )
}
