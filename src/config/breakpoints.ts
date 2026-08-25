/** Mobile workspace: bottom Activity Navigation, near-full overlay panels. */
export const MOBILE_MEDIA_QUERY =
  "(max-width: 767px), ((max-height: 500px) and (max-width: 959px))"

/**
 * Compact desktop, tablet, and mobile: Sidebar overlays the Editor
 * instead of consuming persistent width. File selection closes the overlay.
 */
export const OVERLAY_MEDIA_QUERY = "(max-width: 1279px)"

/** Desktop workspace: persistent Sidebar beside the Editor. */
export const PERSISTENT_SIDEBAR_MEDIA_QUERY = "(min-width: 1280px)"

/**
 * Native Resume PDF embed. Below this width the approved fallback is used
 * so a tiny embedded viewer is never forced into the Editor.
 */
export const DESKTOP_RESUME_PREVIEW_QUERY = "(min-width: 1024px)"
