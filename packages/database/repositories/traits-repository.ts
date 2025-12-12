import type { Database } from '../database'
import { TraitEntity } from '../entities'
import { traits } from '../schemas'

export class TraitsRepository {
  async getTraitsByByIds(tx: Database, ids: string[]) {
    if (!ids.length) return []
    try {
      const traits = await tx.query.traits.findMany({
        where: { id: { arrayOverlaps: ids } },
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
}
