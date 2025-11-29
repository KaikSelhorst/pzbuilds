import { Button } from '@org/design-system/components/ui/button'
import { cn } from '@org/design-system/utils/class-merge'
import { createLink, Link, type LinkComponent } from '@tanstack/react-router'

interface ProfileNavbarProps extends React.ComponentProps<'nav'> {}

export function ProfileNavbar({
  children,
  className,
  ...rest
}: ProfileNavbarProps) {
  return (
    <nav
      className={cn('border-b h-[46px] flex items-center', className)}
      {...rest}
    >
      {children}
    </nav>
  )
}

interface ProfileNavbarLinkProps extends React.ComponentProps<typeof Link> {}

export function CustomLink({ children, ...props }: ProfileNavbarLinkProps) {
  return (
    <Button
      variant="ghost"
      className="relative after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 text-muted-foreground"
      asChild
    >
      <Link {...props}>{children}</Link>
    </Button>
  )
}

const TanStackLinkComponent = createLink(CustomLink)

export const ProfileNavbarLink: LinkComponent<typeof TanStackLinkComponent> = (
  props,
) => (
  <TanStackLinkComponent
    preload="intent"
    activeProps={{ className: `text-current after:bg-primary` }}
    {...props}
  />
)
