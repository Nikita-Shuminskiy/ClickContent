import React, { FunctionComponent } from "react";
import { SpinerUI } from "@components/ui/SpinerUI";
import successDonate from "@/pages/SuccessDonate/SuccessDonate.tsx";

interface IProps {
  text?: string;
}

const Loading: FunctionComponent<IProps> = ({ text }) => {
  return (
    <div className="w-full gap-[20px] flex-col h-screen flex items-center overflow-hidden rounded-lg">
      <SpinerUI />
      <span className="block text-6xl font-bold text-center mb-4 max-md:text-5xl max-sm:text-4xl">
        {text ?? "Проверка"}
      </span>
    </div>
  );
};

export default Loading;
