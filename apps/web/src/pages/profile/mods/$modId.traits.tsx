import { Button } from '@org/design-system/components/ui/button'
import { ButtonGroup } from '@org/design-system/components/ui/button-group'
import { z } from '@org/validation'
import { createFileRoute } from '@tanstack/react-router'
import { CreateTraitModal } from '@/components/modal/create-trait-modal'
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
  const { traitType } = Route.useSearch()

  return (
    <>
      <nav
        className="flex justify-between items-center pl-2 pr-3 my-2"
        aria-label="Traits navigation"
      >
        <TraitTypeFilter />
        <CreateTraitModal />
      </nav>
      <ModTraitsList modId={modId} activeTraitType={traitType} />
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
