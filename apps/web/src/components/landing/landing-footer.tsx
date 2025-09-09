interface FooterLink {
  text: string;
  href: string;
}

interface LandingFooterProps {
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { text: "Documentation", href: "#" },
  { text: "GitHub", href: "#" },
  { text: "Issues", href: "#" },
  { text: "Contributing", href: "#" },
  { text: "License", href: "#" },
];

const defaultCopyright =
  "© 2024 Invoicer App. Open source under MIT License. Built with ❤️ for the developer community.";

export default function LandingFooter({
  links = defaultLinks,
  copyright = defaultCopyright,
  className = "",
}: LandingFooterProps) {
  return (
    <footer
      className={`border-landing-surface-alt border-t-2 bg-landing-bg-alt py-10 ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-5">
        <div className="mb-5 flex flex-col items-center justify-between md:flex-row">
          <div className="mb-5 flex items-center gap-3 font-bold font-mono text-landing-accent text-lg md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-landing-accent font-bold text-base text-landing-bg">
              IA
            </div>
            INVOICER APP
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link, index) => (
              <a
                className="text-landing-text-muted text-xs uppercase tracking-wide transition-colors hover:text-landing-accent"
                href={link.href}
                key={index}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-landing-text-dimmed text-xs">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
