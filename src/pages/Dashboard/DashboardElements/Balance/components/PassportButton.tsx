import { FunctionComponent, memo } from 'react'
import { useGetUser } from '@/core/api/api-hooks/ui/user/use-get-user'
import { ButtonUI } from '@components/ui/ButtonUI'
import { useNavigate } from "react-router-dom";
import { IPassportStatusDto } from "@/data-contracts.ts";
import { useCreateRimPassport } from "@/core/api/api-hooks/passport/use-add-passport-rim.ts";
import { useUserInfoContext } from "@/contexts/UserProvider.tsx";

export const PassportButton: FunctionComponent = memo(() => {
    const navigate = useNavigate()
    const { data: user } = useGetUser()
    const { mutate, isPending } = useCreateRimPassport()

    const { isNotPassport, isNotCardsAndPassport } =
        useUserInfoContext()

    // const isPassportRequired = user?.passportType === IPassportStatusDto.Created
    //     || user?.passportType === IPassportStatusDto.ValidationFailed || !user?.passportType

    if (!isNotCardsAndPassport || !isNotPassport) {
        return null
    }

    const onAddPassportRim = () => {
        mutate({ phone: user?.phoneNumber })
    }
    // const onAddPassport = () => {
    //     navigate("/passport?warningModal=false")
    // }

    return (
        <ButtonUI className={ 'font-["TTFirsNeue"] py-[20px] !text-[16px]' }
                  onClick={ onAddPassportRim }
                  disabled={ isPending }
        >
            Верифицировать аккаунт
        </ButtonUI>
    )
})
