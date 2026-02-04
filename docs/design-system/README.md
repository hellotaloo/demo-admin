# Taloo Design System

Complete design system documentation for the Taloo frontend application.

## Overview

The Taloo design system provides a comprehensive set of guidelines, components, and patterns for building consistent, accessible user interfaces.

**Key Principles:**
- **Consistency**: Use established patterns across all features
- **Simplicity**: Keep interfaces clean and focused
- **Accessibility**: Ensure WCAG AA compliance
- **Performance**: Optimize for speed and responsiveness

## Quick Links

### Foundation
- [Brand Identity](brand-identity.md) - Colors, logo, voice
- [Typography](typography.md) - Font system and hierarchy
- [Spacing & Layout](spacing-layout.md) - Grid, spacing, containers

### Components
- [Components](components.md) - Complete component catalog
- [Animations](animations.md) - Animation library and timing

### Patterns
- [Forms](patterns/forms.md) - Form layouts and validation
- [Tables](patterns/tables.md) - Data table patterns
- [Cards](patterns/cards.md) - Card layouts and variations
- [Modals](patterns/modals.md) - Dialog and modal patterns

## Architecture

### 3-Tier Component System

**Tier 1: UI Primitives** (`/components/ui/`)
- 18+ shadcn-style components built on Radix UI
- Never modify directly - use as building blocks
- Examples: Button, Input, Table, Dialog, Card

**Tier 2: Reusable Composites** (`/components/kit/`)
- Generic, domain-agnostic components
- Built by composing Tier 1 primitives
- Examples: MetricCard, DataTable, ChatAssistant, StatusBadge

**Tier 3: Domain Features** (`/components/blocks/`)
- Domain-specific, tied to data models
- Compose from Tier 1 and Tier 2
- Examples: VacancyTable, ApplicationDashboard, InterviewEditor

## Technology Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI + shadcn/ui
- **Typography**: Inter (UI) + Hedvig Letters Serif (headers)
- **Colors**: OKLch color model with CSS variables
- **Icons**: Lucide React

## Getting Started

### For Designers
1. Review [Brand Identity](brand-identity.md) for color palette and typography
2. Check [Components](components.md) for available UI elements
3. Use [Patterns](patterns/) for common layouts

### For Developers
1. Read the component architecture overview above
2. Review [Components](components.md) for usage examples
3. Follow patterns in `/components/kit/` for new components
4. Check [Animations](animations.md) for transition standards

## Contributing

When adding new components:
1. Determine the correct tier (ui → kit → blocks)
2. Follow naming conventions (kebab-case files, PascalCase components)
3. Export types with the component
4. Add barrel exports (`index.ts`)
5. Document usage with JSDoc comments
6. Add test IDs (`data-testid="action-entity-id"`)

## Support

For questions or suggestions about the design system:
- Review existing components in the codebase
- Check pattern documentation
- Consult with the team
