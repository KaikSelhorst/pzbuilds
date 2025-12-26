import type { AuthenticatedController } from '@infra/http/types'
import { ApiResponse } from '@infra/utils'
import type { Database, ModsRepository } from '@org/database'

interface GetModControllerProps {
  database: Database
  modsRepository: ModsRepository
}

interface GetModControllerParams extends AuthenticatedController {
  params: { modId: string }
}

export class GetModController {
  constructor(private props: GetModControllerProps) {}

  async execute({ params, user }: GetModControllerParams) {
    const { modsRepository, database } = this.props

    const mod = await modsRepository.getModByIDAndOwnerIdWithSteamModData(
      database,
      params.modId,
      user.id,
    )

    if (mod === undefined) {
      return new ApiResponse({ message: 'Mod not found' }, 404)
    }

    return new ApiResponse(mod, 200)
  }
}
