import { TerminalButton } from "@/components/landing/terminal-button";
import TerminalDemo from "@/components/landing/terminal-demo";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction?: {
    text: string;
    href: string | URL;
  };
  secondaryAction?: {
    text: string;
    href: string | URL;
  };
  showTerminal?: boolean;
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  showTerminal = false,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`py-20 text-center ${className}`}>
      <div className="container mx-auto max-w-6xl px-5">
        <h1 className="mb-6 font-bold text-5xl text-landing-accent uppercase tracking-wide md:text-6xl">
          {title}
        </h1>
        <p className="mb-4 font-medium text-landing-text text-xl">{subtitle}</p>
        <p className="mx-auto mb-10 max-w-2xl text-landing-text-muted text-sm leading-relaxed">
          {description}
        </p>

        {(primaryAction || secondaryAction) && (
          <div className="mb-15 flex flex-col items-center justify-center gap-5 md:flex-row">
            {primaryAction && (
              <a href={primaryAction.href as string}>
                <TerminalButton size="lg" variant="primary">
                  {primaryAction.text}
                </TerminalButton>
              </a>
            )}
            {secondaryAction && (
              <a href={secondaryAction.href as string}>
                <TerminalButton size="lg" variant="default">
                  {secondaryAction.text}
                </TerminalButton>
              </a>
            )}
          </div>
        )}

        {showTerminal && (
          <div className="mt-15">
            <TerminalDemo />
          </div>
        )}
      </div>
    </section>
  );
}
