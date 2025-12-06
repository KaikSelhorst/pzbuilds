import { randomUUIDv7 } from 'bun'
import type { ModsInterface } from '../schemas'

export class ModEntity implements ModsInterface {
  readonly id: ModsInterface['id']
  readonly steamModId: ModsInterface['steamModId']
  readonly name: ModsInterface['name']
  readonly createdAt: ModsInterface['createdAt']
  readonly updatedAt: ModsInterface['updatedAt']
  readonly isOfficial: ModsInterface['isOfficial']
  readonly creatorId: ModsInterface['creatorId']

  constructor(data: ModsInterface) {
    this.id = data.id
    this.name = data.name
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.steamModId = data.steamModId
    this.isOfficial = data.isOfficial
    this.creatorId = data.creatorId
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      steamModId: this.steamModId,
      isOfficial: this.isOfficial,
      creatorId: this.creatorId,
    }
  }

  update(data: Pick<ModEntity, 'name'>) {
    return new ModEntity({
      id: this.id,
      name: data.name,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      isOfficial: this.isOfficial,
      steamModId: this.steamModId,
      creatorId: this.creatorId,
    })
  }

  static create(props: {
    name: string
    steamModId: string
    isOfficial: boolean
    creatorId: string
  }) {
    const now = new Date()

    return new ModEntity({
      id: randomUUIDv7(),
      name: props.name,
      createdAt: now,
      updatedAt: now,
      isOfficial: props.isOfficial,
      steamModId: props.steamModId,
      creatorId: props.creatorId,
    })
  }
}
