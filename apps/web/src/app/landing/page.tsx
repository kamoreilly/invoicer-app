import PageTemplate from "@/components/templates/page-template";
import { landingPageConfig } from "@/data/landing-page-config";

export default function LandingPage() {
  return <PageTemplate {...landingPageConfig} />;
}
