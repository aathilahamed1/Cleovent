# Cleovent - Netlify Deployment Guide

## 🚀 Quick Deploy to Netlify

Your application is ready for deployment! I've set up the necessary configuration files.

### Prerequisites
✅ Netlify CLI installed globally
✅ `netlify.toml` configuration created
✅ `_redirects` file for SPA routing
✅ Production build ready

---

## Option 1: Deploy via Netlify CLI (Recommended)

### Step 1: Login to Netlify
```bash
netlify login
```
This will open your browser to authenticate with Netlify.

### Step 2: Initialize Netlify Site
```bash
netlify init
```
Follow the prompts:
- **Create & configure a new site**: Select this option
- **Team**: Choose your team/account
- **Site name**: Enter "cleovent" or your preferred name
- **Build command**: `npm run build` (should be auto-detected)
- **Publish directory**: `dist` (should be auto-detected)

### Step 3: Deploy to Production
```bash
netlify deploy --prod
```

That's it! Your site will be live at `https://[your-site-name].netlify.app`

---

## Option 2: Deploy via Netlify Web UI

### Step 1: Build the Application
```bash
npm run build
```

### Step 2: Manual Upload
1. Go to [https://app.netlify.com/](https://app.netlify.com/)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `dist/` folder
4. Your site will be live instantly!

---

## Option 3: Connect GitHub Repository (Best for Continuous Deployment)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Cleovent Tamil Nadu CO2 Platform"
git remote add origin https://github.com/yourusername/cleovent.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [https://app.netlify.com/](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and select your repository
4. Build settings will be auto-detected from `netlify.toml`
5. Click "Deploy site"

**Benefit**: Every git push will automatically trigger a new deployment!

---

## Configuration Files Created

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

This ensures:
- ✅ Correct build command
- ✅ Correct publish directory
- ✅ SPA routing works (all routes redirect to index.html)
- ✅ Uses Node.js 18

### `_redirects`
```
/*    /index.html   200
```

Backup redirect rule for React Router to work properly.

---

## Post-Deployment

### Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS records as shown

### Environment Variables (If needed)
1. Go to Site settings → Environment variables
2. Add any API keys or secrets

### HTTPS
✅ Automatically enabled by Netlify!

---

## Quick Commands Reference

```bash
# Login
netlify login

# Initialize site
netlify init

# Deploy draft (test before production)
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site in browser
netlify open:site

# Check deployment status
netlify status
```

---

## Project URLs After Deployment

- **Live Site**: `https://[site-name].netlify.app`
- **Admin Dashboard**: `https://app.netlify.com/sites/[site-name]`
- **Deploy Logs**: Available in Netlify dashboard

---

## Expected Build Output

```
✓ built in ~3-5s
✓ Bundle size: ~144KB gzipped
✓ All routes working with SPA redirects
✓ Leaflet maps loading correctly
✓ Chart.js visualizations working
```

---

## Troubleshooting

### Build fails on Netlify
- Check Node version (should be 18)
- Verify all dependencies in `package.json`
- Check build logs in Netlify dashboard

### Routes return 404
- Ensure `netlify.toml` redirects are configured
- Verify `_redirects` file is in project root

### Maps not loading
- Check browser console for errors
- Verify Leaflet CSS is imported
- OpenStreetMap tiles should work without API key

---

## 🎉 Your Cleovent Platform Features

Once deployed, users can:
- 🗺️ View real Tamil Nadu map with emission zones
- 📊 Adjust emission factors for different sources
- 🌿 Deploy carbon capture interventions
- 📈 Analyze impact with interactive charts
- 📱 Access on any device (responsive design)

---

**Ready to deploy?** Run `netlify login` and then `netlify init` to get started!
