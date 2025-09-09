"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 font-mono text-xs",
  {
    variants: {
      status: {
        online: "text-landing-success",
        offline: "text-landing-error",
        warning: "text-landing-warning",
        loading: "text-landing-text-muted",
      },
      size: {
        sm: "text-xs",
        default: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: {
      status: "online",
      size: "default",
    },
  }
);

const statusDotVariants = cva("rounded-full", {
  variants: {
    status: {
      online: "bg-landing-success",
      offline: "bg-landing-error",
      warning: "bg-landing-warning",
      loading: "bg-landing-text-muted",
    },
    size: {
      sm: "h-1.5 w-1.5",
      default: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    },
    animated: {
      true: "animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    status: "online",
    size: "default",
    animated: false,
  },
});

interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {
  animated?: boolean;
  showDot?: boolean;
  text?: string;
}

function StatusIndicator({
  className,
  status,
  size,
  animated = false,
  showDot = true,
  text,
  ...props
}: StatusIndicatorProps) {
  const statusTexts = {
    online: "ONLINE",
    offline: "OFFLINE",
    warning: "WARNING",
    loading: "LOADING",
  };

  return (
    <span
      className={cn(statusIndicatorVariants({ status, size, className }))}
      data-slot="status-indicator"
      {...props}
    >
      {showDot && (
        <span className={cn(statusDotVariants({ status, size, animated }))} />
      )}
      {text || statusTexts[status || "online"]}
    </span>
  );
}

// Time display component
interface TimeDisplayProps extends React.HTMLAttributes<HTMLSpanElement> {
  format?: "full" | "time" | "session";
  updateInterval?: number;
}

function TimeDisplay({
  className,
  format = "full",
  updateInterval = 1000,
  ...props
}: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      switch (format) {
        case "full":
          setCurrentTime(
            now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
          );
          break;
        case "time":
          setCurrentTime(now.toLocaleTimeString());
          break;
        case "session":
          setCurrentTime(now.toLocaleTimeString());
          break;
        default:
          setCurrentTime(now.toISOString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, updateInterval);
    return () => clearInterval(interval);
  }, [format, updateInterval]);

  return (
    <span
      className={cn("font-mono text-landing-text-muted text-xs", className)}
      data-slot="time-display"
      {...props}
    >
      {currentTime}
    </span>
  );
}

// User info display
interface UserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string;
  showStatus?: boolean;
  showTime?: boolean;
  timeFormat?: "full" | "time" | "session";
}

function UserInfo({
  className,
  username = "admin",
  showStatus = true,
  showTime = true,
  timeFormat = "session",
  ...props
}: UserInfoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 font-mono text-landing-text-muted text-xs",
        className
      )}
      data-slot="user-info"
      {...props}
    >
      <span>USER: {username}</span>
      {showTime && (
        <span>
          SESSION: <TimeDisplay format={timeFormat} />
        </span>
      )}
      {showStatus && <StatusIndicator status="online" />}
    </div>
  );
}

export {
  StatusIndicator,
  TimeDisplay,
  UserInfo,
  statusIndicatorVariants,
  statusDotVariants,
};
