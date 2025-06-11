import {useAlert} from "@/contexts/AlertProvider/AlertProvider.tsx";
import {memo} from "react";
import {Link} from "react-router-dom";
import FreezeWrapper from "@components/FreezeWrapper/FreezeWrapper.tsx";
import {useCreateReferralLink} from "@/core/api/api-hooks/referral/use-create-referral-link.ts";
import {Icon} from "@components/ui/icon/icon.tsx";

type LinksClicksProps = {
    scrollToTop: () => void;
    onClickLinkHover: (e, ui, from?: "Aim" | "Content") => void;
};
const LinksClicks = ({scrollToTop, onClickLinkHover}: LinksClicksProps) => {
    const {showAlert} = useAlert();
    const {data} = useCreateReferralLink();

    return (
        <div
            className='w-full p-10 justify-center rounded-[32px] flex flex-col gap-7 bg-[#141414] max-sm:p-8 max-xs:p-6'>
            <div
                className='flex z-0 gap-3 items-center justify-between max-xs:flex-col max-xs:items-start max-xs:gap-3'>
                <Link
                    onClick={scrollToTop}
                    to='/settings'
                    className='text-2xl font-bold max-sm:text-lg max-xs:text-base'
                >
                    Реферальная ссылка
                </Link>
                <FreezeWrapper>
                    <div
                        onClick={() => {
                            navigator.clipboard.writeText(data?.url);
                            showAlert("Ссылка скопирована", "success");
                        }}
                        className=' max-w-[370px] w-full justify-center items-center rounded-[32px] max-xs:w-full bg-[#202020] flex gap-[6px] px-4 py-[6px] pl-[18px] max-xs:py-2 cursor-pointer overflow-hidden max-sm:max-w-full line-clamp-1'
                    >
                        <button className='w-[24px] flex-shrink-0 h-[24px] opacity-30'>

                            <Icon name={'copyIcon'} className='w-full h-full object-cover'/>
                        </button>
                        <span
                            className='max-xs:max-w-[110px] max-sm:max-w-[200px] max-w-[inherit] text-center break-all text-2xl max-xs:text-sm overflow-hidden font-firstNeue text-[#bcbcbc] line-clamp-1'>
              {data?.url}
            </span>
                    </div>
                </FreezeWrapper>
            </div>
        </div>
    );
};

export default memo(LinksClicks);
