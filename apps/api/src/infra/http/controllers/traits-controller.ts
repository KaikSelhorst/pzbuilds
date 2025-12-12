import type { AuthenticatedController } from '@infra/http/types'
import {
  type Database,
  type ModsRepository,
  TraitEntity,
  type TraitsRepository,
} from '@org/database'

import type {
  CreateModTraitParamsSchema,
  CreateModTraitSchema,
} from '@org/validation'
import { ApiResponse } from '@/infra/utils'

interface CreateModTraitProps {
  database: Database
  traitsRepository: TraitsRepository
  modsRepository: ModsRepository
}

interface CreateModTraitParams extends AuthenticatedController {
  body: CreateModTraitSchema
  params: CreateModTraitParamsSchema
}

export class CreateModTraitController {
  constructor(private readonly props: CreateModTraitProps) {}

  async execute({ body, user, params }: CreateModTraitParams) {
    const { database, modsRepository, traitsRepository } = this.props

    const modEntity = await modsRepository.getModByIdAndOwnerId(
      database,
      user.id,
      params.modId,
    )

    if (modEntity === undefined) {
      return new ApiResponse({ message: 'Mod not found' }, 404)
    }

    if (modEntity.creatorId !== user.id) {
      return new ApiResponse({ message: 'Unauthorized' }, 403)
    }

    const traitEntity = TraitEntity.create({
      name: body.name,
      cost: body.cost,
      description: body.description,
      incompatibleWith: body.incompatibleWith,
      modId: modEntity.id,
    })

    const incompatibleTraitsFound = await traitsRepository.getTraitsByByIds(
      database,
      traitEntity.incompatibleWith,
    )

    if (incompatibleTraitsFound === undefined) {
      return new ApiResponse(
        { message: 'Error in verify incompatible traits' },
        404,
      )
    }

    if (
      incompatibleTraitsFound.length !== traitEntity.incompatibleWith.length
    ) {
      return new ApiResponse({ message: 'Incompatible trait not found' }, 404)
    }

    const createdTrait = await this.props.traitsRepository.createTrait(
      database,
      traitEntity,
    )

    if (createdTrait === undefined) {
      return new ApiResponse({ message: 'Mod creation failed' }, 500)
    }

    return new ApiResponse(createdTrait.toJSON(), 201)
  }
}

export const traitsController = {
  createTrait: CreateModTraitController,
}
