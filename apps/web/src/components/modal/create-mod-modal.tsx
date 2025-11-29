import { Button } from '@org/design-system/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@org/design-system/components/ui/dialog'
import { Plus } from '@org/design-system/components/ui/icons'
import { z } from '@org/validation/zod'
import { CreateModForm } from '@/components/form/create-mod-form'
import { useAppForm } from '@/hooks/form'

const formSchema = z.object({
  modId: z.string().min(8, 'Please enter a valid module ID'),
})

type FormSchema = z.infer<typeof formSchema>

export function CreateModModal() {
  const form = useAppForm({
    defaultValues: { modId: '' },
    validators: { onSubmit: formSchema },
    onSubmit: onFormSubmit,
  })

  async function onFormSubmit({ value }: { value: FormSchema }) {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    alert(JSON.stringify(value, null, 2))
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        Add Mod
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <CreateModForm form={form} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
