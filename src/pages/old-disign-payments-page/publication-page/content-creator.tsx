import { FunctionComponent, memo } from "react";
import mockAvatar from "@assets/images/all-img/mockAvatar.png";

interface IProps {
  hasChangedNickName: boolean;
  data?: any;
}

export const ContentCreator: FunctionComponent<IProps> = memo(({ data }) => {
  if (!data) return null;

  return (
    <div>
      <div className="w-[52px] h-[52px] rounded-[50%] overflow-hidden mb-[24px]">
        <img
          className="w-full h-full bg-gray-200 object-cover"
          src={data.user.avatarLink ?? mockAvatar}
          alt={"avatar"}
        />
      </div>
      <h3 className="text-[24px] leading-[29px] font-bold max-md:text-2xl max-sm:text-lg font-steppe">
        Подтвердите покупку <h3 className="text-[#A354D9]">{data.title}</h3>
      </h3>
    </div>
  );
});
