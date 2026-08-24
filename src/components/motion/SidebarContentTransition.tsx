import { m, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import {
  motionDuration,
  motionEase,
  sidebarEnter,
  sidebarEnterReduced,
} from "../../config/motion"

export function SidebarContentTransition({
  children,
}: {
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const variants = reduceMotion ? sidebarEnterReduced : sidebarEnter

  return (
    <m.div
      initial={variants.initial}
      animate={variants.animate}
      transition={{
        duration: reduceMotion ? 0 : motionDuration.sidebar,
        ease: motionEase,
      }}
      className="flex min-h-0 min-w-0 flex-1 flex-col"
    >
      {children}
    </m.div>
  )
}
