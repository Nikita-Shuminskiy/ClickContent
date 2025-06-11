import { months } from "./constants";

export const getCurrentMonth = (): string => {
  const currentMonth = new Date().getMonth();
  return months[currentMonth];
};
