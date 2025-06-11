import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { chartPlugins } from "@/plugins.ts";
import { doughnutIncomeByDaysOptions } from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/utils.ts";

const ChartIncome = ({
  data,
}: {
  data?: { payouts: number; quicklinks: number };
}) => {
  const hasData =
    data && [data?.payouts, data?.quicklinks].some((value) => value > 0);

  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: hasData
              ? [
                  parseFloat((data?.payouts / 100).toFixed(2)),
                  parseFloat((data?.quicklinks / 100).toFixed(2)),
                ]
              : [1],
            backgroundColor: hasData ? ["#EEADFF", "#93ABFB"] : ["#202020"],
            borderWidth: 0,
          },
        ],
      }}
      plugins={chartPlugins}
      options={{
        ...doughnutIncomeByDaysOptions,
        plugins: {
          tooltip: {
            enabled: !!hasData, //todo tултип включается только при наличии данных
          },
        },
      }}
    />
  );
};

export default ChartIncome;
