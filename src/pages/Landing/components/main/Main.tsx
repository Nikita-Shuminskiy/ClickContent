import React from "react";

import crownImg from "@assets/images/all-img/landing/crown.gif";
import InfoBlock from "@/pages/Landing/components/main/InfoBlock.tsx";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

type IProps = {};

const Main = ({}: IProps) => {
  const { isMobile, width } = useWindowWidth();
  return (
    <>
      <div className="pt-[68px] max-sm:pt-[40px] min-h-screen">
        {width <= 1024 ? (
          <div className="uppercase text-[46px] font-black font-PPNeueMachina  text-white ">
            <p className={"leading-[1.7]"}>
              <div className={"text-right"}>
                <span className={" relative max-sm:pr-[10px]"}>
                  <img
                    className={
                      " z-[2] absolute w-[59px] h-[59px]  bottom-[30px] left-[-10%] rotate-[-33deg]"
                    }
                    src={crownImg}
                    alt="iphone image"
                  />
                  Быстрые и
                </span>
                <br />
                <div className={"flex items-end justify-center "}>
                  Безопасные
                  <br />
                </div>
              </div>
              <span
                className={`max-sm:text-[46px] bg-[#874AB0] mr-[18px] rounded-tr-[100px] rounded-br-[100px] px-[30px] pb-[10px] max-xl:pt-[15px] text-white`}
              >
                платежи
              </span>
              <br />
            </p>

            <div className={"flex items-end justify-end "}>
              <span className="max-sm:text-[46px] text-right bg-[#874AB0] rounded-tl-[100px] rounded-bl-[100px]  px-[30px]  pb-[10px] pt-[37px]  max-xl:pt-[15px]  text-white">
                здесь
              </span>
            </div>
          </div>
        ) : (
          <div className=" text-white">
            <p className={""}>
              <div className={"flex flex-row gap-[10px] justify-between"}>
                <div
                  className={
                    "flex flex-row gap-[10px] font-black font-PPNeueMachina "
                  }
                >
                  <span
                    className={
                      "uppercase text-[120px] max-3xl:text-[90px] z-[20]   max-xl:text-[67px]"
                    }
                  >
                    Быстрые
                  </span>
                  <span className={"block relative"}>
                    <span
                      className={
                        "uppercase text-[120px] max-3xl:text-[90px]   max-xl:text-[67px]"
                      }
                    >
                      и
                    </span>
                    <img
                      className={
                        "object-contain  w-[129px] z-[20] h-[129px]  absolute left-[50%]  max-3xl:bottom-[50px]   max-xl:bottom-[25px] bottom-[90px]  rotate-[33deg]"
                      }
                      src={crownImg}
                      alt="iphone image"
                    />
                  </span>
                </div>

                <span
                  className={
                    "block relative right-[5%] font-montserrat text-[18px]  text-right z-[20] text-[#F8F8F8] opacity-80 font-light "
                  }
                >
                  Международная площадка для оплаты и приема <br /> платежей,
                  без лимитов и ограничений
                </span>
              </div>

              <span
                className={
                  "uppercase text-[120px] max-3xl:text-[90px] font-black font-PPNeueMachina    max-xl:text-[67px]"
                }
              >
                Безопасные
              </span>
              {isMobile && <br />}
              <span
                className={`max-sm:text-[48px] font-black font-PPNeueMachina   bg-[#874AB0] ml-[18px] mr-[18px] rounded-tl-[100px] rounded-bl-[100px] px-[30px] pb-[10px] pt-[37px] max-xl:pt-[15px] text-white uppercase text-[120px] max-3xl:text-[90px] z-[999] relative   max-xl:text-[67px]`}
              >
                платежи
              </span>
              <br />

              <div className={"flex flex-row gap-[15px] items-center"}>
                <span className="max-sm:text-[48px] font-black font-PPNeueMachina  bg-[#874AB0] rounded-tr-[100px] rounded-br-[100px]  px-[30px]  pb-[10px] pt-[37px]  max-xl:pt-[15px] uppercase text-[120px] max-3xl:text-[90px]   max-xl:text-[67px]  text-white">
                  здесь
                </span>
                <span
                  className={
                    " font-montserrat text-[18px]  text-right z-[20] text-[#F8F8F8] opacity-80 "
                  }
                >
                  Продавай любые форматы контента, принимай <br /> платежи со
                  всего мира и управляй через сайт или <br /> Telegram.
                </span>
              </div>
            </p>
          </div>
        )}
        <InfoBlock />
      </div>
      <Icon
        name={"backMainImg"}
        className={
          "w-[635px] h-[463px]  max-xl:w-[532px] max-md:h-[189px] max-xl:h-[389px] z-10 absolute bottom-0 max-xl:right-[5%] right-[12%] max-sm:hidden"
        }
      />
    </>
  );
};

export default Main;
