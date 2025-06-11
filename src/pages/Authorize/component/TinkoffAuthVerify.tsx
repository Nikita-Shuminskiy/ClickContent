import React, { useEffect, useState } from 'react';
import { useAuthByTinkoffVerify } from "@/core/api/api-hooks/auth/use-auth-by-tinkoff-verify.ts";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import WarningError from "@/pages/Authorize/component/WarningError.tsx";
import Loading from "@/pages/Authorize/component/Loading.tsx";
import { IPassportStatusDto } from "@/data-contracts.ts";


const PROCESSED_PASSPORT_STATUSES = [ IPassportStatusDto.Created, IPassportStatusDto.OnValidation ]


const TinkoffAuthVerify = ( { setIsInitLoading, setIsError, error } ) => {
    const { params } = useUpdateSearchParams();
    const [ errorText, setErrorText ] = useState('')

    const { mutateAsync: authTinkoff, passportData, isError } = useAuthByTinkoffVerify();
    const paramCode = params.get("code");

    const authTinkoffVerify = async () => {
        try {
            await authTinkoff({ id: localStorage.getItem("redirectID"), code: paramCode });
        } catch (error) {
            console.error("Auth Tinkoff WarningError:", error);
        } finally {
            setIsInitLoading(false)
            setIsError(false)
        }
    };

    useEffect(() => {
        authTinkoffVerify();
    }, []);

    useEffect(() => {
        if (passportData?.status === IPassportStatusDto.ValidationFailed) {
            setIsError(true)
            setErrorText('Не удалось валидировать паспортные данные, попробуйте позже')
        }
    }, [ passportData ]);

    if (PROCESSED_PASSPORT_STATUSES.includes(passportData?.status)) {
        return <Loading text='Проверка персональных данных...'/>
    }
    if (error || isError) return <WarningError text={ errorText }/>
};

export default TinkoffAuthVerify;
