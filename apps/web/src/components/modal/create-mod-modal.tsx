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
      <DialogTrigger render={<Button />} aria-label="Open dialog to create a new mod">
        Create Mod
        <Plus aria-hidden="true" />
      </DialogTrigger>
      <DialogContent aria-labelledby="create-mod-dialog-title">
        <h2 id="create-mod-dialog-title" className="sr-only">
          Create New Mod
        </h2>
        <CreateModForm />
      </DialogContent>
    </Dialog>
  )
}
