import { modsControllerFactory } from '@infra/http/controllers/factories'
import type { App } from '@infra/http/server'
import {
  createModSchema,
  updateModParamsSchema,
  updateModSchema,
} from '@org/validation'

export function modsRoutes(app: App) {
  app.group('/mods', (route) => {
    route.post(
      '/',
      async ({ status, body, user }) => {
        const res = await modsControllerFactory.createMod({ body, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        body: createModSchema,
      },
    )

    route.put(
      '/:modId',
      async ({ status, body, user, params }) => {
        const res = await modsControllerFactory.updateMod({
          body,
          user,
          params,
        })
        return status(res.status, res.value)
      },
      {
        auth: true,
        body: updateModSchema,
        params: updateModParamsSchema,
      },
    )

    return route
  })
  return app
}
