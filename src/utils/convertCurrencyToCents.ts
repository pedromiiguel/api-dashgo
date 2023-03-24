export const convertCurrencyToCents = (value: number) => {
  return Number((value * 100).toFixed(0));
};
