# Torrent Streamer - Terminal Installation & Usage Guide

This guide explains how to install and run Torrent Streamer directly from your macOS terminal with a single command.

## One-Line Installation

Copy and paste this into your terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/your-repo/torrent-streamer/main/install.sh | bash
```

Or, if you have the files locally:

```bash
./install.sh
```

This will:
1. Extract the application
2. Make the CLI executable
3. Install it as a global command (`torrent-streamer`)
4. Create a data directory at `~/.torrent-streamer`

## Manual Installation

If you prefer to install manually:

```bash
# 1. Extract the downloaded ZIP
unzip torrent-streamer-macos.zip
cd torrent-streamer

# 2. Make the CLI executable
chmod +x bin/torrent-streamer

# 3. Install as a global command (optional)
./bin/torrent-streamer install

# 4. Start the server
torrent-streamer start
```

## Quick Start

After installation, simply open Terminal and run:

```bash
torrent-streamer start
```

This will:
- Start the Torrent Streamer on port 8080
- Display the dashboard URL
- Open your browser automatically
- Show live output in the terminal

Press **Ctrl+C** to stop the server.

## Common Commands

### Start the server in the foreground (with live output)

```bash
torrent-streamer start
```

### Start the server in the background

```bash
torrent-streamer start --background
```

The app will continue running even after you close the terminal.

### Stop the background server

```bash
torrent-streamer stop
```

### Check the status

```bash
torrent-streamer status
```

### View recent logs

```bash
torrent-streamer logs
```

### Open the dashboard in your browser

```bash
torrent-streamer open
```

### Show the data directory

```bash
torrent-streamer data
```

## Advanced Options

### Custom Port

```bash
torrent-streamer start --port 3000
```

### With Authentication

```bash
torrent-streamer start --user admin --pass your-secure-password
```

### Custom Download Directory

```bash
torrent-streamer start --dir /Volumes/ExternalDrive/torrents
```

### Combine Options

```bash
torrent-streamer start --port 3000 --user admin --pass secure123 --background
```

## Data Storage

By default, all downloads and state are stored in:

```
~/.torrent-streamer/
├── downloads/          # Downloaded torrent files
├── state/              # Torrent metadata and state
└── torrent-streamer.log # Server logs (when running in background)
```

To use a custom data directory, set the `DATA_DIR` environment variable:

```bash
DATA_DIR=/Volumes/ExternalDrive/torrents torrent-streamer start
```

## Running as an Always-On Service

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

Replace `yourname` with your actual username. Then load it:

```bash
launchctl load ~/.config/torrent-streamer/launch-agent.plist
```

To stop the service:

```bash
launchctl unload ~/.config/torrent-streamer/launch-agent.plist
```

### Option 2: Background Process

Simply run with `--background`:

```bash
torrent-streamer start --background
```

To stop:

```bash
torrent-streamer stop
```

## Troubleshooting

### "Command not found: torrent-streamer"

The global installation may not have worked. Try:

```bash
/path/to/torrent-streamer/bin/torrent-streamer start
```

Or reinstall:

```bash
./bin/torrent-streamer install
```

### "Cannot open because the developer cannot be verified"

Run this to remove the quarantine flag:

```bash
xattr -d com.apple.quarantine ~/.torrent-streamer/torrent-streamer-*
```

### Port 8080 already in use

Use a different port:

```bash
torrent-streamer start --port 3000
```

### Downloads not saving

Check the data directory:

```bash
torrent-streamer data
```

Ensure the directory has write permissions:

```bash
ls -la ~/.torrent-streamer/downloads
```

### Server won't start in background

Check the logs:

```bash
torrent-streamer logs
```

## Uninstalling

To remove the global command:

```bash
torrent-streamer uninstall
```

To remove all data:

```bash
rm -rf ~/.torrent-streamer
```

## Integration with Plex/Jellyfin

Point your media server to:

```
~/.torrent-streamer/downloads
```

See the [Plex/Jellyfin Integration Guide](./Plex_Jellyfin_Integration_Guide.md) for detailed instructions.

## Environment Variables

You can customize behavior using environment variables:

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | 8080 | HTTP server port |
| `DATA_DIR` | `~/.torrent-streamer` | Data storage directory |
| `DOWNLOAD_DIR` | `$DATA_DIR/downloads` | Download directory |
| `APP_USERNAME` | (none) | Authentication username |
| `APP_PASSWORD` | (none) | Authentication password |

Example:

```bash
PORT=3000 DATA_DIR=/custom/path torrent-streamer start
```

## Getting Help

```bash
torrent-streamer help
```

This displays all available commands and options.
