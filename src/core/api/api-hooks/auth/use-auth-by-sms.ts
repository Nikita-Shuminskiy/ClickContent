import { useMutation } from '@tanstack/react-query'
import { MutationKey } from '@/core/api/api-types/mutation-key.ts'
import { authBySms } from '@/core/api/endpoints/auth-api.ts'

type IProps = {
    onError?: (err: Error) => void
}
export const useAuthBySms = ({onError}:IProps) =>
    useMutation({
        mutationKey: [MutationKey.AUTH_BY_SMS],
        mutationFn: authBySms,
        onError
    })
