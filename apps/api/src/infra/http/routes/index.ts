import { app } from '@/infra/http/server'
import { modsRoutes } from './mods-routes'

export function initRoutes() {
  app.use(modsRoutes)
  return app
}
