import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Icon } from "@components/ui/icon/icon.tsx";

type AlertType = "success" | "warning" | "error";

interface AlertProvider {
  message: string | ReactNode;
  type: AlertType;
}

interface AlertContextProps {
  showAlert: (
    message: string | ReactNode,
    type: AlertType,
    duration?: number,
  ) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | null>(null);

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState<AlertProvider | null>(null);
  const [duration, setDuration] = useState<number>(3000);

  const showAlert = (
    message: string | ReactNode,
    type: AlertType,
    duration = 3000,
  ) => {
    setAlert({ message, type });
    setDuration(duration);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    let timerId;
    if (alert) {
      timerId = setTimeout(() => {
        hideAlert();
      }, duration);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [alert]);

  const statusIcon = {
    success: <Icon name={"arrowSuccess"} className={"w-[24px] h-[24px]"} />,
    error: <Icon name={"errorIcon"} className={"w-[24px] h-[24px]"} />,
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <div className="w-full flex justify-center fixed top-10 left-2/4 -translate-x-2/4 z-[100000] px-[15px]">
          <div className="flex items-center gap-[12px] px-[20px] py-[16px] bg-[#1A1A1A] rounded-[14px] shadow-lg w-[375px] max-sm:w-full justify-between">
            <div className={"flex flex-row items-center gap-[12px]"}>
              {statusIcon[alert.type]}
              <div className={"font-manrope text-[14px]"}> {alert.message}</div>
            </div>
            <button
              className="text-[24px] text-[#575859] relative top-[2px]"
              onClick={hideAlert}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
