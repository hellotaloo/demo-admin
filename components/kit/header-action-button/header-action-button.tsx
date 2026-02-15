'use client';

import { forwardRef } from 'react';
import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface HeaderActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display before the label */
  icon: LucideIcon;
  /** Button label text */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'outline' | 'primary';
  /** Optional href to make it a link */
  asChild?: boolean;
}

/**
 * Standardized button for page header actions.
 *
 * Uses consistent styling across all page headers:
 * - `size="sm"` for compact height
 * - `gap-2` for icon-text spacing
 * - `variant="outline"` (default) or `variant="primary"` (dark bg)
 *
 * @example
 * ```tsx
 * <HeaderActionButton icon={Settings} onClick={handleSettings}>
 *   Instellingen
 * </HeaderActionButton>
 *
 * <HeaderActionButton icon={Plus} variant="primary" onClick={handleAdd}>
 *   Nieuw
 * </HeaderActionButton>
 * ```
 */
export const HeaderActionButton = forwardRef<
  HTMLButtonElement,
  HeaderActionButtonProps
>(({ icon: Icon, children, variant = 'outline', className, ...props }, ref) => {
  const buttonVariant = variant === 'primary' ? 'default' : 'outline';
  const primaryStyles = variant === 'primary' ? 'bg-gray-900 hover:bg-gray-800' : '';

  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size="sm"
      className={cn('gap-2', primaryStyles, className)}
      {...props}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Button>
  );
});

HeaderActionButton.displayName = 'HeaderActionButton';
