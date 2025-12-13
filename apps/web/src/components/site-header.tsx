import { Button } from '@org/design-system/components/ui/button'
import { LogOut, Theme } from '@org/design-system/components/ui/icons'

import { useTheme } from '@org/design-system/providers'
import { auth } from '@/lib/auth'

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="flex justify-end items-center h-14 px-4">
        <nav className="flex gap-3 items-center">
          <ThemeButton />
          <UserMenu />
        </nav>
      </div>
    </header>
  )
}

function ThemeButton() {
  const { toggleTheme } = useTheme()
  return (
    <Button onClick={toggleTheme} variant="ghost" aria-label="Toggle theme">
      <Theme className="size-4.5" aria-hidden="true" />
    </Button>
  )
}

function UserMenu() {
  const { isPending, data } = auth.useSession()

  // Note: This condition disables authentication in production for template purposes.
  // Remove this condition when implementing authentication in your project.
  const disableAuthInProduction = import.meta.env.PROD
  if (disableAuthInProduction) return null

  if (isPending) return null

  if (!data) {
    return (
      <Button
        onClick={() =>
          auth.signIn.social({
            provider: 'discord',
            callbackURL: location.origin,
          })
        }
        aria-label="Sign in with Discord"
      >
        Sign in with Discord
      </Button>
    )
  }

  return (
    <Button onClick={() => auth.signOut()} aria-label="Sign out">
      <LogOut aria-hidden="true" />
      Sign out
    </Button>
  )
}
