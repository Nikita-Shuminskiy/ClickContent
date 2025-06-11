export const percentageCollected = (currentAmount, totalAmount) => {
  if (currentAmount >= totalAmount) return 100;
  return Math.ceil((currentAmount / totalAmount) * 100);
};