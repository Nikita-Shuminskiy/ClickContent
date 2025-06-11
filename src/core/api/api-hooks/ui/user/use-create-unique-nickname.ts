import { useMutation } from '@tanstack/react-query'
import { MutationKey } from '@/core/api/api-types/mutation-key.ts'
import { createUniqueNickname } from '@/core/api/endpoints/user-api'

export const useCreateUniqueNickname = () => {
    return useMutation({
        mutationKey: [MutationKey.CREATE_UNIQUE_NICKNAME],
        mutationFn: createUniqueNickname,
        onSuccess: () => {
            // do something
        },
    })
}