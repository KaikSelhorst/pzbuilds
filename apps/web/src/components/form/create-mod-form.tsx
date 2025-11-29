import { Alert, AlertTitle } from '@org/design-system/components/ui/alert'
import { Button } from '@org/design-system/components/ui/button'
import { FieldGroup } from '@org/design-system/components/ui/field'
import { Loader } from '@org/design-system/components/ui/icons'
import { withForm } from '@/hooks/form'

export const CreateModForm = withForm({
  defaultValues: { modId: '' },
  render: ({ form }) => {
    return (
      <>
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
        <form.Subscribe
          selector={({ isSubmitted, isSubmitting }) => [
            isSubmitted,
            isSubmitting,
          ]}
          children={([isSubmitted, isSubmitting]) => {
            if (isSubmitted) {
              return (
                <Button className="w-full" disabled>
                  <Loader className="animate-spin" />
                  Redirecting
                </Button>
              )
            }

            if (isSubmitting) {
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
          }}
        />
      </>
    )
  },
})
