import type * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SessionData {
  user: string;
  loginTime: string;
  sessionDuration: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  lastActivity: string;
}

interface SessionInfoProps {
  sessionData: SessionData;
  sessionStartTime: Date;
  className?: string;
}

interface InfoCardProps {
  label: string;
  value: string;
  className?: string;
}

function InfoCard({ label, value, className }: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded border border-landing-border bg-landing-surface p-4",
        className
      )}
    >
      <div className="mb-2 font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
        {label}
      </div>
      <div className="font-bold text-landing-accent text-sm">{value}</div>
    </div>
  );
}

export function SessionInfo({
  sessionData,
  sessionStartTime,
  className,
}: SessionInfoProps) {
  const [currentDuration, setCurrentDuration] = useState(
    sessionData.sessionDuration
  );

  useEffect(() => {
    const updateDuration = () => {
      const now = new Date();
      const duration = now.getTime() - sessionStartTime.getTime();

      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);

      setCurrentDuration(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Update immediately
    updateDuration();

    // Update every second
    const interval = setInterval(updateDuration, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  return (
    <div
      className={cn("mb-8 grid grid-cols-1 gap-6 md:grid-cols-2", className)}
    >
      <InfoCard label="CURRENT_USER" value={sessionData.user} />

      <InfoCard label="SESSION_DURATION" value={currentDuration} />

      <InfoCard label="LOGIN_TIME" value={sessionData.loginTime} />

      <InfoCard label="IP_ADDRESS" value={sessionData.ipAddress} />

      <InfoCard
        className="md:col-span-2"
        label="USER_AGENT"
        value={sessionData.userAgent}
      />

      <InfoCard label="LOCATION" value={sessionData.location} />

      <InfoCard label="LAST_ACTIVITY" value={sessionData.lastActivity} />
    </div>
  );
}
