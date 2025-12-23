import { cn } from '@org/design-system/lib/utils'

interface StripedBorderProps {
  className?: string
  angle?: number
  size?: number
  thickness?: number
}

export function StripedBorder({
  className,
  angle = 315,
  size = 10,
  thickness = 1,
}: StripedBorderProps) {
  return (
    <div
      className={cn('h-6 w-full border-b border-border opacity-60', className)}
      style={{
        backgroundImage: `repeating-linear-gradient(${angle}deg, var(--border) 0, var(--border) ${thickness}px, transparent 0, transparent 50%)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  )
}
