export const truncateText = (title: string, maxLength: number): string => {
  if (title?.length > maxLength) {
    return `${title.slice(0, maxLength - 3)}...`;
  }
  return title;
};
