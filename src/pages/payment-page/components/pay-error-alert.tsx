import { FunctionComponent, ReactNode } from "react";

interface IProps {
  title: string;
  text: string;
  action?: ReactNode;
}

export const PayErrorAlert: FunctionComponent<IProps> = ({
  title,
  text,
  action,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <span className="inline-block text-white text-[14px] leading-[19px] font-bold">
          {title}
        </span>
        <span className="text-[12px] leading-[16px] font-normal text-[#A9A4AC]">
          {text}
        </span>
      </div>
      {action}
    </div>
  );
};
