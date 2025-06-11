import { QueryObserverResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { MutationKey } from '@/core/api/api-types/mutation-key.ts'
import { authByTinkoffVerify } from '@/core/api/endpoints/auth-api.ts'
import { getUser } from "@/core/api/endpoints/user-api.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { setIsAuthCookie, setUserCookie } from "@/helpers/NavigateToMarket.ts";
import StorageService from "@/core/service/storage-service.ts";
import { useNavigate } from "react-router-dom";
import { executePooling } from "@/core/api/utils/execute-pooling.ts";
import { IPassportDto, IPassportStatusDto } from "@/data-contracts.ts";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import { useGetPassport } from "@/core/api/api-hooks/passport/use-get-passport.ts";

const PROCESSED_PASSPORT_STATUSES = [ IPassportStatusDto.ValidationSucceeded, IPassportStatusDto.ValidationFailed ]


export const useAuthByTinkoffVerify = () => {
    let url = StorageService.getLocation() ?? "/dashboard";
    const nav = useNavigate()
    const client = useQueryClient()
    const { showAlert } = useAlert();
    const { refetch: refetchUser } = useGetUser();
    const { data, refetch } = useGetPassport()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationKey: [ MutationKey.AUTH_BY_TINKOFF ],
        mutationFn: authByTinkoffVerify,
        onSuccess: async () => {
            const user = await getUser()
            client.setQueriesData({ queryKey: [ QueryKey.GET_USER, [] ] }, ( oldData ) => ({
                ...user
            }))
            setUserCookie({ user })
            setIsAuthCookie('auth')
            StorageService.setPoolingStarting()
            await executePooling(
                () => refetch(),
                result => PROCESSED_PASSPORT_STATUSES.includes((result as QueryObserverResult<IPassportDto, unknown>).data.status),
                2000,
                async ( result ) => {
                    const { data: passport } = result as QueryObserverResult<IPassportDto, unknown>
                    if (passport.status === IPassportStatusDto.ValidationSucceeded) {
                        await refetchUser()
                        showAlert("Паспорт добавлен", "success");
                        navigate("/dashboard")
                    }
                },
                ( error ) => {
                    StorageService.stopPooling()
                    showAlert("Не удалось валидировать паспортные данные, попробуйте позже", 'error')
                    console.error('WarningError checking passport status:', error)
                },
            )
            StorageService.clearRedirectUrl();
            localStorage.setItem('userLoggedIn', 'logIn'); // todo для логина во всех вкладках
            localStorage.removeItem('redirectID');
            // nav(url); // todo (после авторизации тинь редирект обратно)
        }
    })

    return { ...mutation, passportData: data }

}

