import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@org/design-system/components/ui/breadcrumb'
import { Button } from '@org/design-system/components/ui/button'
import { StripedBorder } from '@org/design-system/components/ui/striped-border'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CreateModModal } from '@/components/modal/create-mod-modal'
import { useGetMods } from '@/queries/mods'

export const Route = createFileRoute('/profile/mods/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: mods, isLoading } = useGetMods()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading mods...</p>
      </div>
    )
  }

  return (
    <>
      <nav className="border-b px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Mods</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <StripedBorder />
      <nav className="m-2 flex justify-between">
        <Button variant="secondary">Filter</Button>
        <CreateModModal />
      </nav>
      <ul className="mx-2 space-y-3">
        {mods?.data.length === 0 ? (
          <li className="text-center py-12 text-muted-foreground">
            No mods found. Create your first mod to get started.
          </li>
        ) : (
          mods?.data.map((mod) => (
            <li
              key={mod.id}
              className="border rounded-md bg-card text-card-foreground hover:bg-card/90"
            >
              <Link
                to="/profile/mods/$modId"
                params={{ modId: mod.id }}
                className="p-2 flex gap-3"
                aria-label={`View details for ${mod.name || mod.steamMod.name}`}
              >
                <img
                  src={mod.steamMod.image}
                  alt={`${mod.name || mod.steamMod.name} preview`}
                  className="w-19.25 overflow-hidden rounded"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <header className="flex justify-between">
                    <h2 className="font-medium">
                      {mod.name || mod.steamMod.name}
                    </h2>
                  </header>
                  <div className="text-yellow-500">{'★'.repeat(5)}</div>
                  <p className="text-sm text-muted-foreground">
                    {mod.steamMod.tags.length
                      ? mod.steamMod.tags.join(', ')
                      : 'No Tags'}
                  </p>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  )
}
