import { useMutation } from '@tanstack/react-query'
import { MutationKey } from '@/core/api/api-types/mutation-key.ts'
import { addUserAvatar } from '@/core/api/endpoints/user-api.ts'


//файл должен быть предварительно загружен на S3. если аватарка отличается - необходимо удалить с S3 старую аватарку
export const useAddUserAvatar = () => {
    return useMutation({
        mutationKey: [MutationKey.ADD_AVATAR],
        mutationFn: addUserAvatar,
        onSuccess: () => {
            // do something
        },
    })
}