# Maryam Amir Portfolio

VS Code-inspired developer portfolio. Visitors browse virtual files in an editor workspace. There is one public browser route: `/`.

Production URL: Not assigned yet.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Bun

## Local development

```bash
bun install
bun run dev
```

Bun is the only package manager. Do not use npm, yarn, or pnpm.

## Validation

Run before every deploy:

```bash
bun run lint
bun run build
bun run preview
```

The site is a static Vite build. Preview `dist/` — do not judge launch from `bun run dev` alone.

## Resume

Source file:

```text
public/resume/Maryam-Amir-Resume.pdf
```

Live/preview URL:

```text
/resume/Maryam-Amir-Resume.pdf
```

The Explorer tab uses a virtual name (`Maryam_Amir_Resume.pdf`). The downloadable asset uses hyphens. That split is intentional.

### Replace the PDF

1. Overwrite `public/resume/Maryam-Amir-Resume.pdf` with the same filename.
2. `bun run build`
3. Redeploy `dist/`
4. Open `/resume/Maryam-Amir-Resume.pdf` and confirm the new file.
5. If an older PDF is still served, purge the host/CDN cache. Linux hosts are case-sensitive.

No React changes are required for a resume swap.

## Deployment

The app is static. No Node server, database, or API is required.

**Build command:** `bun run build`  
**Output / publish directory:** `dist`

Compatible with Vercel (Vite preset), Netlify, or Render Static Site. Do not add SPA catch-all redirects: there are no client-side browser routes.

HTTPS is provided by the host. Keep the previously known-good deployment until live checks finish.

Optional after a real HTTPS origin exists (not localhost, not a preview hash URL):

```bash
VITE_SITE_URL=
```

Example once the real origin exists: `VITE_SITE_URL=https://your-domain.example`

Copy `.env.example` locally or set the same variable on the host. That injects `canonical` and `og:url` at build time. Leave it empty until the final public domain is known. Do not commit a filled `.env`.

A future social preview image, if added, should be **1200 × 630 PNG/JPEG**. There is no `og:image` today; Twitter/X uses `summary`, not `summary_large_image`.

See `LAUNCH_CHECKLIST.md` for launch and live checks.

## Architecture

```text
Virtual files (portfolioFiles)
  → Workspace context / reducer
  → Explorer, Search, Terminal, Command Palette, tabs
  → FileRenderer
  → Editor views
```

Workspace state lives in memory. Refresh returns to the default Home workspace. That is intentional: React Router is not used.

## Content sources

Update canonical data first, then check the surfaces that read it.

| Concern | Source of truth |
| --- | --- |
| Name, role, email, location, social URLs | `src/data/personalInfo.ts` |
| About, education | `src/data/aboutData.ts` |
| Experience | `src/data/experienceData.ts` |
| Skills | `src/data/skillsData.ts` |
| Projects | `src/data/projectsData.ts` |
| Resume path / filename | `src/data/resumeData.ts` |
| Virtual file tree | `src/data/portfolioFiles.ts` |
| Search index | `src/data/portfolioSearchIndex.ts` |
| Source Control snapshots | `src/data/portfolioHistory.ts` |
| Extensions toolbox | `src/data/toolboxMeta.ts` |
| Command Palette | `src/data/commandPaletteActions.ts` |
| Terminal commands | `src/data/terminalCommands.ts` |
| SEO title / description / theme | `src/config/site.ts` and `index.html` |

### Personal info

Edit `src/data/personalInfo.ts`. Home, Contact, Terminal `whoami`, and search identity read from there.

### Skills

Edit `src/data/skillsData.ts` first. Then update `src/data/toolboxMeta.ts` (marker, one-line context, verified evidence). Search picks up skills from the skills data.

### Social links

GitHub and LinkedIn stay hidden until real HTTPS URLs are set on `personalInfo.socialLinks`. Do not add `#`, guessed usernames, or disabled icons.

### New project

Typical surfaces, only as needed:

1. `src/data/projectsData.ts`
2. `src/data/portfolioFiles.ts`
3. New view under `src/components/editor/views/`
4. `src/components/editor/FileRenderer.tsx`
5. `src/data/portfolioSearchIndex.ts`
6. `src/data/portfolioHistory.ts` if a snapshot belongs there
7. `src/data/toolboxMeta.ts` evidence only when verified
8. `src/data/commandPaletteActions.ts`
9. `src/data/terminalCommands.ts`

## UI systems

| System | Location |
| --- | --- |
| Layout | `src/layouts/VSCodeLayout.tsx` |
| Workspace state | `src/context/WorkspaceContext.tsx`, `src/context/workspaceReducer.ts` |
| Editor | `src/components/editor/FileRenderer.tsx` |
| Explorer | `src/components/vscode/Explorer.tsx` |
| Search | `src/components/vscode/SearchPanel.tsx` |
| Source Control | `src/components/vscode/SourceControlPanel.tsx` |
| Extensions | `src/components/vscode/ExtensionsPanel.tsx` |
| Terminal | `src/components/vscode/Terminal.tsx` |
| Command Palette | `src/components/vscode/CommandPalette.tsx` |

## Known limitations

These are design choices, not launch blockers:

- No deep URL for a virtual file. Refresh resets the workspace.
- Contact opens the visitor’s email app (`mailto:`). Nothing is posted to a server.
- Terminal is a finite portfolio command list. No arbitrary shell execution.
- Search indexes curated portfolio copy. It does not parse the PDF or the git repo.
- Source Control is Git-inspired portfolio history, not real commits.
- Extensions is a technology toolbox, not the VS Code Marketplace.
- Native PDF embedding differs by browser. Open PDF and Download Resume always work.
- Canonical / `og:url` wait until `VITE_SITE_URL` is a real public origin.
- No analytics or tracking.

## Optional later

- Connect a custom domain, then set `VITE_SITE_URL` and rebuild.
- Add a 1200 × 630 social image and matching `og:image` tags.
- Add Search Console verification only if you choose to.
- Analytics would be a separate, privacy-conscious decision.
