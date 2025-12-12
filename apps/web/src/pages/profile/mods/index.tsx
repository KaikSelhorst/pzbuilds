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

  if (isLoading) return <li>Loading...</li>

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
        {mods?.data.map((mod) => (
          <li
            key={mod.id}
            className="border rounded-md bg-card text-card-foreground hover:bg-card/90"
          >
            <Link
              to="/profile/mods/$modId"
              params={{ modId: mod.id }}
              className="p-2 flex gap-3"
            >
              <img
                src={mod.steamMod.image}
                alt={mod.name || mod.steamMod.name}
                className="w-[77px] overflow-hidden"
              />
              <div className="flex flex-col flex-1">
                <header className="flex justify-between">
                  <h2 className="font-medium">
                    {mod.name || mod.steamMod.name}
                  </h2>
                </header>
                <div>
                  {new Array(5)
                    .fill('☆')
                    .splice(0, Math.random() * 5)
                    .join('')
                    .padStart(5, '★')}
                </div>
                <div className="space-x-1 text-sm text-muted-foreground mt-auto">
                  {mod.steamMod.tags.join(', ')}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
