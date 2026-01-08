#!/bin/bash

# Kill processes on ports 3000-3005 and start dev server
# Usage: ./scripts/dev.sh

echo "Killing processes on ports 3000-3005..."

for port in 3000 3001 3002 3003 3004 3005; do
  pid=$(lsof -ti:$port 2>/dev/null)
  if [ -n "$pid" ]; then
    kill -9 $pid 2>/dev/null
    echo "  Killed process on port $port (PID: $pid)"
  fi
done

sleep 1

echo "Starting dev server..."
pnpm dev
