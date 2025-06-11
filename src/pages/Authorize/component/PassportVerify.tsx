import React, { useEffect, useState } from 'react';
import { useVerifyRimPassport } from "@/core/api/api-hooks/passport/use-passport-rim-verify.ts";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import WarningError from "@/pages/Authorize/component/WarningError.tsx";
import { IPassportStatusDto } from "@/data-contracts.ts";
import Loading from "@/pages/Authorize/component/Loading.tsx";


const PROCESSED_PASSPORT_STATUSES = [ IPassportStatusDto.Created, IPassportStatusDto.OnValidation ]


const PassportVerify = ( { setIsInitLoading, setIsError ,error } ) => {
    const { showAlert } = useAlert();
    const { params } = useUpdateSearchParams();

    const [ errorText, setErrorText ] = useState('')
    const { mutateAsync: verifyPassportRim, passportData } = useVerifyRimPassport();

    const paramId = params.get("id");

    const passportRimVerify = async () => {
        try {
            await verifyPassportRim({ id: paramId })
        } catch (err) {
            showAlert("Произошла ошибка", "error");
            setIsInitLoading(false);
            setIsError(true)
        }
    };

    useEffect(() => {
        passportRimVerify();
    }, []);

    useEffect(() => {
        if (passportData?.status === IPassportStatusDto.ValidationFailed) {
            setIsError(true)
            setErrorText('Не удалось валидировать паспортные данные, попробуйте позже')
        }
    }, [ passportData ]);

    if (PROCESSED_PASSPORT_STATUSES.includes(passportData?.status)) {
        return <Loading/>
    }

    if (error) return <WarningError text={ errorText }/>


};

export default PassportVerify;
