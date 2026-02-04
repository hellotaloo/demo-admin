# Typography

## Font Families

### Inter (Sans-serif)
**Primary font for UI and body text**

- Variable font with multiple weights
- Excellent readability at small sizes
- Optimized for screens
- Usage: All UI elements, body text, tables, forms

**Loading:** Defined in `app/layout.tsx` via `next/font/google`

```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

### Hedvig Letters Serif
**Display font for headings**

- Serif typeface for visual hierarchy
- Usage: Page titles, section headers, emphasis
- Creates contrast with body text

**Loading:** Defined in `app/layout.tsx` via `next/font/google`

```tsx
const hedvigLettersSerif = Hedvig_Letters_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hedvig",
});
```

## Type Scale

### Headings

**Page Title** (H1)
```tsx
className="font-serif text-4xl font-bold text-gray-900"
```
- Font: Hedvig Serif
- Size: 36px (2.25rem)
- Weight: 700 (bold)
- Color: gray-900
- Usage: Main page heading (one per page)

**Section Header** (H2)
```tsx
className="text-xl font-semibold text-gray-900"
```
- Font: Inter
- Size: 20px (1.25rem)
- Weight: 600 (semibold)
- Color: gray-900
- Usage: Major section headings

**Subsection Header** (H3)
```tsx
className="text-lg font-semibold text-gray-900"
```
- Font: Inter
- Size: 18px (1.125rem)
- Weight: 600 (semibold)
- Color: gray-900
- Usage: Subsection headings

**Card Title** (H4)
```tsx
className="text-base font-semibold text-gray-900"
```
- Font: Inter
- Size: 16px (1rem)
- Weight: 600 (semibold)
- Color: gray-900
- Usage: Card and panel titles

### Body Text

**Body Large**
```tsx
className="text-base text-gray-900"
```
- Size: 16px (1rem)
- Weight: 400 (regular)
- Usage: Important body text, descriptions

**Body Default**
```tsx
className="text-sm text-gray-900"
```
- Size: 14px (0.875rem)
- Weight: 400 (regular)
- Usage: Default body text, table cells, form inputs

**Body Small**
```tsx
className="text-xs text-gray-500"
```
- Size: 12px (0.75rem)
- Weight: 400 (regular)
- Color: gray-500
- Usage: Metadata, timestamps, helper text

### Labels & UI

**Form Label**
```tsx
className="text-sm font-medium text-gray-700"
```
- Size: 14px
- Weight: 500 (medium)
- Color: gray-700
- Usage: Form labels, filter labels

**Button Text**
```tsx
className="text-sm font-medium"
```
- Size: 14px
- Weight: 500 (medium)
- Usage: All button text

**Table Header**
```tsx
className="text-sm font-medium text-gray-500"
```
- Size: 14px
- Weight: 500 (medium)
- Color: gray-500
- Usage: Table column headers

**Badge Text**
```tsx
className="text-xs font-medium"
```
- Size: 12px
- Weight: 500 (medium)
- Usage: Badge labels, status indicators

## Line Height

**Headings:**
- Default: `leading-tight` (1.25)
- Page titles: `leading-none` (1)

**Body Text:**
- Default: `leading-normal` (1.5)
- Long form: `leading-relaxed` (1.625)

**UI Elements:**
- Compact: `leading-none` (1)
- Buttons: `leading-none`

## Font Weight Scale

- 400 (Regular): Default body text
- 500 (Medium): Labels, buttons, emphasis
- 600 (Semibold): Headers, important text
- 700 (Bold): Page titles, strong emphasis

## Text Colors

**Primary Text:**
```tsx
className="text-gray-900"
```
Usage: Headings, body text, important content

**Secondary Text:**
```tsx
className="text-gray-500"
```
Usage: Descriptions, metadata, helper text

**Muted Text:**
```tsx
className="text-gray-400"
```
Usage: Disabled states, placeholder text

**Link Text:**
```tsx
className="text-blue-600 hover:text-blue-700"
```
Usage: Hyperlinks, clickable text

## Usage Examples

### Page Layout
```tsx
<div className="space-y-8">
  <h1 className="font-serif text-4xl font-bold text-gray-900">
    Vacatures
  </h1>

  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-900">
      Openstaande vacatures
    </h2>
    <p className="text-sm text-gray-500">
      Bekijk en beheer alle actieve vacatures
    </p>
  </div>
</div>
```

### Card with Header
```tsx
<Card>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Card Title
  </h3>
  <p className="text-sm text-gray-900">
    Regular body text goes here.
  </p>
  <p className="text-xs text-gray-500 mt-2">
    Metadata or timestamp
  </p>
</Card>
```

### Form Field
```tsx
<div className="space-y-2">
  <Label className="text-sm font-medium text-gray-700">
    Email
  </Label>
  <Input className="text-sm" />
  <p className="text-xs text-gray-500">
    We'll never share your email
  </p>
</div>
```

## Accessibility

**Minimum Size:**
- Never use text smaller than 12px (0.75rem)
- For critical content, use minimum 14px (0.875rem)

**Contrast:**
- gray-900 on white: 16.73:1 (Excellent)
- gray-500 on white: 4.67:1 (WCAG AA Pass)
- gray-400 on white: 2.84:1 (Fails WCAG AA - use for decorative only)

**Readability:**
- Limit line length to 65-75 characters for optimal readability
- Use `max-w-prose` for long-form content
- Increase line height for dense text
