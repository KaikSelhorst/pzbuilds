import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@org/design-system/components/ui/field'
import { Input } from '@org/design-system/components/ui/input'
import { useFieldContext } from '@/hooks/form'

interface FieldProps extends React.ComponentProps<'input'> {
  label: string
  description?: string
}

export default function TextField(props: FieldProps) {
  const { label, description, ...rest } = props

  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        {...rest}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  )
}
