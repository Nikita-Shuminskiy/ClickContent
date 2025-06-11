import { classNames } from "@/helpers/CssClasses.ts";
import { Tab } from "@headlessui/react";

const TabButtonUI = ({ text }) => {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          selected
            ? "bg-[#202020] text-white"
            : "bg-inherit text-[#5a5a5a] hover:text-[#6a6a6a]",
          "w-1/2 h-full text-center p-2 truncate focus:outline-none rounded-lg",
        )
      }
    >
      {text}
    </Tab>
  );
};

export default TabButtonUI;
