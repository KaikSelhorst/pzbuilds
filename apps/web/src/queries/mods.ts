import { useMutation, useQuery } from '@tanstack/react-query'
import {
  type CreateMod,
  createMod,
  type GetMod,
  type GetMods,
  getMod,
  getMods,
} from '@/http/services/mods'

export const useCreateMod = () => {
  return useMutation<CreateMod.Response, Error, CreateMod.Data>({
    mutationFn: createMod,
  })
}

export const useGetMods = () => {
  return useQuery<GetMods.Response, Error, GetMods.Response>({
    queryKey: ['get-mods'],
    queryFn: getMods,
  })
}

export const useGetMod = (data: GetMod.Data) => {
  return useQuery<GetMod.Response, Error, GetMod.Response>({
    queryKey: ['get-mod', data.modId],
    queryFn: () => getMod(data),
  })
}
