import type * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ConfigGrid,
  ConfigInput,
  ConfigSection,
  FormField,
} from "./form-components";

type ServiceStatus =
  | "connected"
  | "operational"
  | "running"
  | "disconnected"
  | "offline"
  | "stopped"
  | "maintenance"
  | "error";

interface SystemStatus {
  database: ServiceStatus;
  email: ServiceStatus;
  backup: ServiceStatus;
  paymentGateway: ServiceStatus;
}

interface SystemInfo {
  version: string;
  lastBackup: string;
  uptime: string;
  diskUsage: string;
}

interface SystemStatusProps {
  systemStatus: SystemStatus;
  systemInfo: SystemInfo;
  className?: string;
}

interface StatusIndicatorProps {
  status: ServiceStatus;
  label: string;
}

function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "connected":
      case "operational":
      case "running":
        return "text-landing-success";
      case "maintenance":
        return "text-landing-warning";
      case "disconnected":
      case "offline":
      case "stopped":
      case "error":
        return "text-landing-error";
      default:
        return "text-landing-text-muted";
    }
  };

  const getStatusDot = (status: ServiceStatus) => {
    switch (status) {
      case "connected":
      case "operational":
      case "running":
        return "bg-landing-success shadow-[0_0_6px_theme(colors.landing.success)]";
      case "maintenance":
        return "bg-landing-warning shadow-[0_0_6px_theme(colors.landing.warning)]";
      case "disconnected":
      case "offline":
      case "stopped":
      case "error":
        return "bg-landing-error";
      default:
        return "bg-landing-text-muted";
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case "connected":
        return "CONNECTED";
      case "operational":
        return "OPERATIONAL";
      case "running":
        return "RUNNING";
      case "maintenance":
        return "MAINTENANCE";
      case "disconnected":
        return "DISCONNECTED";
      case "offline":
        return "OFFLINE";
      case "stopped":
        return "STOPPED";
      case "error":
        return "ERROR";
      default:
        return "UNKNOWN";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "h-2 w-2 rounded-full transition-all duration-300",
          getStatusDot(status)
        )}
      />
      <span className={cn("font-medium text-xs", getStatusColor(status))}>
        {getStatusText(status)}
      </span>
    </div>
  );
}

export function SystemStatus({
  systemStatus,
  systemInfo,
  className,
}: SystemStatusProps) {
  const [animatingServices, setAnimatingServices] = useState<Set<string>>(
    new Set()
  );

  // Simulate periodic status updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly animate status indicators
      const services = Object.keys(systemStatus);
      const randomService =
        services[Math.floor(Math.random() * services.length)];

      if (Math.random() < 0.1) {
        // 10% chance
        setAnimatingServices((prev) => new Set([...prev, randomService]));
        setTimeout(() => {
          setAnimatingServices((prev) => {
            const newSet = new Set(prev);
            newSet.delete(randomService);
            return newSet;
          });
        }, 300);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [systemStatus]);

  return (
    <div className={className}>
      <ConfigGrid>
        <ConfigSection title="SERVICE_STATUS">
          <FormField label="DATABASE_CONNECTION">
            <div
              className={cn(
                "transition-all duration-300",
                animatingServices.has("database") && "scale-105"
              )}
            >
              <StatusIndicator
                label="Database"
                status={systemStatus.database}
              />
            </div>
          </FormField>

          <FormField label="EMAIL_SERVICE">
            <div
              className={cn(
                "transition-all duration-300",
                animatingServices.has("email") && "scale-105"
              )}
            >
              <StatusIndicator label="Email" status={systemStatus.email} />
            </div>
          </FormField>

          <FormField label="BACKUP_SERVICE">
            <div
              className={cn(
                "transition-all duration-300",
                animatingServices.has("backup") && "scale-105"
              )}
            >
              <StatusIndicator label="Backup" status={systemStatus.backup} />
            </div>
          </FormField>

          <FormField label="PAYMENT_GATEWAY">
            <div
              className={cn(
                "transition-all duration-300",
                animatingServices.has("paymentGateway") && "scale-105"
              )}
            >
              <StatusIndicator
                label="Payment Gateway"
                status={systemStatus.paymentGateway}
              />
            </div>
          </FormField>
        </ConfigSection>

        <ConfigSection title="SYSTEM_INFO">
          <FormField label="VERSION">
            <ConfigInput
              className="cursor-not-allowed bg-landing-surface-alt"
              readOnly
              type="text"
              value={systemInfo.version}
            />
          </FormField>

          <FormField label="LAST_BACKUP">
            <ConfigInput
              className="cursor-not-allowed bg-landing-surface-alt"
              readOnly
              type="text"
              value={systemInfo.lastBackup}
            />
          </FormField>

          <FormField label="UPTIME">
            <ConfigInput
              className="cursor-not-allowed bg-landing-surface-alt"
              readOnly
              type="text"
              value={systemInfo.uptime}
            />
          </FormField>

          <FormField label="DISK_USAGE">
            <ConfigInput
              className="cursor-not-allowed bg-landing-surface-alt"
              readOnly
              type="text"
              value={systemInfo.diskUsage}
            />
          </FormField>
        </ConfigSection>
      </ConfigGrid>
    </div>
  );
}

// Real-time system info updater hook
export function useSystemInfo(initialInfo: SystemInfo) {
  const [systemInfo, setSystemInfo] = useState(initialInfo);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemInfo((prev) => {
        // Update uptime (simulate)
        const uptimeParts = prev.uptime.split(/[hms\s]+/).filter(Boolean);
        if (uptimeParts.length >= 3) {
          const hours = Number.parseInt(uptimeParts[0]) || 0;
          const minutes = Number.parseInt(uptimeParts[1]) || 0;
          const seconds = Number.parseInt(uptimeParts[2]) || 0;

          let newSeconds = seconds + 1;
          let newMinutes = minutes;
          let newHours = hours;

          if (newSeconds >= 60) {
            newSeconds = 0;
            newMinutes += 1;
          }
          if (newMinutes >= 60) {
            newMinutes = 0;
            newHours += 1;
          }

          return {
            ...prev,
            uptime: `${newHours}h ${newMinutes}m ${newSeconds}s`,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return systemInfo;
}

export type { SystemStatus, SystemInfo, ServiceStatus };
