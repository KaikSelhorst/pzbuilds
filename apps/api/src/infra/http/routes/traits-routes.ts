import { traitsControllerFactory } from '@infra/http/controllers/factories'
import type { App } from '@infra/http/server'
import {
  createTraitParamsSchema,
  createTraitSchema,
  updateModParamsSchema,
} from '@org/validation'

export function traitsRoutes(app: App) {
  app.group('/mods/:modId/traits', (route) => {
    route.post(
      '/',
      async ({ status, body, user, params }) => {
        const res = await traitsControllerFactory.createTrait({
          body,
          user,
          params,
        })
        return status(res.status, res.value)
      },
      {
        auth: true,
        params: createTraitParamsSchema,
        body: createTraitSchema,
        tags: ['Api'],
      },
    )

    route.get(
      '/',
      async ({ status, params }) => {
        const res = await traitsControllerFactory.getTraits({
          params,
        })
        return status(res.status, res.value)
      },
      {
        params: updateModParamsSchema,
        tags: ['Api'],
      },
    )

    return route
  })
  return app
}
