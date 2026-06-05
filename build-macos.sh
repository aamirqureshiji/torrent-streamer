#!/bin/bash
set -e

# Build script for creating standalone macOS executables of Torrent Streamer
# Requires: pkg (npm install -g pkg)
# Note: Code signing must be done on macOS or with ldid on Linux

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="torrent-streamer"
VERSION="1.0.0"

echo "🔨 Building standalone macOS executables for Torrent Streamer v${VERSION}"
echo ""

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm ci --omit=dev
fi

# Create build output directory
mkdir -p dist

# Build for macOS (arm64 - Apple Silicon M1/M2/M3/M4)
echo "🍎 Building for macOS arm64 (Apple Silicon)..."
pkg \
  --compress Brotli \
  --targets node18-macos-arm64 \
  --output "dist/${PROJECT_NAME}-arm64" \
  src/server.js

# Build for macOS (x64 - Intel)
echo "🍎 Building for macOS x64 (Intel)..."
pkg \
  --compress Brotli \
  --targets node18-macos-x64 \
  --output "dist/${PROJECT_NAME}-x64" \
  src/server.js

# Make executables executable
chmod +x "dist/${PROJECT_NAME}-arm64"
chmod +x "dist/${PROJECT_NAME}-x64"

echo ""
echo "✅ Build complete!"
echo ""
echo "📁 Output files:"
echo "   - dist/${PROJECT_NAME}-arm64  (Apple Silicon M1/M2/M3/M4)"
echo "   - dist/${PROJECT_NAME}-x64    (Intel Mac)"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Code signing (required for distribution):"
echo "   On macOS:"
echo "     codesign --sign - dist/${PROJECT_NAME}-arm64"
echo "     codesign --sign - dist/${PROJECT_NAME}-x64"
echo ""
echo "   On Linux (requires ldid):"
echo "     ldid -S dist/${PROJECT_NAME}-arm64"
echo "     ldid -S dist/${PROJECT_NAME}-x64"
echo ""
echo "2. Test the executable:"
echo "   ./dist/${PROJECT_NAME}-arm64"
echo ""
echo "3. Set environment variables as needed:"
echo "   PORT=8080 ./dist/${PROJECT_NAME}-arm64"
echo "   APP_USERNAME=admin APP_PASSWORD=secure ./dist/${PROJECT_NAME}-arm64"
echo ""
