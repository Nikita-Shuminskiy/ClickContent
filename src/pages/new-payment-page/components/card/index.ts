import { FunctionComponent } from "react";

import { Root } from './root'
import { MainInfo, IProps as IMainInfoProps } from './main-info'
import { Actions, IProps as IActionsProps } from './actions'


type PageCompositionType = typeof Root & {
    MainInfo: FunctionComponent<IMainInfoProps>
    Actions: FunctionComponent<IActionsProps>
}

export const PaymentCard = Root as PageCompositionType

PaymentCard.MainInfo = MainInfo
PaymentCard.Actions = Actions