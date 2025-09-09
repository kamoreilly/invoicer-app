import type * as React from "react";
import { cn } from "@/lib/utils";

interface SecurityNoticeProps {
  className?: string;
}

export function SecurityNotice({ className }: SecurityNoticeProps) {
  return (
    <div
      className={cn(
        "rounded border border-landing-border bg-landing-surface p-5",
        className
      )}
    >
      <div className="mb-3 font-semibold text-landing-accent text-xs uppercase tracking-wider">
        SECURITY_NOTICE
      </div>

      <div className="space-y-2 text-landing-text-muted text-xs leading-relaxed">
        <p>
          For security purposes, your session will automatically expire after 8
          hours of inactivity. Always log out when using shared or public
          computers.
        </p>

        <p>
          Your session data is encrypted and stored securely according to our
          privacy policy. All authentication tokens will be invalidated upon
          logout.
        </p>

        <p>
          If you suspect unauthorized access to your account, use the
          "LOGOUT_ALL_SESSIONS" option to terminate all active sessions across
          all devices.
        </p>
      </div>

      <div className="mt-4 border-landing-border border-t pt-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-landing-success">●</span>
          <span className="text-landing-text-muted">
            Session encryption:{" "}
            <span className="text-landing-accent">AES-256</span>
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-landing-success">●</span>
          <span className="text-landing-text-muted">
            Token expiry: <span className="text-landing-accent">8 hours</span>
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-landing-success">●</span>
          <span className="text-landing-text-muted">
            Auto-logout: <span className="text-landing-accent">Enabled</span>
          </span>
        </div>
      </div>
    </div>
  );
}
