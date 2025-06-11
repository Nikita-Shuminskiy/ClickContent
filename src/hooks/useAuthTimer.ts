import { useEffect, useState } from "react";

type IProps = {
  isOpenConfirmPhone: boolean;
};

export const useAuthTimer = ({ isOpenConfirmPhone }: IProps) => {
  const [tick, setTick] = useState(60);
  const [isStartedTimer, setIsStartedTimer] = useState(false);

  useEffect(() => {
    if (!isStartedTimer || !isOpenConfirmPhone) {
      setTick(60);
      setIsStartedTimer(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setTick((prevTick) => Math.max(prevTick - 1, 0));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isStartedTimer, isOpenConfirmPhone, tick]);

  return {
    setIsStartedTimer,
    tick,
    setTick,
  };
};
