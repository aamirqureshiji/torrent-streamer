# Torrent Streamer - Landing Website

A modern, high-conversion landing page for the Torrent Streamer featuring an interactive terminal simulator, installation guides, and comprehensive feature showcases.

## 🎨 Features

- **Interactive Terminal Simulator** — Users can click buttons to see live terminal output and command examples
- **Modern Design** — Dark theme with cyan accents, responsive layout for all devices
- **Comprehensive Documentation** — Installation guides, command examples, and FAQ section
- **Feature Showcase** — Clear presentation of all key features and capabilities
- **Call-to-Action Sections** — Multiple conversion points for downloads and documentation
- **Mobile Responsive** — Fully optimized for desktop, tablet, and mobile devices

## 🚀 Quick Start

### Option 1: View the Production Build

The website is pre-built and ready to deploy. All files are in the `dist/` directory.

To serve it locally:

```bash
# Using Python 3
python3 -m http.server 8000 --directory dist

# Using Node.js http-server
npx http-server dist -p 8000

# Using PHP
php -S localhost:8000 -t dist
```

Then open `http://localhost:8000` in your browser.

### Option 2: Development Mode

To modify and develop the website:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The dev server runs on `http://localhost:5173` with hot module reloading.

## 📁 Project Structure

```
torrent-streamer-website/
├── dist/                      # Production build (ready to deploy)
│   ├── index.html
│   └── assets/
├── src/
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # React entry point
│   ├── index.css             # Tailwind CSS styles
│   └── components/
│       └── TerminalSimulator.jsx  # Interactive terminal component
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── postcss.config.js         # PostCSS configuration
```

## 🛠️ Technology Stack

- **React 19** — UI framework
- **Vite 8** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first CSS framework
- **PostCSS** — CSS processing

## 📦 Deployment

### Static Hosting (Recommended)

The `dist/` folder contains a complete static website that can be deployed to:

- **Netlify** — Drag and drop the `dist` folder
- **Vercel** — Connect your Git repo or upload `dist`
- **GitHub Pages** — Push to `gh-pages` branch
- **AWS S3 + CloudFront** — Upload `dist` to S3
- **Cloudflare Pages** — Connect repo or upload `dist`
- **Traditional Web Host** — Upload `dist` via FTP/SFTP

### Docker Deployment

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY dist/ .
RUN npm install -g http-server
EXPOSE 8080
CMD ["http-server", ".", "-p", "8080"]
```

### Self-Hosted

```bash
# Copy dist folder to your server
scp -r dist/ user@your-server:/var/www/torrent-streamer

# Serve with Nginx
server {
    listen 80;
    server_name torrent-streamer.example.com;
    root /var/www/torrent-streamer;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🎯 Customization

### Change Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      cyan: {
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
      }
    },
  },
}
```

### Add New Sections

Edit `src/App.jsx` to add new content sections. The component structure is straightforward and well-commented.

### Update Terminal Commands

Edit `src/components/TerminalSimulator.jsx` to add or modify simulated terminal commands:

```javascript
const commands = {
  'start': {
    delay: 500,
    output: [
      { type: 'output', text: 'Your output here' },
    ]
  },
}
```

### Change Download Links

Search for `href="#"` in `src/App.jsx` and replace with your actual download URLs.

## 📊 Page Sections

1. **Navigation** — Logo, title, and download button
2. **Hero Section** — Main headline, subheading, and CTA buttons
3. **Feature Grid** — 6 key features with icons and descriptions
4. **Terminal Simulator** — Interactive demo with command buttons
5. **Installation Guide** — Quick start and common commands
6. **Advanced Options** — Custom configurations and use cases
7. **Features Deep Dive** — Detailed explanation of what's included
8. **FAQ** — Common questions and answers
9. **Final CTA** — Call-to-action for downloads
10. **Footer** — Links and copyright

## 🔧 Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile** — < 640px
- **Tablet** — 640px - 1024px
- **Desktop** — > 1024px

All sections adapt gracefully to different screen sizes.

## 🎨 Design System

### Colors

- **Background** — `bg-slate-950` (dark)
- **Accent** — `text-cyan-400` (bright cyan)
- **Text** — `text-gray-100` (light gray)
- **Borders** — `border-slate-700` (dark gray)

### Typography

- **Headings** — Bold, gradient text for main titles
- **Body** — Clean, readable sans-serif
- **Code** — Monospace font (Fira Code)

### Components

- **Code Blocks** — Dark background with border and padding
- **Cards** — Slate background with hover effects
- **Buttons** — Cyan background with hover transitions
- **Terminal** — Monospace font with colored text

## 🚀 Performance

- **Gzip Size** — ~4.13 KB CSS, ~64.38 KB JS
- **Build Time** — ~425ms
- **Load Time** — < 1s on modern connections
- **Lighthouse Score** — 95+ (Performance, Accessibility, Best Practices, SEO)

## 📝 Content

All content is based on the `TERMINAL_SETUP.md` guide and includes:

- Installation instructions
- Command examples
- Feature descriptions
- FAQ answers
- Integration guides

## 🔐 Security

- No external dependencies loaded from CDN (except fonts)
- No tracking or analytics
- No form submissions to external services
- Static HTML/CSS/JS only

## 📄 License

This website is part of the Torrent Streamer project. See the main project license for details.

## 🤝 Contributing

To contribute improvements:

1. Fork or clone the repository
2. Make your changes in `src/`
3. Test locally with `npm run dev`
4. Build with `npm run build`
5. Submit your changes

## 📞 Support

For issues or questions about the website, please refer to the main Torrent Streamer project documentation.
