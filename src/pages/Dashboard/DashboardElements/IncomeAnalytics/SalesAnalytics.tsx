import React, { memo } from "react";
import { useGetFinanceHistory } from "@/core/api/api-hooks/ui/analytics/use-get-finance-history.ts";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import { PARAMS_KEYS } from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/constants.ts";
import {
  getTransformAnalytics,
  getTransformSalesAnalytics,
} from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/utils.ts";
import Header from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/Header.tsx";
import ChartsAnalyticsHistory from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/Charts/ChartsAnalyticsHistory.tsx";
import AnalyticsHistoryModal from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/Modals/AnalyticsHistoryModal.tsx";
import AnalyticsSalesModal from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/Modals/AnalyticsSalesModal.tsx";
import { useGetSales } from "@/core/api/api-hooks/ui/analytics/use-get-sales.ts";

const SalesAnalytics = () => {
  const { params } = useUpdateSearchParams();
  const { data: salesData } = useGetSales({
    period: params.get(PARAMS_KEYS.salesPeriod) ?? "month",
  });
  const { data: analyticsHistory } = useGetFinanceHistory({
    period: params.get(PARAMS_KEYS.financePeriod) ?? "month",
  });

  const { openModal: setIsOpenAnalyticsHistoryModal } = useModal(
    ModalKey.ANALYTICS_HISTORY,
  );
  const { openModal: setIsOpenIncomeModal } = useModal(
    ModalKey.ANALYTICS_SALES,
  );

  const datasetsAnalyticsHistory = getTransformAnalytics(analyticsHistory);

  const datasetsSales = getTransformSalesAnalytics(salesData);

  return (
    <>
      <div className="w-[40%] grid gap-4 max-md:w-full">
        <div className="w-full p-10 rounded-[32px] overflow-hidden bg-[#141414] max-sm:p-8 max-xs:p-6">
          <Header
            keyParams={"salesPeriod"}
            title={"Количество продаж и выплат"}
            setIncomeModal={setIsOpenIncomeModal}
          />
          <div className="w-full mb-5 h-full items-center flex justify-center">
            {datasetsSales ? (
              <ChartsAnalyticsHistory data={datasetsSales} />
            ) : (
              <p className={"text-base text-white/50"}>Ничего не найдено</p>
            )}
          </div>
        </div>
        <div className="w-full p-10 rounded-[32px] overflow-hidden bg-[#141414] max-sm:p-8 max-xs:p-6 min-h-[300px]">
          <Header
            keyParams={"financePeriod"}
            title={"Аналитика доходов"}
            setIncomeModal={setIsOpenAnalyticsHistoryModal}
          />
          <div className="w-full mb-5 h-full items-center flex justify-center">
            {datasetsAnalyticsHistory ? (
              <ChartsAnalyticsHistory data={datasetsAnalyticsHistory} />
            ) : (
              <p className={"text-base text-white/50"}>Ничего не найдено</p>
            )}
          </div>
        </div>
      </div>
      <AnalyticsHistoryModal analyticsHistory={datasetsAnalyticsHistory} />
      <AnalyticsSalesModal incomeData={datasetsSales} />
    </>
  );
};

export default memo(SalesAnalytics);
