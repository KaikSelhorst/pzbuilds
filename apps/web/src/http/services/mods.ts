import type {
  CreateModSchema,
  GetModsFilterSchema,
} from '@org/validation/schemas/mod'

export namespace CreateMod {
  export type Data = CreateModSchema
  export type Response = { id: string }
}

export async function createMod(data: CreateMod.Data) {
  const res = await fetch('http://localhost:3001/mods', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error((await res.json()).message)
  return (await res.json()) as CreateMod.Response
}

export namespace GetMods {
  export type Data = GetModsFilterSchema
  export type Response = {
    data: {
      id: string
      name: string
      steamMod: {
        id: string
        name: string
        image: string
        tags: string[]
      }
    }[]
  }
}

export async function getMods() {
  const res = await fetch('http://localhost:3001/mods', {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.ok) throw new Error((await res.json()).message)
  return (await res.json()) as GetMods.Response
}

export namespace GetMod {
  export type Data = { modId: string }
  export type Response = {
    id: string
    name: string
    steamMod: {
      id: string
      name: string
      image: string
      tags: string[]
    }
  }
}

export async function getMod(data: GetMod.Data) {
  const res = await fetch(`http://localhost:3001/mods/${data.modId}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.ok) throw new Error((await res.json()).message)
  return (await res.json()) as GetMod.Response
}
