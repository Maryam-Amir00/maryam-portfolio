import { contactCopy } from "./contactData"
import {
  getContactEmail,
  getContactGitHubUrl,
  getContactLinkedInUrl,
  getContactPhone,
  personalInfo,
} from "./personalInfo"
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
  findFileById,
  openedFileLabel,
} from "./portfolioFiles"
import { isSafeHttpsUrl } from "../utils/externalLinks"
import type {
  CommandPaletteAction,
  CommandPaletteGroup,
  PaletteExecuteContext,
  PaletteExecuteResult,
} from "../types/commandPalette"

export const PALETTE_ACTION_IDS = {
  home: "open-home",
  about: "open-about",
  experience: "open-experience",
  skills: "open-skills",
  contact: "open-contact",
  resume: "open-resume",
  studysync: "open-studysync",
  movixxx: "open-movixxx",
  stylique: "open-stylique",
  terminal: "workspace-terminal",
  explorer: "workspace-explorer",
  search: "workspace-search",
  sourceControl: "workspace-source-control",
  extensions: "workspace-extensions",
  copyEmail: "copy-email",
  copyPhone: "copy-phone",
  composeEmail: "compose-email",
  openLinkedIn: "open-linkedin",
  openGitHub: "open-github",
} as const

const CATEGORY_ORDER = ["file", "project", "workspace", "contact"] as const

const CATEGORY_HEADINGS: Record<(typeof CATEGORY_ORDER)[number], string> = {
  file: "Files",
  project: "Projects",
  workspace: "Workspace",
  contact: "Contact",
}

export const CATEGORY_HINT: Record<(typeof CATEGORY_ORDER)[number], string> = {
  file: "File",
  project: "Project",
  workspace: "Workspace",
  contact: "Contact",
}

function fileAction(
  id: string,
  fileId: string,
  label: string,
  category: "file" | "project",
  icon: CommandPaletteAction["icon"],
  keywords: readonly string[],
): CommandPaletteAction | null {
  const file = findFileById(fileId)

  if (!file) {
    return null
  }

  return {
    id,
    label,
    description: openedFileLabel(file),
    category,
    keywords,
    icon,
    target: { type: "open-file", fileId },
  }
}

export function getCommandPaletteActions(state: {
  terminalVisible: boolean
  explorerVisible: boolean
  searchVisible: boolean
  sourceControlVisible: boolean
  extensionsVisible: boolean
}): CommandPaletteAction[] {
  const fileActions = [
    fileAction(PALETTE_ACTION_IDS.home, FILE_HOME, "Open Home", "file", "home", [
      "home",
      "start",
      "intro",
    ]),
    fileAction(PALETTE_ACTION_IDS.about, FILE_ABOUT, "Open About", "file", "about", [
      "about",
      "bio",
      "profile",
    ]),
    fileAction(
      PALETTE_ACTION_IDS.experience,
      FILE_EXPERIENCE,
      "Open Experience",
      "file",
      "experience",
      ["experience", "work", "job", "employment", "intern"],
    ),
    fileAction(PALETTE_ACTION_IDS.skills, FILE_SKILLS, "Open Skills", "file", "skills", [
      "skills",
      "stack",
      "technology",
      "tech",
      "javascript",
      "typescript",
    ]),
    fileAction(PALETTE_ACTION_IDS.resume, FILE_RESUME, "Open Resume", "file", "resume", [
      "resume",
      "cv",
      "pdf",
      "download",
    ]),
    fileAction(
      PALETTE_ACTION_IDS.studysync,
      FILE_STUDYSYNC,
      "Open StudySync",
      "project",
      "project",
      ["studysync", "project", "django", "react", "full stack"],
    ),
    fileAction(
      PALETTE_ACTION_IDS.movixxx,
      FILE_MOVIXXX,
      "Open Movixxx",
      "project",
      "project",
      ["movixxx", "movie", "project", "api", "react"],
    ),
    fileAction(
      PALETTE_ACTION_IDS.stylique,
      FILE_STYLIQUE,
      "Open Stylique",
      "project",
      "project",
      ["stylique", "ecommerce", "shop", "project", "react"],
    ),
  ].flatMap((action) => (action ? [action] : []))

  const workspaceActions: CommandPaletteAction[] = [
    {
      id: PALETTE_ACTION_IDS.terminal,
      label: state.terminalVisible ? "Close Terminal" : "Open Terminal",
      description: "Bottom workspace panel",
      category: "workspace",
      keywords: [
        "terminal",
        "shell",
        "console",
        "panel",
        "open",
        "close",
        "show",
        "hide",
      ],
      icon: "terminal",
      shortcut: "Ctrl/Cmd + `",
      target: { type: "set-terminal", visible: !state.terminalVisible },
    },
    {
      id: PALETTE_ACTION_IDS.explorer,
      label: state.explorerVisible ? "Close Explorer" : "Open Explorer",
      description: "src/ file explorer",
      category: "workspace",
      keywords: [
        "explorer",
        "sidebar",
        "files",
        "tree",
        "show",
        "hide",
      ],
      icon: "explorer",
      target: { type: "set-explorer", visible: !state.explorerVisible },
    },
    {
      id: PALETTE_ACTION_IDS.search,
      label: state.searchVisible ? "Focus Search" : "Open Search",
      description: "Search across portfolio files",
      category: "workspace",
      keywords: ["search", "find", "portfolio", "content"],
      icon: "search",
      target: { type: "show-search" },
    },
    {
      id: PALETTE_ACTION_IDS.sourceControl,
      label: state.sourceControlVisible
        ? "Focus Source Control"
        : "Open Source Control",
      description: "Git inspired portfolio history",
      category: "workspace",
      keywords: [
        "source",
        "source control",
        "history",
        "portfolio history",
        "git",
        "timeline",
      ],
      icon: "source-control",
      target: { type: "show-source-control" },
    },
    {
      id: PALETTE_ACTION_IDS.extensions,
      label: state.extensionsVisible
        ? "Focus Extensions: Developer Toolbox"
        : "Open Extensions: Developer Toolbox",
      description: "Technology toolbox sidebar",
      category: "workspace",
      keywords: [
        "extensions",
        "toolbox",
        "skills",
        "technology",
        "technologies",
        "stack",
        "tools",
        "developer toolbox",
      ],
      icon: "extensions",
      target: { type: "show-extensions" },
    },
  ]

  return [...fileActions, ...workspaceActions, ...getContactActions()]
}

export function groupCommandPaletteActions(
  actions: readonly CommandPaletteAction[],
): CommandPaletteGroup[] {
  return CATEGORY_ORDER.flatMap((category) => {
    const items = actions.filter((action) => action.category === category)
    return items.length > 0
      ? [{ id: category, heading: CATEGORY_HEADINGS[category], actions: items }]
      : []
  })
}

export async function executeCommandPaletteAction(
  action: CommandPaletteAction,
  context: PaletteExecuteContext,
): Promise<PaletteExecuteResult> {
  switch (action.target.type) {
    case "open-file":
      context.openFile(action.target.fileId)
      return { restoreFocus: false }
    case "set-terminal":
      if (action.target.visible) {
        context.openTerminal()
        return { restoreFocus: false }
      }

      context.closeTerminal()
      return { restoreFocus: true }
    case "set-explorer":
      if (action.target.visible) {
        context.showExplorer()
      } else {
        context.closeSidebar()
      }
      return { restoreFocus: true }
    case "show-search":
      context.showSearch()
      return { restoreFocus: false, focusSearch: true }
    case "show-source-control":
      context.showSourceControl()
      return { restoreFocus: true }
    case "show-extensions":
      context.showExtensions()
      return { restoreFocus: false, focusToolbox: true }
    case "copy-text":
      try {
        await navigator.clipboard.writeText(action.target.value)
        return {
          restoreFocus: false,
          keepOpen: true,
          status: action.target.status,
        }
      } catch {
        return {
          restoreFocus: false,
          keepOpen: true,
          status: "Could not copy.",
        }
      }
    case "open-url": {
      const url = action.target.url
      if (url.startsWith("mailto:") || isSafeHttpsUrl(url)) {
        window.open(url, "_blank", "noopener,noreferrer")
      }
      return { restoreFocus: true }
    }
  }
}

function getContactActions(): CommandPaletteAction[] {
  const actions: CommandPaletteAction[] = []
  const contactFile = findFileById(FILE_CONTACT)

  if (contactFile) {
    actions.push({
      id: PALETTE_ACTION_IDS.contact,
      label: "Open Contact",
      description: openedFileLabel(contactFile),
      category: "contact",
      keywords: ["contact", "email", "message", "reach"],
      icon: "contact",
      target: { type: "open-file", fileId: FILE_CONTACT },
    })
  }

  const email = getContactEmail()
  if (email) {
    actions.push({
      id: PALETTE_ACTION_IDS.copyEmail,
      label: "Copy Email",
      description: email,
      category: "contact",
      keywords: ["contact", "email", "mail", "message", "copy"],
      icon: "copy",
      target: { type: "copy-text", value: email, status: "Email copied" },
    })
  }

  const phone = getContactPhone()
  if (phone) {
    actions.push({
      id: PALETTE_ACTION_IDS.copyPhone,
      label: "Copy Phone",
      description: phone.display,
      category: "contact",
      keywords: ["contact", "phone", "call", "copy"],
      icon: "phone",
      target: {
        type: "copy-text",
        value: personalInfo.phone,
        status: "Phone copied",
      },
    })
  }

  if (email) {
    actions.push({
      id: PALETTE_ACTION_IDS.composeEmail,
      label: "Compose Email",
      description: email,
      category: "contact",
      keywords: ["email", "message", "contact", "compose", "mail"],
      icon: "send",
      target: { type: "open-url", url: `mailto:${email}` },
    })
  }

  const linkedin = getContactLinkedInUrl()
  if (linkedin) {
    actions.push({
      id: PALETTE_ACTION_IDS.openLinkedIn,
      label: "Open LinkedIn",
      description: contactCopy.linkedinAction,
      category: "contact",
      keywords: ["contact", "linkedin", "profile", "social"],
      icon: "external",
      target: { type: "open-url", url: linkedin },
    })
  }

  const github = getContactGitHubUrl()
  if (github) {
    actions.push({
      id: PALETTE_ACTION_IDS.openGitHub,
      label: "Open GitHub",
      description: contactCopy.githubAction,
      category: "contact",
      keywords: ["contact", "github", "profile", "social"],
      icon: "external",
      target: { type: "open-url", url: github },
    })
  }

  return actions
}
