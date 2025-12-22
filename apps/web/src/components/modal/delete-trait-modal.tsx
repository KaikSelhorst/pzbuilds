import { Alert, AlertDescription } from '@org/design-system/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@org/design-system/components/ui/alert-dialog'
import { Button } from '@org/design-system/components/ui/button'

export function DeleteTraitModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Trait</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this trait? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <main>
          <Alert variant="destructive" className="rounded-none">
            <AlertDescription>
              This will permanently delete the trait and remove all associated
              data. This action cannot be reversed.
            </AlertDescription>
          </Alert>
        </main>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Trait
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
