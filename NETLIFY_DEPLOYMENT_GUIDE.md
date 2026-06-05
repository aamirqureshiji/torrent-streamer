# Deploying Torrent Streamer Website to Netlify

This guide walks you through deploying your Torrent Streamer landing website to Netlify for free, with automatic deployments and a custom domain.

## 📋 Prerequisites

- A GitHub account (or GitLab/Bitbucket)
- A Netlify account (free at https://netlify.com)
- The website source code

## 🚀 Step-by-Step Deployment

### Step 1: Push to GitHub

First, push your website code to GitHub:

```bash
# If you haven't already created a GitHub repo
# Go to https://github.com/new and create a new repository called "torrent-streamer-website"

# Then from your local machine:
cd /path/to/torrent-streamer-website
git remote add origin https://github.com/YOUR-USERNAME/torrent-streamer-website.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to https://app.netlify.com/signup
2. Click "Sign up with GitHub"
3. Authorize Netlify to access your GitHub account
4. Click "New site from Git"
5. Select GitHub as your Git provider
6. Search for and select `torrent-streamer-website` repository
7. Click "Deploy site"

### Step 3: Configure Build Settings

Netlify should automatically detect the build settings from `netlify.toml`, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 or higher (set in netlify.toml or environment variables)

If you need to manually set these:
1. Go to Site Settings → Build & Deploy → Build settings
2. Update the build command and publish directory
3. Click "Save"

### Step 4: Wait for Deployment

Netlify will automatically:
1. Clone your repository
2. Install dependencies (`npm install`)
3. Build the site (`npm run build`)
4. Deploy to their CDN

You'll see a deploy log showing progress. Once it says "Published", your site is live!

### Step 5: Get Your Live URL

After deployment, Netlify assigns a temporary URL like:
```
https://random-name-12345.netlify.app
```

You can find this in:
- Site overview page
- Site settings → General → Site details

## 🎯 Custom Domain Setup

### Option 1: Use a Domain You Already Own

1. Go to Site Settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `torrent-streamer.com`)
4. Follow the DNS configuration instructions
5. Update your domain registrar's DNS records to point to Netlify

### Option 2: Buy a Domain Through Netlify

1. Go to Site Settings → Domain management
2. Click "Add custom domain"
3. Click "Register new domain"
4. Search for and purchase your domain
5. Netlify automatically configures DNS

## 🔒 Enable HTTPS

Netlify automatically provides free HTTPS with Let's Encrypt:

1. Go to Site Settings → Domain management
2. Under "HTTPS", you should see "Netlify's SSL certificate"
3. If not enabled, click "Verify DNS configuration"

Your site is now secure at `https://your-domain.com`

## 🔄 Automatic Deployments

Every time you push to your GitHub repository, Netlify automatically:

1. Detects the new commit
2. Builds your site
3. Deploys the new version
4. Updates your live site

No manual deployment needed!

### Preview Deployments

Netlify also creates preview deployments for pull requests:

1. Create a pull request on GitHub
2. Netlify automatically builds and deploys a preview
3. You can test changes before merging
4. Once merged to main, it goes live

## 📊 Monitoring & Analytics

### View Deploy Logs

1. Go to Deploys tab
2. Click any deploy to see detailed logs
3. Useful for debugging build errors

### Enable Analytics

1. Go to Site Settings → Analytics
2. Enable Netlify Analytics (free tier available)
3. View visitor statistics and performance metrics

## 🔧 Environment Variables

If you need environment variables (for future features):

1. Go to Site Settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add your variables (e.g., `API_KEY=value`)
4. Trigger a new deploy for changes to take effect

## 🚨 Troubleshooting

### Build Fails

Check the deploy log:
1. Go to Deploys tab
2. Click the failed deploy
3. Scroll to see the error message
4. Common issues:
   - Wrong Node version → Update `package.json` engines field
   - Missing dependencies → Run `npm install` locally and commit `package-lock.json`
   - Build command wrong → Check `netlify.toml`

### Site Shows 404 Errors

Make sure `netlify.toml` has the redirect rule:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures all routes serve `index.html` for the React app.

### DNS Not Working

1. Verify DNS records are correctly set at your registrar
2. Wait 24-48 hours for DNS propagation
3. Use https://dns-checker.com to verify records

## 📈 Performance Optimization

Netlify automatically optimizes your site:

- **CDN** — Serves from edge locations worldwide
- **Image optimization** — Automatic image resizing and compression
- **Caching** — Intelligent cache headers
- **Minification** — Automatic CSS/JS minification

To further optimize:

1. Go to Site Settings → Build & Deploy → Post processing
2. Enable:
   - Asset optimization
   - Pretty URLs
   - Minify CSS/JS

## 🔐 Security

Netlify provides:

- **HTTPS** — Free SSL certificate
- **DDoS protection** — Built-in
- **Access control** — Password protection available
- **Signed URLs** — For secure file downloads

### Enable Password Protection (Optional)

1. Go to Site Settings → Access control
2. Click "Restrict access"
3. Set username and password
4. Only authenticated users can access your site

## 💰 Pricing

**Free Tier Includes:**
- Unlimited sites
- Continuous deployment
- Free SSL certificate
- 300 build minutes/month
- 100 GB bandwidth/month

**Pro Tier** ($19/month):
- 3000 build minutes/month
- 1 TB bandwidth/month
- Priority support
- Advanced analytics

For this website, the free tier is more than sufficient.

## 🔄 Updating Your Site

To update your website:

1. Make changes locally
2. Commit and push to GitHub
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. Netlify automatically deploys the new version
4. Your live site updates within 1-2 minutes

## 📝 Useful Links

- **Netlify Dashboard:** https://app.netlify.com
- **Netlify Docs:** https://docs.netlify.com
- **Build Configuration:** https://docs.netlify.com/configure-builds/overview/
- **Environment Variables:** https://docs.netlify.com/configure-builds/environment-variables/
- **Custom Domains:** https://docs.netlify.com/domains-https/custom-domains/

## 🎉 You're Done!

Your Torrent Streamer website is now live on Netlify with:

✅ Automatic deployments from GitHub
✅ Free HTTPS with custom domain
✅ Global CDN for fast loading
✅ Unlimited visitors
✅ Professional hosting

Share your site URL with the world!

## 💡 Next Steps

1. **Add analytics** — Track visitor behavior
2. **Set up email notifications** — Get alerted on deploy failures
3. **Configure redirects** — For old URLs if migrating
4. **Add forms** — Use Netlify Forms for contact submissions
5. **Monitor performance** — Use Netlify Analytics or Google Analytics

Enjoy your permanently hosted Torrent Streamer website! 🚀
