# 🎬 Torrent Streamer

A complete self-hosted torrent streaming solution with a beautiful terminal CLI, web dashboard, and landing website. Stream any torrent directly while downloading, with seamless integration to Plex or Jellyfin.

## 📦 What's Included

This repository contains everything you need:

### 1. **Torrent Streamer Application** (`app-*` folders)
   - Self-hosted backend with WebTorrent engine
   - Express.js API server
   - HTTP range streaming for instant playback
   - Terminal CLI with beautiful UI
   - macOS executables (arm64 & x64)

### 2. **Landing Website** (`website/` folder)
   - Modern React + Vite + Tailwind CSS
   - Interactive terminal simulator
   - Installation guides and documentation
   - Ready to deploy on Netlify
   - Fully responsive design

### 3. **Complete Documentation**
   - Terminal setup guides
   - Netlify deployment instructions
   - Plex/Jellyfin integration guides
   - Quick start references

## 🚀 Quick Start

### Option 1: Terminal Application (macOS)

```bash
# Download the macOS executable
# Extract torrent-streamer-macos.zip

# Install globally
cd torrent-streamer
./install.sh

# Start the server
torrent-streamer start

# Open dashboard
http://localhost:8080
```

See [TERMINAL_SETUP.md](./TERMINAL_SETUP.md) for full instructions.

### Option 2: Deploy the Website

```bash
# Push to GitHub
git push origin main

# Connect to Netlify
# 1. Go to https://app.netlify.com/signup
# 2. Sign up with GitHub
# 3. Click "New site from Git"
# 4. Select this repository
# 5. Click "Deploy"
```

See [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) for full instructions.

## 📁 Repository Structure

```
torrent-streamer/
├── website/                          # Landing website (React + Vite)
│   ├── src/                         # React source code
│   ├── dist/                        # Production build
│   ├── package.json                 # Dependencies
│   ├── netlify.toml                 # Netlify config
│   └── tailwind.config.js           # Tailwind CSS config
│
├── app-src/                         # Torrent Streamer backend
│   └── server.js                    # Express.js server
│
├── app-dist/                        # Pre-built macOS executables
│   ├── torrent-streamer-arm64       # Apple Silicon
│   └── torrent-streamer-x64         # Intel Mac
│
├── bin/                             # CLI wrapper
│   └── torrent-streamer             # Terminal command
│
├── docs/                            # Documentation
│   └── Terminal-Installation.md
│
├── install.sh                       # Installation script
├── build-macos.sh                   # Build script for macOS
├── TERMINAL_SETUP.md                # Terminal setup guide
├── DEPLOYMENT_SUMMARY.md            # Website deployment overview
├── NETLIFY_DEPLOYMENT_GUIDE.md      # Detailed Netlify guide
├── NETLIFY_QUICK_START.txt          # 5-minute quick reference
└── WEBSITE_README.md                # Website customization guide
```

## ✨ Features

### Torrent Streamer App
- ⚡ **Instant Streaming** — Stream torrents while downloading with HTTP range requests
- 🎮 **Beautiful Terminal UI** — Colored output, progress indicators, status messages
- 🔒 **Private & Secure** — Everything runs on your hardware, no cloud
- 📡 **HTTP Streaming** — Compatible with any media player
- 🎯 **Always-On Ready** — Run as background service or LaunchAgent
- 📦 **Standalone Executable** — No installation needed on macOS
- 🎬 **Media Server Ready** — Integrate with Plex or Jellyfin

### Landing Website
- 🎨 **Modern Design** — Dark theme with cyan accents
- 📱 **Responsive** — Works on all devices
- ⚡ **Interactive Demo** — Try commands in the browser
- 🚀 **Fast CDN** — Deployed on Netlify's global network
- 🔒 **Free HTTPS** — Automatic SSL certificate
- 📊 **Analytics Ready** — Track visitors

## 🛠️ Technology Stack

### Application
- **Node.js 18+** — Runtime
- **Express.js** — Web framework
- **WebTorrent** — Torrent engine
- **Bash** — CLI wrapper

### Website
- **React 19** — UI framework
- **Vite 8** — Build tool
- **Tailwind CSS 4** — Styling
- **PostCSS** — CSS processing

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [TERMINAL_SETUP.md](./TERMINAL_SETUP.md) | How to install and run the terminal app |
| [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) | Overview of website deployment |
| [NETLIFY_DEPLOYMENT_GUIDE.md](./NETLIFY_DEPLOYMENT_GUIDE.md) | Complete step-by-step Netlify setup |
| [NETLIFY_QUICK_START.txt](./NETLIFY_QUICK_START.txt) | 5-minute quick reference |
| [WEBSITE_README.md](./WEBSITE_README.md) | Website customization and development |
| [APP_README.md](./APP_README.md) | Application architecture and API |
| [docs/Terminal-Installation.md](./docs/Terminal-Installation.md) | Detailed terminal installation |

## 🎯 Common Tasks

### Run the Torrent Streamer

```bash
# Foreground (with live output)
torrent-streamer start

# Background (as service)
torrent-streamer start --background

# Custom port
torrent-streamer start --port 3000

# With authentication
torrent-streamer start --user admin --pass secure123
```

### Update the Website

```bash
# Make changes in website/src/
npm run dev  # Test locally

# Build for production
npm run build

# Push to GitHub (Netlify auto-deploys)
git add .
git commit -m "Update: description"
git push origin main
```

### Deploy Website to Netlify

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to https://app.netlify.com
# 3. Click "New site from Git"
# 4. Select this repository
# 5. Click "Deploy"
```

## 🔗 Links

- **Website:** https://your-netlify-url.netlify.app
- **GitHub:** https://github.com/aamirqureshiji/torrent-streamer
- **Netlify:** https://app.netlify.com

## 💰 Cost

### Application
- **Free** — Self-hosted on your hardware

### Website
- **Free** — Netlify free tier includes:
  - Unlimited sites
  - Free HTTPS
  - Global CDN
  - 300 build minutes/month
  - 100 GB bandwidth/month

## 📋 Requirements

### For Terminal App
- macOS 10.13+
- 2 GB free disk space
- 500 MB RAM minimum

### For Website Development
- Node.js 18+
- npm or yarn
- Git

## 🚀 Getting Started

1. **Read** [TERMINAL_SETUP.md](./TERMINAL_SETUP.md) for the application
2. **Read** [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) for the website
3. **Choose** which to deploy first
4. **Follow** the step-by-step guides
5. **Enjoy** your self-hosted torrent streaming!

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is provided as-is. Please ensure you comply with local laws regarding torrent usage.

## ⚠️ Legal Notice

This tool is designed for streaming legal torrents (open-source software, public domain content, etc.). Users are responsible for ensuring their use complies with local laws and terms of service of content providers.

## 🆘 Support

- **Issues:** Open an issue on GitHub
- **Discussions:** Use GitHub Discussions
- **Documentation:** See the guides in this repository

## 🎉 Features Roadmap

- [ ] Docker support
- [ ] Linux builds
- [ ] Web-based torrent upload
- [ ] Subtitle support
- [ ] Playlist management
- [ ] Multi-user support
- [ ] API documentation

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for self-hosting enthusiasts**

Made with React, Vite, Tailwind CSS, Express.js, and WebTorrent.
