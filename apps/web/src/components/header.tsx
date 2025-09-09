"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");
  const [sessionTime, setSessionTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
      setSessionTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-landing-border border-b-2 bg-landing-surface">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link
            className="flex items-center gap-2 font-bold text-base text-landing-accent"
            href="/"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-landing-accent font-bold text-landing-bg text-xs">
              IA
            </div>
            INVOICER_APP
          </Link>
        </div>

        <div className="flex items-center gap-6 font-mono text-landing-text-muted text-xs">
          <span>USER: admin</span>
          <span>SESSION: {sessionTime}</span>
          <span className="text-landing-success">● ONLINE</span>
        </div>
      </div>
    </header>
  );
}
