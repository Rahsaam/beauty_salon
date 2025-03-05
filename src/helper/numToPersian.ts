export const numberFormat = (number: number): string => {
    return `${new Intl.NumberFormat('fa-IR').format(number)}`;
};