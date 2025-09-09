import Link from "next/link";
import { TerminalButton } from "./terminal-button";

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-landing-surface-alt border-b-2 bg-landing-surface">
      <div className="container mx-auto max-w-6xl px-5">
        <nav className="flex items-center justify-between py-5">
          <Link
            className="flex items-center gap-3 font-bold font-mono text-landing-accent text-lg"
            href="/"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-landing-accent font-bold text-base text-landing-bg">
              IA
            </div>
            INVOICER APP
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              className="font-medium text-landing-text text-xs uppercase tracking-wide transition-colors hover:text-landing-accent"
              href="#features"
            >
              Features
            </a>
            <a
              className="font-medium text-landing-text text-xs uppercase tracking-wide transition-colors hover:text-landing-accent"
              href="#installation"
            >
              Installation
            </a>
            <a
              className="font-medium text-landing-text text-xs uppercase tracking-wide transition-colors hover:text-landing-accent"
              href="#docs"
            >
              Documentation
            </a>
            <a
              className="font-medium text-landing-text text-xs uppercase tracking-wide transition-colors hover:text-landing-accent"
              href="#github"
            >
              GitHub
            </a>
            <Link href="/login">
              <TerminalButton variant="primary">Get Started</TerminalButton>
            </Link>
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <Link href="/login">
              <TerminalButton size="sm" variant="primary">
                Get Started
              </TerminalButton>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
