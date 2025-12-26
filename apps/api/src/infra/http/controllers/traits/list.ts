import { ApiResponse } from '@infra/utils'
import type { Database, TraitsRepository } from '@org/database'
import type { GetTraitsParamsSchema } from '@org/validation'

interface GetTraitsProps {
  database: Database
  traitsRepository: TraitsRepository
}

interface GetTraitsParams {
  params: GetTraitsParamsSchema
}

export class GetTraitsController {
  constructor(private readonly props: GetTraitsProps) {}

  async execute({ params }: GetTraitsParams) {
    const { database, traitsRepository } = this.props

    const traitsArray = await traitsRepository.getTraitsByModId(
      database,
      params.modId,
    )

    if (traitsArray === undefined) {
      return new ApiResponse({ message: 'Traits not found!' }, 404)
    }

    return new ApiResponse({ data: traitsArray }, 200)
  }
}
