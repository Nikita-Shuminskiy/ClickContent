export const getUserLimitForCard = () => {

}
export const getOperationWord = (operations: number): string => {
    const lastDigit = operations % 10;
    const lastTwoDigits = operations % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "операций";
    }

    if (lastDigit === 1) {
        return "операция";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return "операции";
    }

    return "операций";
}
