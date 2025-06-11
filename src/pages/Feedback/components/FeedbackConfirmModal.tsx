import {useNavigate} from "react-router-dom";
import {ModalUI} from "@components/ui/ModalUI";
import {ButtonUI} from "@components/ui/ButtonUI";
import {Icon} from "@components/ui/icon/icon.tsx";
import React from "react";

const FeedbackConfirmModal = ({
                                  isOpen,
                                  setOpen,
                                  isSuccess,
                              }: {
    isOpen?: boolean;
    setOpen?: any;
    isSuccess?: boolean;
}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (isSuccess) {
            sessionStorage.removeItem("formFeedback");
            navigate(-1);
        } else {
            window.location.reload();
        }
    };

    return (
        <ModalUI
            isOpen={isOpen}
            setOpen={() => {
                if (isOpen) {
                    navigate(-1);
                }
            }}
            maxWidth={800}
        >
            <div className="max-w-[500px] mx-auto">
                <div className="w-14 h-14 mb-8 mx-auto">
                    <Icon name={isSuccess ? 'applyIcon' : 'closeIcon'} className="w-full h-full object-contain"/>
                </div>
                <h3 className="block text-[44px] font-bold text-center mb-4 max-sm:text-3xl max-xs:text-2xl">
                    {isSuccess ? " Запрос отправлен" : "Запрос не отправлен"}
                </h3>
                <p className="max-w-[500px] mx-auto text-2xl text-center mb-8 max-sm:text-lg">
                    {isSuccess ? "Вам ответят в ближайшее время" : "Произошла ошибка"}
                </p>
                <ButtonUI onClick={handleButtonClick}>
                    {isSuccess ? "Хорошо" : "Попробовать снова"}
                </ButtonUI>
            </div>
        </ModalUI>
    );
};

export default FeedbackConfirmModal;
