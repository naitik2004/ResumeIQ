# Deployment Guide: ResumeIQ

Since ResumeIQ is a full-stack application (FastAPI + React), you have two main ways to deploy it.

## Option 1: The "Best Performance" Way (Recommended)
**Frontend:** Vercel | **Backend:** Render or Railway

This is the standard for modern apps because it avoids Vercel's serverless timeout limits for the AI streaming.

### Step 1: Deploy Backend (Render.com)
1. Sign up for [Render.com](https://render.com).
2. Create a **New Web Service** and connect your GitHub repo.
3. **Root Directory:** `backend`
4. **Runtime:** `Python`
5. **Build Command:** `pip install -r requirements.txt`
6. **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. **Environment Variables:** Add your `GROQ_API_KEY`.

### Step 2: Deploy Frontend (Vercel)
1. Sign up for [Vercel](https://vercel.com).
2. Import your GitHub repo.
3. **Root Directory:** `frontend`
4. **Framework Preset:** `Vite`
5. **Build Command:** `npm run build`
6. **Environment Variables:**
   - Create a file `frontend/.env.production` (or add in Vercel UI):
   - `VITE_API_URL=https://your-backend-url.onrender.com`
7. **Update API Calls:** Ensure `frontend/src/services/api.js` uses the environment variable for the URL.

---

## Option 2: All-in-One Vercel Deployment
To deploy both to Vercel, you need a `vercel.json` in your **root directory**.

### 1. Create `vercel.json` (Root)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/app/main.py",
      "use": "@vercel/python"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "backend/app/main.py"
    },
    {
      "source": "/(.*)",
      "destination": "frontend/$1"
    }
  ]
}
```

### 2. Move Requirements
Vercel's Python runtime looks for `requirements.txt` in the same directory as the entry point or root. You should copy `backend/requirements.txt` to the root directory.

### Important Considerations for Vercel:
- **Serverless Timeouts:** Vercel Free tier has a 10s execution limit. If the AI takes longer than 10s to start streaming, the request might fail.
- **Streaming:** Vercel *does* support streaming, but it can be finicky with FastAPI depending on the region.

### My Recommendation:
Go with **Option 1**. It is much more stable for AI applications, and both platforms (Vercel and Render) have excellent free tiers.
