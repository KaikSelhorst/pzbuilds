import { modsControler } from '@infra/http/controllers/mods-controller'
import { database, SteamModsRepository } from '@org/database'

export function makeCreateModController() {
  return new modsControler.createMod({
    database: database,
    steamModsRepository: new SteamModsRepository(),
  }).execute
}

export const modsControllerFactory = {
  createMod: makeCreateModController(),
}
