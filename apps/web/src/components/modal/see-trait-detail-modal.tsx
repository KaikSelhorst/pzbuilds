import { Badge } from '@org/design-system/components/ui/badge'
import { Button } from '@org/design-system/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@org/design-system/components/ui/dialog'
import { useGetTraitQueryData } from '@/queries/traits'
import { getTraitIntersection } from '@/utils/get-traits-intersection'
import { DeleteTraitModal } from './delete-trait-modal'

interface SeeTraitDetailModalProps {
  trait: {
    id: string
    name: string
    description: string
    type: string
    cost: number
    incompatibleWith: string[]
    modId: string
  }
}

export function SeeTraitDetailModal({ trait }: SeeTraitDetailModalProps) {
  const traits = useGetTraitQueryData(trait)

  if (!traits) return null

  const incompatibilities = getTraitIntersection(
    trait.incompatibleWith,
    traits.data,
  )

  return (
    <Dialog>
      <DialogTrigger
        render={
          <li className="border p-2 bg-card rounded-md text-card-foreground flex justify-between hover:bg-accent" />
        }
      >
        <div className="flex-1">
          <h3 className="font-medium">{trait.name}</h3>
          <p className="text-sm text-muted-foreground">{trait.description}</p>
        </div>
        <Badge
          variant={trait.type === 'POSITIVE' ? 'destructive' : 'success'}
          aria-label={`Trait point cost: ${trait.type === 'POSITIVE' ? trait.cost : `+${trait.cost}`} points`}
        >
          {trait.type === 'POSITIVE' ? trait.cost : `+${trait.cost}`}
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{trait.name}</DialogTitle>
          <DialogDescription>{trait.description}</DialogDescription>
        </DialogHeader>
        <main className="text-muted-foreground space-y-2">
          <div>
            <h5 className="font-medium">Incompatibilities</h5>
            {incompatibilities.map((incompatibility) => (
              <p key={incompatibility.id}>- {incompatibility.name}</p>
            ))}
            {incompatibilities.length === 0 && (
              <p>- This trait has no incompatibilities.</p>
            )}
          </div>

          <div>
            <h5 className="font-medium">Skills</h5>
            <p>- No skills information available.</p>
          </div>
        </main>
        <DialogFooter>
          <DeleteTraitModal />
          <DialogClose render={<Button />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
