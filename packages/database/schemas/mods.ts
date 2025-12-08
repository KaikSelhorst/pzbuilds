import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../utils/schemas-types'
import { steamMods } from './steam-mods'
import { users } from './users'

export const mods = pgTable('mods', {
  id,
  name: text('name').notNull(),
  isOfficial: boolean('is_official').notNull().default(false),
  steamModId: text('steam_mod_id')
    .notNull()
    .references(() => steamMods.id, { onDelete: 'cascade' }),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})

export type ModsInterface =  typeof mods.$inferSelect
