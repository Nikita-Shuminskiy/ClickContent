import {AxiosError} from "axios";
import {useMutation} from '@tanstack/react-query'
import {MutationKey} from '@/core/api/api-types/mutation-key'
import {useAlert} from '@/contexts/AlertProvider/AlertProvider.tsx'
import {ApiRequest} from "@/core/api/types.ts";
import {api} from "@/core/api/api.ts";
import {paymentInstance} from "@/core/api/config.ts";

type PayloadType = {
    card: string,
    amount: number
}

export const useWithdraw = () => {
    const {showAlert} = useAlert()

    return useMutation({
        mutationKey: [MutationKey.WITHDRAW],
        mutationFn: post,
        onSuccess: async (data) => {
            showAlert("Успешно", "success")
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                showAlert(error.response.data.error, 'error', 10000)
            }
        }
    })
}


type Request = ApiRequest<'FINANCE.WITHDRAW', void, PayloadType, any>

export const post = async (data: PayloadType): Promise<any> => {

    const response = await api.post<Request>(
        paymentInstance,
        {
            url: 'withdraw',
            body: data
        })

    return response.data
}
