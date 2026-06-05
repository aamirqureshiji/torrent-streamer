# Self-Hosted Torrent Streamer

**Self-Hosted Torrent Streamer** is a browser-accessible app for adding magnet links or `.torrent` files, monitoring download progress, browsing torrent contents, and streaming supported audio/video files over HTTP while the torrent is still downloading. It is designed as a clean replacement for Colab-style torrent notebooks without Google Drive integration.

> **Lawful-use notice:** Use this application only for content you own, have permission to access, or that is legally distributed through BitTorrent. This project does not include torrent search, scraping, indexing, or content discovery.

## What is included

| Area | Implementation |
| --- | --- |
| Torrent engine | Node.js with WebTorrent. |
| Web server | Express with JSON APIs and static frontend hosting. |
| Streaming | HTTP range-request streaming through `/stream/:infoHash/:fileIndex`. |
| Downloads | Persistent local storage in `data/downloads`. |
| State | Active torrent sources are persisted in `data/state/torrents.json`. |
| UI | Magnet input, `.torrent` upload, progress cards, file browser, and built-in HTML5 video/audio player. |
| Deployment | Dockerfile, Docker Compose, and a systemd service template. |

## Quick start with Docker Compose

Copy the project to your server, then create an environment file from the example.

```bash
cp .env.example .env
nano .env
```

Set `APP_USERNAME` and `APP_PASSWORD` before exposing the service beyond your private network. Then start the app.

```bash
docker compose up -d --build
```

Open the dashboard at:

```text
http://SERVER-IP:8080
```

The downloaded data will remain in `./data/downloads`, and active torrent state will remain in `./data/state`.

## Quick start without Docker

Install Node.js 20 or newer, then run the app directly.

```bash
npm install
cp .env.example .env
npm start
```

The default dashboard URL is `http://localhost:8080`.

## Recommended production setup

For a private home server, bind the app to your LAN or place it behind a VPN. If you expose it to the public internet, use a reverse proxy such as Caddy, Nginx Proxy Manager, or Traefik with HTTPS, and set a strong `APP_USERNAME` and `APP_PASSWORD`.

| Setting | Recommendation |
| --- | --- |
| Authentication | Always set `APP_USERNAME` and a long random `APP_PASSWORD`. |
| Storage | Mount a large persistent disk to `./data`. |
| Connectivity | Forward TCP/UDP `6881-6891` to improve peer connectivity. |
| HTTPS | Use a reverse proxy if accessing the app remotely. |
| Backups | Back up `data/state`, not necessarily `data/downloads` unless you need the downloaded files. |

## systemd deployment alternative

If you prefer running without Docker, copy the project to `/opt/torrent-streamer`, create a dedicated user, install dependencies, and use the provided service template.

```bash
sudo useradd --system --home /opt/torrent-streamer --shell /usr/sbin/nologin torrentstreamer
sudo mkdir -p /opt/torrent-streamer
sudo cp -R . /opt/torrent-streamer
sudo chown -R torrentstreamer:torrentstreamer /opt/torrent-streamer
cd /opt/torrent-streamer
sudo -u torrentstreamer npm ci --omit=dev
sudo cp docs/torrent-streamer.service /etc/systemd/system/torrent-streamer.service
sudo systemctl daemon-reload
sudo systemctl enable --now torrent-streamer
```

## API summary

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Check service status. |
| `GET` | `/api/torrents` | List active torrents, progress, and files. |
| `POST` | `/api/torrents` | Add a magnet link as JSON: `{ "magnetURI": "magnet:?xt=..." }`. |
| `POST` | `/api/torrents/upload` | Upload a `.torrent` file using form field `torrent`. |
| `POST` | `/api/torrents/:infoHash/pause` | Pause a torrent. |
| `POST` | `/api/torrents/:infoHash/resume` | Resume a torrent. |
| `DELETE` | `/api/torrents/:infoHash` | Remove a torrent. Add `?destroyFiles=true` to delete downloaded data. |
| `GET` | `/stream/:infoHash/:fileIndex` | Stream a file with range support. |
| `GET` | `/download/:infoHash/:fileIndex` | Download a selected file. |

## Notes and limits

HTML5 browsers only play formats they support natively. MP4/H.264, WebM, MP3, M4A, Ogg, and WAV usually work well, but MKV/AVI playback support depends on the browser. Those files can still be downloaded or opened through a compatible external player.

For best results, run the app on a machine with enough disk space for the torrents you add. If you want remote access, secure the service first and avoid exposing it without authentication.
