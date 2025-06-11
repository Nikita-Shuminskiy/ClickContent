import { IPaymentInfo } from "@/data-contracts.ts"

export interface ISettings {
    minPayout: number;

    minDonate: number,
    maxDonate: number,

    minQuicklink: number,
    maxQuicklink: number
}

class StorageService {

    getSettings(): ISettings {
        return {minPayout: 500, minDonate: 39, maxDonate: 100000, minQuicklink: 39, maxQuicklink: 100000}
    }

    getLocation = (): string => localStorage.getItem("location")

    clearRedirectUrl = (): any => localStorage.removeItem("redirect")

    setCreateDonateLink = (date: string | Date): any =>
        localStorage.setItem("timeCreateDonate", JSON.stringify(date))
    getCreateDonateLink = () =>
        JSON.parse(localStorage.getItem("timeCreateDonate"))


    setPayments = (payment: IPaymentInfo): any => {
        let payments = JSON.parse(localStorage.getItem('payments'))
        if (!payments) payments = []
        payments.push(payment)
        localStorage.setItem('payments', JSON.stringify(payments))
    }

    updatePayments = (paymentId: number) => {
        const payments = JSON.parse(localStorage.getItem('payments')) ?? []
        const newPayments = payments.map((p: IPaymentInfo) => p.paymentId === paymentId ? {
            ...p,
            isActive: false
        } : p)
        localStorage.setItem('payments', JSON.stringify(newPayments))
    }

    removePayments = (paymentId: number) => {
        const payments = JSON.parse(localStorage.getItem('payments')) ?? []
        const newPayments = payments.filter((p: IPaymentInfo) => p.paymentId !== paymentId)
        localStorage.setItem('payments', JSON.stringify(newPayments))
    }


    getPayments(): IPaymentInfo[] {
        const _payments = localStorage.getItem("payments")
        return _payments ? JSON.parse(_payments) : undefined
    }

    setQuickLinkParams = (payment: IPaymentInfo) => {
        localStorage.setItem("ql_params", JSON.stringify(payment))
    }

    setPoolingStarting = (): void =>
        localStorage.setItem('pooling', 'true')

    stopPooling = () => localStorage.removeItem('pooling')
    getPooling = (): string => JSON.parse(localStorage.getItem('pooling'))
}

export default new StorageService()
