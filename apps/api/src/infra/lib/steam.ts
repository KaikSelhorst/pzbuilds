interface PublishedFileDetails {
  publishedfileid: string
  result: number
  creator: string
  creator_app_id: string
  consumer_app_id: string
  filename: string
  hcontent_file: string
  preview_url: string
  hcontent_preview: string
  title: string
  description: string
  time_created: string
  time_updated: string
  visibility: number
  banned: number
  ban_reason: string
  subscriptions: string
  favorited: number
  lifetime_subscriptions: string
  lifetime_favorited: string
  views: string
  tags: Array<{ tag: string }>
}

interface GetPublishedFileDetails {
  response: {
    result: number
    resultcount: number
    publishedfiledetails: Array<PublishedFileDetails>
  }
}

export class SteamClient {
  async getModById(modId: string) {
    const formData = new URLSearchParams()
    formData.append('itemcount', '1')
    formData.append('publishedfileids[0]', modId)

    const res = await fetch(
      'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/',
      {
        method: 'POST',
        body: formData,
      },
    )

    if (!res.ok) {
      return new Error('Failed to get steam mod.')
    }

    const data = await res.json()

    const { response } = data as GetPublishedFileDetails

    if (!response.publishedfiledetails.length) {
      return new Error('Steam mod not found.')
    }

    const steamMod = response.publishedfiledetails[0]

    const { preview_url, title, tags } = steamMod

    return {
      id: modId,
      title,
      previewImage: preview_url,
      tags: tags.map((tag) => tag.tag),
    }
  }
}
