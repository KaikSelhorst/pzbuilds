import { Button } from '@org/design-system/components/ui/button'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'

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
      <aside className="space-y-2 mt-4">
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
        <ProfileNavbar />
      </aside>
      <main className="border-x min-h-[calc(100vh-56px)]">
        <Outlet />
      </main>
    </section>
  )
}

function ProfileNavbar() {
  return (
    <nav className="grid gap-2">
      <Link to="/profile/builds">
        {({ isActive }) => (
          <Button
            variant={isActive ? 'default' : 'secondary'}
            className="w-full"
          >
            Builds
          </Button>
        )}
      </Link>
      <Link to="/profile/mods">
        {({ isActive }) => (
          <Button
            variant={isActive ? 'default' : 'secondary'}
            className="w-full"
          >
            Mods
          </Button>
        )}
      </Link>
    </nav>
  )
}
