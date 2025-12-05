import { eq } from 'drizzle-orm'
import type { Database } from '../database'
import { steamMods } from '../schemas'

export class SteamModsRepository {
  async getSteamModById(tx: Database, modId: string) {
    try {
      const steamMod = await tx.query.steamMods.findFirst({
        where: eq(steamMods.id, modId),
      })
      return steamMod
    } catch {
      return undefined
    }
  }
}
