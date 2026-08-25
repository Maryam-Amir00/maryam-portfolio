import { SkipLink } from "../components/a11y/SkipLink"
import { EditorWorkspace } from "../components/editor/EditorWorkspace"
import { ActivityBar } from "../components/vscode/ActivityBar"
import { CommandPalette } from "../components/vscode/CommandPalette"
import { Explorer } from "../components/vscode/Explorer"
import { ExtensionsPanel } from "../components/vscode/ExtensionsPanel"
import { MobileActivityNav } from "../components/vscode/MobileActivityNav"
import { MobileWorkspaceHeader } from "../components/vscode/MobileWorkspaceHeader"
import { ResponsiveSidebar } from "../components/vscode/ResponsiveSidebar"
import { SearchPanel } from "../components/vscode/SearchPanel"
import { SourceControlPanel } from "../components/vscode/SourceControlPanel"
import { StatusBar } from "../components/vscode/StatusBar"
import { Terminal } from "../components/vscode/Terminal"
import { TopBar } from "../components/vscode/TopBar"
import { useTerminalShortcut } from "../hooks/useTerminalShortcut"

export function VSCodeLayout() {
  useTerminalShortcut()

  return (
    <div className="relative flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-app pt-0 pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)] text-fg">
      <SkipLink />
      <TopBar />
      <MobileWorkspaceHeader />
      <div className="flex min-h-0 min-w-0 flex-1">
        <ActivityBar />
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
            <ResponsiveSidebar>
              <Explorer />
              <SearchPanel />
              <SourceControlPanel />
              <ExtensionsPanel />
            </ResponsiveSidebar>
            <EditorWorkspace />
          </div>
          <Terminal />
        </div>
      </div>
      <StatusBar />
      <MobileActivityNav />
      <CommandPalette />
    </div>
  )
}
