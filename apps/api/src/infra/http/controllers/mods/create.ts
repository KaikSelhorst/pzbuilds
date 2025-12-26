import type { AuthenticatedController } from '@infra/http/types'
import type { SteamClient } from '@infra/lib/steam'
import { ApiResponse } from '@infra/utils'
import {
  type Database,
  ModEntity,
  type ModsRepository,
  SteamModEntity,
  type SteamModsRepository,
} from '@org/database'
import type { CreateModSchema } from '@org/validation'

interface CreateModProps {
  database: Database
  steamModsRepository: SteamModsRepository
  modsRepository: ModsRepository
  steamClient: SteamClient
}

interface CreateModParams extends AuthenticatedController {
  body: CreateModSchema
}

export class CreateModController {
  constructor(private readonly props: CreateModProps) {}

  async execute({ body, user }: CreateModParams) {
    const { database, steamModsRepository, modsRepository, steamClient } =
      this.props

    const userAlreadyHasMod = await modsRepository.getModBySteamIdAndOwner(
      database,
      body.modId,
      user.id,
    )

    if (userAlreadyHasMod !== undefined) {
      return new ApiResponse(
        { message: 'Your mod is already in your library' },
        400,
      )
    }

    const steamMod = await steamModsRepository.getModById(database, body.modId)

    if (steamMod === undefined) {
      const newSteamMod = await steamClient.getModById(body.modId)

      if (newSteamMod instanceof Error) {
        return new ApiResponse({ message: newSteamMod.message }, 400)
      }

      const steamModEntity = SteamModEntity.create({
        id: newSteamMod.id,
        name: newSteamMod.title,
        image: newSteamMod.previewImage,
        tags: newSteamMod.tags,
      })

      if (steamModEntity instanceof Error) {
        return new ApiResponse({ message: steamModEntity.message }, 400)
      }

      const steamModCreated = await steamModsRepository.createMod(
        database,
        steamModEntity,
      )

      if (steamModCreated === undefined) {
        return new ApiResponse({ message: 'Steam mod creation failed' }, 500)
      }

      const modEntity = ModEntity.create({
        name: steamModEntity.name,
        isOfficial: false,
        steamModId: steamModEntity.id,
        creatorId: user.id,
      })

      return this.createMod(modEntity)
    }

    const modEntity = ModEntity.create({
      name: steamMod.name,
      isOfficial: false,
      steamModId: steamMod.id,
      creatorId: user.id,
    })

    return this.createMod(modEntity)
  }

  private async createMod(mod: ModEntity) {
    const { database, modsRepository } = this.props

    const modCreated = await modsRepository.createMod(database, mod)
    if (modCreated === undefined) {
      return new ApiResponse({ message: 'Mod creation failed' }, 500)
    }

    return new ApiResponse(modCreated.toJSON(), 201)
  }
}
