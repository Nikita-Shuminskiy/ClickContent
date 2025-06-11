import {useCallback, useEffect, useState} from "react";
import {ModalKey} from "@/core/types/modal-key";
import {useModal} from "@/contexts/ModalProvider/useModal";
import {ModalUI} from "@/components/ui/ModalUI";
import {CurrentTime} from "@/pages/AddCardModal/components/CurrentTime.tsx";
import {useOldPayForQuickLink} from "@/core/api/api-hooks/finance/old-use-pay-for-quicklink.ts";
import {usePaymentStatusCheck} from "@/core/api/api-hooks/finance/use-payment-status-check.ts";
import {useNavigate} from "react-router-dom";
import {PaymentStatus} from "@/data-contracts.ts";

export const PayModal = () => {
    const navigate = useNavigate();
    const {mutateAsync: checkPaymentStatus} = usePaymentStatusCheck();
    const {mutateAsync: pay, data: dataPay} = useOldPayForQuickLink();
    const {isModalOpen, modalParams, closeModal} = useModal(ModalKey.PAY_WITH_CARD);

    const [isPolling, setIsPolling] = useState(false);

    const handleCloseModal = useCallback(() => {
        setIsPolling(false); // Останавливаем пуллинг при закрытии модалки
        closeModal();
    }, []);

    useEffect(() => {
        if (!modalParams) return;

        pay(modalParams).then(() => {
            setIsPolling(true);
        });
    }, [modalParams]);

    useEffect(() => {
        if (!isPolling || !dataPay?.paymentId) return;

        const pollingInterval = setInterval(async () => {
            try {
                const res = await checkPaymentStatus({paymentId: dataPay.paymentId});

                if (res.success === PaymentStatus.PayIn) {
                    navigate('/receipt');

                    handleCloseModal()
                } else if (res.success === PaymentStatus.PayInError) {
                    navigate(`/authorize?status=fail&error=нет инфо`);
                    handleCloseModal()
                }
            } catch (err) {
                navigate(`/authorize?status=fail&error=${err?.info?.error || "Неизвестная ошибка"}`);
                handleCloseModal()
            }
        }, 2000);

        return () => clearInterval(pollingInterval);
    }, [isPolling, dataPay?.paymentId]);

    return (
        <ModalUI isOpen={isModalOpen}
                 setOpen={handleCloseModal}>
            <div className="mb-8">
                <CurrentTime/>
            </div>
            {dataPay?.url && (
                <iframe
                    src={dataPay?.url}
                    style={{width: "100%", height: "600px"}}
                />
            )}
        </ModalUI>
    );
};
