import { Braces, File, FileCode, FileText } from "lucide-react"
import { getFileIconType } from "../../data/portfolioFiles"

type FileIconProps = {
  extension: string
  size?: number
  className?: string
}

export function FileIcon({
  extension,
  size = 14,
  className = "shrink-0",
}: FileIconProps) {
  const iconType = getFileIconType(extension)
  const props = {
    size,
    strokeWidth: 1.75,
    "aria-hidden": true as const,
  }

  switch (iconType) {
    case "tsx":
      return <FileCode {...props} className={`${className} text-file-tsx`} />
    case "ts":
      return <FileCode {...props} className={`${className} text-file-ts`} />
    case "jsx":
    case "js":
      return <FileCode {...props} className={`${className} text-file-jsx`} />
    case "md":
      return <FileText {...props} className={`${className} text-file-md`} />
    case "json":
      return <Braces {...props} className={`${className} text-file-json`} />
    case "pdf":
      return <FileText {...props} className={`${className} text-file-pdf`} />
    default:
      return <File {...props} className={`${className} text-fg-muted`} />
  }
}
