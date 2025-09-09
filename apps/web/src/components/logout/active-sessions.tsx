import type * as React from "react";
import { cn } from "@/lib/utils";

interface ActiveSession {
  id: string;
  deviceName: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastActivity: string;
  isCurrent: boolean;
  isSecure: boolean;
}

interface ActiveSessionsProps {
  sessions: ActiveSession[];
  onTerminateSession: (sessionId: string) => void;
  isProcessing?: boolean;
  className?: string;
}

function SessionItem({
  session,
  onTerminate,
  isProcessing,
}: {
  session: ActiveSession;
  onTerminate: (id: string) => void;
  isProcessing?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded border border-landing-border p-4 transition-all duration-200",
        session.isCurrent && "border-landing-accent bg-landing-surface-alt/30"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold text-landing-accent text-xs">
              {session.deviceName}
            </span>
            {session.isCurrent && (
              <span className="rounded bg-landing-accent px-2 py-1 font-semibold text-landing-bg text-xs uppercase">
                CURRENT
              </span>
            )}
            {session.isSecure && (
              <span className="text-landing-success text-xs">🔒</span>
            )}
          </div>

          <div className="space-y-1 text-landing-text-muted text-xs">
            <div>Browser: {session.browser}</div>
            <div>IP: {session.ipAddress}</div>
            <div>Location: {session.location}</div>
            <div>Last Activity: {session.lastActivity}</div>
          </div>
        </div>

        {!session.isCurrent && (
          <button
            className={cn(
              "rounded border border-landing-error bg-landing-error px-3 py-1 font-mono text-white text-xs uppercase tracking-wider transition-all duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={isProcessing}
            onClick={() => onTerminate(session.id)}
          >
            TERMINATE
          </button>
        )}
      </div>
    </div>
  );
}

export function ActiveSessions({
  sessions,
  onTerminateSession,
  isProcessing,
  className,
}: ActiveSessionsProps) {
  const currentSession = sessions.find((s) => s.isCurrent);
  const otherSessions = sessions.filter((s) => !s.isCurrent);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="font-semibold text-landing-accent text-xs uppercase tracking-wider">
        ACTIVE_SESSIONS ({sessions.length})
      </div>

      {/* Current Session */}
      {currentSession && (
        <div>
          <div className="mb-2 text-landing-text-muted text-xs uppercase tracking-wider">
            Current Session
          </div>
          <SessionItem
            isProcessing={isProcessing}
            onTerminate={onTerminateSession}
            session={currentSession}
          />
        </div>
      )}

      {/* Other Sessions */}
      {otherSessions.length > 0 && (
        <div>
          <div className="mb-2 text-landing-text-muted text-xs uppercase tracking-wider">
            Other Sessions ({otherSessions.length})
          </div>
          <div className="space-y-3">
            {otherSessions.map((session) => (
              <SessionItem
                isProcessing={isProcessing}
                key={session.id}
                onTerminate={onTerminateSession}
                session={session}
              />
            ))}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="py-8 text-center text-landing-text-muted text-xs">
          No active sessions found
        </div>
      )}
    </div>
  );
}
