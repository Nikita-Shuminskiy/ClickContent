import React from 'react';
import {motion} from "framer-motion";
import imgPlane from "@/pages/Landing/components/telegram.png";
import {ButtonUI} from "@components/ui/ButtonUI";

const TelegramWidget = () => {
    return (
        <div className="relative bg-[#00B6EC] z-50 rounded-[42px] p-[25px] h-[347px] mt-[37px] ">

            <div className="absolute bottom-[0%] left-[30px]">
                <motion.img
                    src={imgPlane}
                    alt=""
                    className="w-[66px]"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, -3, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>




            <div className="absolute bottom-[15%] right-[100px]">
                <motion.img
                    src={imgPlane}
                    alt=""
                    className="w-[66px] "
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 8, 0]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="flex flex-col items-start justify-center text-left h-full gap-[12px] ">
                <h2 className="text-[38px] font-PPNeueMachina text-left  font-bold text-white ">
                    ОТВЕТИМ В <br/> ТЕЛЕГРАМ
                </h2>
                <p className="text-[20px] font-firstNeue text-left text-white ">
                    Напиши нам напрямую в Телеграм.
                    <br/>
                    Там ответ придет быстрее
                </p>
                <ButtonUI
                    onClick={() => window.open('https://t.me/ClickContent_support', '_blank')}
                    className=" !text-right !w-[176px] !text-[#00B6EC] !bg-white !rounded-full  !px-[32px] !py-[18px] hover:!bg-white/90 transition-colors"
                >
                    Открыть ТГ
                </ButtonUI>
            </div>
        </div>
    );
};

export default TelegramWidget;
