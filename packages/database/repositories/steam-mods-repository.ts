import { eq } from 'drizzle-orm'
import type { Database } from '../database'
import { type SteamModsInterface, steamMods } from '../schemas'

export class SteamModsRepository {
  async getSteamModById(
    tx: Database,
    modId: string,
  ): Promise<SteamModsInterface | undefined> {
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
