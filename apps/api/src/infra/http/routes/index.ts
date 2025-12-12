import { app } from '@/infra/http/server'
import { modsRoutes } from './mods-routes'
import { traitsRoutes } from './traits-routes'

export function initRoutes() {
  app.use(modsRoutes)
  app.use(traitsRoutes)
  return app
}
