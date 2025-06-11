import React from "react";
import { motion } from "framer-motion";
import imgPlane from "@/pages/Landing/components/telegram.png";
import { ButtonUI } from "@components/ui/ButtonUI";

const TelegramFastAccess = ({ payByTelegram, close }) => {
  return (
    <div className="relative bg-[#00B6EC] rounded-[42px] px-[25px] py-[30px] w-full mx-[20px] ">
      <motion.img
        src={imgPlane}
        alt=""
        className="absolute left-[-20px] top-[40%] w-[60px]"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={imgPlane}
        alt=""
        className="absolute left-[50%] top-[50%] w-[60px]"
        animate={{ y: [0, -22, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src={imgPlane}
        alt=""
        className="absolute top-[-10px] right-[50px] w-[48px]"
        animate={{ y: [0, -17, 20], rotate: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src={imgPlane}
        alt=""
        className="absolute bottom-[50px] left-[10%] w-[125px]"
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src={imgPlane}
        alt=""
        className="absolute bottom-[30%] right-[-30px] w-[125px]"
        animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex flex-col items-start justify-between h-full gap-[12px] text-white">
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-[32px] font-bold font-firstNeue ">
            Получи контент за 30 секунд
          </h2>
          <p className="text-[14px] font-firstNeue leading-snug">
            Перейди в Телеграм-бот “КликКонтент”, оплати указанную сумму и
            получи контент сразу в Телеграм
          </p>
        </div>
        <div className="flex flex-col items-center w-full justify-center gap-[20px]">
          <ButtonUI
            onClick={payByTelegram}
            className="z-[99] !w-full !mt-4 !text-[#00B6EC] !bg-white !rounded-full !px-[32px] !py-[18px] hover:!bg-white/90 transition-colors"
          >
            Перейти в Телеграм
          </ButtonUI>
          <span
            onClick={close}
            className=" text-[16px] text-center font-firstNeue cursor-pointer text-white "
          >
            Остаться на сайте
          </span>
        </div>
      </div>
    </div>
  );
};

export default TelegramFastAccess;
