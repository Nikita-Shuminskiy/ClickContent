import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaymentStatusCheck } from '@/core/api/api-hooks/finance/use-payment-status-check';
import StorageService from '@/core/service/storage-service';
import { PaymentStatus } from '@/data-contracts';

export const useQuickLinkRedirect = ( id: string ): boolean => {
    const navigate = useNavigate();
    const payments = StorageService.getPayments();
    const quickLinkPaid = payments?.find(p => p.id === id && p.paymentId);
    const { mutateAsync: checkPaymentStatus, isPending } = usePaymentStatusCheck();

    useEffect(() => {

        const checkAndRedirect = async () => {
            if (quickLinkPaid) {
                const result = await checkPaymentStatus({ paymentId: quickLinkPaid.paymentId });

                if (result.success === PaymentStatus.PayIn) {
                    StorageService.setQuickLinkParams({
                        type: "quicklink",
                        id,
                        paymentId: quickLinkPaid.paymentId
                    });
                    navigate("/receipt?hasQuicklink=true");
                }
            }
        };

        checkAndRedirect().finally();
    }, []);

    return isPending
};
