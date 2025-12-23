import type { Database, ModsRepository, TraitsRepository } from '@org/database'
import type { DeleteTraitParamsSchema } from '@org/validation'
import { ApiResponse } from '@/infra/utils'
import type { AuthenticatedController } from '../../types'

interface DeleteTraitControllerProps {
  database: Database
  modsRepository: ModsRepository
  traitsRepository: TraitsRepository
}

interface DeleteTraitControllerParams extends AuthenticatedController {
  params: DeleteTraitParamsSchema
}

export class DeleteTraitController {
  constructor(private readonly props: DeleteTraitControllerProps) {}

  async execute({ params, user }: DeleteTraitControllerParams) {
    const { database, traitsRepository, modsRepository } = this.props

    const modEntity = await modsRepository.getModByIdAndOwnerId(
      database,
      params.modId,
      user.id,
    )

    if (modEntity === undefined) {
      return new ApiResponse({ message: 'Mod not found!' }, 404)
    }

    const traitEntity = await traitsRepository.getTraitByTraitIdAndModId(
      database,
      params.traitId,
      modEntity.id,
    )

    if (traitEntity === undefined) {
      return new ApiResponse({ message: 'Trait not found!' }, 404)
    }

    return this.deleteTraitWithTransaction(
      database,
      traitsRepository,
      traitEntity.id,
    )
  }

  async deleteTraitWithTransaction(
    db: Database,
    repo: TraitsRepository,
    traitId: string,
  ) {
    return db.transaction(async (tx) => {
      const incompatibleRemoved =
        await repo.removeTraitIdFromAllIncompatibleWith(tx, traitId)

      if (!incompatibleRemoved) {
        return new ApiResponse(
          { message: 'Failed to update incompatible traits' },
          500,
        )
      }

      const deleted = await repo.deleteTraitById(tx, traitId)

      if (!deleted) {
        return new ApiResponse({ message: 'Failed to delete trait' }, 500)
      }

      return new ApiResponse({ message: 'Trait deleted successfully' }, 200)
    })
  }
}
