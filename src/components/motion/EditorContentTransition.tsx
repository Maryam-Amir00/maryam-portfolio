import { m, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import {
  editorEnter,
  editorEnterReduced,
  motionDuration,
  motionEase,
} from "../../config/motion"

function editorTransformTemplate({ y }: { y?: number | string }) {
  const value = typeof y === "number" ? y : Number.parseFloat(String(y ?? 0))
  if (!Number.isFinite(value) || value === 0) {
    return "none"
  }

  return `translateY(${value}px)`
}

export function EditorContentTransition({
  activeFileId,
  disableTransform = false,
  fill = false,
  children,
}: {
  activeFileId: string | null
  disableTransform?: boolean
  fill?: boolean
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const skipTransform = Boolean(reduceMotion || disableTransform)
  const variants = skipTransform ? editorEnterReduced : editorEnter

  return (
    <m.div
      key={activeFileId ?? "empty"}
      initial={variants.initial}
      animate={variants.animate}
      transformTemplate={skipTransform ? undefined : editorTransformTemplate}
      transition={{
        duration: reduceMotion ? 0 : motionDuration.editor,
        ease: motionEase,
      }}
      className={
        fill
          ? "flex min-h-0 min-w-0 flex-1 flex-col"
          : "min-w-0"
      }
    >
      {children}
    </m.div>
  )
}
