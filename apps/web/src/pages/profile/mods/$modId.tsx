import { Button } from '@org/design-system/components/ui/button'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { useGetMod } from '@/queries/mods'

export const Route = createFileRoute('/profile/mods/$modId')({
  component: RouteComponent,
  beforeLoad: ({ location, params }) => {
    if (location.pathname === `/profile/mods/${params.modId}`) {
      throw redirect({
        to: '/profile/mods/$modId/traits',
        statusCode: 301,
        params,
      })
    }
  },
})

function RouteComponent() {
  return (
    <section className="grid grid-cols-[4fr_minmax(auto,256px)] gap-3">
      <main className="space-y-3">
        <Navbar />
        <Outlet />
      </main>
      <ModAside />
    </section>
  )
}

function Navbar() {
  const { modId } = Route.useParams()

  return (
    <nav className="space-x-2">
      <Link to="/profile/mods/$modId/traits" params={{ modId }}>
        {({ isActive }) => (
          <Button variant={isActive ? 'default' : 'secondary'}>Traits</Button>
        )}
      </Link>
      <Link to="/profile/mods/$modId/skills" params={{ modId }}>
        {({ isActive }) => (
          <Button variant={isActive ? 'default' : 'secondary'}>Skills</Button>
        )}
      </Link>
    </nav>
  )
}

function ModAside() {
  const { modId } = Route.useParams()

  const { data: mod, error, isLoading } = useGetMod({ modId })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!mod) {
    return <div>No data</div>
  }

  return (
    <aside className="border p-2 rounded-md">
      <img src={mod.steamMod.image} alt="" />
      <div className="mt-2">
        <h1 className="font-medium">{mod.steamMod.name}</h1>
        <div>
          {new Array(5)
            .fill('☆')
            .splice(0, Math.random() * 5)
            .join('')
            .padStart(5, '★')}
        </div>
        <div className="text-muted-foreground text-sm">
          {mod.steamMod.tags.join(', ')}
        </div>
      </div>
    </aside>
  )
}
