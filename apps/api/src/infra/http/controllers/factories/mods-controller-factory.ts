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

export function makeUpdateModController() {
  const handler = new modsControler.updateMod({
    database: database,
    modsRepository: new ModsRepository(),
  })

  return handler.execute.bind(handler)
}

export function makeGetModController() {
  const handler = new modsControler.getMod({
    database: database,
    modsRepository: new ModsRepository(),
  })

  return handler.execute.bind(handler)
}

export const modsControllerFactory = {
  createMod: makeCreateModController(),
  updateMod: makeUpdateModController(),
  getMod: makeGetModController(),
}
