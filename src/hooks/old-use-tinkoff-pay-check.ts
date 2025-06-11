import { usePaymentStatusCheck } from "@/core/api/api-hooks/finance/use-payment-status-check.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { PaymentStatus } from "@/data-contracts.ts";
import OldStorageService from "@/core/service/old-storage-service.ts";

export const useOldTinkoffPayCheck = ( setInitialLoading: ( value: boolean ) => void ) => {
    const { status } = useParams<{ status: string }>()

    const payment = OldStorageService.getQuickLinkParams()

    const { mutateAsync: paymentCheck } = usePaymentStatusCheck()
    const navigate = useNavigate()


    useEffect(() => {

        const checkAndRedirect = async () => {
            if (status === 'success') {
                if (payment.paymentId) {
                    const result = await paymentCheck({ paymentId: payment.paymentId });
                    if (result.success === PaymentStatus.PayIn) {
                        navigate("/receipt");
                    }
                }
            } else if (status === 'fail') {
                navigate("/authorize?status=fail&error=Нет%20информации")
            }
        }
        checkAndRedirect()
    }, [status]);
}
