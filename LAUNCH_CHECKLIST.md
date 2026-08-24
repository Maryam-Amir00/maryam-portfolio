# Launch checklist

Production URL: Not assigned yet.

Status: Ready to deploy.

Leave live-only boxes unchecked until that check actually happens.

## Pre-deployment

- [x] `bun install` succeeds
- [x] `bun run lint` passes
- [x] `bun run build` passes
- [x] `bun run preview` works
- [x] Resume asset exists at `public/resume/Maryam-Amir-Resume.pdf`
- [x] Production `dist/resume/Maryam-Amir-Resume.pdf` exists
- [x] No fake links (`href="#"`)
- [x] No debug logs
- [x] No secrets in the repo
- [x] GitHub/LinkedIn remain hidden unless real URLs are set

## Deployment

Provider-neutral. Configure the host, then check:

- [ ] Build command is `bun run build`
- [ ] Output / publish directory is `dist`
- [ ] No SPA catch-all rewrite added
- [ ] HTTPS active
- [ ] Deployment document returns 200
- [ ] Keep the previous known-good deploy until live validation finishes

Do not add `vercel.json`, `netlify.toml`, or Render config unless that provider is chosen.

## Live checks

- [ ] Home loads (Maryam Amir, Full-Stack Developer, View Projects, Open Resume)
- [ ] About, Experience, Skills open
- [ ] StudySync, Movixxx, Stylique open
- [ ] Explorer works
- [ ] Search works (`React`, `JWT`, `Django`, `40%`, `10+`)
- [ ] Source Control notice is visible; snapshots open the right files
- [ ] Extensions filter works (`django`, `auth`, `database`, `deployment`)
- [ ] Terminal: `help`, `whoami`, `projects`, `studysync`, `resume`, unknown command, `clear`
- [ ] Command Palette opens, searches, Enter/Escape work
- [ ] Contact: validation, Copy Email, Compose Email (`mailto:`)
- [ ] Resume editor opens
- [ ] Resume downloads
- [ ] Direct PDF URL `/resume/Maryam-Amir-Resume.pdf` returns 200
- [ ] PDF is not fetched on initial Home load

## Responsive

- [ ] ~375px mobile (Home, Files, Search, Resume, Contact, bottom nav)
- [ ] Tablet overlay/sidebar
- [ ] 1366px laptop
- [ ] Large desktop (1440 / 1920)

## SEO

- [ ] Title: Maryam Amir | Full-Stack Developer
- [ ] Meta description present
- [ ] Favicon `/favicon.svg` loads
- [ ] `/robots.txt` is `User-agent: *` / `Allow: /`
- [ ] `og:title`, `og:description`, `og:type`
- [ ] Twitter card is `summary` (no missing large image)
- [ ] Canonical / `og:url` only after a final domain is set via `VITE_SITE_URL`
- [ ] Person JSON-LD: name, job title, email; no invented social URLs
- [ ] Social-platform debugger refresh if metadata changes after launch

## Post-launch

- [ ] Production console clean
- [ ] Production network clean (document, JS, CSS, favicon; PDF only after Resume)
- [ ] HTTPS verified
- [ ] HTTP redirects to HTTPS if the host exposes HTTP
- [ ] Mobile live test
- [ ] Resume live URL verified
- [ ] Recruiter five-minute path: Home → StudySync → Experience → Skills → Resume + Contact
- [ ] Lighthouse run if desired (do not chase scores)

## After replacing the resume

- [ ] Same filename `Maryam-Amir-Resume.pdf`
- [ ] Rebuild and redeploy
- [ ] Direct PDF URL shows the new file
- [ ] Host cache purged if the old file remains
