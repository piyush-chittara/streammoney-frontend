import { isNumber } from './object-helpers';

const getPriceFormatter = (locale = 'en-US', currency = 'USD') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

export const priceToString = (price, { currency, locale } = {}) => {
  const priceFormatter = getPriceFormatter(locale, currency);

  return priceFormatter.format(price);
};

export const formatDate = (date, options = {}) =>
  new Intl.DateTimeFormat('en-US', {
    ...options,
  }).format(date);

export const capitalize = (str) => {
  return (
    str &&
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    )
  );
};

export const getAvatarSymbol = (userId) => {
  if (!userId?.length) return 'A';

  return userId.charAt(0).toUpperCase();
};

export const ellipsedId = (string) => {
  if (!string) return string;

  return `${string.slice(0, 2)}...${string.slice(-5)}`;
};

export const roundTo = (value, noOfDecimal = 2) => {
  return isNumber(value) ? value.toFixed(noOfDecimal) : value;
};

export const formatTime = (date) => {
  return `${formatDate(date, {
    month: 'short',
    day: 'numeric',
  })}, ${formatDate(date, { timeStyle: 'short' })}`;
};
