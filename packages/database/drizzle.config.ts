import { defineConfig } from 'drizzle-kit'
import { env } from './env'

export default defineConfig({
  schema: './schemas/index.ts',
  dialect: 'postgresql',
  out: './migrations',
  dbCredentials: { url: env.DATABASE_URL },
})
