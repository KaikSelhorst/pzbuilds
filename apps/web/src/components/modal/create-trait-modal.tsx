import { Button } from '@org/design-system/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@org/design-system/components/ui/dialog'
import { Plus } from '@org/design-system/components/ui/icons'
import { useState } from 'react'
import { CreateTraitForm } from '@/components/form/create-trait-form'

export function CreateTraitModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button />}
        aria-label="Open dialog to create a new trait"
      >
        Create Trait
        <Plus aria-hidden="true" />
      </DialogTrigger>
      <DialogContent aria-labelledby="create-trait-dialog-title">
        <h2 id="create-trait-dialog-title" className="sr-only">
          Create new trait
        </h2>
        <CreateTraitForm onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
