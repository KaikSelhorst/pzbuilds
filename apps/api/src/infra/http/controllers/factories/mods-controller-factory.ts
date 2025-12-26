import { modsController } from '@infra/http/controllers/mods'
import { database, ModsRepository, SteamModsRepository } from '@org/database'
import { SteamClient } from '@/infra/lib/steam'

function makeCreateModController() {
  const handler = new modsController.create({
    database: database,
    steamModsRepository: new SteamModsRepository(),
    modsRepository: new ModsRepository(),
    steamClient: new SteamClient(),
  })

  return handler.execute.bind(handler)
}

function makeUpdateModController() {
  const handler = new modsController.update({
    database: database,
    modsRepository: new ModsRepository(),
  })

  return handler.execute.bind(handler)
}

function makeGetModController() {
  const handler = new modsController.get({
    database: database,
    modsRepository: new ModsRepository(),
  })

  return handler.execute.bind(handler)
}

function makeGetModsController() {
  const handler = new modsController.list({
    database: database,
    modsRepository: new ModsRepository(),
  })

  return handler.execute.bind(handler)
}

export const modsControllerFactory = {
  createMod: makeCreateModController(),
  updateMod: makeUpdateModController(),
  getMod: makeGetModController(),
  getMods: makeGetModsController(),
}
