import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/app'
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

      if (previewData === undefined) return

      ctx.client.setQueryData(queryKey, {
        ...previewData,
        data: [...previewData.data, data],
      })

      return ctx.client.invalidateQueries({ queryKey, refetchType: 'none' })
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

export const useGetTraitsData = (data: GetTraits.Data) => {
  return useQuery<GetTraits.Response, Error, GetTraits.Response>({
    queryKey: ['get-traits', data.modId],
    queryFn: () => getTraits(data),
    staleTime: 10 * 60 * 1000,
    enabled: false,
  })
}

export const useGetTraitQueryData = (data: Pick<GetTraits.Data, 'modId'>) => {
  return queryClient.getQueryData<GetTraits.Response>([
    'get-traits',
    data.modId,
  ])
}
