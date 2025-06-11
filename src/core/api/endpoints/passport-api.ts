import {ApiRequest} from "@/core/api/types.ts";
import {api} from "@/core/api/api.ts";
import {authInstance} from "@/core/api/config.ts";
import {AddPassportRimDto, AddPassportRimRequest, IPassportDto} from "@/data-contracts.ts";


type CreatePassportRequest = ApiRequest<'PASSPORT.CREATE', any, any, IPassportDto>
export const createPassport = async (data: any) => {
    const response = await api.post<CreatePassportRequest>(
        authInstance,
        {
            url: 'passport/create',
            body: data
        })
    return response.data
}
type ValidationPassportRequest = ApiRequest<'PASSPORT.VALIDATE', any, any, null>
export const validationPassport = async ({id}) => {
    const response = await api.post<ValidationPassportRequest>(
        authInstance,
        {
            url: `passport/${id}/validate`
        })
    return response.data
}

type EditPassportRequest = ApiRequest<'PASSPORT.EDIT', any, AddPassportRimRequest, null>
export const editPassport = async (payload: {data:AddPassportRimRequest, id:string}) => {
    const response = await api.put<EditPassportRequest>(
        authInstance,
        {
            url: `passport/${payload.id}`,
            body: payload.data,
        })
    return response.data
}

type GetPassportRequest = ApiRequest<'PASSPORT.GET', any, null, IPassportDto>
export const getPassport = async () => {
    const response = await api.get<GetPassportRequest>(
        authInstance,
        {
            url: `passport`,
        })
    return response.data
}

type CreatePassportRimRequest = ApiRequest<'PASSPORT.CREATE_RIM', any, AddPassportRimRequest, AddPassportRimDto>
export const createPassportRim = async (data: AddPassportRimRequest) => {
    const response = await api.post<CreatePassportRimRequest>(
        authInstance,
        {
            url: 'auth/rim',
            body: data
        })
    return response.data
}


type VerifyPassportRimRequest = ApiRequest<'PASSPORT.RIM_VERIFY', any, {id: string}, AddPassportRimDto>
export const verifyPassportRim = async (data: {id: string}) => {
    const response = await api.post<VerifyPassportRimRequest>(
        authInstance,
        {
            url: 'auth/rim/verify',
            body: data
        })
    return response.data
}

