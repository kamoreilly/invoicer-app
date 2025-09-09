import { TerminalButton } from "@/components/landing/terminal-button";

interface Step {
  title: string;
  description: string;
}

interface InstallationSectionProps {
  title: string;
  steps: Step[];
  codeBlock?: string[];
  actions?: {
    primary?: { text: string; href: string };
    secondary?: { text: string; href: string };
  };
  className?: string;
}

function StepCard({ step, stepNumber }: { step: Step; stepNumber: number }) {
  return (
    <div className="relative rounded-lg border border-landing-surface-alt bg-landing-surface p-6">
      <div className="-top-3 absolute left-6 flex h-6 w-6 items-center justify-center rounded-full bg-landing-accent font-bold text-landing-bg text-xs">
        {stepNumber}
      </div>
      <h3 className="mb-3 font-semibold text-landing-accent text-sm uppercase tracking-wide">
        {step.title}
      </h3>
      <p className="text-landing-text-muted text-xs leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <div className="my-5 overflow-x-auto rounded border border-landing-surface-alt bg-landing-bg p-5 font-mono text-xs">
      {lines.map((line, index) => (
        <div className="text-landing-success" key={index}>
          {line}
        </div>
      ))}
    </div>
  );
}

export default function InstallationSection({
  title,
  steps,
  codeBlock,
  actions,
  className = "",
}: InstallationSectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto max-w-6xl px-5">
        <h2 className="mb-15 text-center font-bold text-4xl text-landing-accent uppercase tracking-wide">
          {title}
        </h2>

        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} stepNumber={index + 1} />
          ))}
        </div>

        {codeBlock && <CodeBlock lines={codeBlock} />}

        {actions && (
          <div className="mt-10 text-center">
            <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
              {actions.primary && (
                <a href={actions.primary.href}>
                  <TerminalButton size="lg" variant="primary">
                    {actions.primary.text}
                  </TerminalButton>
                </a>
              )}
              {actions.secondary && (
                <a href={actions.secondary.href}>
                  <TerminalButton size="lg" variant="default">
                    {actions.secondary.text}
                  </TerminalButton>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
