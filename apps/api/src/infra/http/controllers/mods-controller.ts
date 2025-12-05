import type { Database, SteamModsRepository } from '@org/database'
import { ApiResponse } from '@/infra/utils'

interface CreateModProps {
  database: Database
  steamModsRepository: SteamModsRepository
}

export class CreateModController {
  constructor(private readonly props: CreateModProps) {}

  async execute() {
    const { database, steamModsRepository } = this.props

    const steamMod = await steamModsRepository.getSteamModById(database, '123')

    if (steamMod === undefined) {
      return new ApiResponse({ message: 'Steam mod not found' }, 404)
    }

    return new ApiResponse({ message: 'Steam mod found' }, 200)
  }
}

export const modsControler = {
  createMod: CreateModController,
}
