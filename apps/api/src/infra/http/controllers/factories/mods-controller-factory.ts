import { modsControler } from '@infra/http/controllers/mods-controller'
import { database, ModsRepository, SteamModsRepository } from '@org/database'
import { SteamClient } from '@/infra/lib/steam'

export function makeCreateModController() {
  const handler = new modsControler.createMod({
    database: database,
    steamModsRepository: new SteamModsRepository(),
    modsRepository: new ModsRepository(),
    steamClient: new SteamClient(),
  })

  return handler.execute.bind(handler)
}

export const modsControllerFactory = {
  createMod: makeCreateModController(),
}
