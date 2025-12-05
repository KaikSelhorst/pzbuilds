import { modsControllerFactory } from '@infra/http/controllers/factories'
import type { App } from '@infra/http/server'

export function modsRoutes(app: App) {
  app.group('/mods', (route) => {
    route.get(
      '/',
      async ({ status }) => {
        const res = await modsControllerFactory.createMod()
        return status(res.status, res.value)
      },
      { auth: true },
    )
    return route
  })
  return app
}
