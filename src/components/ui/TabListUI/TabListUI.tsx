import { Tab } from "@headlessui/react";

const TabListUI = ({ children }) => {
  return (
    <Tab.List className="w-full mb-4 max-xs:mb-2 p-[4px] text-base max-sm:text-xs flex items-center justify-between gap-3 border border-[#202020] rounded-xl">
      {children}
    </Tab.List>
  );
};

export default TabListUI;
