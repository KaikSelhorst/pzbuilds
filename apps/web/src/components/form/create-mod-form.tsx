import { Alert, AlertTitle } from '@org/design-system/components/ui/alert'
import { Button } from '@org/design-system/components/ui/button'
import { FieldGroup } from '@org/design-system/components/ui/field'
import { Loader } from '@org/design-system/components/ui/icons'
import { createModSchema } from '@org/validation/schemas/mod'

import { useAppForm } from '@/hooks/form'
import { useCreateMod } from '@/queries/mods'

export function CreateModForm() {
  const createMod = useCreateMod()

  const form = useAppForm({
    defaultValues: { modId: '' },
    validators: { onSubmit: createModSchema },
    onSubmit: ({ value }) => createMod.mutate(value),
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
          name="modId"
          children={(field) => (
            <field.TextField label="Mod ID" placeholder="Steam Mod ID" />
          )}
        />
      </FieldGroup>
      <Alert variant="secondary" className="rounded-none">
        <AlertTitle>
          You need to provide the Mod ID. It will be used to retrieve
          information such as the mod's preview image, name, and tags. If you
          don't know how to find the Mod ID, check this{' '}
          <a href="https://example.com" className="text-primary underline">
            link
          </a>
          .
        </AlertTitle>
      </Alert>

      <FormActions
        isPending={createMod.isPending}
        isSuccess={createMod.isSuccess}
      />

      {createMod.isError && (
        <Alert variant="destructive" className="rounded-none">
          <AlertTitle>{createMod.error.message}</AlertTitle>
        </Alert>
      )}
      {createMod.data && (
        <Alert variant="success" className="rounded-none">
          <AlertTitle className="max-w-sm">
            <code>
              <pre>{JSON.stringify(createMod.data, null, 2)}</pre>
            </code>
          </AlertTitle>
        </Alert>
      )}
    </form>
  )
}

function FormActions(props: { isPending: boolean; isSuccess: boolean }) {
  const { isPending, isSuccess } = props

  if (isSuccess) {
    return (
      <Button className="w-full" disabled>
        <Loader className="animate-spin" />
        Redirecting
      </Button>
    )
  }

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
