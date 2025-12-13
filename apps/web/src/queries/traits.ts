import { useMutation, useQuery } from '@tanstack/react-query'
import {
  type CreateTrait,
  createTrait,
  type GetTraits,
  getTraits,
} from '@/http/services/traits'

export const useCreateTrait = () => {
  return useMutation<CreateTrait.Response, Error, CreateTrait.Data>({
    mutationFn: createTrait,
    onSuccess(data, variables, _, ctx) {
      const queryKey = ['get-traits', variables.modId]

      const previewData = ctx.client.getQueryData<GetTraits.Response>(queryKey)

      if (previewData === undefined) return undefined

      ctx.client.setQueryData(['get-traits', variables.modId], {
        ...previewData,
        data: [...previewData.data, data],
      })

      return () => ctx.client.invalidateQueries({ queryKey })
    },
  })
}

export const useGetTraits = (data: GetTraits.Data) => {
  return useQuery<GetTraits.Response, Error, GetTraits.Response>({
    queryKey: ['get-traits', data.modId],
    queryFn: () => getTraits(data),
    staleTime: 10 * 60 * 1000,
  })
}
