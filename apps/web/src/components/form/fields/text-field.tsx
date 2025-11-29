import {
  Field,
  FieldError,
  FieldLabel,
} from '@org/design-system/components/ui/field'
import { Input } from '@org/design-system/components/ui/input'
import { useFieldContext } from '@/hooks/form'

interface FieldProps {
  label: string
  placeholder?: string
  description?: string
}

export default function TextField(props: FieldProps) {
  const { label, placeholder } = props

  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
