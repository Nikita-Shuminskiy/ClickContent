import { useMutation } from '@tanstack/react-query'
import { MutationKey } from '@/core/api/api-types/mutation-key.ts'
import { deleteUserAvatar } from '@/core/api/endpoints/user-api.ts'


export const useDeleteUserAvatar = () => {
    return useMutation({
        mutationKey: [MutationKey.DELETE_AVATAR],
        mutationFn: deleteUserAvatar,
        onSuccess: () => {
            // do something
        },
    })
}
