# GeminiSearchEngine

Lightweight search/QA web app (Vite + React front-end, Express/TypeScript backend). This repo contains a client app in `client/` and a Node/Express server in `server/` along with local DB tools.

## Quick summary
- Client: `client/` (Vite + React + Tailwind)
- Server: `server/` (TypeScript, Express)
- Local DB: `dev.db` (SQLite used during development)
- Build: `dist/` output (server bundle + client build)

## Features
- Upload documents and extract text
- Search interface with answer display and source references
- Uses embeddings / external API (requires API key)

## Prerequisites
- Node.js (v18+ recommended)
- npm (or yarn/pnpm)
- Git

## Install
From project root:

```powershell
# install deps
npm ci
# or
npm install
```

## Environment
Create a `.env` file in the project root. This project expects at least the following environment variables during development:

- `DATABASE_URL` — e.g. `sqlite:./dev.db`
- `API_KEY` — your provider API key used by the app (do NOT commit)
- `GEMINI_API_KEY` — (if using Gemini provider)
- `NODE_ENV` — `development` or `production`
- `PORT` — server port (default `3000`)

A safe example file is included as `.env.example` — copy it to `.env` and fill in values.

Important: the repository previously had a `.env` containing real keys. If you ever committed an API key, rotate it immediately (revoke and reissue in the provider console).

## Run (development)
The `package.json` contains these scripts. Use PowerShell from the project root.

```powershell
# run server + dev tooling
npm run dev
```

The `dev` script uses `tsx server/index.ts` and sets `NODE_ENV=development`.

## Build & Start (production)
```powershell
# build client + bundle server
npm run build

# after build, run the bundled server
npm run start
```

The `build` script runs `vite build` for the client and `esbuild` to bundle `server/index.ts` into `dist/`.

## Database
During development this project uses a local SQLite DB (`dev.db`). The repo contains `drizzle` tooling; see `drizzle.config.ts` and the `db:push` script:

```powershell
npm run db:push
```

Do NOT commit `dev.db` to the repo. It is now added to `.gitignore`.

## Security & publishing to GitHub (important)
Before pushing this repository to GitHub, make sure you:

1. Remove secrets and local files from the index
   ```powershell
   git rm --cached .env
   git rm --cached dev.db
   git rm --cached -r node_modules
   git add .gitignore
   git commit -m "Remove local secrets & DB; update .gitignore"
   git push
   ```

2. Rotate any API keys that were committed previously. Removing a key from git history does not revoke the key — you must rotate it in the provider console.

3. If secrets were already pushed and you need to remove them from history, use a history-rewrite tool such as BFG or `git filter-repo`. Rewriting history requires force-push and coordination with collaborators.

Recommended short checklist before publishing:
- [ ] `.env` removed from Git and replaced with `.env.example`
- [ ] `dev.db` and other local DB files not tracked
- [ ] `node_modules/` not tracked
- [ ] `dist/` not tracked
- [ ] Large assets in `attached_assets/` reviewed (use Git LFS if needed)

## Project structure
```
client/        # React app (Vite, src, components)
server/        # Express TypeScript server
shared/        # Shared schema/types
attached_assets/ # Uploaded assets (review before pushing)
```

## Contributing
- Use feature branches.
- Keep secrets out of the repo — use environment variables in CI/providers.

## Notes
- I updated `.gitignore` to ignore `dev.db`, `*.db`, `*.sqlite`, `.vscode/` and `.local/` as well as local `.env` variants.
- If you want, I can run the git checks for you and remove tracked files from the index.

---

If you'd like, I can also:
- create a small GitHub-friendly `.gitignore` PR (already updated locally),
- remove tracked `.env`/`dev.db` from Git index for you, or
- prepare an example `deploy.md` describing how to set secrets in common providers (Vercel, Netlify, Render, Heroku, etc.).
