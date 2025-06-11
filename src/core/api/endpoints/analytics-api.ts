import {ApiRequest} from "@/core/api/types.ts"
import {api} from "@/core/api/api.ts"
import {uiInstance} from "@/core/api/config.ts"
import {
    IAnalyticsSalesDto,
    IGetAnalyticsFinanceDto,
    IGetAnalyticsIncomeDto,
    IIncomingPaymentDto,
    IPayoutsDto
} from "@/data-contracts.ts"

type GetIncomeRequest = ApiRequest<
    'ANALYTICS.GET_INCOME',
    { period: string },
    void,
    IGetAnalyticsIncomeDto
>

export const getIncome = async (payload: { period: string }) => {
    const response = await api.get<GetIncomeRequest>(
        uiInstance, {
            url: 'dashboard/payment/purchase/finances/sum',
            urlParams: payload
        })

    return response.data
}

type GetSalesRequest = ApiRequest<
    'ANALYTICS.GET_SALES',
    { period: string },
    void,
    IAnalyticsSalesDto[]
>

export const getSales = async (payload: { period: string }) => {
    const response = await api.get<GetSalesRequest>(
        uiInstance, {
            url: 'dashboard/payment/purchase/finances/count',
            urlParams: payload
        })

    return response.data
}


type GetFinanceRequest = ApiRequest<
    'ANALYTICS.GET_FINANCE',
    { period: string },
    void,
    IGetAnalyticsFinanceDto[]
>

export const getFinance = async (payload: { period: string }) => {
    const response = await api.get<GetFinanceRequest>(
        uiInstance, {
            url: 'dashboard/payment/purchase/finances',
            urlParams: payload
        })

    return response.data
}

type GetIncomingPaymentsRequest = ApiRequest<'ANALYTICS.GET_INCOMING', {
    from: string | null,
    to: string | null
}, void, IIncomingPaymentDto[]>

export const getIncomingPayments = async (
    from: string | null,
    to: string | null
): Promise<IIncomingPaymentDto[]> => {
    const response = await api.get<GetIncomingPaymentsRequest>(
        uiInstance, {
            url: 'dashboard/payment/purchase/finances/incoming',
            urlParams: {from, to}
        })

    return response.data
}

type GetPayoutsRequest = ApiRequest<'ANALYTICS.GET_PAYOUTS', {
    from: string | null,
    to: string | null
}, void, IPayoutsDto[]>

export const getPayouts = async (
    from: string | null,
    to: string | null
): Promise<IPayoutsDto[]> => {
    const response = await api.get<GetPayoutsRequest>(
        uiInstance, {
            url: 'dashboard/payment/purchase/finances/payouts',
            urlParams: { from, to }
        })

    return response.data
}


type GetIncomingPaymentsSearchRequest = ApiRequest<'ANALYTICS.GET_INCOMING_SEARCH', { id: string }, void, any[]>

export const getIncomingSearchPayments = async (
    id: string,
): Promise<any[]> => {
    const response = await api.get<GetIncomingPaymentsSearchRequest>(
        uiInstance,
        {
            url: `dashboard/payment/purchase/finances/incoming/id?paymentId=${id}`,
        })
    return response.data
}
