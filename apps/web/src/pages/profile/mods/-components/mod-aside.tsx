import { Skeleton } from '@org/design-system/components/ui/skeleton'
import { useGetMod } from '@/queries/mods'

function ModAsideSkeleton() {
  return (
    <aside className="border-b border-l p-2 h-fit">
      <Skeleton className="h-59.75" />
      <div className="mt-2 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-full" />
      </div>
    </aside>
  )
}

interface ModAsideErrorProps {
  message: string
}

function ModAsideError({ message }: ModAsideErrorProps) {
  return (
    <aside className="border-b border-l p-2 h-fit">
      <div className="bg-destructive text-destructive-foreground rounded-md h-80 flex justify-center items-center font-mono text-sm text-center p-2">
        {message}
      </div>
    </aside>
  )
}

interface ModAsideProps {
  modId: string
}

export function ModAside({ modId }: ModAsideProps) {
  const { data: mod, error, isLoading } = useGetMod({ modId })

  if (isLoading) return <ModAsideSkeleton />

  if (error) return <ModAsideError message={error.message} />

  if (!mod) return <ModAsideError message="No mod data available" />

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
