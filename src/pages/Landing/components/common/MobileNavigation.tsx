import React from "react";
import {
  ActivePageEnum,
  links,
} from "@/pages/Landing/components/constants.tsx";
import { Icon } from "@components/ui/icon/icon.tsx";

type IProps = {
  activePage: ActivePageEnum;
  onClick: (page: ActivePageEnum) => void;
};

const MobileNavigation = ({ activePage, onClick }: IProps) => {
  return (
    <div className="z-[999] fixed bottom-0 w-full bg-[#1A1A1A99] rounded-tr-[36px] rounded-tl-[36px] ">
      <div className=" flex gap-[6px] p-[6px]  ">
        {links.map((link, index) => (
          <div
            className={
              "flex flex-col gap-[10px] items-center justify-between w-full"
            }
            onClick={() => onClick(link.to)}
          >
            <Icon
              name={link.icon as any}
              className={`text-[#F8F8F8] font-bold w-[24px] h-[24px] ${
                activePage === link.to ? "opacity-100" : "opacity-30"
              } `}
            />
            <span
              key={index}
              className={`p-[4px] text-white transition flex items-center gap-[12px] cursor-pointer text-[14px] font-montserrat ${
                activePage === link.to ? "text-[#F8F8F8]" : ""
              }`}
            >
              {link.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
