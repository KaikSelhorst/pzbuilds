import { Button } from '@org/design-system/components/ui/button'
import { Share } from '@org/design-system/components/ui/icons'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import {
  ProfileNavbar,
  ProfileNavbarLink,
} from '@/components/nav/profile-navbar'
import { auth } from '@/lib/auth'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (location.pathname === '/profile') {
      throw redirect({ to: '/profile/builds', statusCode: 301 })
    }
  },
})

function RouteComponent() {
  const { data, isPending } = auth.useSession()

  if (isPending) return null

  return (
    <section className="container mx-auto grid grid-cols-[200px_1fr] gap-4">
      <aside className="space-y-2">
        <div className="border rounded-md p-2 flex gap-2">
          {data?.user.image && (
            <img
              src={data.user.image}
              className="h-6 rounded-sm"
              alt={data?.user.name}
            />
          )}
          <h1 className="font-medium">{data?.user.name}</h1>
        </div>
        <Button className="w-full">
          <Share />
          Share
        </Button>
      </aside>
      <main className="space-y-3">
        <ProfileNavbar>
          <ProfileNavbarLink to="/profile/builds">Builds</ProfileNavbarLink>
          <ProfileNavbarLink to="/profile/mods">Mods</ProfileNavbarLink>
        </ProfileNavbar>
        <section>
          <Outlet />
        </section>
      </main>
    </section>
  )
}
