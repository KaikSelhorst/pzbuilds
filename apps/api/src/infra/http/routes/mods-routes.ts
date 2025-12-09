import { modsControllerFactory } from '@infra/http/controllers/factories'
import type { App } from '@infra/http/server'
import {
  createModSchema,
  getModsFilterSchema,
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
        tags: ['Api'],
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
        tags: ['Api'],
      },
    )

    route.get(
      '/:modId',
      async ({ status, params, user }) => {
        const res = await modsControllerFactory.getMod({ params, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        params: updateModParamsSchema,
        tags: ['Api'],
      },
    )

    route.get(
      '/',
      async ({ status, user, query }) => {
        const res = await modsControllerFactory.getMods({ user, query })
        return status(res.status, res.value)
      },
      { auth: true, query: getModsFilterSchema, tags: ['Api'] },
    )

    return route
  })
  return app
}
