import type { SteamModsInterface } from '../schemas'

export class SteamModEntity implements SteamModsInterface {
  readonly id: SteamModsInterface['id']
  readonly name: SteamModsInterface['name']
  readonly image: SteamModsInterface['image']
  readonly tags: SteamModsInterface['tags']
  readonly createdAt: SteamModsInterface['createdAt']
  readonly updatedAt: SteamModsInterface['updatedAt']
  readonly lastSync: SteamModsInterface['lastSync']
  readonly workshopUrl: SteamModsInterface['workshopUrl']

  constructor(readonly data: SteamModsInterface) {
    this.id = data.id
    this.name = data.name
    this.image = data.image
    this.tags = data.tags
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.lastSync = data.lastSync
    this.workshopUrl = data.workshopUrl
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastSync: this.lastSync,
      workshopUrl: this.workshopUrl,
    }
  }

  static create(props: {
    id: string
    name: string
    image: string
    tags: string[]
  }) {
    const hasValidTag = props.tags.some((tag) =>
      ['Skill', 'Traits'].includes(tag),
    )

    if (!hasValidTag) {
      return new Error("Mod must have 'Skill' or 'Traits' tag")
    }

    const now = new Date()

    return new SteamModEntity({
      id: props.id,
      image: props.image,
      name: props.name,
      tags: props.tags,
      lastSync: now,
      createdAt: now,
      updatedAt: now,
      workshopUrl: `https://steamcommunity.com/sharedfiles/filedetails/?id=${props.id}`,
    })
  }
}
