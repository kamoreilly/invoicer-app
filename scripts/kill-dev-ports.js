#!/usr/bin/env node

import { execSync } from "child_process";
import os from "os";

function killPort(port) {
  try {
    if (os.platform() === "win32") {
      // Windows
      try {
        const result = execSync(`netstat -ano | findstr :${port}`, {
          encoding: "utf8",
        });
        const lines = result.split("\n");
        const pids = new Set();

        lines.forEach((line) => {
          const match = line.match(/LISTENING\s+(\d+)/);
          if (match) {
            pids.add(match[1]);
          }
        });

        pids.forEach((pid) => {
          try {
            execSync(`taskkill /PID ${pid} /F`, { stdio: "pipe" });
            console.log(`Killed process ${pid} on port ${port}`);
          } catch (e) {
            // Process might already be dead
          }
        });
      } catch (e) {
        // No process found on port
      }
    } else {
      // Unix-like systems (macOS, Linux)
      try {
        const result = execSync(`lsof -ti :${port}`, { encoding: "utf8" });
        const pids = result.trim().split("\n");

        pids.forEach((pid) => {
          if (pid) {
            try {
              execSync(`kill -9 ${pid}`, { stdio: "pipe" });
              console.log(`Killed process ${pid} on port ${port}`);
            } catch (e) {
              // Process might already be dead
            }
          }
        });
      } catch (e) {
        // No process found on port
      }
    }
  } catch (error) {
    console.log(`No process found on port ${port} or failed to kill it`);
  }
}

// Kill processes on common development ports
[3000, 3001].forEach((port) => {
  console.log(`Checking for processes on port ${port}...`);
  killPort(port);
});

console.log("Port cleanup completed");
