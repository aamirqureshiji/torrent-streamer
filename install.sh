#!/bin/bash

# Torrent Streamer Installation Script
# This script installs Torrent Streamer globally on your Mac

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${CYAN}  🎬 Torrent Streamer - Installation${NC}"
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Main installation
main() {
  print_header
  echo ""

  # Check if running on macOS
  if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This script is for macOS only"
    exit 1
  fi

  # Determine script directory
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  BIN_DIR="$SCRIPT_DIR/bin"
  CLI_SCRIPT="$BIN_DIR/torrent-streamer"

  # Check if CLI script exists
  if [ ! -f "$CLI_SCRIPT" ]; then
    print_error "CLI script not found at $CLI_SCRIPT"
    exit 1
  fi

  print_info "Installing Torrent Streamer..."
  echo ""

  # Step 1: Make CLI executable
  print_info "Making CLI executable..."
  chmod +x "$CLI_SCRIPT"
  print_success "CLI is executable"

  # Step 2: Create symlink in /usr/local/bin
  print_info "Creating global command..."
  GLOBAL_BIN="/usr/local/bin/torrent-streamer"

  if [ -L "$GLOBAL_BIN" ] || [ -f "$GLOBAL_BIN" ]; then
    rm -f "$GLOBAL_BIN"
  fi

  # Check if /usr/local/bin exists and is writable
  if [ ! -d "/usr/local/bin" ]; then
    mkdir -p /usr/local/bin
  fi

  if [ ! -w "/usr/local/bin" ]; then
    print_warning "Cannot write to /usr/local/bin (permission denied)"
    print_info "Attempting with sudo..."
    sudo ln -sf "$CLI_SCRIPT" "$GLOBAL_BIN"
    sudo chmod +x "$GLOBAL_BIN"
  else
    ln -sf "$CLI_SCRIPT" "$GLOBAL_BIN"
    chmod +x "$GLOBAL_BIN"
  fi

  print_success "Global command installed at $GLOBAL_BIN"

  # Step 3: Create data directory
  print_info "Creating data directory..."
  DATA_DIR="$HOME/.torrent-streamer"
  mkdir -p "$DATA_DIR/downloads"
  mkdir -p "$DATA_DIR/state"
  print_success "Data directory created at $DATA_DIR"

  # Step 4: Verify installation
  echo ""
  print_info "Verifying installation..."

  if command -v torrent-streamer &> /dev/null; then
    print_success "Installation complete!"
  else
    print_warning "Global command not in PATH yet"
    print_info "Try opening a new terminal window or running: source ~/.zprofile"
  fi

  # Step 5: Show next steps
  echo ""
  print_header
  echo ""
  echo -e "${GREEN}Installation successful!${NC}"
  echo ""
  echo "Next steps:"
  echo ""
  echo "  1. Start the server:"
  echo -e "     ${CYAN}torrent-streamer start${NC}"
  echo ""
  echo "  2. Open your browser:"
  echo -e "     ${CYAN}http://localhost:8080${NC}"
  echo ""
  echo "Other commands:"
  echo -e "  ${CYAN}torrent-streamer start --background${NC}  (run in background)"
  echo -e "  ${CYAN}torrent-streamer stop${NC}                (stop the server)"
  echo -e "  ${CYAN}torrent-streamer status${NC}              (check status)"
  echo -e "  ${CYAN}torrent-streamer help${NC}                (show all commands)"
  echo ""
  echo "Data stored in:"
  echo -e "  ${CYAN}$DATA_DIR${NC}"
  echo ""
}

main "$@"
