import type * as React from "react";
import { cn } from "@/lib/utils";

interface LogoutActionsProps {
  onCancel: () => void;
  onSaveAndLogout: () => void;
  onForceLogout: () => void;
  onLogoutAllSessions: () => void;
  isLoggingOut?: boolean;
  className?: string;
}

export function LogoutActions({
  onCancel,
  onSaveAndLogout,
  onForceLogout,
  onLogoutAllSessions,
  isLoggingOut = false,
  className,
}: LogoutActionsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Primary Actions */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          className={cn(
            "min-w-[140px] border border-landing-border bg-landing-surface-alt px-6 py-3 font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border disabled:cursor-not-allowed disabled:opacity-50"
          )}
          disabled={isLoggingOut}
          onClick={onCancel}
        >
          CANCEL
        </button>

        <button
          className={cn(
            "min-w-[140px] border border-landing-accent bg-landing-accent px-6 py-3 font-mono text-landing-bg text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
          )}
          disabled={isLoggingOut}
          onClick={onSaveAndLogout}
        >
          {isLoggingOut ? "LOGGING_OUT..." : "SAVE_&_LOGOUT"}
        </button>

        <button
          className={cn(
            "min-w-[140px] border border-landing-error bg-landing-error px-6 py-3 font-mono text-white text-xs uppercase tracking-wider transition-all duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          )}
          disabled={isLoggingOut}
          onClick={onForceLogout}
        >
          FORCE_LOGOUT
        </button>
      </div>

      {/* Advanced Actions */}
      <div className="border-landing-border border-t pt-4">
        <div className="mb-4 text-center">
          <span className="text-landing-text-muted text-xs uppercase tracking-wider">
            ADVANCED_OPTIONS
          </span>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            className={cn(
              "border border-landing-warning bg-landing-warning px-4 py-2 font-mono text-landing-bg text-xs uppercase tracking-wider transition-all duration-200 hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={isLoggingOut}
            onClick={onLogoutAllSessions}
          >
            LOGOUT_ALL_SESSIONS
          </button>

          <button
            className={cn(
              "border border-landing-border bg-landing-surface-alt px-4 py-2 font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={isLoggingOut}
            onClick={() => {
              // Clear browser data
              if (typeof window !== "undefined") {
                localStorage.clear();
                sessionStorage.clear();
                // Clear cookies would require server-side implementation
              }
            }}
          >
            CLEAR_BROWSER_DATA
          </button>

          <button
            className={cn(
              "border border-landing-border bg-landing-surface-alt px-4 py-2 font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={isLoggingOut}
            onClick={() => {
              // This would trigger a server-side token revocation
              console.log("Revoking all tokens...");
            }}
          >
            REVOKE_TOKENS
          </button>
        </div>
      </div>
    </div>
  );
}
