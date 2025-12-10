import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../utils/schemas-types'
import { mods } from './mods'

export const traits = pgTable('traits', {
  id,
  name: text('name').notNull(),
  description: text('description').notNull(),
  cost: integer('cost').notNull(),
  type: text('type').notNull(),
  incompatibleWith: uuid('tags').array().default([]),
  modId: text('steam_mod_id')
    .notNull()
    .references(() => mods.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})

export type TraitsInterface = typeof traits.$inferSelect
