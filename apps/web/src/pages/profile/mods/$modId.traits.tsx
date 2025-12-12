import { Badge } from '@org/design-system/components/ui/badge'
import { Button } from '@org/design-system/components/ui/button'
import { ButtonGroup } from '@org/design-system/components/ui/button-group'
import { Plus } from '@org/design-system/components/ui/icons'
import { ScrollArea } from '@org/design-system/components/ui/scroll-area'
import { z } from '@org/validation'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useGetTraits } from '@/queries/traits'
import { ModTraitsList } from './-components/mod-traits-list'

const traitSearchSchema = z.object({
  traitType: z
    .enum(['NEGATIVE', 'POSITIVE'])
    .catch('POSITIVE')
    .default('POSITIVE'),
})

export const Route = createFileRoute('/profile/mods/$modId/traits')({
  component: RouteComponent,
  validateSearch: traitSearchSchema,
})

function RouteComponent() {
  const { modId } = Route.useParams()

  return (
    <>
      <nav
        className="flex justify-between items-center pl-2 pr-3 my-2"
        aria-label="Traits navigation"
      >
        <TraitTypeFilter />
        <Button aria-label="Create new trait">
          Create Trait <Plus />
        </Button>
      </nav>
      <ModTraitsList modId={modId} />
    </>
  )
}

function TraitTypeFilter() {
  const { traitType } = Route.useSearch()
  const navigate = Route.useNavigate()

  function updateTraitType(type: 'POSITIVE' | 'NEGATIVE') {
    navigate({ search: (prev) => ({ ...prev, traitType: type }) })
  }

  return (
    <ButtonGroup aria-label="Filter traits by type">
      <Button
        variant={traitType === 'POSITIVE' ? 'default' : 'secondary'}
        onClick={() => updateTraitType('POSITIVE')}
        aria-pressed={traitType === 'POSITIVE'}
      >
        Positive
      </Button>
      <Button
        variant={traitType === 'NEGATIVE' ? 'default' : 'secondary'}
        onClick={() => updateTraitType('NEGATIVE')}
        aria-pressed={traitType === 'NEGATIVE'}
      >
        Negative
      </Button>
    </ButtonGroup>
  )
}
