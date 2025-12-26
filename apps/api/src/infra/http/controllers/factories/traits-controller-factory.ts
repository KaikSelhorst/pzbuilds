import { database, ModsRepository, TraitsRepository } from '@org/database'
import { traitsController } from '../traits'

function makeCreateTraitController() {
  const handler = new traitsController.create({
    database: database,
    modsRepository: new ModsRepository(),
    traitsRepository: new TraitsRepository(),
  })
  return handler.execute.bind(handler)
}

function makeGetTraitsController() {
  const handler = new traitsController.list({
    database: database,
    traitsRepository: new TraitsRepository(),
  })
  return handler.execute.bind(handler)
}

function makeDeleteTraitController() {
  const handler = new traitsController.delete({
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
