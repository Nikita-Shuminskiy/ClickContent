import { IPassportDto, IUserDto, SuccessfulResponseDto } from '@/data-contracts'
import StorageService from "@/core/service/storage-service";
import OldStorageService from "@/core/service/old-storage-service.ts";
import { QueryObserverResult } from '@tanstack/react-query';

export const executePooling = async (
    pollingFunction: () => Promise<SuccessfulResponseDto> | Promise<QueryObserverResult<IPassportDto | IUserDto, unknown>>,
    successCondition: (result: SuccessfulResponseDto | QueryObserverResult<IPassportDto  | IUserDto, unknown>) => boolean,
    interval: number,
    onSuccess: (result: SuccessfulResponseDto | QueryObserverResult<IPassportDto  | IUserDto, unknown>) => void,
    onError: (error: any) => void,
) => {

    const poll = async () => {
        // TODO старая  платежка
        const pooling = StorageService.getPooling() /** Проверям pooling, и если его нет, то останавливаем вызовы */
            // TODO новая  платежка
        const oldPooling = OldStorageService.getPooling() /** Проверям pooling, и если его нет, то останавливаем вызовы */

        try {
            const result = await pollingFunction()
            if (successCondition(result) || !pooling || !oldPooling) {
                onSuccess(result)
            } else {
                setTimeout(poll, interval)
            }
        } catch (error) {
            onError(error)
        }
    }
    poll()
}
