import type { AuthenticatedController } from '@infra/http/types'
import { ApiResponse } from '@infra/utils'
import type { Database, ModsRepository } from '@org/database'
import type { UpdateModSchema } from '@org/validation'

type UpdateModControllerProps = {
  database: Database
  modsRepository: ModsRepository
}

interface UpdateModParams extends AuthenticatedController {
  body: UpdateModSchema
  params: { modId: string }
}

export class UpdateModController {
  constructor(private props: UpdateModControllerProps) {}

  async execute({ body, params, user }: UpdateModParams) {
    const { modsRepository, database } = this.props

    const mod = await modsRepository.getModByIdAndOwnerId(
      database,
      params.modId,
      user.id,
    )

    if (mod === undefined) {
      return new ApiResponse({ message: 'Mod not found' }, 404)
    }

    if (mod.creatorId !== user.id) {
      return new ApiResponse({ message: 'Unauthorized' }, 403)
    }

    const updatedModEntity = mod.update({ name: body.name })

    const updatedMod = await modsRepository.updateMod(
      database,
      updatedModEntity,
    )

    if (updatedMod === undefined) {
      return new ApiResponse({ message: 'Mod update failed' }, 500)
    }

    return new ApiResponse(updatedMod.toJSON(), 200)
  }
}
