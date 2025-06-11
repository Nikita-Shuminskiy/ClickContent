export function getCorrectPrice(value: number, preventStyle?: boolean) {
  const roubles = Intl.NumberFormat("ru-RU", {
    ...(preventStyle ? {} : { style: "currency" }),
    currency: "RUB",
    minimumFractionDigits: 0, //todo оставляем 2 знака после запятой для отображения копеек
  });

  const amountInRoubles = value / 100;
  return roubles.format(amountInRoubles);
}

export const formatUnitCode = (value) => {
  let formattedValue = value.replace(/\D/g, "");
  formattedValue = formattedValue.slice(0, 6);
  if (formattedValue.length > 3) {
    formattedValue = formattedValue.slice(0, 3) + "-" + formattedValue.slice(3);
  }
  return formattedValue;
};
export const formatDate = (date: string) => {
  let formatDate = date.replace(/\D/g, "");
  formatDate = formatDate.replace(/(\d{2})(\d)/, "$1/$2");
  formatDate = formatDate.replace(/(\d{2}\/\d{2})(\d)/, "$1/$2");

  return formatDate;
};
