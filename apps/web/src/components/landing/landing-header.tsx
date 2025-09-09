"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TerminalButton } from "./terminal-button";

export default function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle mobile menu"
              className="flex h-10 w-10 items-center justify-center rounded border border-landing-border bg-landing-surface-alt text-landing-text transition-colors hover:border-landing-accent hover:text-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
              onClick={toggleMobileMenu}
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="border-landing-surface-alt border-t-2 bg-landing-surface md:hidden">
          <div className="container mx-auto max-w-6xl px-5 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                className="font-medium text-landing-text text-sm uppercase tracking-wide transition-colors hover:text-landing-accent"
                href="#features"
                onClick={closeMobileMenu}
              >
                Features
              </a>
              <a
                className="font-medium text-landing-text text-sm uppercase tracking-wide transition-colors hover:text-landing-accent"
                href="#installation"
                onClick={closeMobileMenu}
              >
                Installation
              </a>
              <a
                className="font-medium text-landing-text text-sm uppercase tracking-wide transition-colors hover:text-landing-accent"
                href="#docs"
                onClick={closeMobileMenu}
              >
                Documentation
              </a>
              <a
                className="font-medium text-landing-text text-sm uppercase tracking-wide transition-colors hover:text-landing-accent"
                href="#github"
                onClick={closeMobileMenu}
              >
                GitHub
              </a>
              <div className="pt-2">
                <Link href="/login" onClick={closeMobileMenu}>
                  <TerminalButton className="w-full" variant="primary">
                    Get Started
                  </TerminalButton>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
