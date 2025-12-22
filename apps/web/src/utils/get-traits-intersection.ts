// TODO: Move this Trait interface to a shared types file to avoid duplication

interface Trait {
  id: string
  name: string
}

export function getTraitIntersection(arr: string[], arr2: Trait[]) {
  let foundItems = 0
  const selectedItems = arr.length
  const values: Trait[] = []

  for (let i = 0; i < arr2.length; i++) {
    if (foundItems >= selectedItems) break
    const item = arr2[i]

    const itemIsSelected = arr.find((traitId) => traitId === item.id)

    if (itemIsSelected) {
      foundItems++
      values.push(item)
    }
  }

  return values
}
