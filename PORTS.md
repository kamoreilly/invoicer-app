# Development Port Management

This project includes automated port cleanup to prevent "port already in use" errors when starting the development server.

## Problem
When stopping the development server (Ctrl+C), sometimes Node.js processes don't terminate properly and continue running in the background, occupying ports 3000 and 3001. This causes "EADDRINUSE: address already in use" errors when trying to restart the dev server.

## Solution
The project now includes automated port cleanup scripts that run before starting the development server.

## Available Scripts

### Main Development Commands
- `bun dev` - Starts all development servers with port cleanup
- `bun dev:web` - Starts only the web server with port cleanup  
- `bun dev:server` - Starts only the server with port cleanup

### Port Cleanup Commands
- `bun dev:clean` - Runs port cleanup using Node.js script
- `bun dev:clean:bun` - Runs port cleanup using Bun script (alternative)

## How It Works
The cleanup scripts:
1. Check for processes running on ports 3000 and 3001
2. Use `kill-port` package if available (cross-platform)
3. Fall back to platform-specific commands:
   - **Windows**: `netstat` + `taskkill`
   - **macOS/Linux**: `lsof` + `kill`

## Manual Port Cleanup
If you encounter port issues, you can manually run:
```bash
bun dev:clean
```

Or use the built-in `kill-port` command:
```bash
npx kill-port 3000 3001
```

## Files Added
- `scripts/kill-dev-ports.js` - Node.js version (cross-platform)
- `scripts/kill-dev-ports-bun.ts` - Bun version (alternative)
- `scripts/kill-dev-ports.sh` - Shell script (legacy)

The Node.js version is used by default as it's most reliable across different environments.