import { CreateTraitController } from './create'
import { DeleteTraitController } from './delete'
import { GetTraitsController } from './list'

export const traitsController = {
  create: CreateTraitController,
  delete: DeleteTraitController,
  list: GetTraitsController,
}
