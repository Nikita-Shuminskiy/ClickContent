export enum PaymentStatus {
    NotFound = 'NotFound', // - транзакция не найдена
    Pending = 'Pending', // - транзакция в обработке
    PayIn = 'PayIn', //- успешно оплачено
    PayInError = 'PayInError', // - ошибка оплаты
    AddCard = 'AddCard', // - карта добавлена
    AddCardError = 'AddCardError', // - ошибка при добавлении карты
    Refund = 'Refund', // - деньги вернули
    PayOut = 'PayOut' // - выплата успешна
}

export type PaymentType = 'Card' | 'Sbp' | 'Tpay' | 'Other'

export interface IBaseDto {
    id: string
}

export interface IAddCardDto {
    url: string
    paymentId: number
}

export interface PaymentRequestDto {
    amount: number
}

export interface SuccessfulResponseDto {
    success: PaymentStatus
    extra: Extra
}


export interface IUserDto {
    id: string,
    accountType: string,
    passportType: IPassportStatusDto,
    commission: number,
    avatarLink: string,
    phoneNumber: number,
    nickName: string,
    avatar?: string,
    firstName: string
    hasAnyContent: boolean
    middleName: string
    surname: string
    balance: IBalanceDto,
    cards: ICardDto[]
    total: number,
    referral: IReferralBalanceDto[]
}

export enum IPassportStatusDto {
    Created,
    OnValidation,
    ValidationSucceeded,
    ValidationFailed
}

export interface ICardDto {
    id: string,
    pan: string,
    expDate: string,
    payout: number,
    operations: number
}

export interface IUserLimitDto {
    total: number,
    limit: number
}

export interface IUploadFileDto {
    id: string
    oldFileName: string
    link: string
}

export interface IReferralBalanceDto {
    dealId: number,
    balance: number
}

export interface IBalanceDto {
    total: number,
    referral: IReferralBalanceDto[]
}

export interface IAuthByTinkoffDto {
    id: string
    url: string
}

export interface ISmsVerifyDto {
    accessToken: string
    refreshToken: string
}

export interface IQuickLinkDto {
    id: string;
    resellQuicklinkId: string | null;
    amount: number;
    title: string;
    description: string;
    created: string;
    thanksText: string;
    recommendedPayment: number;
    allowResell: boolean;
    size: number;
    content: IContentItemDto[];
    contentExt: IExtendedContentItemDto[];
    isParentLinkDeleted: boolean;
    isParentLinkResellAllows: boolean;
    payInTransactions: any[];
    contentCount: number
    user: any;
    errorText: string;
    salesAvailable: boolean;
}

export interface ICreateQuickLinkDto extends IQuickLinkDto {
    user: {
        id: string
        nickName: string
        firstName: string
        surname: string
        middleName: string
        avatar: string
        avatarLink: string
    }
}


interface IContentItemDto {
    id: string;
    name: string;
    extension: string | null;
}

export interface IExtendedContentItemDto extends IContentItemDto {
    link: string;
}

export interface AddPassportRimDto {
    id: string
    url: string
}

export interface IAuthBySms {
    phone: number
    referralUserId?: string
}

export interface IAuthBySmsVerify {
    code: string
    phone: number
}

export interface IContent {
    id: string
    name: string
    extension: string
}

export interface IAddFeedback {
    contact: string
    name: string
    text: string
    type: string
}

export interface ICreateQuickLink {
    amount: number
    title: string
    description: string
    thanksText: string
    recommendedPayment: number
    allowResell: boolean
    size: number
    content: IContent[]
}

export interface IEditQuickLink extends IBaseDto {
    amount: number
    title: string
    description: string
    thanksText: string
    recommendedPayment: number
    allowResell: boolean
    size: number
    content: IContent[]
}

export interface IPassportDto {
    photo: string | null;
    email: string | null;
    id: string;
    status?: number;
    validatedDate: string;

    firstName: string;
    middleName: string;
    surname: string;
    dateOfBirth: string;
    series: string;
    number: string;
    dateOfIssue: string;
    issuedBy: string;
    policeDepartmentCode: string;
    registrationAddress: string;
    phone: number;
    sex: 'male' | 'female';
    placeOfBirth: string;
}

export interface IPayoutsDto {
    date: string
    payOut: number
    extra: Extra | null
    payload: string
}

export interface IIncomingPaymentDto {
    payInTransactionId: string
    paymentId: number
    user: {
        id: string
    }
    price: number
    created: string
    quicklinkId: string
    extra: Extra
    commission: number
    paycheckUrl: string
    paymentType: PaymentType
    title: string
}

export interface IGetAnalyticsFinanceDto {
    date: string
    userId: number
    quicklinks: number
    payouts: number
}

export interface IBlogDto {
    file: string;
    id: string;
    title: string;
    description: string;
    readingTime: string;
    views: number;
    date: string;
    content?: string;
    fullMetaData: {
        id: string
        metaTitle: string
        metaDescription: string
        metaKeyWords: string[];
        metaOgTitle: string
        metaOgDescription: string
        metaOgImage: string
    };
}

export interface ILimitsByCardsDto {
    maxWithdrawOnceAmountPerCard: number
    maxWithdrawAmountPerCard: number
    maxWithdrawOperationsPerCard: number
    maxNewSellerBalance: number
    minPayoutPenalty: number
    maxPenalties: number
}

export interface ICanWithdrawDto {
    "can": boolean,
    "awaitingOperations": number,
    "maxWaitTime": string
}

export interface WithDrawRequest {
    cardId: string
    amount: number
}

export interface Extra {
    email: string
    isGift?: boolean
    telegram?: string | null
}

export interface QuickLinkRequest {
    quicklinkId: string
    byQr?: boolean
    extra: Extra
}

export interface AddPassportRimRequest {
    phone: number,
    referralUserId?: string
}


export interface IPaymentInfo {
    id: string;
    nickname?: string;
    donatorComment?: string;
    type: string;
    aimId?: string;
    amount?: number;
    date?: Date;
    email?: string;
    isGift?: boolean;
    isSendEmail?: boolean;
    paymentId?: number;
    isActive?: boolean
}

export interface IGetAnalyticsIncomeDto {
    quicklinks: number;
    payouts: number;
    days: string[]
}

export interface IAnalyticsSalesDto {
    date: string;
    userId: string
    quicklinks: number
    payouts: number
}
