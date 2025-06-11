import { useUserInfoContext } from "@/contexts/UserProvider";
import { PopUpFreeze } from "@/layouts/PopUpFreeze";
import PopUpUI from "../ui/PopUpUI/PopUpUI";

const FreezeWrapper = ({ children }) => {
  const { isFrozenUser } = useUserInfoContext();

  return (
    <>
      {isFrozenUser ? (
        <PopUpUI
          classNameButton={"pl-[36px] pr-[36px]"}
          buttonRender={children}
        >
          <PopUpFreeze />
        </PopUpUI>
      ) : (
        children
      )}
    </>
  );
};

export default FreezeWrapper;
