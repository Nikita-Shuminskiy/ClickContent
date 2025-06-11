import React from "react";
import { motion } from "framer-motion";
import { ButtonUI } from "@components/ui/ButtonUI";
import imgPlane from "./telegram.png";

interface ModalTelegramProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTelegram: React.FC<ModalTelegramProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
          onClick={onClose}
        />
      )}
      <motion.div
        className="fixed top-0 right-0 w-[650px] h-full bg-[#00B6EC] z-50 "
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute top-[5%] left-[-50px]">
            <motion.img
              src={imgPlane}
              alt=""
              className="w-[120px]"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="absolute top-[40%] right-[5px]">
            <motion.img
              src={imgPlane}
              alt=""
              className="w-[102px]"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="absolute bottom-[0%] left-[30px]">
            <motion.img
              src={imgPlane}
              alt=""
              className="w-[66px]"
              animate={{
                y: [0, -10, 0],
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="absolute bottom-[30%] right-[-30px]">
            <motion.img
              src={imgPlane}
              alt=""
              className="w-[66px] "
              animate={{
                y: [0, -25, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="absolute bottom-[15%] right-[20px]">
            <motion.img
              src={imgPlane}
              alt=""
              className="w-[66px] "
              animate={{
                y: [0, -25, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="flex flex-col items-end justify-center text-right  h-full gap-[12px] ">
            <h2 className="text-[38px] font-PPNeueMachina text-right  font-bold text-white ">
              ОТВЕТИМ В <br /> ТЕЛЕГРАМ
            </h2>
            <p className="text-[20px] font-firstNeue text-right text-white ">
              Напиши нам напрямую в Телеграм.
              <br />
              Там ответ придет быстрее
            </p>
            <ButtonUI
              onClick={() =>
                window.open("https://t.me/ClickContent_support", "_blank")
              }
              className=" !text-right !w-[146px] !text-[#00B6EC] !bg-white !rounded-full  !px-[32px] !py-[18px] hover:!bg-white/90 transition-colors"
            >
              Отправить
            </ButtonUI>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ModalTelegram;
