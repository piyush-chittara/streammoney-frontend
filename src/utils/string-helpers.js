const getPriceFormatter = (locale = "en-US", currency = "USD") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

export const priceToString = (price, { currency, locale } = {}) => {
  const priceFormatter = getPriceFormatter(locale, currency);

  return priceFormatter.format(price);
};

export const capitalize = (str) => {
  return (
    str &&
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  );
};
