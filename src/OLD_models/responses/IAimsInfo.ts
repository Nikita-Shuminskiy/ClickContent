export interface IAimsInfo {
    id?: string;
    created?: Date;
    expires?: Date|string;
    amount: number;
    currentAmount?: number;
    recommendedPayment?: number;
    title?: string;
    description?: string;
    thanksText?: string;
    optionalContent?: string;
    showProgress: boolean;
    isExpired?: boolean;
}