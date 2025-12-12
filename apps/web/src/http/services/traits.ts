import type { TraitsInterface } from '@org/database/schemas'
import type {
  CreateTraitParamsSchema,
  CreateTraitSchema,
  GetTraitsParamsSchema,
} from '@org/validation'

export namespace CreateTrait {
  export type Data = CreateTraitSchema & CreateTraitParamsSchema
  export type Response = TraitsInterface
}

export async function createTrait(data: CreateTrait.Data) {
  const { modId, ...body } = data
  const res = await fetch(`http://localhost:3001/mods/${modId}/traits`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error((await res.json()).message)
  return (await res.json()) as CreateTrait.Response
}

export namespace GetTraits {
  export type Data = GetTraitsParamsSchema
  export type Response = TraitsInterface[]
}

export async function getTraits(data: GetTraits.Data) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const res = await fetch(`http://localhost:3001/mods/${data.modId}/traits`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) throw new Error((await res.json()).message)
  return (await res.json()) as GetTraits.Response
}
