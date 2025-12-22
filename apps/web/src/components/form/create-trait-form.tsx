import { Alert, AlertTitle } from '@org/design-system/components/ui/alert'
import { Button } from '@org/design-system/components/ui/button'

import { FieldGroup } from '@org/design-system/components/ui/field'
import { Loader } from '@org/design-system/components/ui/icons'
import { createTraitSchema } from '@org/validation'
import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useAppForm } from '@/hooks/form'
import { useCreateTrait, useGetTraitsData } from '@/queries/traits'

interface CreateTraitFormProps {
  onComplete?: () => void
}

export function CreateTraitForm({ onComplete }: CreateTraitFormProps) {
  const { modId } = useParams({ from: '/profile/mods/$modId' })

  const { data: traits, isLoading } = useGetTraitsData({ modId })

  const createTrait = useCreateTrait()

  const form = useAppForm({
    defaultValues: {
      name: '',
      description: '',
      cost: 0,
      incompatibleWith: [] as string[],
    },
    validators: { onSubmit: createTraitSchema },
    onSubmit: ({ value }) =>
      createTrait.mutate({ ...value, modId }, { onSuccess: onComplete }),
  })

  const traitsMemo = useMemo(() => {
    if (isLoading) return []
    if (!traits) return []
    return traits.data.map((trait) => ({ label: trait.name, value: trait.id }))
  }, [traits])

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.AppField
          name="name"
          children={(field) => (
            <field.TextField
              label="Name"
              placeholder="e.g., Strong, Weak, Claustrophobic, Brave"
            />
          )}
        />
        <form.AppField
          name="description"
          children={(field) => (
            <field.TextareaField
              rows={6}
              className="resize-none"
              label="Description"
              placeholder="Describe the effects of this trait in-game. e.g., Increases strength by +2, allows carrying more items, but reduces movement speed by 10%."
              description="Explain the benefits and drawbacks of this trait for the character in Project Zomboid"
            />
          )}
        />
        <form.AppField
          name="cost"
          children={(field) => (
            <field.TextField
              label="Point Cost"
              placeholder="e.g., -4 (positive trait) or +6 (negative trait)"
              description="Negative values give points to the player (positive traits). Positive values cost points (negative traits). e.g., Strong = -4, Weak = +6"
            />
          )}
        />
        <form.AppField
          name="incompatibleWith"
          children={(field) => (
            <field.MultiSelectField
              label="Incompatible With"
              placeholder="Incompatible Traits"
              addMorePlaceholder="Add more Incompatible Traits"
              emptyMessage={
                isLoading ? 'Searching traits...' : 'No traits found'
              }
              items={traitsMemo || []}
            />
          )}
        />
      </FieldGroup>

      <FormActions isPending={createTrait.isPending} />

      {createTrait.isError && (
        <Alert variant="destructive" className="rounded-none">
          <AlertTitle>{createTrait.error.message}</AlertTitle>
        </Alert>
      )}
    </form>
  )
}

function FormActions(props: { isPending: boolean }) {
  const { isPending } = props

  if (isPending) {
    return (
      <Button className="w-full" disabled>
        <Loader className="animate-spin" />
        Creating Trait...
      </Button>
    )
  }

  return (
    <Button className="w-full" type="submit">
      Create Trait
    </Button>
  )
}
