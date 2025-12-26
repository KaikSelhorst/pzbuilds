import type { AuthenticatedController } from '@infra/http/types'
import { ApiResponse } from '@infra/utils'
import type { Database, ModsRepository } from '@org/database'
import type { GetModsFilterSchema } from '@org/validation'

interface GetModsControllerProps {
  database: Database
  modsRepository: ModsRepository
}

interface GetModsControllerParams extends AuthenticatedController {
  query: GetModsFilterSchema
}

export class GetModsController {
  constructor(private props: GetModsControllerProps) {}

  async execute({ user, query }: GetModsControllerParams) {
    const { modsRepository, database } = this.props

    const mods = await modsRepository.getModsByOwnerId(database, user.id, query)

    if (mods === undefined) {
      return new ApiResponse({ message: 'Mods not found' }, 404)
    }

    return new ApiResponse({ data: mods }, 200)
  }
}
