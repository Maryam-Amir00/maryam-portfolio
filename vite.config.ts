import { defineConfig, loadEnv, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

function publicSiteOrigin(raw: string | undefined): string | null {
  const value = raw?.trim()
  if (!value) {
    return null
  }

  try {
    const url = new URL(value)
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null
    }
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return null
    }
    return url.origin
  } catch {
    return null
  }
}

function siteUrlMetaPlugin(origin: string | null): Plugin {
  return {
    name: "site-url-meta",
    transformIndexHtml(html) {
      if (!origin) {
        return html
      }

      const tags = [
        `    <link rel="canonical" href="${origin}/" />`,
        `    <meta property="og:url" content="${origin}/" />`,
      ].join("\n")

      return html.replace("</head>", `${tags}\n  </head>`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const origin = publicSiteOrigin(env.VITE_SITE_URL)

  return {
    plugins: [react(), tailwindcss(), siteUrlMetaPlugin(origin)],
  }
})
