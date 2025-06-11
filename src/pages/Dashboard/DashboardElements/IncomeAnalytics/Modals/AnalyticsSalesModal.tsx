import React from 'react';
import {ModalUI} from "@components/ui/ModalUI";
import {useModal} from "@/contexts/ModalProvider/useModal.ts";
import {ModalKey} from "@/core/types/modal-key.ts";
import Header from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/Header.tsx";
import {PARAMS_KEYS} from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/constants.ts";
import ChartsAnalyticsHistory
    from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/Charts/ChartsAnalyticsHistory.tsx";

const AnalyticsSalesModal = ({incomeData}) => {
    const {
        closeModal,
        isModalOpen
    } = useModal(ModalKey.ANALYTICS_SALES)
    return (
        <ModalUI wrapperClassName={'!p-[20px]'} isOpen={isModalOpen} setOpen={closeModal}>
            <div className='w-full p-5 rounded-[32px] overflow-hidden bg-[#141414] max-sm:p-8 max-xs:p-6'>
                <Header keyParams={PARAMS_KEYS.salesPeriod} title={'Количество продаж и выплат'}
                        setIncomeModal={closeModal}/>
                <div className='w-full mb-5'>
                    {incomeData && (
                        <ChartsAnalyticsHistory data={incomeData}/>
                    )}
                </div>
            </div>
        </ModalUI>
    );
};

export default AnalyticsSalesModal;
