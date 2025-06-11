import { FunctionComponent, memo, useMemo } from "react"
import { useGetUser } from '@/core/api/api-hooks/ui/user/use-get-user'
import { formatCard } from "@/helpers/cardFormatters"

export const BalanceDetails: FunctionComponent = memo(() => {

    const { data: user } = useGetUser()

    const isVerifiedUser = user?.accountType === 'Influencer' || user?.accountType === 'PassportVerified'


    const hasSufficientBalance = user.balance?.total >= 100000

    const hasCards = user.cards.length > 0

    return (
        <p className="text-base text-white/50 max-w-[340px] max-xs:leading-4">
            {!isVerifiedUser && <span className="max-xs:text-[10px]">Пройдите верификацию персональных данных</span>}
            {user.balance && hasSufficientBalance && isVerifiedUser && hasCards && (
                <>
                    Выберите существующую карту или добавьте новую  для зачисления денежных средств
                </>
            )}
            {user.balance && hasSufficientBalance && isVerifiedUser && !hasCards && <>Привяжите карту, чтобы вывести
                деньги</>}
            {user.balance && !hasSufficientBalance && isVerifiedUser && (
                <span className="max-xs:text-[10px]">Вывод средств возможен при наличии на балансе более 1000 ₽</span>
            )}
        </p>
    )
})

