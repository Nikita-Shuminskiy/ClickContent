import { useEffect } from "react";

export const usePreventScroll = (open: boolean) => {
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [open]);
};
