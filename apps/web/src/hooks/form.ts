import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import TextField from '@/components/form/fields/text-field'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {},
  formContext,
})
