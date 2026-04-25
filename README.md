# Movies App

A React + Vite frontend to browse movies using The Movie Database (TMDB) API. Includes favorites, trailers, and static assets.

## Features

- Browse popular and trending movies
- Movie details, cast, reviews, and trailers
- Mark favorites (persisted to `localStorage`)
- Static assets served from `public/imgs`

## Tech Stack

- Vite + React + TypeScript
- react-router
- react-icons

## Environment variables

Create a `.env` file at the project root (do not commit it). Required variables:

```
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY=YOUR_TMDB_API_KEY
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

If you deploy to Vercel, add the same `VITE_*` variables in the Project > Environment Variables (Production & Preview) so Vite can embed them at build time.

## Public images

Place static images in `public/imgs`. Reference them from code as `/imgs/...` (for example: `/imgs/cover.png`).

## Run locally

Install deps and start dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Deploying to Vercel

- Add required `VITE_*` env vars in Vercel Project settings.
- Ensure static images are in `public/imgs` (they'll be available at `/imgs/...`).
- Re-deploy after changes.

## Troubleshooting

- Images missing after deploy: verify `public/imgs` contains the files and Vercel build includes them. Use `/imgs/...` paths in code.
- Favorites not updating: confirm `FavoriteProvider` wraps the app in `src/main.tsx`.

## Project structure

- `src/components` — UI components
- `src/context` — favorites context and hooks
- `public/imgs` — static images

## License

MIT
