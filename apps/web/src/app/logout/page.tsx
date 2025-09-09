"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActiveSessions } from "@/components/logout/active-sessions";
import { LogoutActions } from "@/components/logout/logout-actions";
import { LogoutProgress } from "@/components/logout/logout-progress";
import { SecurityNotice } from "@/components/logout/security-notice";
import { SessionActivity } from "@/components/logout/session-activity";
import { SessionInfo } from "@/components/logout/session-info";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { TerminalCommandLine } from "@/components/ui/terminal-command-line";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

interface SessionData {
  user: string;
  loginTime: string;
  sessionDuration: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  lastActivity: string;
}

interface LogoutStep {
  progress: number;
  text: string;
}

interface SessionActivity {
  id: string;
  timestamp: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  status: "SUCCESS" | "WARNING" | "ERROR";
}

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

export default function LogoutPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutProgress, setLogoutProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [lastCommand, setLastCommand] = useState(
    "session --status --user=admin"
  );
  const [commandOutput, setCommandOutput] = useState(
    "✓ Session active. Ready for logout procedure."
  );
  const [sessionStartTime] = useState(
    new Date(Date.now() - 2 * 60 * 60 * 1000 - 14 * 60 * 1000 - 33 * 1000)
  );

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock session data - replace with actual session information
  const mockSessionData: SessionData = {
    user: session?.user?.email || "admin",
    loginTime: "2024-01-18 12:28:00",
    sessionDuration: "2h 14m 33s",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0.0.0 on Windows 11",
    location: "New York, NY",
    lastActivity: "Just now",
  };

  const logoutSteps: LogoutStep[] = [
    { progress: 20, text: "Saving session data..." },
    { progress: 40, text: "Backing up user preferences..." },
    { progress: 60, text: "Clearing temporary files..." },
    { progress: 80, text: "Updating activity logs..." },
    { progress: 100, text: "Logout complete. Redirecting..." },
  ];

  const mockSessionActivity: SessionActivity[] = [
    {
      id: "1",
      timestamp: "2024-01-18 14:30:15",
      action: "LOGIN_SUCCESS",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0",
      location: "New York, NY",
      status: "SUCCESS",
    },
    {
      id: "2",
      timestamp: "2024-01-18 13:45:22",
      action: "PASSWORD_CHANGE",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0",
      location: "New York, NY",
      status: "SUCCESS",
    },
    {
      id: "3",
      timestamp: "2024-01-18 12:28:00",
      action: "SESSION_START",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0",
      location: "New York, NY",
      status: "SUCCESS",
    },
    {
      id: "4",
      timestamp: "2024-01-17 18:15:33",
      action: "FAILED_LOGIN_ATTEMPT",
      ipAddress: "203.0.113.45",
      userAgent: "Unknown",
      location: "Unknown",
      status: "ERROR",
    },
  ];

  const mockActiveSessions: ActiveSession[] = [
    {
      id: "current",
      deviceName: "Windows Desktop",
      browser: "Chrome 120.0.0.0",
      ipAddress: "192.168.1.100",
      location: "New York, NY",
      lastActivity: "Just now",
      isCurrent: true,
      isSecure: true,
    },
    {
      id: "mobile",
      deviceName: "iPhone 15 Pro",
      browser: "Safari 17.0",
      ipAddress: "192.168.1.105",
      location: "New York, NY",
      lastActivity: "2 hours ago",
      isCurrent: false,
      isSecure: true,
    },
    {
      id: "laptop",
      deviceName: "MacBook Pro",
      browser: "Firefox 121.0",
      ipAddress: "10.0.0.45",
      location: "San Francisco, CA",
      lastActivity: "1 day ago",
      isCurrent: false,
      isSecure: true,
    },
  ];

  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleCancel = () => {
    setLastCommand("logout --cancel");
    setCommandOutput("► Logout cancelled. Returning to dashboard...");

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const handleSaveAndLogout = async () => {
    setIsLoggingOut(true);
    setLastCommand("logout --save-session");
    setCommandOutput("⚡ Initiating secure logout procedure...");

    for (let i = 0; i < logoutSteps.length; i++) {
      const step = logoutSteps[i];
      setLogoutProgress(step.progress);
      setCurrentStep(step.text);

      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    try {
      await authClient.signOut();
      setCommandOutput("✓ Logout successful. Redirecting to login page...");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setCommandOutput("✗ Logout failed. Please try again.");
      setIsLoggingOut(false);
      setLogoutProgress(0);
      setCurrentStep("");
    }
  };

  const handleForceLogout = async () => {
    setLastCommand("logout --force --immediate");
    setCommandOutput(
      "⚠ Force logout initiated. Session terminated immediately."
    );

    try {
      await authClient.signOut();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setCommandOutput("✗ Force logout failed. Please try again.");
    }
  };

  const handleLogoutAllSessions = async () => {
    setLastCommand("logout --all-sessions --revoke-tokens");
    setCommandOutput("⚡ Terminating all active sessions...");

    try {
      // This would call a tRPC mutation to logout all sessions
      await authClient.signOut();
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setCommandOutput("✗ Failed to logout all sessions. Please try again.");
    }
  };

  const handleTerminateSession = async (sessionId: string) => {
    setLastCommand(`session --terminate --id=${sessionId}`);
    setCommandOutput(`⚡ Terminating session ${sessionId}...`);

    // This would call a tRPC mutation to terminate a specific session
    setTimeout(() => {
      setCommandOutput(`✓ Session ${sessionId} terminated successfully.`);
    }, 1500);
  };

  if (isPending) {
    return (
      <DashboardPage title="SESSION_LOGOUT.CFG">
        <div className="flex h-64 items-center justify-center">
          <div className="font-mono text-landing-accent">LOADING...</div>
        </div>
      </DashboardPage>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardPage title="SESSION_LOGOUT.CFG">
      {/* Session Manager */}
      <TerminalWindow className="mb-8" title="SESSION_MANAGER.CFG">
        <div className="p-8">
          <SessionInfo
            sessionData={mockSessionData}
            sessionStartTime={sessionStartTime}
          />

          <div className="mb-8 text-center text-landing-text leading-relaxed">
            Are you sure you want to end your current session?
            <br />
            All unsaved changes will be lost and you will be redirected to the
            login page.
          </div>

          <LogoutActions
            isLoggingOut={isLoggingOut}
            onCancel={handleCancel}
            onForceLogout={handleForceLogout}
            onLogoutAllSessions={handleLogoutAllSessions}
            onSaveAndLogout={handleSaveAndLogout}
          />

          {isLoggingOut && (
            <LogoutProgress
              className="mt-6"
              currentStep={currentStep}
              progress={logoutProgress}
            />
          )}
        </div>
      </TerminalWindow>

      {/* Active Sessions */}
      <TerminalWindow className="mb-8" title="ACTIVE_SESSIONS.CFG">
        <div className="p-5">
          <ActiveSessions
            isProcessing={isLoggingOut}
            onTerminateSession={handleTerminateSession}
            sessions={mockActiveSessions}
          />
        </div>
      </TerminalWindow>

      {/* Session Activity */}
      <TerminalWindow className="mb-8" title="SESSION_ACTIVITY.LOG">
        <div className="p-5">
          <SessionActivity activities={mockSessionActivity} />
        </div>
      </TerminalWindow>

      {/* Security Notice */}
      <SecurityNotice className="mb-8" />

      {/* Command Line */}
      <TerminalCommandLine
        command={lastCommand}
        isRunning={isLoggingOut}
        output={commandOutput}
      />
    </DashboardPage>
  );
}
