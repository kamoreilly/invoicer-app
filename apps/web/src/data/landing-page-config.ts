import type { PageTemplateProps } from "@/components/templates/page-template";

export const landingPageConfig: PageTemplateProps = {
  hero: {
    title: "Invoicer App",
    subtitle: "Open Source Invoice Management System",
    description:
      "A powerful invoice management application with a sleek terminal-inspired interface. Completely free, open source, and designed to run locally on your machine with full data control.",
    primaryAction: {
      text: "Launch Application",
      href: "/login",
    },
    secondaryAction: {
      text: "Download & Install",
      href: "#installation",
    },
    showTerminal: true,
  },

  features: {
    title: "Features",
    features: [
      {
        icon: "🏠",
        title: "Self-Hosted",
        description:
          "Run entirely on your local machine or server. No cloud dependencies, no monthly fees, complete data ownership and privacy control.",
      },
      {
        icon: "⚡",
        title: "Modern Interface",
        description:
          "Beautiful retro terminal-inspired web interface that's both functional and aesthetically pleasing. Perfect for developers and tech enthusiasts.",
      },
      {
        icon: "📊",
        title: "Complete Solution",
        description:
          "Full invoice lifecycle management: create, customize, send, track payments, manage clients, generate reports, and analyze business performance.",
      },
      {
        icon: "🔓",
        title: "Open Source",
        description:
          "MIT licensed, fully open source code. Contribute, customize, and extend the application to meet your specific business needs.",
      },
      {
        icon: "💾",
        title: "Local Database",
        description:
          "SQLite database for lightweight deployment or PostgreSQL for enterprise use. Your data stays on your infrastructure.",
      },
      {
        icon: "🔧",
        title: "Developer Friendly",
        description:
          "RESTful API for integrations, webhook support for automation, and extensible architecture for connecting with other business systems.",
      },
    ],
  },

  installation: {
    title: "Quick Installation",
    steps: [
      {
        title: "Download",
        description:
          "Download the latest release from GitHub or clone the repository to get started with the source code.",
      },
      {
        title: "Install",
        description:
          "Run the installation script or use npm/yarn to install dependencies and set up the application.",
      },
      {
        title: "Configure",
        description:
          "Set up your company information, database connection, and email settings through the configuration wizard.",
      },
      {
        title: "Launch",
        description:
          "Start the web application and access the beautiful interface at localhost:3000 to begin creating and managing your invoices.",
      },
    ],
    codeBlock: [
      "# Clone the repository",
      "git clone https://github.com/invoicer-app/invoicer-app.git",
      "",
      "# Navigate to directory",
      "cd invoicer-app",
      "",
      "# Install dependencies",
      "npm install",
      "",
      "# Run setup wizard",
      "npm run setup",
      "",
      "# Start the application",
      "npm start",
      "",
      "# Access at http://localhost:3000",
    ],
    actions: {
      primary: {
        text: "Download Latest Release",
        href: "#",
      },
      secondary: {
        text: "View on GitHub",
        href: "#",
      },
    },
  },
};
