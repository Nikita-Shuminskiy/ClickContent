import About from "@/pages/Landing/components/About.tsx";
import React, { useState } from "react";
import { ActivePageEnum } from "@/pages/Landing/components/constants.tsx";
import Main from "@/pages/Landing/components/main/Main.tsx";
import Navigation from "@/pages/Landing/components/common/Navigation.tsx";
import Contacts from "@/pages/Landing/components/Contacts.tsx";
import UseFul from "@/pages/Landing/components/UseFul.tsx";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import MobileNavigation from "@/pages/Landing/components/common/MobileNavigation.tsx";

const LandingPage: React.FC = () => {
  const { isMobile } = useWindowWidth();
  const [activePage, setActivePage] = useState<ActivePageEnum>(
    ActivePageEnum.MAIN,
  );
  const renderItem = () => {
    switch (activePage) {
      case ActivePageEnum.MAIN:
        return <Main />;
      case ActivePageEnum.ABOUT:
        return <About />;
      case ActivePageEnum.USEFUL:
        return <UseFul />;
      case ActivePageEnum.CONTACTS:
        return <Contacts />;
    }
  };
  return (
    <div className="container flex flex-col justify-between max-sm:!p-0 max-sm:mb-[100px]">
      {renderItem()}
      {isMobile ? (
        <MobileNavigation onClick={setActivePage} activePage={activePage} />
      ) : (
        <Navigation onClick={setActivePage} activePage={activePage} />
      )}
    </div>
  );
};

export default LandingPage;
