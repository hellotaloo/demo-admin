# Animations

## Animation Principles

**Purpose:**
- Provide visual feedback
- Guide user attention
- Create smooth transitions
- Indicate loading states

**Guidelines:**
- Keep animations subtle and purposeful
- Use consistent timing across similar interactions
- Avoid excessive or distracting animations
- Respect user preferences (prefers-reduced-motion)

## Keyframe Animations

Defined in [app/globals.css](../../app/globals.css)

### Fade In Up
**Usage:** Cards entering, content loading, list items appearing

```tsx
className="animate-[fade-in-up_0.3s_ease-out]"
```

**Effect:** Fades in while sliding up 12px
**Duration:** 300ms
**Easing:** ease-out

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Fade In
**Usage:** Simple overlays, tooltips, popovers

```tsx
className="animate-[fade-in_0.2s_ease-out]"
```

**Effect:** Simple opacity fade
**Duration:** 200ms
**Easing:** ease-out

### Pulse Subtle
**Usage:** AI thinking indicators, loading content

```tsx
className="animate-pulse-subtle"
```

**Effect:** Gentle opacity pulse (1 → 0.7 → 1)
**Duration:** 2s infinite
**Easing:** ease-in-out

```css
@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Slide In Right
**Usage:** Side panels, sheets opening from right

```tsx
className="animate-[slide-in-right_0.4s_ease-out]"
```

**Effect:** Slides in from right (70px) with fade
**Duration:** 400ms
**Easing:** ease-out

### Soft Pulse
**Usage:** New item highlights, attention indicators

```tsx
className="animate-[soft-pulse_2s_ease-in-out_infinite]"
```

**Effect:** Opacity + box-shadow pulse
**Duration:** 2s infinite
**Easing:** ease-in-out

```css
@keyframes soft-pulse {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
  50% {
    opacity: 0.82;
    box-shadow: 0 0 16px 4px rgba(59, 130, 246, 0.25);
  }
}
```

## Transition Classes

### Standard Transitions

**Color Transitions** (hover states, focus)
```tsx
className="transition-colors duration-300"
```
**Usage:** Button hovers, link hovers, status changes

**All Properties** (layout changes)
```tsx
className="transition-all duration-200"
```
**Usage:** Expanding/collapsing, size changes

**Transform** (movements)
```tsx
className="transition-transform duration-300"
```
**Usage:** Hover lifts, slides, scale effects

**Opacity** (fade in/out)
```tsx
className="transition-opacity duration-150"
```
**Usage:** Show/hide elements

## Timing Standards

| Speed | Duration | Use Case | Easing |
|-------|----------|----------|--------|
| Instant | 0ms | Immediate feedback | - |
| Quick | 150ms | Micro-interactions, hovers | ease-out |
| Standard | 300ms | Modals, cards, most animations | ease-out |
| Moderate | 400ms | Side panels, larger movements | ease-out |
| Slow | 500ms | Page transitions, major changes | ease-in-out |

### Easing Functions

**ease-out** (default)
- Use for: Elements entering, user-initiated actions
- Effect: Fast start, slow end
- Feels responsive and natural

**ease-in-out**
- Use for: Continuous animations, loops
- Effect: Slow start, fast middle, slow end
- Feels smooth and balanced

**ease-in**
- Use for: Elements exiting, less common
- Effect: Slow start, fast end

## Common Patterns

### Button Hover
```tsx
<Button className="transition-colors duration-300 hover:bg-blue-600">
  Click Me
</Button>
```

### Card Hover Effect
```tsx
<Card className="transition-shadow duration-300 hover:shadow-lg">
  {/* content */}
</Card>
```

### Interactive Row
```tsx
<TableRow className="transition-colors duration-150 hover:bg-gray-50 cursor-pointer">
  {/* cells */}
</TableRow>
```

### Selected State
```tsx
<div className={cn(
  "transition-colors duration-200",
  isSelected && "bg-blue-50"
)}>
  {/* content */}
</div>
```

### Loading Skeleton
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

### Spinner
```tsx
<div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
```

### Expanding Section
```tsx
<div className="transition-all duration-300 overflow-hidden"
     style={{ height: isOpen ? 'auto' : '0' }}>
  {/* collapsible content */}
</div>
```

### Hover Lift
```tsx
<Card className="transition-transform duration-300 hover:scale-105">
  {/* content */}
</Card>
```

## Animation Use Cases

### Entering Elements

**Cards appearing in a grid:**
```tsx
{items.map((item, index) => (
  <Card
    key={item.id}
    className="animate-[fade-in-up_0.3s_ease-out]"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {/* content */}
  </Card>
))}
```

**Modal opening:**
```tsx
<Dialog>
  <DialogContent className="animate-[fade-in-up_0.3s_ease-out]">
    {/* content */}
  </DialogContent>
</Dialog>
```

### Loading States

**Content loading:**
```tsx
<div className="animate-pulse-subtle">
  <p>AI is thinking...</p>
</div>
```

**Skeleton loading:**
```tsx
<div className="animate-pulse space-y-2">
  <div className="h-4 bg-gray-200 rounded"></div>
  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
</div>
```

### Interactive Feedback

**Button click feedback:**
```tsx
<Button className="transition-all duration-150 active:scale-95">
  Click
</Button>
```

**Toggle switch:**
```tsx
<div className={cn(
  "transition-colors duration-200",
  enabled ? "bg-blue-600" : "bg-gray-200"
)}>
  <div className="transition-transform duration-200 transform"
       style={{ transform: enabled ? 'translateX(20px)' : 'translateX(0)' }}>
    {/* thumb */}
  </div>
</div>
```

### Attention Grabbing

**New notification:**
```tsx
<div className="animate-[soft-pulse_2s_ease-in-out_3]">
  <Badge>New</Badge>
</div>
```

**Highlighting changes:**
```tsx
<div className={cn(
  isNew && "animate-[soft-pulse_2s_ease-in-out_3]"
)}>
  {/* content */}
</div>
```

## Accessibility

### Respect User Preferences

Always respect `prefers-reduced-motion`:

```tsx
<div className="motion-safe:animate-[fade-in-up_0.3s_ease-out]">
  {/* Only animates if user hasn't requested reduced motion */}
</div>
```

For critical animations, provide instant alternative:

```tsx
<div className="motion-reduce:opacity-100 motion-reduce:transform-none animate-[fade-in-up_0.3s_ease-out]">
  {/* Instantly visible for users with reduced motion preference */}
</div>
```

### Don't Rely on Animation Alone

- Animations should enhance, not be required
- Always provide static fallbacks
- Don't use animation to convey critical information

## Performance

**Best Practices:**
- Use `transform` and `opacity` for smooth 60fps animations
- Avoid animating `width`, `height`, `top`, `left` (use `transform` instead)
- Use `will-change` sparingly for complex animations
- Keep animation durations under 500ms for UI interactions
- Limit simultaneous animations (max 3-4 elements at once)

**GPU Acceleration:**
```tsx
// Automatically GPU-accelerated (transform, opacity)
className="transition-transform duration-300"

// Not GPU-accelerated (avoid for animations)
className="transition-all duration-300" // if animating margin, width, etc.
```
