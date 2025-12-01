import { boolean, pgTable, text } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '@/utils/schemas-types'
import { steamMods } from './steam-mods'

export const mods = pgTable('mods', {
  id,
  name: text('name').notNull(),
  isOfficial: boolean('is_official').notNull().default(false),
  steamModId: text('steam_mod_id')
    .notNull()
    .references(() => steamMods.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})
