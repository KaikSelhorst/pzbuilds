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

  async getModByIdAndOwnerId(tx: Database, modId: string, ownerId: string) {
    try {
      const mod = await tx.query.mods.findFirst({
        where: and(eq(mods.id, modId), eq(mods.creatorId, ownerId)),
      })
      return mod ? new ModEntity(mod) : undefined
    } catch {
      return undefined
    }
  }

  async updateMod(tx: Database, mod: ModEntity) {
    try {
      const updatedMod = await tx
        .update(mods)
        .set(mod)
        .where(and(eq(mods.id, mod.id), eq(mods.creatorId, mod.creatorId)))
        .returning()
      return updatedMod.length > 0 ? new ModEntity(updatedMod[0]) : undefined
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
