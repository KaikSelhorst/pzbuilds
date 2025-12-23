import { database, ModsRepository, TraitsRepository } from '@org/database'
import { traitsController } from '../traits-controller'

function makeCreateTraitController() {
  const handler = new traitsController.createTrait({
    database: database,
    modsRepository: new ModsRepository(),
    traitsRepository: new TraitsRepository(),
  })
  return handler.execute.bind(handler)
}

function makeGetTraitsController() {
  const handler = new traitsController.getTraits({
    database: database,
    traitsRepository: new TraitsRepository(),
  })
  return handler.execute.bind(handler)
}

function makeDeleteTraitController() {
  const handler = new traitsController.deleteTrait({
    database: database,
    modsRepository: new ModsRepository(),
    traitsRepository: new TraitsRepository(),
  })
  return handler.execute.bind(handler)
}

export const traitsControllerFactory = {
  createTrait: makeCreateTraitController(),
  getTraits: makeGetTraitsController(),
  deleteTrait: makeDeleteTraitController(),
}
