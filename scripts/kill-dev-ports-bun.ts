#!/usr/bin/env bun

// Cross-platform port killer script using bun
const ports = [3000, 3001];

console.log("Checking for processes on development ports...");

for (const port of ports) {
  console.log(`Checking for processes on port ${port}...`);

  try {
    // Try using kill-port package
    await $`kill-port ${port}`.quiet();
    console.log(`✓ Killed process on port ${port}`);
  } catch {
    // Fallback to platform-specific commands
    if (process.platform === "win32") {
      try {
        const result = await $`netstat -ano | findstr :${port}`.text();
        const lines = result.split("\n");
        const pids = new Set<string>();

        for (const line of lines) {
          const match = line.match(/LISTENING\s+(\d+)/);
          if (match) {
            pids.add(match[1]);
          }
        }

        for (const pid of pids) {
          try {
            await $`taskkill /PID ${pid} /F`.quiet();
            console.log(`✓ Killed process ${pid} on port ${port}`);
          } catch {
            // Process might already be dead
          }
        }
      } catch {
        // No process found on port
      }
    } else {
      // Unix-like systems
      try {
        const result = await $`lsof -ti :${port}`.text();
        const pids = result.trim().split("\n");

        for (const pid of pids) {
          if (pid) {
            try {
              await $`kill -9 ${pid}`.quiet();
              console.log(`✓ Killed process ${pid} on port ${port}`);
            } catch {
              // Process might already be dead
            }
          }
        }
      } catch {
        // No process found on port
      }
    }
  }
}

console.log("✓ Port cleanup completed");
