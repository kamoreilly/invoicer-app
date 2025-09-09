"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { AuthCard, AuthLayout, TerminalHistory } from "./layouts/auth-layout";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  TerminalField,
  TerminalInput,
  TerminalLabel,
} from "./ui/terminal-input";

export default function TerminalLoginForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      // Add command to history
      const loginCommand = `auth --login --user="${value.username}"`;
      setCommandHistory((prev) => [...prev, loginCommand]);

      // Add verification message
      setTimeout(() => {
        setCommandHistory((prev) => [...prev, "⚡ Verifying credentials..."]);
      }, 1000);

      await authClient.signIn.email(
        {
          email: value.username,
          password: value.password,
        },
        {
          onSuccess: () => {
            setCommandHistory((prev) => [
              ...prev,
              "✓ Authentication successful. Redirecting to dashboard...",
            ]);
            setTimeout(() => {
              router.push("/dashboard");
              toast.success("Sign in successful");
            }, 1500);
          },
          onError: (error) => {
            setCommandHistory((prev) => [
              ...prev,
              "✗ Authentication failed. Invalid credentials.",
            ]);
            setIsLoading(false);
            toast.error(error.error.message || error.error.statusText);
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
        rememberMe: z.boolean().optional(),
      }),
    },
  });

  // Demo hint effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCommandHistory((prev) => [
        ...prev,
        "💡 Demo credentials: admin / password123",
      ]);

      // Remove hint after 8 seconds
      setTimeout(() => {
        setCommandHistory((prev) => prev.filter((cmd) => !cmd.includes("💡")));
      }, 8000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // System status animation
  useEffect(() => {
    const interval = setInterval(() => {
      // This will trigger a re-render for the status dots animation
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-landing-bg">
        <div className="font-mono text-landing-accent">Loading...</div>
      </div>
    );
  }

  return (
    <AuthLayout maxWidth="lg">
      <TerminalHistory commands={commandHistory} />

      <AuthCard showTerminalHeader title="LOGIN_TERMINAL.SH">
        {/* Command Line */}
        <div className="mb-6 rounded border border-landing-surface-alt bg-landing-bg-alt p-3 text-xs">
          <div className="space-y-1">
            <div>
              <span className="text-landing-accent">invoicer@localhost:~$</span>{" "}
              auth --status
            </div>
            <div className="text-landing-success">
              ✓ Authentication service ready. Please enter credentials.
            </div>

            {/* Command History */}
            {commandHistory.map((command, index) => (
              <div
                className={cn(
                  command.includes("✓")
                    ? "text-landing-success"
                    : command.includes("✗")
                      ? "text-landing-error"
                      : command.includes("⚡")
                        ? "text-landing-warning"
                        : command.includes("💡")
                          ? "text-landing-warning"
                          : command.includes("invoicer@localhost")
                            ? "text-landing-text"
                            : "text-landing-text"
                )}
                key={index}
              >
                {command.includes("invoicer@localhost") ? (
                  command
                ) : command.includes("auth --login") ? (
                  <>
                    <span className="text-landing-accent">
                      invoicer@localhost:~$
                    </span>{" "}
                    {command}
                  </>
                ) : (
                  command
                )}
              </div>
            ))}

            <div>
              <span className="text-landing-accent">invoicer@localhost:~$</span>
              <span className="ml-1 animate-pulse bg-landing-accent text-landing-bg">
                █
              </span>
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="mb-6 overflow-hidden rounded-lg border border-landing-surface-alt bg-landing-surface">
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-landing-border border-b bg-landing-surface-alt px-4 py-3">
            <div className="font-semibold text-landing-accent text-xs uppercase tracking-wider">
              USER_AUTHENTICATION.LOGIN
            </div>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-landing-error" />
              <div className="h-3 w-3 rounded-full bg-landing-warning" />
              <div className="h-3 w-3 rounded-full bg-landing-success" />
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-8">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.Field name="username">
                {(field) => (
                  <TerminalField
                    error={field.state.meta.errors[0]?.message}
                    label="Username"
                    required
                  >
                    <TerminalInput
                      autoComplete="username"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your username"
                      type="text"
                      value={field.state.value}
                    />
                  </TerminalField>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <TerminalField
                    error={field.state.meta.errors[0]?.message}
                    label="Password"
                    required
                  >
                    <TerminalInput
                      autoComplete="current-password"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                      type="password"
                      value={field.state.value}
                    />
                  </TerminalField>
                )}
              </form.Field>

              <div className="flex items-center justify-between text-xs">
                <form.Field name="rememberMe">
                  {(field) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.state.value}
                        className="border-landing-surface-alt data-[state=checked]:border-landing-accent data-[state=checked]:bg-landing-accent"
                        id={field.name}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked as boolean)
                        }
                      />
                      <TerminalLabel
                        className="cursor-pointer"
                        htmlFor={field.name}
                      >
                        Remember Me
                      </TerminalLabel>
                    </div>
                  )}
                </form.Field>

                <button
                  className="text-landing-accent uppercase tracking-wider transition-colors hover:text-landing-accent-dark"
                  type="button"
                >
                  Forgot Password?
                </button>
              </div>

              <form.Subscribe>
                {(state) => (
                  <Button
                    className={cn(
                      "w-full bg-landing-accent text-landing-bg hover:bg-landing-accent-dark",
                      "py-3.5 font-semibold text-xs uppercase tracking-wider",
                      "transition-all duration-200 hover:translate-y-[-1px]",
                      "disabled:transform-none disabled:bg-landing-text-dimmed disabled:text-landing-text-muted"
                    )}
                    disabled={
                      !state.canSubmit || state.isSubmitting || isLoading
                    }
                    type="submit"
                  >
                    {state.isSubmitting || isLoading
                      ? "Authenticating..."
                      : "Login to Dashboard"}
                  </Button>
                )}
              </form.Subscribe>

              {/* Loading Animation */}
              {isLoading && (
                <div className="text-center">
                  <div className="mb-2 text-landing-warning text-xs">
                    Authenticating user...
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded bg-landing-surface-alt">
                    <div className="h-full animate-pulse rounded bg-landing-accent" />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-landing-text-dimmed text-xs">
          <p>
            <button
              className="text-landing-accent transition-colors hover:text-landing-accent-dark"
              onClick={() => router.push("/")}
            >
              ← Back to Landing Page
            </button>
          </p>
        </div>

        {/* System Status */}
        <div className="mt-6 rounded border border-landing-surface-alt bg-landing-bg-alt p-4">
          <div className="mb-3 font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
            System Status
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-landing-text">Database Connection</span>
              <div className="flex items-center gap-1.5 font-semibold text-landing-success">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-landing-success" />
                ONLINE
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-landing-text">Web Server</span>
              <div className="flex items-center gap-1.5 font-semibold text-landing-success">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-landing-success" />
                RUNNING
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-landing-text">Local Storage</span>
              <div className="flex items-center gap-1.5 font-semibold text-landing-success">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-landing-success" />
                AVAILABLE
              </div>
            </div>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
