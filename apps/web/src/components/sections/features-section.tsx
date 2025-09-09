interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
  className?: string;
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="hover:-translate-y-1 group rounded-lg border border-landing-surface-alt bg-landing-surface p-8 text-center transition-all duration-200 hover:border-landing-accent">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-landing-accent font-bold text-2xl text-landing-bg">
        {feature.icon}
      </div>
      <h3 className="mb-4 font-semibold text-landing-accent text-lg uppercase tracking-wide">
        {feature.title}
      </h3>
      <p className="text-landing-text-muted text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export default function FeaturesSection({
  title,
  features,
  className = "",
}: FeaturesSectionProps) {
  return (
    <section className={`bg-landing-bg-alt py-20 ${className}`}>
      <div className="container mx-auto max-w-6xl px-5">
        <h2 className="mb-15 text-center font-bold text-4xl text-landing-accent uppercase tracking-wide">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard feature={feature} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
