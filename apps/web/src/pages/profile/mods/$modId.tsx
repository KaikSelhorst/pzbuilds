import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@org/design-system/components/ui/breadcrumb'
import { StripedBorder } from '@org/design-system/components/ui/striped-border'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import {
  ProfileNavbar,
  ProfileNavbarLink,
} from '@/components/nav/profile-navbar'
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
    <section className="grid grid-cols-[4fr_minmax(auto,256px)]">
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <ModAside />
    </section>
  )
}

function Navbar() {
  const { modId } = Route.useParams()

  const { data: mod, isLoading } = useGetMod({ modId })

  return (
    <>
      <nav className="border-b px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/profile/mods" />}>
                Mods
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading ? 'Finding mod...' : mod?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <StripedBorder />
      <ProfileNavbar>
        <ProfileNavbarLink to="/profile/mods/$modId/traits" params={{ modId }}>
          Traits
        </ProfileNavbarLink>
        <ProfileNavbarLink to="/profile/mods/$modId/skills" params={{ modId }}>
          Skills
        </ProfileNavbarLink>
      </ProfileNavbar>
    </>
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
    <aside className="border-b border-l p-2 h-fit">
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
