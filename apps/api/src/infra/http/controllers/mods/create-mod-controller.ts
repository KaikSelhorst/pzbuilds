import type { Database, SteamModsRepository } from '@org/database'
import { createModSchema } from '@org/validation/schemas/mod'
import type { Server } from '@/infra/http/server'
import type { SteamClient } from '@/infra/lib/steam'

export default class CreateModController {
  constructor(
    private server: Server,
    private steamClient: SteamClient,
    private database: Database,
    private steamModsRepository: SteamModsRepository,
  ) {
    this.server.post(
      '/mods',
      async ({ status, body }) => {
        const steamItemAlreadyExist =
          await this.steamModsRepository.getSteamModById(
            this.database,
            body.modId,
          )

        if (steamItemAlreadyExist === undefined) {
          const steamItem = await this.steamClient.getWorkspaceItem(body.modId)

          if (steamItem === null) {
            return status(404, {
              message: 'Steam Id not Found in Steam Database',
            })
          }
        }

        const steamItem = await this.steamClient.getWorkspaceItem(body.modId)

        if (steamItem === null) {
          return status(404, {
            message: 'Steam Id not Found in Steam Database',
          })
        }

        return status(201, { ...steamItem })
      },
      {
        auth: true,
        body: createModSchema,
        tags: ['Api'],
        detail: { description: 'Add a new mod' },
      },
    )
  }
}
