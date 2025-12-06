import { Button } from '@org/design-system/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@org/design-system/components/ui/dialog'
import { Plus } from '@org/design-system/components/ui/icons'
import { CreateModForm } from '@/components/form/create-mod-form'

export function CreateModModal() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        Add Mod
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <CreateModForm />
      </DialogContent>
    </Dialog>
  )
}
