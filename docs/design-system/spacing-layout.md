# Spacing & Layout

## Spacing Scale

Taloo uses Tailwind's default spacing scale based on 0.25rem (4px) increments.

### Common Spacing Values

| Class | Size | Pixels | Usage |
|-------|------|--------|-------|
| `space-y-2` | 0.5rem | 8px | Tight vertical spacing (label to input) |
| `space-y-4` | 1rem | 16px | Default vertical spacing (form fields) |
| `space-y-6` | 1.5rem | 24px | Section spacing |
| `space-y-8` | 2rem | 32px | Major section breaks |
| `gap-3` | 0.75rem | 12px | Grid/flex gap (small) |
| `gap-4` | 1rem | 16px | Grid/flex gap (standard) |
| `gap-6` | 1.5rem | 24px | Grid/flex gap (large) |
| `p-4` | 1rem | 16px | Small padding (compact cards) |
| `p-5` | 1.25rem | 20px | Standard padding (cards) |
| `p-6` | 1.5rem | 24px | Large padding (modals, hero sections) |

## Padding Standards

### Cards
```tsx
// Standard card
className="p-5"  // 20px all sides

// Large card
className="p-6"  // 24px all sides

// Compact card
className="p-4"  // 16px all sides
```

### Sections
```tsx
// Page container
className="p-6"  // 24px on mobile
className="p-8"  // 32px on desktop (optional)
```

### Buttons
```tsx
// Standard button
className="px-4 py-2"  // 16px horizontal, 8px vertical

// Large button
className="px-6 py-3"  // 24px horizontal, 12px vertical

// Small button
className="px-3 py-1.5"  // 12px horizontal, 6px vertical
```

## Margin Standards

### Vertical Spacing
Use `space-y-*` for consistent vertical rhythm:

```tsx
// Between form fields
<div className="space-y-4">
  <FormField />
  <FormField />
</div>

// Between sections
<div className="space-y-8">
  <Section />
  <Section />
</div>
```

### Horizontal Spacing
Use `gap-*` for flex/grid layouts:

```tsx
// Button groups
<div className="flex gap-3">
  <Button />
  <Button />
</div>

// Card grids
<div className="grid grid-cols-3 gap-4">
  <Card />
  <Card />
</div>
```

## Layout Containers

### Page Container
```tsx
<div className="max-w-7xl mx-auto px-6 py-8">
  {/* page content */}
</div>
```

**Breakdowns:**
- `max-w-7xl`: 1280px maximum width
- `mx-auto`: Centered horizontally
- `px-6`: 24px horizontal padding
- `py-8`: 32px vertical padding

### Section Container
```tsx
<section className="space-y-6">
  <h2>Section Title</h2>
  {/* section content */}
</section>
```

### Content Width Limits

**Full Width**
```tsx
className="max-w-7xl"  // 1280px - dashboards, tables
```

**Reading Width**
```tsx
className="max-w-4xl"  // 896px - content pages, forms
```

**Narrow Width**
```tsx
className="max-w-2xl"  // 672px - modals, dialogs
```

**Form Width**
```tsx
className="max-w-md"  // 448px - login forms, narrow inputs
```

## Grid Layouts

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <MetricCard />
  <MetricCard />
  <MetricCard />
  <MetricCard />
</div>
```

**Breakpoints:**
- Mobile: 1 column
- Tablet (md: 768px): 2 columns
- Desktop (lg: 1024px): 4 columns

### Common Grid Patterns

**Metrics Dashboard (4 columns)**
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
```

**Card Gallery (3 columns)**
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

**Two Column Layout**
```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-8"
```

**Sidebar Layout**
```tsx
className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6"
// 300px sidebar, remaining space for content
```

## Flex Layouts

### Horizontal Stack
```tsx
<div className="flex items-center gap-3">
  <Icon />
  <span>Text</span>
</div>
```

### Space Between
```tsx
<div className="flex items-center justify-between">
  <h2>Title</h2>
  <Button>Action</Button>
</div>
```

### Vertical Stack
```tsx
<div className="flex flex-col gap-4">
  <Item />
  <Item />
</div>
```

### Center Aligned
```tsx
<div className="flex items-center justify-center min-h-screen">
  <LoginForm />
</div>
```

## Responsive Spacing

### Mobile First
Always design mobile first, then add larger spacing on bigger screens:

```tsx
// Mobile: 4 spacing, Desktop: 6 spacing
className="gap-4 lg:gap-6"

// Mobile: p-4, Desktop: p-6
className="p-4 lg:p-6"
```

### Responsive Padding Example
```tsx
<div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
  {/* Scales padding as screen size increases */}
</div>
```

## Breakpoints

Tailwind's default breakpoints:

| Prefix | Min Width | Typical Device |
|--------|-----------|----------------|
| `sm:` | 640px | Large phone |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

## Common Layout Patterns

### Page with Header and Content
```tsx
<div className="max-w-7xl mx-auto p-6 space-y-8">
  {/* Header */}
  <div className="space-y-2">
    <h1 className="font-serif text-4xl font-bold">Page Title</h1>
    <p className="text-sm text-gray-500">Description</p>
  </div>

  {/* Main Content */}
  <div className="space-y-6">
    <Section />
    <Section />
  </div>
</div>
```

### Card Grid Section
```tsx
<section className="space-y-4">
  <h2 className="text-xl font-semibold">Section Title</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card />
    <Card />
    <Card />
  </div>
</section>
```

### Split Panel Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="space-y-4">
    {/* Left panel */}
  </div>
  <div className="space-y-4">
    {/* Right panel */}
  </div>
</div>
```

### Form Layout
```tsx
<form className="max-w-md space-y-6">
  <div className="space-y-4">
    {/* Form fields with consistent spacing */}
    <FormField />
    <FormField />
  </div>

  <div className="flex gap-3 pt-4">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </div>
</form>
```

## Z-Index Scale

Use consistent z-index values:

| Element | Z-Index | Class |
|---------|---------|-------|
| Normal content | 0 | `z-0` |
| Dropdowns | 10 | `z-10` |
| Sticky headers | 20 | `z-20` |
| Overlays | 40 | `z-40` |
| Modals | 50 | `z-50` |

## Accessibility

**Focus Spacing:**
- Ensure focus rings don't overlap with adjacent elements
- Add adequate spacing between interactive elements (min 44x44px touch targets)

**Responsive Spacing:**
- Increase touch targets on mobile
- Don't make spacing too tight on small screens
- Test with actual devices, not just browser resize
