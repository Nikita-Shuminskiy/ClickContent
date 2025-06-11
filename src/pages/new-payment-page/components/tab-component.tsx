import { ChangeEvent, FunctionComponent, useCallback, useState } from "react";
import { Icon } from "@components/ui/icon/icon.tsx";
import { InputUI } from "@components/ui/InputUI";

interface IProps1 {
    buyerEmail: string
    setBuyerEmail: ( email: string) => void
    setActiveTab: ( tab: 'email' | 'telegram' ) => void
    activeTab: 'email' | 'telegram'
}

export const TabComponent: FunctionComponent<IProps1> = ( { buyerEmail, setBuyerEmail, setActiveTab, activeTab } ) => {

    const handleTabClick = ( tab: 'email' | 'telegram' ) => {
        setBuyerEmail('')
        setActiveTab(tab);
    };

    const onHandleChangeBuyerEmail = useCallback(( e: ChangeEvent<HTMLInputElement> ) => {
        setBuyerEmail(e.currentTarget.value)
    }, [ setBuyerEmail ])


    return (
        <div className="relative mb-[62px] max-sm:mb-[42px]">
          {/*  <div className="p-1 flex justify-between mb-3 relative rounded-[12px] border border-white/5 max-sm:mb-3">
                <button
                    className={ `box-border w-1/2 cursor-pointer rounded-[8px] px-[12px] py-[8px] text-[12px] leading-[14px] flex items-center justify-center gap-2  font-normal ${ activeTab === 'email' ? 'text-white bg-[#FFFFFF0D]' : 'text-white/30' }` }
                    onClick={ () => handleTabClick('email') }
                >
                    <Icon name='envelope' size={ 18 }/>
                    Почта
                </button>
                <button
                    className={ `box-border w-1/2 cursor-pointer rounded-[8px] px-[12px] py-[8px] text-[12px] leading-[14px] flex items-center justify-center gap-2  font-normal ${ activeTab === 'telegram' ? 'text-white bg-[#FFFFFF0D]' : 'text-white/30' }` }
                    onClick={ () => handleTabClick('telegram') }
                >
                    <Icon name='telegramOutlined' size={ 18 }/>
                    Telegram
                </button>
            </div>*/}
            <div
                className={ `w-full transition-opacity duration-300` }>
                <InputUI
                    value={ buyerEmail }
                    onChange={ onHandleChangeBuyerEmail }
                    placeholder={ activeTab === 'email' ? "Введите почту..." : 'Введите Телеграм (прим. @example)' }
                    label={ activeTab === 'email' ? "Введите почту..." : 'Введите Телеграм (прим. @example)' }
                    className="h-[65px] !pt-[32px]"
                    labelClassName='mobile:text-[14px] mobile:leading-[16px]'
                    startIcon={ activeTab === 'email' ?
                        <Icon name='envelope' size={ 24 } style={ { color: "#5F5F5F" } }/>
                        : <Icon name='telegramOutlined' size={ 24 } style={ { color: "#5F5F5F" } }/>
                    }
                />
            </div>
        </div>
    );
}
