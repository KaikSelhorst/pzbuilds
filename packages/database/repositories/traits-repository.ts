import { arrayOverlaps, eq, sql } from 'drizzle-orm'
import type { Database } from '../database'
import { TraitEntity } from '../entities'
import { traits } from '../schemas'

export class TraitsRepository {
  async getTraitsByByIds(tx: Database, ids: string[]) {
    if (!ids.length) return []
    try {
      const traits = await tx.query.traits.findMany({
        where: { id: { in: ids } },
      })
      return traits
    } catch {
      return undefined
    }
  }

  async createTrait(tx: Database, trait: TraitEntity) {
    try {
      const createdTrait = await tx.insert(traits).values(trait).returning()
      return createdTrait.length ? new TraitEntity(createdTrait[0]) : undefined
    } catch {
      return undefined
    }
  }

  async getTraitsByModId(tx: Database, modId: string) {
    try {
      const traits = await tx.query.traits.findMany({
        where: { modId },
      })
      return traits
    } catch {
      return undefined
    }
  }

  async deleteTraitById(tx: Database, id: string) {
    try {
      await tx.delete(traits).where(eq(traits.id, id))
      return true
    } catch {
      return false
    }
  }

  async getTraitByTraitIdAndModId(
    tx: Database,
    traitId: string,
    modId: string,
  ) {
    try {
      const trait = await tx.query.traits.findFirst({
        where: { id: traitId, modId },
      })
      return trait ? new TraitEntity(trait) : undefined
    } catch {
      return undefined
    }
  }

  async removeTraitIdFromAllIncompatibleWith(tx: Database, traitId: string) {
    try {
      await tx
        .update(traits)
        .set({
          incompatibleWith: sql`array_remove(${traits.incompatibleWith}, ${traitId})`,
        })
        .where(arrayOverlaps(traits.incompatibleWith, [traitId]))
        .returning()
      return true
    } catch {
      return false
    }
  }
}
