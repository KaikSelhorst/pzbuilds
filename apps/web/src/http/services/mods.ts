import type { CreateModSchema } from '@org/validation/schemas/mod'

export namespace CreateMod {
  export type Data = CreateModSchema
  export type Response = {
    id: string
    name: string
    steam: { name: string; image: string; id: string }
  }
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
