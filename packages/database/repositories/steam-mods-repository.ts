import type { Database } from '../database'
import { SteamModEntity } from '../entities'
import { steamMods } from '../schemas'

export class SteamModsRepository {
  async getModById(tx: Database, modId: string) {
    try {
      const steamMod = await tx.query.steamMods.findFirst({
        where: { id: modId },
      })
      return steamMod ? new SteamModEntity(steamMod) : undefined
    } catch {
      return undefined
    }
  }
  async createMod(tx: Database, mod: SteamModEntity) {
    try {
      const newSteamMod = await tx.insert(steamMods).values(mod).returning()
      return new SteamModEntity(newSteamMod[0])
    } catch {
      return undefined
    }
  }
}
