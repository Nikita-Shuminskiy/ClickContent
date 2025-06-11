import {
  IAnalyticsSalesDto,
  IGetAnalyticsFinanceDto,
} from "@/data-contracts.ts";

export type DataSetType = {
  label: string;
  data: number[];
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  tension: number;
};

export type AnalyticsChartType = {
  days: string[];
  datasets: DataSetType[];
};

export const getTransformAnalytics = (
  analyticsFinances: IGetAnalyticsFinanceDto[],
): AnalyticsChartType => {
  const days = analyticsFinances?.map((i) => i.date);
  const payouts = analyticsFinances?.map((i) => i.payouts / 100);
  const quicklinks = analyticsFinances?.map((i) => i.quicklinks / 100);

  const datasets = [
    {
      label: "Мои выплаты",
      data: payouts,
      borderColor: "#EEADFF",
      borderWidth: 3,
      backgroundColor: "#EEADFF",
      tension: 0.5,
    },
    {
      label: "Платный контент",
      data: quicklinks,
      borderColor: "#93ABFB",
      borderWidth: 3,
      backgroundColor: "#93ABFB",
      tension: 0.5,
    },
  ];
  return {
    days: days,
    datasets,
  };
};

export const getTransformSalesAnalytics = (
  analyticsSales: IAnalyticsSalesDto[],
) => {
  const days = analyticsSales?.map((i) => i.date);
  const payouts = analyticsSales?.map((i) => i.payouts);
  const quicklinks = analyticsSales?.map((i) => i.quicklinks);

  const datasets = [
    {
      label: "Мои выплаты",
      data: payouts,
      borderColor: "#EEADFF",
      borderWidth: 3,
      backgroundColor: "#EEADFF",
      tension: 0.5,
    },
    {
      label: "Мои продажи",
      data: quicklinks,
      borderColor: "#93ABFB",
      borderWidth: 3,
      backgroundColor: "#93ABFB",
      tension: 0.5,
    },
  ];
  return {
    days: days,
    datasets,
  };
};

export const doughnutIncomeByDaysOptions = {
  cutout: window.innerWidth <= 768 ? 50 : 115,
  onHover: (event, elements, chart: any) => {
    const cutoutValue = window.innerWidth <= 768 ? 50 : 115;
    if (window.innerWidth > 768) {
      if (elements.length && chart.options.cutout !== 80) {
        chart.options.cutout = 80;
        chart.update();
      } else if (!elements.length && chart.options.cutout !== cutoutValue) {
        chart.options.cutout = cutoutValue;
        chart.update();
      }
    }
  },
};
