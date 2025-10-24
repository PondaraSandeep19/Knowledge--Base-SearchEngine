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




