#!/bin/bash

# Kill processes on ports 3000-3005 and start dev server
# Usage: ./scripts/dev.sh [--open]

# Tailwind colors (600 for bg, 50 for fg)
# Blue: 600=#2563eb (37,99,235), 50=#eff6ff (239,246,255)
BLUE_BG="\033[48;2;37;99;235m"
BLUE_FG="\033[38;2;239;246;255m"

# Green: 600=#16a34a (22,163,74), 50=#f0fdf4 (240,253,244)
GREEN_BG="\033[48;2;22;163;74m"
GREEN_FG="\033[38;2;240;253;244m"

# Red: 600=#dc2626 (220,38,38), 50=#fef2f2 (254,242,242)
RED_BG="\033[48;2;220;38;38m"
RED_FG="\033[38;2;254;242;242m"

# Yellow: 600=#ca8a04 (202,138,4), 50=#fefce8 (254,252,232)
YELLOW_BG="\033[48;2;202;138;4m"
YELLOW_FG="\033[38;2;254;252;232m"

RESET="\033[0m"
BOLD="\033[1m"

OPEN_BROWSER=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --open|-o)
      OPEN_BROWSER=true
      ;;
  esac
done

echo ""
echo -e "${YELLOW_BG}${YELLOW_FG}${BOLD} CLEANUP ${RESET} Killing processes on ports 3000-3005..."
echo ""

killed_any=false
for port in 3000 3001 3002 3003 3004 3005; do
  pid=$(lsof -ti:$port 2>/dev/null)
  if [ -n "$pid" ]; then
    kill -9 $pid 2>/dev/null
    echo -e "  ${RED_BG}${RED_FG} $port ${RESET} Killed process (PID: $pid)"
    killed_any=true
  fi
done

if [ "$killed_any" = false ]; then
  echo -e "  ${GREEN_BG}${GREEN_FG} OK ${RESET} No processes to kill"
fi

sleep 1

echo ""
echo -e "${BLUE_BG}${BLUE_FG}${BOLD} SERVER ${RESET} Starting dev server..."
echo ""

# Start server and capture output to detect when ready
{
  pnpm dev 2>&1 &
  DEV_PID=$!

  # Wait for server to be ready (max 30 seconds)
  for i in {1..60}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
      echo ""
      echo -e "${GREEN_BG}${GREEN_FG}${BOLD} READY ${RESET} Dev server running at:"
      echo ""
      echo -e "  Local:   http://localhost:${BLUE_BG}${BLUE_FG}${BOLD} 3000 ${RESET}"
      echo -e "  Network: http://$(ipconfig getifaddr en0 2>/dev/null || echo "0.0.0.0"):${BLUE_BG}${BLUE_FG}${BOLD} 3000 ${RESET}"
      echo ""

      if [ "$OPEN_BROWSER" = true ]; then
        echo -e "${GREEN_BG}${GREEN_FG} OPEN ${RESET} Opening in browser..."
        open http://localhost:3000
      else
        echo -e "  Tip: Run with ${BOLD}--open${RESET} to auto-open browser"
      fi
      echo ""
      break
    fi
    sleep 0.5
  done

  # Keep the server running
  wait $DEV_PID
}
