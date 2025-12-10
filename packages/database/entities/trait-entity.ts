import { randomUUIDv7 } from 'bun'
import type { TraitsInterface } from '../schemas'

export class TraitEntity implements TraitsInterface {
  readonly id: TraitsInterface['id']
  readonly name: TraitsInterface['name']
  readonly description: TraitsInterface['description']
  readonly modId: TraitsInterface['modId']
  readonly createdAt: TraitsInterface['createdAt']
  readonly updatedAt: TraitsInterface['updatedAt']
  readonly cost: TraitsInterface['cost']
  readonly type: TraitsInterface['type']
  readonly incompatibleWith: TraitsInterface['incompatibleWith']

  constructor(data: TraitsInterface) {
    this.id = data.id
    this.name = data.name
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.cost = data.cost
    this.type = data.type
    this.incompatibleWith = data.incompatibleWith
    this.modId = data.modId
    this.description = data.description
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  update(data: Pick<TraitEntity, 'name'>) {
    return new TraitEntity({
      id: this.id,
      name: data.name,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      cost: this.cost,
      type: this.type,
      incompatibleWith: this.incompatibleWith,
      modId: this.modId,
      description: this.description,
    })
  }

  static create(props: {
    name: TraitsInterface['name']
    cost: TraitsInterface['cost']
    incompatibleWith: TraitsInterface['incompatibleWith']
    modId: TraitsInterface['modId']
    description: TraitsInterface['description']
  }) {
    const now = new Date()

    const type = props.cost < 0 ? 'NEGATIVE' : 'POSITIVE'

    return new TraitEntity({
      id: randomUUIDv7(),
      name: props.name,
      createdAt: now,
      updatedAt: now,
      cost: props.cost,
      type,
      incompatibleWith: props.incompatibleWith,
      modId: props.modId,
      description: props.description,
    })
  }
}
