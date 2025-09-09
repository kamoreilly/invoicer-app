import type * as React from "react";
import { cn } from "@/lib/utils";

interface SessionActivity {
  id: string;
  timestamp: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  status: "SUCCESS" | "WARNING" | "ERROR";
}

interface SessionActivityProps {
  activities: SessionActivity[];
  className?: string;
}

function ActivityItem({ activity }: { activity: SessionActivity }) {
  const getStatusColor = (status: SessionActivity["status"]) => {
    switch (status) {
      case "SUCCESS":
        return "text-landing-success";
      case "WARNING":
        return "text-landing-warning";
      case "ERROR":
        return "text-landing-error";
    }
  };

  const getStatusIcon = (status: SessionActivity["status"]) => {
    switch (status) {
      case "SUCCESS":
        return "✓";
      case "WARNING":
        return "⚠";
      case "ERROR":
        return "✗";
    }
  };

  return (
    <div className="border-landing-border border-b py-3 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={cn(
                "font-semibold text-xs",
                getStatusColor(activity.status)
              )}
            >
              {getStatusIcon(activity.status)}
            </span>
            <span className="font-semibold text-landing-accent text-xs">
              {activity.action}
            </span>
            <span className="text-landing-text-muted text-xs">
              {activity.timestamp}
            </span>
          </div>

          <div className="space-y-1 text-landing-text-muted text-xs">
            <div>IP: {activity.ipAddress}</div>
            <div>Location: {activity.location}</div>
            <div className="truncate">Agent: {activity.userAgent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SessionActivity({
  activities,
  className,
}: SessionActivityProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="mb-4 font-semibold text-landing-accent text-xs uppercase tracking-wider">
        RECENT_SESSION_ACTIVITY
      </div>

      <div className="max-h-64 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem activity={activity} key={activity.id} />
          ))
        ) : (
          <div className="py-8 text-center text-landing-text-muted text-xs">
            No recent activity found
          </div>
        )}
      </div>
    </div>
  );
}
