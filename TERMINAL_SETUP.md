# 🎬 Torrent Streamer - Terminal Setup Guide

Get Torrent Streamer running in your terminal with just a few commands.

## ⚡ Quick Start (30 seconds)

```bash
# 1. Extract the ZIP
unzip torrent-streamer-macos.zip
cd torrent-streamer

# 2. Run the installer
./install.sh

# 3. Start the server
torrent-streamer start
```

That's it! Your dashboard is now at **http://localhost:8080**

## 📋 Installation Steps

### Step 1: Download & Extract

Download the `torrent-streamer-macos.zip` file and extract it:

```bash
unzip torrent-streamer-macos.zip
cd torrent-streamer
```

### Step 2: Run the Installer

```bash
./install.sh
```

This will:
- Make the CLI executable
- Install `torrent-streamer` as a global command
- Create a data directory at `~/.torrent-streamer`

### Step 3: Start the Server

```bash
torrent-streamer start
```

You'll see:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎬 Torrent Streamer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ℹ Starting Torrent Streamer...

ℹ Dashboard: http://localhost:8080
ℹ Downloads: /Users/yourname/.torrent-streamer/downloads

ℹ Press Ctrl+C to stop the server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Torrent streamer listening at http://0.0.0.0:8080
Downloads: /Users/yourname/.torrent-streamer/downloads
```

Open **http://localhost:8080** in your browser and start adding torrents!

## 🎮 Terminal Commands

### Start the server (foreground)
```bash
torrent-streamer start
```
Shows live output. Press **Ctrl+C** to stop.

### Start in background
```bash
torrent-streamer start --background
```
Server runs even after closing the terminal.

### Stop the background server
```bash
torrent-streamer stop
```

### Check status
```bash
torrent-streamer status
```

### View logs
```bash
torrent-streamer logs
```

### Open dashboard in browser
```bash
torrent-streamer open
```

### Show data directory
```bash
torrent-streamer data
```

### Show help
```bash
torrent-streamer help
```

## ⚙️ Advanced Options

### Custom Port
```bash
torrent-streamer start --port 3000
```

### With Authentication
```bash
torrent-streamer start --user admin --pass your-password
```

### Custom Download Directory
```bash
torrent-streamer start --dir /Volumes/ExternalDrive/torrents
```

### Background + Custom Settings
```bash
torrent-streamer start --port 3000 --user admin --pass secure123 --background
```

## 🔐 Security

Before exposing to the internet, set a username and password:

```bash
torrent-streamer start --user admin --pass your-secure-password
```

Use a strong password (20+ characters recommended).

## 🚀 Always-On Setup

### Option 1: LaunchAgent (Recommended)

Create `~/.config/torrent-streamer/launch-agent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.local.torrent-streamer</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/torrent-streamer</string>
        <string>start</string>
        <string>--background</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/Users/yourname/Library/Logs/torrent-streamer.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/yourname/Library/Logs/torrent-streamer-error.log</string>
</dict>
</plist>
```

Replace `yourname` with your username. Load it:

```bash
launchctl load ~/.config/torrent-streamer/launch-agent.plist
```

To stop:

```bash
launchctl unload ~/.config/torrent-streamer/launch-agent.plist
```

### Option 2: Simple Background Process

```bash
torrent-streamer start --background
```

Stop with:

```bash
torrent-streamer stop
```

## 📁 Data Storage

All downloads and state are stored in:

```
~/.torrent-streamer/
├── downloads/          # Your downloaded files
├── state/              # Torrent metadata
└── torrent-streamer.log # Server logs
```

To use a custom location:

```bash
DATA_DIR=/Volumes/ExternalDrive/torrents torrent-streamer start
```

## 🔧 Troubleshooting

### "Command not found: torrent-streamer"

Try opening a new terminal window. If it still doesn't work:

```bash
/path/to/torrent-streamer/bin/torrent-streamer start
```

Or reinstall:

```bash
./install.sh
```

### "Cannot open because the developer cannot be verified"

Remove the quarantine flag:

```bash
xattr -d com.apple.quarantine ~/.torrent-streamer/*
```

### Port 8080 already in use

Use a different port:

```bash
torrent-streamer start --port 3000
```

### Server won't start

Check the logs:

```bash
torrent-streamer logs
```

Or run in foreground to see errors:

```bash
torrent-streamer start
```

## 🗑️ Uninstalling

Remove the global command:

```bash
torrent-streamer uninstall
```

Remove all data:

```bash
rm -rf ~/.torrent-streamer
```

## 📺 Integration with Plex/Jellyfin

Point your media server library to:

```
~/.torrent-streamer/downloads
```

See the included `docs/Plex_Jellyfin_Integration_Guide.md` for detailed instructions.

## 💡 Tips

- **Always-on server:** Use the LaunchAgent setup to start automatically on boot
- **Remote access:** Set username/password and use a reverse proxy with HTTPS
- **Large downloads:** Use an external drive: `--dir /Volumes/ExternalDrive/torrents`
- **Monitor logs:** `tail -f ~/.torrent-streamer/torrent-streamer.log`

## 📞 Need Help?

```bash
torrent-streamer help
```

For more detailed information, see:
- `docs/Terminal-Installation.md` — Full terminal guide
- `docs/macOS-Setup.md` — macOS-specific setup
- `docs/Plex_Jellyfin_Integration_Guide.md` — Media server integration
- `README.md` — Project overview
