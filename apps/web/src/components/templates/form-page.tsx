import type * as React from "react";
import { Breadcrumb, PageHeader } from "@/components/common/page-header";
import { AppPage } from "@/components/layouts/app-layout";
import {
  TerminalCard,
  TerminalCardContent,
  TerminalCardHeader,
  TerminalCardTitle,
} from "@/components/ui/terminal-card";
import { cn } from "@/lib/utils";

interface FormPageProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle?: string;
  showHeader?: boolean;
  showTime?: boolean;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "default" | "lg";
}

function FormPage({
  children,
  className,
  title,
  subtitle,
  showHeader = true,
  showTime = false,
  breadcrumbs,
  actions,
  maxWidth = "2xl",
  padding = "default",
}: FormPageProps) {
  return (
    <AppPage className={className} maxWidth={maxWidth} padding={padding}>
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

      {showHeader && (
        <PageHeader actions={actions} showTime={showTime} title={title} />
      )}

      {subtitle && (
        <p className="mb-6 font-mono text-landing-text-muted text-sm">
          {subtitle}
        </p>
      )}

      {children}
    </AppPage>
  );
}

// Form card wrapper with terminal styling
interface FormCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showTerminalHeader?: boolean;
}

function FormCard({
  children,
  title,
  subtitle,
  className,
  showTerminalHeader = true,
}: FormCardProps) {
  return (
    <TerminalCard className={cn("max-w-none", className)}>
      {showTerminalHeader && title && (
        <TerminalCardHeader>
          <TerminalCardTitle>{title}</TerminalCardTitle>
        </TerminalCardHeader>
      )}

      <TerminalCardContent>
        {subtitle && (
          <p className="mb-6 text-landing-text-muted text-sm">{subtitle}</p>
        )}
        {children}
      </TerminalCardContent>
    </TerminalCard>
  );
}

// Form section divider
interface FormSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

function FormSection({
  children,
  title,
  subtitle,
  className,
}: FormSectionProps) {
  return (
    <div className={cn("mb-8", className)}>
      {title && (
        <div className="mb-4 border-landing-border border-b pb-2">
          <h3 className="font-mono font-semibold text-landing-accent text-sm uppercase tracking-wider">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-landing-text-muted text-xs">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Form actions (submit, cancel, etc.)
interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  sticky?: boolean;
}

function FormActions({
  children,
  className,
  align = "right",
  sticky = false,
}: FormActionsProps) {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={cn(
        "mt-6 flex items-center gap-3 border-landing-border border-t pt-6",
        alignClasses[align],
        sticky && "sticky bottom-0 bg-landing-bg",
        className
      )}
    >
      {children}
    </div>
  );
}

// Form grid for organizing form fields
interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

function FormGrid({ children, columns = 2, className }: FormGridProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn("grid gap-6", gridClasses[columns], className)}>
      {children}
    </div>
  );
}

export { FormPage, FormCard, FormSection, FormActions, FormGrid };
