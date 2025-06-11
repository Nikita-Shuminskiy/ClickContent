import { FunctionComponent, useState } from "react";
import { Icon } from "@components/ui/icon/icon.tsx";
import animated_bg from "@assets/images/all-img/payment-animated-bg.mp4";


export interface IProps {
    title?: string
    amount?: string
    description?: string
}

export const MainInfo: FunctionComponent<IProps> = ( { title, description, amount } ) => {
    const [ isTextExpanded, setIsTextExpanded ] = useState(false);


    const toggleText = () => {
        setIsTextExpanded(!isTextExpanded);
    };

    return (
        <div
            className='min-h-[211px]  rounded-[32px] relative  max-lg:min-h-[191px]  max-sm:rounded-none max-sm:mb-[36px]'>

            <div
                className='bg-gradient-to-b from-[#0E0E0E00] to-[#0E0E0E] absolute inset-0 z-10 max-sm:max-h-[290px]'/>

            <video autoPlay loop muted playsInline={ true }
                   className='absolute inset-0 w-full h-full object-cover  rounded-[32px_32px_0_0] z-0 max-sm:rounded-none  max-sm:max-h-[290px]'>
                <source src={ animated_bg } type='video/mp4'/>
            </video>


            <div
                className='relative h-full z-20 p-6 flex flex-col gap-3 max-sm:pt-[127px] max-sm:mb-8'>
                <div
                    className='text-white flex items-center gap-1.5 font-firstNeue leading-[30px] max-sm:leading-[23px]  max-xs:mb-[28px]  max-sm:mb-3'>
                    <Icon name='logoWithoutLetters'/>
                    ClickContent
                </div>
                <h2 className='font-firstNeueBold font-black text-[32px] leading-[41px] text-white max-lg:text-[24px] max-lg:leading-[31px] max-lg:mb-[11px]'>
                    Вы покупаете { title } за { amount } руб.
                </h2>
                <p className={ `font-firstNeue font-normal text-[14px] leading-[16px] text-white max-w-[400px] ${ !isTextExpanded ? 'truncated-text' : '' }` }
                   onClick={ toggleText }>
                    { description }
                </p>
            </div>
        </div>
    )
}
