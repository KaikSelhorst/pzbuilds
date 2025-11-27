import { cn } from '@org/design-system/utils/class-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

const labelVariants = cva(
  'text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'font-medium',
        secondary: 'font-normal',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

function Label({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<'label'> & VariantProps<typeof labelVariants>) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: workaround
    <label
      data-slot="label"
      className={cn(labelVariants({ variant }), className)}
      {...props}
    >
      {children}
    </label>
  )
}

export { Label }
