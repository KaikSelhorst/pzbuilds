import '@/env'
import { initRoutes } from './infra/http/routes'

const app = initRoutes()
  .get('/health', () => ({
    message: 'OK',
  }))
  .listen(3001)

console.log(`🦊 Elysia is running at ${app.server?.url}`)
