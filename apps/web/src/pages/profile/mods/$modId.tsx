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
import { ModAside } from './-components/mod-aside'

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
  const { modId } = Route.useParams()

  return (
    <section className="grid grid-cols-[4fr_minmax(auto,256px)]">
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <ModAside modId={modId} />
    </section>
  )
}

function Navbar() {
  const { modId } = Route.useParams()

  const { data: mod, isLoading, isError } = useGetMod({ modId })

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
              {isError ? (
                <BreadcrumbPage className="text-destructive">
                  Error loading mod
                </BreadcrumbPage>
              ) : (
                <BreadcrumbPage>
                  {isLoading ? 'Loading mod details...' : mod?.name}
                </BreadcrumbPage>
              )}
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
