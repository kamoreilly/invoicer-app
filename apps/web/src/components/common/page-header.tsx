import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { TimeDisplay } from "./status-indicator";

const pageHeaderVariants = cva(
  "mb-6 flex items-center justify-between border-landing-border border-b pb-4",
  {
    variants: {
      variant: {
        default: "border-landing-border",
        accent: "border-landing-accent",
        none: "border-transparent",
      },
      size: {
        sm: "mb-4 pb-3",
        default: "mb-6 pb-4",
        lg: "mb-8 pb-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const pageTitleVariants = cva(
  "font-bold font-mono text-landing-accent uppercase tracking-wider",
  {
    variants: {
      size: {
        sm: "text-base",
        default: "text-xl",
        lg: "text-2xl",
        xl: "text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {
  title: string;
  titleSize?: VariantProps<typeof pageTitleVariants>["size"];
  showTime?: boolean;
  timeFormat?: "full" | "time" | "session";
  actions?: React.ReactNode;
}

function PageHeader({
  className,
  variant,
  size,
  title,
  titleSize,
  showTime = true,
  timeFormat = "full",
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(pageHeaderVariants({ variant, size, className }))}
      data-slot="page-header"
      {...props}
    >
      <h1 className={cn(pageTitleVariants({ size: titleSize || size }))}>
        {title}
      </h1>

      <div className="flex items-center gap-4">
        {actions}
        {showTime && <TimeDisplay format={timeFormat} />}
      </div>
    </div>
  );
}

// Action bar component for buttons/actions
interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right" | "between";
}

function ActionBar({ className, align = "left", ...props }: ActionBarProps) {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={cn(
        "mb-6 flex items-center gap-3",
        alignClasses[align],
        className
      )}
      data-slot="action-bar"
      {...props}
    />
  );
}

// Breadcrumb component
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLNavElement> {
  items: BreadcrumbItem[];
  separator?: string;
}

function Breadcrumb({
  className,
  items,
  separator = "/",
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        "mb-4 flex items-center gap-2 font-mono text-landing-text-muted text-xs uppercase tracking-wider",
        className
      )}
      data-slot="breadcrumb"
      {...props}
    >
      {items.map((item, index) => (
        <span className="flex items-center gap-2" key={index}>
          {item.href ? (
            <a
              className="transition-colors hover:text-landing-accent"
              href={item.href}
            >
              {item.label}
            </a>
          ) : (
            <span
              className={
                index === items.length - 1 ? "text-landing-accent" : ""
              }
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-landing-text-dimmed">{separator}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export {
  PageHeader,
  ActionBar,
  Breadcrumb,
  pageHeaderVariants,
  pageTitleVariants,
};
