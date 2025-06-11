import {QueryObserverResult, useMutation} from '@tanstack/react-query';
import {MutationKey} from '@/core/api/api-types/mutation-key';
import {verifyPassportRim} from '@/core/api/endpoints/passport-api.ts';
import {executePooling} from "@/core/api/utils/execute-pooling.ts";
import {IPassportDto, IPassportStatusDto} from "@/data-contracts.ts";
import StorageService from "@/core/service/storage-service.ts";
import {useNavigate} from "react-router-dom";
import {useGetPassport} from "@/core/api/api-hooks/passport/use-get-passport.ts";
import {useAlert} from "@/contexts/AlertProvider/AlertProvider.tsx";
import {useGetUser} from '../ui/user/use-get-user';

const PROCESSED_PASSPORT_STATUSES = [IPassportStatusDto.ValidationSucceeded, IPassportStatusDto.ValidationFailed]

export const useVerifyRimPassport = (): any => {
    const {showAlert} = useAlert();
    const navigate = useNavigate()
    const {refetch: refetchUser} = useGetUser();
    const {data, refetch} = useGetPassport()

    const mutation = useMutation({
        mutationKey: [MutationKey.VERIFY_PASSPORT_RIM],
        mutationFn: verifyPassportRim,

        onSuccess: async () => {
            localStorage.removeItem("currentRedirectUrl");
            StorageService.setPoolingStarting()
            await executePooling(
                () => refetch(),
                result => PROCESSED_PASSPORT_STATUSES.includes((result as QueryObserverResult<IPassportDto, unknown>).data.status),
                2000,
                async (result) => {
                    const {data: passport} = result as QueryObserverResult<IPassportDto, unknown>
                    if (passport.status === IPassportStatusDto.ValidationSucceeded) {
                        await refetchUser()
                        showAlert("Паспорт добавлен", "success");
                        navigate("/dashboard")
                    }
                },
                (error) => {
                    StorageService.stopPooling()
                    showAlert("Не удалось валидировать паспортные данные, попробуйте позже", 'error')
                    console.error('WarningError checking passport status:', error)
                },
            )
        }

    })

    return {...mutation, passportData: data}
};


// check passport сделать в пулинге после верифай
// useVerifyRimPassport() вызываеся один раз и если у него статус created или onvalidation то вызываем в пулинге /passport и ждем его ответ, Если он success - то все ок и редирект в дашборд в если ошибка модлаку с ошибкой привязки паспорта
