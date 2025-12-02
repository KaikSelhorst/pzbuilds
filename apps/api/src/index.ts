import '@/env'

import { server } from './infra/http/routes'

const app = server
  .get('/health', () => ({
    message: 'OK',
  }))
  .listen(3001)

console.log(`🦊 Elysia is running at ${app.server?.url}`)
