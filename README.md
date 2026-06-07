# Personal Portfolio

This repository contains a React frontend and a minimal Django REST API backend (in `server/`).

Frontend (Vercel)
- I added `vercel.json` so Vercel will build the frontend automatically. Connect this repository to your Vercel account and deploy — Vercel will detect the project as a static site.
- Set the environment variable `VITE_API_BASE` in your Vercel project settings to point to your backend API (for example `https://personal-portfolio-server.onrender.com`). This ensures the contact form posts to the correct server.

Backend (Render)
- The backend is a Django app prepared for Postgres. I recommend deploying it on Render (or Railway/Heroku) using the included `server/Dockerfile` or the build/start commands in `server/README.md`.

Local development
- Frontend: `npm install` then `npm run dev`
- Backend: see `server/README.md` for setting up the Python environment and running the Django app.
