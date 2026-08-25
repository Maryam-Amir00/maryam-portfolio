import { EmptyEditor } from "./EmptyEditor"
import { PlaceholderFileView } from "./PlaceholderFileView"
import { AboutView } from "./views/AboutView"
import { ContactView } from "./views/ContactView"
import { ExperienceView } from "./views/ExperienceView"
import { HomeView } from "./views/HomeView"
import { MovixxxView } from "./views/MovixxxView"
import { ResumeView } from "./views/ResumeView"
import { SkillsView } from "./views/SkillsView"
import { StudySyncView } from "./views/StudySyncView"
import { StyliqueView } from "./views/StyliqueView"
import {
  FILE_ABOUT,
  FILE_CONTACT,
  FILE_EXPERIENCE,
  FILE_HOME,
  FILE_MOVIXXX,
  FILE_RESUME,
  FILE_SKILLS,
  FILE_STUDYSYNC,
  FILE_STYLIQUE,
} from "../../data/portfolioFiles"
import { useWorkspace } from "../../hooks/useWorkspace"
import { EditorContentTransition } from "../motion/EditorContentTransition"

export function FileRenderer() {
  const { activeFile } = useWorkspace()

  if (!activeFile) {
    return (
      <EditorContentTransition activeFileId={null} fill>
        <EmptyEditor />
      </EditorContentTransition>
    )
  }

  const isResume = activeFile.id === FILE_RESUME

  return (
    <div
      className={
        isResume
          ? "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-editor"
          : "workspace-scroll min-h-0 min-w-0 w-full max-w-full flex-1 overflow-x-clip overflow-y-auto bg-editor"
      }
    >
      <EditorContentTransition
        activeFileId={activeFile.id}
        disableTransform={isResume}
        fill={isResume}
      >
        {activeFile.id === FILE_HOME ? (
          <HomeView />
        ) : activeFile.id === FILE_ABOUT ? (
          <AboutView />
        ) : activeFile.id === FILE_EXPERIENCE ? (
          <ExperienceView />
        ) : activeFile.id === FILE_SKILLS ? (
          <SkillsView />
        ) : activeFile.id === FILE_STUDYSYNC ? (
          <StudySyncView />
        ) : activeFile.id === FILE_MOVIXXX ? (
          <MovixxxView />
        ) : activeFile.id === FILE_STYLIQUE ? (
          <StyliqueView />
        ) : activeFile.id === FILE_CONTACT ? (
          <ContactView />
        ) : isResume ? (
          <ResumeView />
        ) : (
          <PlaceholderFileView file={activeFile} />
        )}
      </EditorContentTransition>
    </div>
  )
}
