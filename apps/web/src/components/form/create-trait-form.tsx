import { Alert, AlertTitle } from '@org/design-system/components/ui/alert'
import { Button } from '@org/design-system/components/ui/button'
import { FieldGroup } from '@org/design-system/components/ui/field'
import { Loader } from '@org/design-system/components/ui/icons'
import { createTraitSchema, z } from '@org/validation'
import { useParams } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/form'
import { useCreateTrait } from '@/queries/traits'

interface CreateTraitFormProps {
  onComplete?: () => void
}

export function CreateTraitForm({ onComplete }: CreateTraitFormProps) {
  const { modId } = useParams({ from: '/profile/mods/$modId' })
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
              placeholder="mnoasmd adamsodmo asmda"
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
              placeholder="dkmaspdmadsmpasm dasd"
              description="Explique quais sao os beneficios e maleficios de uso dessa trait"
            />
          )}
        />
        <form.AppField
          name="cost"
          children={(field) => (
            <field.TextField
              label="Custo de uso"
              placeholder="Remove some maosmdoams dmaosmdo ams"
              description="Para uma trait ser negativa ela precisa o custo deve ser positivo, para uma trait ser positiva ela precisa o custo deve ser negativo"
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
        Adding
      </Button>
    )
  }

  return (
    <Button className="w-full" type="submit">
      Add
    </Button>
  )
}
