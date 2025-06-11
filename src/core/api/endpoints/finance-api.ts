import { api } from '@/core/api/api.ts'
import { ApiRequest } from '@/core/api/types.ts'
import {
    IAddCardDto, ICanWithdrawDto, ILimitsByCardsDto,
    PaymentRequestDto,
    QuickLinkRequest,
    SuccessfulResponseDto,
    WithDrawRequest
} from '@/data-contracts.ts'
import { paymentInstance } from '@/core/api/config.ts'


type AddCardRequest = ApiRequest<'FINANCE.ADD_CARD', void, void, IAddCardDto>

export const addCard = async (): Promise<IAddCardDto> => {

    const response = await api.post<AddCardRequest>(
        paymentInstance,
        {
            url: 'card/add',
            headers: {'Media-Type': 'text/plain'}
        })

    return response.data
}

type PayForQuickLinkRequest = ApiRequest<'FINANCE.PAY_FOR_QUICK_LINK', void, QuickLinkRequest, IAddCardDto>

export const payForQuickLink = async (
    data: QuickLinkRequest
): Promise<IAddCardDto> => {
    const response = await api.post<PayForQuickLinkRequest>(
        paymentInstance,
        {
            url: 'pay',
            body:data,
        })

    return response.data
}

type PaymentStatusCheckRequest = ApiRequest<'FINANCE.PAYMENT_STATUS_CHECK', void, {
    paymentId: number
}, SuccessfulResponseDto>

export const paymentStatusCheck = async ({
                                             paymentId, signal
                                         }: {
                                             paymentId: number,
                                             signal?: AbortSignal
                                         }
): Promise<SuccessfulResponseDto> => {
    const response = await api.post<PaymentStatusCheckRequest>(
        paymentInstance,
        {
            url: 'pay/check',
            body: {paymentId},
            signal
        })

    return response.data
}

type GetPaymentRequestRequest = ApiRequest<'FINANCE.PAYMENT_STATUS_CHECK', void,
    WithDrawRequest, PaymentRequestDto>


export const getPaymentRequest = async (
    data: WithDrawRequest
): Promise<PaymentRequestDto> => {

    const response = await api.post<GetPaymentRequestRequest>(
        paymentInstance,
        {
            url: 'withdraw',
            body: data
        })

    return response.data
}


type UnlinkPaymentCardRequest = ApiRequest<
    'FINANCE.UNLINK_PAYMENT_CARD',
    { id: string },
    void,
    void
>


export const unlinkPaymentCard = async (
    id: string
): Promise<void> => {
    await api.delete<UnlinkPaymentCardRequest>(
        paymentInstance,
        {
            url: 'card/:id',
            urlVariables: {id}
        })
}

type GetLimitsByCardsRequest = ApiRequest<'FINANCE.GET_LIMITS_BY_CARDS', void, void, ILimitsByCardsDto>

export const getLimitsByCards = async (): Promise<ILimitsByCardsDto> => {
    const response = await api.get<GetLimitsByCardsRequest>(
        paymentInstance,
        {
            url: 'limits',

        })

    return response.data
}


type GetCanWithdrawRequest = ApiRequest<'FINANCE.GET_CAN_WITHDRAW', void, void, ICanWithdrawDto>

export const getCanWithdraw = async (): Promise<ICanWithdrawDto> => {
    const response = await api.get<GetCanWithdrawRequest>(
        paymentInstance,
        {
            url: 'withdraw',

        })

    return response.data
}

