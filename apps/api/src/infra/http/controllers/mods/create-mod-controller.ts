import { createModSchema } from '@org/validation/schemas/mod'
import type { Server } from '@/infra/http/server'
import type { SteamClient } from '@/infra/lib/steam'

export class CreateModController {
  constructor(
    private server: Server,
    private steamClient: SteamClient,
  ) {
    this.server.post(
      '/mods',
      async ({ status, body }) => {
        // Simulate a delay for the redirect
        await new Promise((resolve) => setTimeout(resolve, 1000))
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
