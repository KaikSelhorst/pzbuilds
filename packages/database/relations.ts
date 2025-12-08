import { defineRelations } from 'drizzle-orm'
import * as schemas from './schemas'

const relations = defineRelations(schemas, (r) => ({
  mods: {
    steamMod: r.one.steamMods({
      from: r.mods.steamModId,
      to: r.steamMods.id,
      optional: false,
    }),
  },
  steamMods: {
    mods: r.many.mods({
      from: r.steamMods.id,
      to: r.mods.steamModId,
    }),
  },
}))

export { relations }
