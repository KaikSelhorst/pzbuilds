import type { InferSelectModel } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createdAt, updatedAt } from '../utils/schemas-types'

export const steamMods = pgTable('steam_mods', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  tags: text('tags').array().default([]),
  workshopUrl: text('workshop_url').notNull(),
  lastSync: timestamp('last_sync').notNull().defaultNow(),
  createdAt,
  updatedAt,
})

export type SteamModsInterface = InferSelectModel<typeof steamMods>
