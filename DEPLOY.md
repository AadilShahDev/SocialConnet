# Vercel Deployment Guide

## Deployment Strategy

This app uses a **split deployment** approach:
- **Backend API**: Deploy to Vercel (separate project)
- **Frontend**: Deploy to Vercel (separate project) or Netlify

## Step 1: Deploy Backend API

### 1.1 Prepare Backend for Deployment

The backend is ready for Vercel deployment.

### 1.2 Deploy Backend

**Option A: Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy backend only
cd backend
vercel

# Follow prompts:
# - Project name: social-connect-api
# - Deploy: Yes
```

**Option B: Vercel Dashboard**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/new)
3. Import repository
4. Set **Root Directory** to: `backend`
5. Click Deploy

### 1.3 Add Backend Environment Variables

In Vercel project settings, add:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/socialconnect
JWT_SECRET=your_secure_random_string_here
SESSION_SECRET=your_secure_session_secret_here
FRONTEND_URL=https://your-frontend-app.vercel.app

TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_TOKEN_SECRET=your_secret
TWITTER_BEARER_TOKEN=your_bearer

LINKEDIN_CLIENT_ID=your_id
LINKEDIN_CLIENT_SECRET=your_secret

FACEBOOK_APP_ID=your_id
FACEBOOK_APP_SECRET=your_secret

TIKTOK_CLIENT_KEY=your_key
TIKTOK_CLIENT_SECRET=your_secret
```

**Note your backend URL**: `https://your-api.vercel.app`

## Step 2: Deploy Frontend

### 2.1 Update Frontend API URL

Before deploying frontend, add this environment variable:

**In Vercel (for frontend project):**
```
REACT_APP_API_URL=https://your-backend-api.vercel.app
```

### 2.2 Deploy Frontend

**Option A: Vercel CLI**
```bash
cd frontend
vercel

# Project name: social-connect
# Deploy: Yes
```

**Option B: Vercel Dashboard**
1. Create new project on Vercel
2. Import same repository
3. Set **Root Directory** to: `frontend`
4. Add environment variable: `REACT_APP_API_URL=https://your-backend-api.vercel.app`
5. Click Deploy

## Step 3: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE cluster
3. Database Access → Add User (save username/password)
4. Network Access → Add IP: `0.0.0.0/0` (allow all - needed for Vercel)
5. Connect → Get connection string
6. Add to backend Vercel env as `MONGODB_URI`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/socialconnect?retryWrites=true&w=majority
```

## Step 4: Update Social Media App Settings

Update callback URLs in your social media developer consoles:

**Twitter Developer Portal:**
- Callback URL: `https://your-backend-api.vercel.app/auth/twitter/callback`

**LinkedIn Developers:**
- Redirect URL: `https://your-backend-api.vercel.app/auth/linkedin/callback`

**Facebook Developers:**
- OAuth Redirect URI: `https://your-backend-api.vercel.app/auth/facebook/callback`

**TikTok Developers:**
- Redirect URI: `https://your-backend-api.vercel.app/auth/tiktok/callback`

## Alternative: Single Vercel Deployment

If you prefer single deployment, you can build frontend as static files:

```bash
# Build frontend
cd frontend
npm run build

# Copy build to backend/public
mkdir ../backend/public
cp -r build/* ../backend/public/

# Deploy only backend (with static files)
cd ../backend
vercel
```

Then update `backend/server.js` to serve static files:
```javascript
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}
```
