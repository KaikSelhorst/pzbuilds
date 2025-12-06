import { useMutation } from '@tanstack/react-query'
import { type CreateMod, createMod } from '@/http/services/mods'

export const useCreateMod = () => {
  return useMutation<CreateMod.Response, Error, CreateMod.Data>({
    mutationFn: createMod,
  })
}
