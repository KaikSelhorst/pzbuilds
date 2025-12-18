import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import MultiSelectField from '@/components/form/fields/multiselect-field'
import TextareaField from '@/components/form/fields/text-area-field'
import TextField from '@/components/form/fields/text-field'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  fieldComponents: {
    TextField,
    TextareaField,
    MultiSelectField,
  },
  formComponents: {},
  formContext,
})
