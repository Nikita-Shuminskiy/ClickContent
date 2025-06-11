import React from 'react';
import {Line} from "react-chartjs-2";
import {AnalyticsChartType} from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/utils.ts";

type IProps = {
    data: AnalyticsChartType
}
const ChartsAnalyticsHistory = ({data}: IProps) => {
    return (
        <Line
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom" as const,
                    },
                },
            }}
            data={{
                labels: data?.days,
                datasets: data?.datasets,
            }}
        />
    );
};

export default ChartsAnalyticsHistory;
