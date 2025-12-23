import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'
import { env } from './env'
import { relations } from './relations'

console.log('Database URL:', env.DATABASE_URL)

const client = new SQL(env.DATABASE_URL)
export const database = drizzle({ client, relations })

type DBTransaction = Parameters<Parameters<typeof database.transaction>[0]>[0]

export type Database = typeof database | DBTransaction
