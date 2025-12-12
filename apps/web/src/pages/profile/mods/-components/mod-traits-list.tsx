import { Badge } from '@org/design-system/components/ui/badge'
import { ScrollArea } from '@org/design-system/components/ui/scroll-area'
import { Skeleton } from '@org/design-system/components/ui/skeleton'
import { Activity, useMemo } from 'react'
import { useGetTraits } from '@/queries/traits'

function ModTraitsListSkeleton() {
  return (
    <ul className="space-y-2 pr-3 pl-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="h-20 w-full" key={index} />
      ))}
    </ul>
  )
}

function ModTraitsListError({ message }: { message: string }) {
  return (
    <div className="mr-3 ml-2 bg-destructive text-destructive-foreground rounded-md h-80 flex justify-center items-center font-mono text-sm text-center p-2">
      {message}
    </div>
  )
}

interface ModTraitsListProps {
  modId: string
}

export function ModTraitsList({ modId }: ModTraitsListProps) {
  const { data: traits, isLoading, error } = useGetTraits({ modId })

  const activeTraits = useMemo(() => {
    if (!traits?.length) return []
    return traits.filter((trait) => trait)
  }, [traits])

  if (isLoading) return <ModTraitsListSkeleton />
  if (error) return <ModTraitsListError message={error.message} />

  return (
    <ScrollArea className="h-[calc(75vh)] pr-3 pl-2">
      <Activity mode={traits?.length ? 'hidden' : 'visible'}>
        <p className="text-center py-8 text-muted-foreground text-sm">
          No traits found
        </p>
      </Activity>
      <Activity mode={activeTraits.length ? 'visible' : 'hidden'}>
        <ul>
          {activeTraits.map((trait) => (
            <li
              key={trait.id}
              className="border p-2 bg-card rounded-md text-card-foreground flex justify-between hover:bg-accent"
            >
              <div className="flex-1">
                <h3 className="font-medium">{trait.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {trait.description}
                </p>
              </div>
              <Badge
                variant={trait.type === 'POSITIVE' ? 'destructive' : 'success'}
                aria-label={`Trait cost: ${trait.type === 'POSITIVE' ? trait.cost : `+${trait.cost}`} points`}
              >
                {trait.type === 'POSITIVE' ? trait.cost : `+${trait.cost}`}
              </Badge>
            </li>
          ))}
        </ul>
      </Activity>
    </ScrollArea>
  )
}
