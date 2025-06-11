import { memo } from 'react'
import { IQuickLinkDto } from '@/data-contracts'

type IProps = {
    quicklink?: IQuickLinkDto
}

export const QuickLinkInfo = memo(({ quicklink }: IProps) => {
    return (
        <div className="flex items-center justify-between max-xs:flex-col max-xs:items-start">
            <div className="flex flex-col gap-3 ">
                {quicklink?.user && (
                    <div>
            <span className="block text-white/60 text-sm">
              Владелец
            </span>
                        <span className="block text-base break-all">
                            {quicklink?.user.nickName ? (
                                `@${quicklink.user.nickName}`
                            ) : (
                                <>
                                    {quicklink.user?.firstName}
                                    {"\u00A0"}
                                    {quicklink.user?.surname}
                                </>
                            )}
                         </span>
                    </div>
                )}
                <div>
                    <span className="block text-white/60 text-sm">Описание</span>
                    <span className="block text-base break-all">{quicklink?.description}</span>
                </div>
            </div>
        </div>
    )
})
