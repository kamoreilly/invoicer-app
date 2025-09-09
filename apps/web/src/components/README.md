# Invoicer App Component System

This document outlines the optimized component architecture for the Invoicer App, designed to maximize reusability and maintain consistent terminal-themed styling across all pages.

## Architecture Overview

The component system is organized into four main categories:

### 1. UI Components (`/ui`)
Terminal-themed UI primitives that replace standard components:

- **TerminalCard**: Terminal-styled card component with header, content, and footer sections
- **TerminalInput**: Terminal-styled input fields, textareas, labels, and form fields
- **TerminalStats**: Specialized components for displaying statistics and metrics
- **TerminalButton**: Terminal-styled buttons (already existing)

### 2. Common Components (`/common`)
Reusable components used across multiple pages:

- **AppLogo**: Consistent logo component with various sizes and variants
- **StatusIndicator**: Status dots and indicators with time displays
- **PageHeader**: Standardized page headers with titles, actions, and breadcrumbs

### 3. Layout Components (`/layouts`)
Layout wrappers for different page types:

- **AppLayout**: Main application layout with header and sidebar
- **AuthLayout**: Authentication pages layout
- **LandingLayout**: Landing page layout (existing)

### 4. Page Templates (`/templates`)
Complete page templates for common patterns:

- **DashboardPage**: Dashboard-specific layout with stats and actions
- **FormPage**: Form pages with consistent structure
- **ListPage**: List/table pages with filtering and pagination
- **PageTemplate**: Landing page template (existing)

## Usage Examples

### Using Terminal UI Components

```tsx
import { TerminalCard, TerminalInput, TerminalField } from "@/components/ui";

function MyForm() {
  return (
    <TerminalCard>
      <TerminalCardHeader>
        <TerminalCardTitle>USER_FORM.SH</TerminalCardTitle>
      </TerminalCardHeader>
      <TerminalCardContent>
        <TerminalField label="Username" required>
          <TerminalInput placeholder="Enter username" />
        </TerminalField>
      </TerminalCardContent>
    </TerminalCard>
  );
}
```

### Using Page Templates

```tsx
import { DashboardPage, DashboardStats } from "@/components/templates";

function Dashboard() {
  const stats = [
    { header: "TOTAL_USERS", value: "1,234", trend: "up", trendValue: "+5%" }
  ];

  return (
    <DashboardPage
      title="MY_DASHBOARD"
      stats={<DashboardStats stats={stats} />}
    >
      {/* Dashboard content */}
    </DashboardPage>
  );
}
```

### Using Layout Components

```tsx
import { AuthLayout, AuthCard } from "@/components/layouts";

function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard showTerminalHeader title="LOGIN.SH">
        {/* Login form */}
      </AuthCard>
    </AuthLayout>
  );
}
```

## Layout System

The new layout system automatically handles different page types through the `LayoutWrapper`:

- **Landing pages** (`/`, `/landing`): Use `LandingLayout`
- **Auth pages** (`/login`, `/register`): Handle layout internally
- **App pages** (`/dashboard`, `/invoices`, etc.): Use `AppLayout`
- **Error pages** (`/404`, `/500`): Use minimal layout

## Benefits

1. **Consistency**: All components follow the terminal theme
2. **Reusability**: Components can be used across different pages
3. **Maintainability**: Centralized styling and behavior
4. **Developer Experience**: Clear patterns and easy-to-use APIs
5. **Performance**: Optimized layout rendering

## Migration Guide

When updating existing pages:

1. Replace standard UI components with terminal equivalents
2. Use page templates for common layouts
3. Leverage common components for repeated elements
4. Update imports to use the new component system

## Component Variants

Most components support variants for different use cases:

- **Size variants**: `sm`, `default`, `lg`, `xl`
- **Style variants**: `default`, `accent`, `success`, `warning`, `error`
- **Layout variants**: Different arrangements and spacing options

This system provides a solid foundation for building consistent, maintainable, and visually cohesive pages throughout the Invoicer App.
