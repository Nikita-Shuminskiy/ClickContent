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
const Navigation = ({ activePage, onClick }: IProps) => {
  return (
    <div className="z-40 fixed bottom-10">
      <div className="flex gap-[6px] p-[6px] bg-white/5 backdrop-blur-md rounded-full w-max">
        {links.map((link, index) => (
          <span
            key={index}
            onClick={() => onClick(link.to)}
            className={`px-[24px] py-[32px] rounded-full text-white transition flex items-center gap-[12px] cursor-pointer text-[14px] font-montserrat ${
              activePage === link.to
                ? "bg-[#F8F8F8] !text-[#141414]"
                : "bg-white/5"
            }`}
          >
            {link.name}
            {activePage !== link.to && (
              <Icon
                name={"arrowImg"}
                className={`text-[#F8F8F8] font-bold w-[16px] h-[16px]`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
