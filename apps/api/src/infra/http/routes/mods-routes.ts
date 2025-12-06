import { modsControllerFactory } from '@infra/http/controllers/factories'
import type { App } from '@infra/http/server'
import { createModSchema } from '@org/validation'

export function modsRoutes(app: App) {
  app.group('/mods', (route) => {
    route.post(
      '/',
      async ({ status, body, user }) => {
        const res = await modsControllerFactory.createMod({ body, user })
        console.log(res)
        return status(res.status, res.value)
      },
      {
        auth: true,
        body: createModSchema,
      },
    )
    return route
  })
  return app
}
