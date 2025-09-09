import LandingLayout from "@/components/layouts/landing-layout";
import FeaturesSection from "@/components/sections/features-section";
import HeroSection from "@/components/sections/hero-section";
import InstallationSection from "@/components/sections/installation-section";

export interface HeroConfig {
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
}

export interface FeatureConfig {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesConfig {
  title: string;
  features: FeatureConfig[];
}

export interface InstallationConfig {
  title: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
  codeBlock?: string[];
  actions?: {
    primary?: { text: string; href: string };
    secondary?: { text: string; href: string };
  };
}

export interface PageTemplateProps {
  hero?: HeroConfig;
  features?: FeaturesConfig;
  installation?: InstallationConfig;
  customSections?: React.ReactNode[];
  className?: string;
}

export default function PageTemplate({
  hero,
  features,
  installation,
  customSections,
  className = "",
}: PageTemplateProps) {
  return (
    <LandingLayout className={className}>
      {hero && (
        <HeroSection
          description={hero.description}
          primaryAction={hero.primaryAction}
          secondaryAction={hero.secondaryAction}
          showTerminal={hero.showTerminal}
          subtitle={hero.subtitle}
          title={hero.title}
        />
      )}

      {features && (
        <FeaturesSection features={features.features} title={features.title} />
      )}

      {installation && (
        <InstallationSection
          actions={installation.actions}
          codeBlock={installation.codeBlock}
          steps={installation.steps}
          title={installation.title}
        />
      )}

      {customSections?.map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </LandingLayout>
  );
}
