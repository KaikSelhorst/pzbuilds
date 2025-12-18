import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '@org/design-system/components/ui/combobox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@org/design-system/components/ui/field'
import * as React from 'react'
import { useFieldContext } from '@/hooks/form'

type ComboboxItemValue = { label: string; value: string }

interface MultiSelectFieldProps {
  label?: string
  description?: string
  emptyMessage: string
  items: ComboboxItemValue[]
  placeholder?: string
  addMorePlaceholder?: string
}

function getComboboxValue(arr1: string[], arr2: ComboboxItemValue[]) {
  const values: ComboboxItemValue[] = []
  let foundedTraits = 0
  const selectedItems = arr1.length

  for (let i = 0; i < arr2.length; i++) {
    if (foundedTraits >= selectedItems) break
    const item = arr2[i]

    const itemIsSelected = arr1.find((traitId) => traitId === item.value)

    if (itemIsSelected) {
      foundedTraits++
      values.push(item)
    }
  }
  return values
}

export default function MultiSelectField({
  emptyMessage,
  items,
  description,
  label,
  placeholder,
  addMorePlaceholder,
}: MultiSelectFieldProps) {
  const refContainer = React.useRef<HTMLDivElement>(null)

  const field = useFieldContext<string[]>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  const values = React.useMemo(
    () => getComboboxValue(field.state.value, items),
    [field.state.value, items],
  )

  return (
    <Combobox
      multiple
      items={items}
      value={values}
      onValueChange={(value: ComboboxItemValue[]) => {
        field.setValue(value.map((item) => item.value))
      }}
    >
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <ComboboxChips ref={refContainer}>
          <ComboboxValue>
            {(selectedValues: ComboboxItemValue[]) => (
              <React.Fragment>
                {selectedValues.map((item) => (
                  <ComboboxChip
                    key={item.value}
                    aria-label={item.label}
                    showRemove
                  >
                    {item.label}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id={field.name}
                  name={field.name}
                  placeholder={
                    selectedValues.length ? addMorePlaceholder : placeholder
                  }
                />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        {description && <FieldDescription>{description}</FieldDescription>}
        <FieldError />
      </Field>

      <ComboboxContent sideOffset={12} align="start" anchor={refContainer}>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(value: ComboboxItemValue) => (
            <ComboboxItem key={value.value} value={value}>
              {value.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
