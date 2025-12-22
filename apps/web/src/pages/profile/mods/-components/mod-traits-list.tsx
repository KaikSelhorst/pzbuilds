import { ScrollArea } from '@org/design-system/components/ui/scroll-area'
import { Skeleton } from '@org/design-system/components/ui/skeleton'
import { Activity, useMemo } from 'react'
import { SeeTraitDetailModal } from '@/components/modal/see-trait-detail-modal'
import { useGetTraits } from '@/queries/traits'

function ModTraitsListSkeleton() {
  return (
    <ul className="space-y-2 pr-3 pl-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="h-16 w-full" key={index} />
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
  activeTraitType: 'POSITIVE' | 'NEGATIVE'
}

export function ModTraitsList({ modId, activeTraitType }: ModTraitsListProps) {
  const { data: traits, isLoading, error } = useGetTraits({ modId })

  const activeTraits = useMemo(() => {
    if (!traits?.data.length) return []
    return traits.data.filter((trait) => trait.type === activeTraitType)
  }, [traits, activeTraitType])

  if (isLoading) return <ModTraitsListSkeleton />
  if (error) return <ModTraitsListError message={error.message} />

  return (
    <ScrollArea className="h-[calc(75vh)] pr-3 pl-2">
      <Activity mode={traits?.data.length ? 'hidden' : 'visible'}>
        <p className="text-center py-8 text-muted-foreground text-sm">
          No traits found
        </p>
      </Activity>
      <Activity mode={activeTraits.length ? 'visible' : 'hidden'}>
        <ul className="space-y-2">
          {activeTraits.map((trait) => (
            <SeeTraitDetailModal key={trait.id} trait={trait} />
          ))}
        </ul>
      </Activity>
    </ScrollArea>
  )
}
