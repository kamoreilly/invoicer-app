#!/bin/sh

# Kill processes on ports 3000 and 3001
echo "Checking for processes on development ports..."

# Use npx kill-port (cross-platform)
echo "Using kill-port to clean up ports..."
npx kill-port 3000 2>/dev/null || true
npx kill-port 3001 2>/dev/null || true

# Fallback to platform-specific commands
echo "Using platform-specific commands..."

# For Windows
if [ "$OS" = "Windows_NT" ] || uname | grep -q "MINGW" || uname | grep -q "CYGWIN"; then
    echo "Windows detected, using taskkill..."
    netstat -ano | findstr ":3000" | findstr "LISTENING" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        for pid in $(netstat -ano | findstr ":3000" | findstr "LISTENING" | awk '{print $5}'); do
            taskkill //F //PID $pid 2>/dev/null || true
        done
    fi
    
    netstat -ano | findstr ":3001" | findstr "LISTENING" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        for pid in $(netstat -ano | findstr ":3001" | findstr "LISTENING" | awk '{print $5}'); do
            taskkill //F //PID $pid 2>/dev/null || true
        done
    fi
else
    # For Unix-like systems (macOS, Linux)
    echo "Unix-like system detected, using kill/lsof..."
    if command -v lsof >/dev/null 2>&1; then
        lsof -ti:3000 2>/dev/null | xargs -r kill -9 2>/dev/null || true
        lsof -ti:3001 2>/dev/null | xargs -r kill -9 2>/dev/null || true
    else
        # Fallback for systems without lsof
        echo "lsof not available, skipping port cleanup"
    fi
fi

echo "Port cleanup completed"