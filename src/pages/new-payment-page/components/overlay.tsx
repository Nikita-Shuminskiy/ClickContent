import { FunctionComponent, PropsWithChildren } from "react";

export const Overlay: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[40px] z-50 flex items-center justify-center">
      {children}
    </div>
  );
};
