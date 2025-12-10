import type { Database } from '../database'

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
}
