# Django backend (server)

This folder contains a minimal Django + Django REST Framework API configured to use PostgreSQL via the `DATABASE_URL` environment variable.

Quick start (local, sqlite fallback):

1. Create a Python environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Copy `.env.example` to `.env` and update values (for local dev you can leave `DATABASE_URL` empty to use sqlite).

3. Run migrations and start:

```bash
python manage.py migrate
python manage.py runserver
```

API endpoints:
- `GET /api/projects/` — list projects (pre-seeded pinned projects in the frontend; this endpoint is for future syncing)
- `POST /api/contact/` — accept JSON payload `{ "name": "...", "email": "...", "message": "..." }`

Deployment note:
- You requested Vercel. Vercel does not natively run long-lived WSGI processes. To deploy a Django app on Vercel you can either:
  - Build a Docker image and use Vercel's Docker support (advanced), or
  - Deploy to a platform designed for full-stack Django apps (Render, Railway, Heroku). These are easier for Postgres-backed Django apps.

If you want, I can add a `Dockerfile` and `vercel.json` to attempt a Vercel Docker-based deployment — tell me and I will add them and test locally.

Render deployment (recommended)
-------------------------------
This project includes a `Dockerfile` and `Procfile` which make deploying to Render straightforward.

Quick steps to deploy on Render:

1. Push this repo to GitHub (if not already).
2. In the Render dashboard, create a new **Web Service** and connect your GitHub repo.
  - For **Environment**, choose **Docker** (use the included `server/Dockerfile`), or choose **Static Site / Web Service (Python)** and set build/start commands as shown below.
3. Add a managed Postgres database in Render (or provide your external Postgres) and copy its connection URL.
4. In your service settings, add environment variables:
  - `DATABASE_URL` — your Postgres URL (Render provides this when creating a database)
  - `SECRET_KEY` — a long random string
  - `DEBUG` — set to `False` for production
  - `ALLOWED_HOSTS` — add your Render service domain (e.g. `my-service.onrender.com`)
5. Deploy. Render will build the Docker image and start the web service.

If you prefer Render's native Python environment instead of Docker, set the build and start commands:

Build command:
```
pip install -r server/requirements.txt
python server/manage.py collectstatic --noinput
```

Start command:
```
gunicorn server_project.wsgi:application --bind 0.0.0.0:$PORT
```

Notes:
- Create a Render Postgres service and set `DATABASE_URL` from the database dashboard. Use the same DB for migrations.
- Make sure `ALLOWED_HOSTS` contains your Render domain.
- The included `render.yaml` (repo root) can be used with Render's GitHub integration to create the service automatically — you may need to edit `name`, `repo`, or `branch` values to match your project.
