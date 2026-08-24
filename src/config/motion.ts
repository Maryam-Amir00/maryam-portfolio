export const motionDuration = {
  fast: 0.12,
  base: 0.17,
  editor: 0.15,
  sidebar: 0.14,
  overlay: 0.16,
  palette: 0.18,
  paletteExit: 0.14,
  terminal: 0.15,
} as const

export const motionEase = [0.2, 0.8, 0.2, 1] as const

export const editorEnter = {
  initial: { opacity: 0.96, y: 2 },
  animate: { opacity: 1, y: 0 },
} as const

export const editorEnterReduced = {
  initial: { opacity: 0.98 },
  animate: { opacity: 1 },
} as const

export const sidebarEnter = {
  initial: { opacity: 0.97, x: -2 },
  animate: { opacity: 1, x: 0 },
} as const

export const sidebarEnterReduced = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
} as const

export const paletteOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const

export const paletteSurface = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -3 },
} as const

export const paletteSurfaceReduced = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
} as const

export const terminalEnter = {
  initial: { opacity: 0, y: 3 },
  animate: { opacity: 1, y: 0 },
} as const

export const terminalEnterReduced = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
} as const
