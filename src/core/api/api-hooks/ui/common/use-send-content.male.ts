import {useMutation} from '@tanstack/react-query'
import {MutationKey} from '@/core/api/api-types/mutation-key'
import {useAlert} from '@/contexts/AlertProvider/AlertProvider.tsx'
import {sendContentMale} from "@/core/api/endpoints/common-api.ts";


export const useSendContentMale = () => {
    const {showAlert} = useAlert()

    return useMutation({
        mutationKey: [MutationKey.SEND_CONTENT_MALE],
        mutationFn: sendContentMale,
        onSuccess: async (data) => {
            showAlert("Контент успешно отправлен", "success")
        },
        onError: (error) => {
            showAlert("Повторите попытку позже", "error")
        }
    })
}
