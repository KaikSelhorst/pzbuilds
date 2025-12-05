import { Elysia } from 'elysia'
import { betterAuthPlugin, corsPlugin, openApiPlugin } from './plugins'

export const app = new Elysia()
  .use(corsPlugin)
  .use(openApiPlugin)
  .use(betterAuthPlugin)

export type App = typeof app
