import { FunctionComponent } from "react";

interface IProps {
  className?: string;
}

export const BackgroundCircle: FunctionComponent<IProps> = ({ className }) => {
  return (
    <div
      className={`fixed h-[511px] w-[511px] rounded-full bg-[#A44AE033] blur-[558.6px] ${
        className ?? ""
      }`}
    />
  );
};
