import {api} from "../api"
import {authInstance} from '@/core/api/config.ts'
import {IAuthBySms, IAuthBySmsVerify, IAuthByTinkoffDto, ISmsVerifyDto} from '@/data-contracts.ts'
import {ApiRequest} from "../types"


type AuthBySmsRequest = ApiRequest<'AUTH.AUTH_BY_SMS', void, IAuthBySms, void>
export const authBySms = async (data: IAuthBySms) => {
    return await api.post<AuthBySmsRequest>(
        authInstance,
        {
            url: 'auth/sms',
            body: data
        }
    )
}


type AuthBySmsVerifyRequest = ApiRequest<'AUTH.AUTH_BY_SMS_VERIFY', void, IAuthBySmsVerify, ISmsVerifyDto>
export const authBySmsVerify = async (data: IAuthBySmsVerify) => {
    const dataRes = await api.post<AuthBySmsVerifyRequest>(
        authInstance,
        {
            url: 'auth/sms/verify',
            body: data
        }
    )
    localStorage.setItem('token', dataRes.data.accessToken)
    localStorage.setItem('refresh', dataRes.data.refreshToken)
    return dataRes.data
}


type AuthByTinkoffRequest = ApiRequest<'AUTH.AUTH_BY_SMS_TINKOFF', void, { referralUserId?: string }, IAuthByTinkoffDto>
export const authByTinkoff = async (data: { referralUserId?: string }) => {
    return await api.post<AuthByTinkoffRequest>(
        authInstance,
        {
            url: 'auth/tinkoff',
            body: data
        }
    )
}


type AuthByTinkoffVerifyRequest = ApiRequest<'AUTH.AUTH_BY_SMS_TINKOFF_VERIFY', void, {
    id?: string,
    code: string
}, ISmsVerifyDto>
export const authByTinkoffVerify = async (data: { id?: string, code: string }) => {
    const dataRes = await api.post<AuthByTinkoffVerifyRequest>(
        authInstance,
        {
            url: 'auth/tinkoff/verify',
            body: data
        }
    )
    localStorage.setItem('token', dataRes.data.accessToken)
    localStorage.setItem('refresh', dataRes.data.refreshToken)
    return dataRes.data
}

export const updateRefreshToken = async (data: { accessToken: string, refreshToken: string }) => {
    return await api.post(
        authInstance,
        {
            url: 'auth/refresh',
            body: data
        }
    )
}

type AuthByTelegramVerifyRequest = ApiRequest<'AUTH.AUTH_BY_TELEGRAM_VERIFY', void, {
    codeVerifier?: string,
    code: string
}, ISmsVerifyDto>
export const authByTelegramVerify = async (data: { codeVerifier?: string, code: string }) => {
    const dataRes = await api.post<AuthByTelegramVerifyRequest>(
        authInstance,
        {
            url: `auth/telegram/check/${data.code}`,
            body: data
        }
    )
    localStorage.setItem('token', dataRes.data.accessToken)
    localStorage.setItem('refresh', dataRes.data.refreshToken)
    return dataRes.data
}

type AuthByTelegramRequest = ApiRequest<'AUTH.AUTH_BY_TELEGRAM', void, any, any>
export const authByTelegram = async (data: { referralId?: string }) => {
    const dataRes = await api.post<AuthByTelegramRequest>(
        authInstance,
        {
            url: 'auth/telegram',
            body: data
        }
    )
    return dataRes.data
}


type GetAvailableBySms = ApiRequest<'AUTH.AUTH_AVAILABLE_BY_SMS', void, any, any>

export const getAvailableBySms = async () => {
    const dataRes = await api.get<GetAvailableBySms>(
        authInstance,
        {
            url: 'auth/sms/available',
        }
    )
    return dataRes.data
}
