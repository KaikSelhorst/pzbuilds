import { and, eq } from 'drizzle-orm'
import type { Database } from '../database'
import { ModEntity } from '../entities'
import { mods } from '../schemas'

export class ModsRepository {
  async getModBySteamIdAndOwner(
    tx: Database,
    steamId: string,
    ownerId: string,
  ) {
    try {
      const mod = await tx.query.mods.findFirst({
        where: and(eq(mods.steamModId, steamId), eq(mods.creatorId, ownerId)),
      })
      return mod ? new ModEntity(mod) : undefined
    } catch {
      return undefined
    }
  }

  async createMod(tx: Database, modEntity: ModEntity) {
    try {
      const createdMod = await tx.insert(mods).values(modEntity).returning()
      return new ModEntity(createdMod[0])
    } catch {
      return undefined
    }
  }
}
