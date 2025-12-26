import { CreateModController } from './create'
import { GetModController } from './get'
import { GetModsController } from './list'
import { UpdateModController } from './update'

export const modsController = {
  create: CreateModController,
  update: UpdateModController,
  list: GetModsController,
  get: GetModController,
}
