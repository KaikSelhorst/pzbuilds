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
  })
}

export const useGetTraits = (data: GetTraits.Data) => {
  return useQuery<GetTraits.Response, Error, GetTraits.Response>({
    queryKey: ['get-traits', data.modId],
    queryFn: () => getTraits(data),
  })
}
