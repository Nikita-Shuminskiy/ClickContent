import React from 'react';
import {InputUI} from "@components/ui/InputUI";
import {ButtonUI} from "@components/ui/ButtonUI";
import {useUpdateSearchParams} from "@/hooks/useUpdateSearchParams.ts";

const Login = ({telegramAuthVerify, isLoading}) => {
    const {params, updateParams} = useUpdateSearchParams();
    const telegramValue = params.get("value");
    return (
        <div>
             <span className={'block max-sm:text-2xl text-3xl font-bold text-center mb-4 max-md:text-5xl'}>
                Мы отправили вам код подтверждения в телеграм
             </span>
            <div className={'flex items-center w-full flex-col gap-[10px]'}>

                <div className={'max-w-[400px] w-full'}>
                    <InputUI
                        value={telegramValue}
                        onChange={(e) => {
                            updateParams({value: e.currentTarget.value})
                        }}
                        label={'Введите код из телеграм'}
                        placeholder={'Введите код из телеграм'}
                    />
                </div>

                <ButtonUI
                    className={'max-w-[240px]'}
                    disabled={isLoading}
                    isLoading={isLoading}
                    onClick={telegramAuthVerify}
                >
                    Отправить
                </ButtonUI>
            </div>
        </div>
    );
};

export default Login;
