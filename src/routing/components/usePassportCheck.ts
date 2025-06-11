import {useEffect} from "react";
import {IPassportStatusDto} from "@/data-contracts.ts";
import {useModal} from "@/contexts/ModalProvider/useModal.ts";
import {ModalKey} from "@/core/types/modal-key.ts";
import {useNavigate} from "react-router-dom";
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";

export const usePassportCheck = () => {
    const navigate = useNavigate();
    const {data: user, isLoading} = useGetUser();

    const {openModal: openCardModal} = useModal(ModalKey.ADD_CARD)

    useEffect(() => {
        if (!isLoading) {
            const passportVerified = user.passportType === IPassportStatusDto.ValidationSucceeded

            const isPassportRequired = user?.passportType === IPassportStatusDto.Created
                || user?.passportType === IPassportStatusDto.ValidationFailed || !user?.passportType

            if (!user.hasAnyContent) {
                navigate("/steps");
            } else if (isPassportRequired) {
                navigate("/passport");
            } else if (
                user.hasAnyContent &&
                passportVerified &&
                !user?.cards.length
            ) {
                openCardModal("warning");
            }
        }
    }, [isLoading]);
}
