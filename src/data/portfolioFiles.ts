import type {
  FileIconType,
  PortfolioFile,
  PortfolioFolder,
  PortfolioNode,
} from "../types/workspace"

function file(
  id: string,
  name: string,
  language: string,
  path: string,
  title?: string,
): PortfolioFile {
  const separator = name.lastIndexOf(".")
  const extension = separator >= 0 ? name.slice(separator + 1).toLowerCase() : ""

  return {
    id,
    name,
    type: "file",
    extension,
    language,
    path,
    ...(title ? { title } : {}),
  }
}

function folder(
  id: string,
  name: string,
  children: PortfolioNode[],
): PortfolioFolder {
  return { id, name, type: "folder", children }
}

export const workspaceName = "MARYAM-PORTFOLIO"
export const workspaceTitle = "maryam-portfolio"

export const FILE_HOME = "file-home"
export const FILE_ABOUT = "file-about"
export const FILE_EXPERIENCE = "file-experience"
export const FILE_SKILLS = "file-skills"
export const FILE_STUDYSYNC = "file-studysync"
export const FILE_MOVIXXX = "file-movixxx"
export const FILE_STYLIQUE = "file-stylique"
export const FILE_CONTACT = "file-contact"
export const FILE_RESUME = "file-resume"
export const FOLDER_WORKSPACE = "folder-workspace"
export const FOLDER_SRC = "folder-src"
export const FOLDER_PROJECTS = "folder-projects"

export const workspaceRoot: PortfolioFolder = folder(
  FOLDER_WORKSPACE,
  workspaceName,
  [
    folder(FOLDER_SRC, "src", [
      file(FILE_HOME, "home.tsx", "TypeScript React", "/src/home.tsx"),
      file(FILE_ABOUT, "about.md", "Markdown", "/src/about.md"),
      file(FILE_EXPERIENCE, "experience.ts", "TypeScript", "/src/experience.ts"),
      file(FILE_SKILLS, "skills.json", "JSON", "/src/skills.json"),
      folder(FOLDER_PROJECTS, "projects", [
        file(
          FILE_STUDYSYNC,
          "studysync.tsx",
          "TypeScript React",
          "/src/projects/studysync.tsx",
          "StudySync",
        ),
        file(
          FILE_MOVIXXX,
          "movixxx.jsx",
          "JavaScript React",
          "/src/projects/movixxx.jsx",
          "Movixxx",
        ),
        file(
          FILE_STYLIQUE,
          "stylique.jsx",
          "JavaScript React",
          "/src/projects/stylique.jsx",
          "Stylique",
        ),
      ]),
    ]),
    file(FILE_CONTACT, "contact.tsx", "TypeScript React", "/contact.tsx"),
    file(
      FILE_RESUME,
      "Maryam_Amir_Resume.pdf",
      "PDF",
      "/Maryam_Amir_Resume.pdf",
      "Resume",
    ),
  ],
)

const fileIconTypes = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "md",
  "pdf",
] as const satisfies readonly FileIconType[]

export const portfolioFileMap: Record<string, PortfolioFile> = {}
export const portfolioFolderMap: Record<string, PortfolioFolder> = {}
export const portfolioNodeMap: Record<string, PortfolioNode> = {}

function indexNode(node: PortfolioNode) {
  portfolioNodeMap[node.id] = node

  if (node.type === "file") {
    portfolioFileMap[node.id] = node
    return
  }

  portfolioFolderMap[node.id] = node
  for (const child of node.children) {
    indexNode(child)
  }
}

indexNode(workspaceRoot)

export function findNodeById(id: string): PortfolioNode | undefined {
  return portfolioNodeMap[id]
}

export function findFileById(id: string): PortfolioFile | undefined {
  return portfolioFileMap[id]
}

export function findFolderById(id: string): PortfolioFolder | undefined {
  return portfolioFolderMap[id]
}

export function getPortfolioFiles(): PortfolioFile[] {
  return Object.values(portfolioFileMap)
}

const fileQueryAliases: Record<string, string> = {
  home: FILE_HOME,
  "home.tsx": FILE_HOME,
  about: FILE_ABOUT,
  "about.md": FILE_ABOUT,
  experience: FILE_EXPERIENCE,
  work: FILE_EXPERIENCE,
  "experience.ts": FILE_EXPERIENCE,
  skills: FILE_SKILLS,
  "skills.json": FILE_SKILLS,
  studysync: FILE_STUDYSYNC,
  "studysync.tsx": FILE_STUDYSYNC,
  movixxx: FILE_MOVIXXX,
  "movixxx.jsx": FILE_MOVIXXX,
  stylique: FILE_STYLIQUE,
  "stylique.jsx": FILE_STYLIQUE,
  contact: FILE_CONTACT,
  "contact.tsx": FILE_CONTACT,
  resume: FILE_RESUME,
  cv: FILE_RESUME,
  "resume.pdf": FILE_RESUME,
  "maryam_amir_resume.pdf": FILE_RESUME,
  "maryam-amir-resume.pdf": FILE_RESUME,
}

function normalizeFileQuery(query: string) {
  return query
    .trim()
    .toLowerCase()
    .replace(/^\.\//, "")
    .replace(/^\/+/, "")
}

export function findFileByQuery(query: string): PortfolioFile | undefined {
  const normalized = normalizeFileQuery(query)

  if (!normalized) {
    return undefined
  }

  const aliasId =
    fileQueryAliases[normalized] ??
    fileQueryAliases[normalized.replace(/^src\//, "")] ??
    fileQueryAliases[normalized.replace(/^src\/projects\//, "")] ??
    fileQueryAliases[normalized.replace(/^projects\//, "")]

  if (aliasId) {
    return findFileById(aliasId)
  }

  return getPortfolioFiles().find((file) => {
    const name = file.name.toLowerCase()
    const path = file.path.toLowerCase().replace(/^\//, "")
    const stem = name.replace(/\.[^.]+$/, "")
    const title = file.title?.toLowerCase()

    return (
      name === normalized ||
      stem === normalized ||
      path === normalized ||
      path.endsWith(`/${normalized}`) ||
      title === normalized
    )
  })
}

function nodeListing(node: PortfolioNode) {
  return node.type === "folder" ? `${node.name}/` : node.name
}

export function listWorkspaceRootNames() {
  return workspaceRoot.children.map(nodeListing)
}

export function listSrcNames() {
  const src = findFolderById(FOLDER_SRC)
  return src ? src.children.map(nodeListing) : []
}

export function listProjectFileNames() {
  const projects = findFolderById(FOLDER_PROJECTS)
  if (!projects) {
    return []
  }

  return projects.children.flatMap((node) =>
    node.type === "file" ? [node.name] : [],
  )
}

export function listProjectSummaries() {
  const projects = findFolderById(FOLDER_PROJECTS)
  if (!projects) {
    return []
  }

  return projects.children.flatMap((node) =>
    node.type === "file"
      ? [{ name: node.title ?? node.name, fileName: node.name }]
      : [],
  )
}

export function openedFileLabel(file: PortfolioFile) {
  if (file.path.includes("/projects/")) {
    return `projects/${file.name}`
  }

  return file.name
}

export function getFileIconType(extension: string): FileIconType {
  const normalized = extension.toLowerCase()

  for (const iconType of fileIconTypes) {
    if (iconType === normalized) {
      return iconType
    }
  }

  return "unknown"
}

export function getDocumentTitle(file: PortfolioFile): string {
  return file.title ?? file.name
}

export function showsSpacesIndent(file: PortfolioFile): boolean {
  return (
    file.extension === "ts" ||
    file.extension === "tsx" ||
    file.extension === "js" ||
    file.extension === "jsx" ||
    file.extension === "json"
  )
}

export function showsLineEnding(file: PortfolioFile): boolean {
  return showsSpacesIndent(file)
}

export function showsEncoding(file: PortfolioFile): boolean {
  return file.extension !== "pdf"
}
