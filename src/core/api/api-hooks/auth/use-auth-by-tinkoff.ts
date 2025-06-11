import {useMutation} from '@tanstack/react-query'
import {MutationKey} from '@/core/api/api-types/mutation-key.ts'
import {authByTinkoff} from '@/core/api/endpoints/auth-api.ts'

export const useAuthByTinkoff = () =>
    useMutation({
        mutationKey: [MutationKey.AUTH_BY_TINKOFF],
        mutationFn: authByTinkoff,
        onSuccess: (data) => {
            //StorageService.setRedirectUrl(data.data.url);
            localStorage.setItem("redirectID", data.data.id);
            window.location.replace(data.data.url);
        },
    })
