import { format, parse, parseISO } from "date-fns";

export const convertUTCDateToLocalDate = (date: Date) => {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();
  newDate.setHours(hours - offset);
  return newDate;
};
export const convertDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObj.getUTCFullYear();

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
export const formatDate = (d: string) => {
  const x = convertUTCDateToLocalDate(new Date(Date.parse(d)));
  return (
    (x.getDate() < 10 ? "0" + x.getDate() : x.getDate()) +
    "." +
    (x.getMonth() + 1 < 10 ? "0" + (x.getMonth() + 1) : 1 + x.getMonth()) +
    "." +
    x.getFullYear()
  );
};

export const formatDateQuery = (x: Date) => {
  return (
    x.getFullYear() +
    "-" +
    (x.getMonth() + 1 < 10 ? "0" + (x.getMonth() + 1) : 1 + x.getMonth()) +
    "-" +
    (x.getDate() < 10 ? "0" + x.getDate() : x.getDate())
  );
};

export const formatTime = (d: string, utc: boolean = true) => {
  var x = utc
    ? convertUTCDateToLocalDate(new Date(Date.parse(d)))
    : new Date(Date.parse(d));
  return (
    (x.getHours() < 10 ? "0" + x.getHours() : x.getHours()) +
    ":" +
    (x.getMinutes() < 10 ? "0" + x.getMinutes() : x.getMinutes())
  );
};

export const convertDateToFormat = (payload: {
  dateStr: string;
  inputFormat: string;
  outputFormat: string;
}): string | null => {
  try {
    const { dateStr, inputFormat, outputFormat } = payload;

    const parsedDate = parse(dateStr, inputFormat, new Date());

    return format(parsedDate, outputFormat);
  } catch (error) {
    return null;
  }
};

export const newFormatDate = (d: string) => {
  const date = parseISO(d);
  return format(date, "dd.MM.yyyy");
};

export const newFormatTime = (d: string, utc: boolean = true) => {
  const date = utc ? parseISO(d) : new Date(d);
  return format(date, "HH:mm");
};

const convertDateToUserTimezone = (dateStr: string) => {
  const date = parseISO(dateStr);
  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - userTimezoneOffset);
  return localDate;
};
export const formatDateTime = (dateStr: string) => {
  const adjustedDate = convertDateToUserTimezone(dateStr);
  return format(adjustedDate, "dd.MM.yyyy HH:mm");
};
