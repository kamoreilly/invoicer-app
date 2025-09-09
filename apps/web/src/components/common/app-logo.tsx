import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type * as React from "react";
import { cn } from "@/lib/utils";

const logoVariants = cva(
  "flex items-center gap-3 font-bold font-mono text-landing-accent",
  {
    variants: {
      size: {
        sm: "gap-2 text-sm",
        default: "gap-3 text-base",
        lg: "gap-3 text-lg",
        xl: "gap-4 text-xl",
        "2xl": "gap-4 text-2xl",
      },
      variant: {
        default: "text-landing-accent",
        light: "text-landing-text",
        dark: "text-landing-bg",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const logoIconVariants = cva(
  "flex items-center justify-center rounded bg-landing-accent font-bold text-landing-bg",
  {
    variants: {
      size: {
        sm: "h-5 w-5 text-xs",
        default: "h-6 w-6 text-sm",
        lg: "h-8 w-8 text-base",
        xl: "h-10 w-10 text-lg",
        "2xl": "h-12 w-12 text-xl",
      },
      variant: {
        default: "bg-landing-accent text-landing-bg",
        light: "bg-landing-text text-landing-bg",
        dark: "bg-landing-bg text-landing-accent",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      rounded: "md",
    },
  }
);

interface AppLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoVariants> {
  href?: string;
  showText?: boolean;
  text?: string;
  iconVariant?: VariantProps<typeof logoIconVariants>["variant"];
  iconRounded?: VariantProps<typeof logoIconVariants>["rounded"];
}

function AppLogo({
  className,
  size,
  variant,
  href,
  showText = true,
  text = "INVOICER APP",
  iconVariant,
  iconRounded,
  ...props
}: AppLogoProps) {
  const logoContent = (
    <div
      className={cn(logoVariants({ size, variant, className }))}
      data-slot="app-logo"
      {...props}
    >
      <div
        className={cn(
          logoIconVariants({
            size,
            variant: iconVariant || variant,
            rounded: iconRounded,
          })
        )}
      >
        IA
      </div>
      {showText && <span>{text}</span>}
    </div>
  );

  if (href) {
    return (
      <Link className="transition-opacity hover:opacity-80" href={href}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

// Simplified logo icon only
interface AppLogoIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoIconVariants> {}

function AppLogoIcon({
  className,
  size,
  variant,
  rounded,
  ...props
}: AppLogoIconProps) {
  return (
    <div
      className={cn(logoIconVariants({ size, variant, rounded, className }))}
      data-slot="app-logo-icon"
      {...props}
    >
      IA
    </div>
  );
}

export { AppLogo, AppLogoIcon, logoVariants, logoIconVariants };
