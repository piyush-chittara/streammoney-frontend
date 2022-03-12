/**
 * This function sorts the given array. If it is an array of objects
 * then field needs to be provided by which the array will be sorted,
 * else the array will be sorted by its elements
 *
 * @param {Array} array Array of items to be sorted
 * @param {string} field Object field by which the array should be sorted
 * @returns
 */
export const sortByField = (array = [], field) => {
  return array.sort((a, b) => {
    const valueA = field ? a[field] : a;
    const valueB = field ? b[field] : b;

    if (valueA === valueB) return 0;

    return valueA > valueB ? -1 : 1;
  });
};

export const isNumber = (val) => typeof val === 'number';

export const isBoolean = (val) => typeof val === 'boolean';

export const isArray = (val) => Array.isArray(val);

export const isEmpty = (val) => !val;

/**
 * @param {object} query - The key, value pairs for query params
 *
 * @returns {string} - The equivalent query string
 * @example ?key1=value1&key2=value2
 */
export const jsonToQuery = (query) => {
  let q = [];

  Object.keys(query).forEach((key) => {
    if (query[key] || (key === 'q' && query[key] === '')) {
      const querySegment = Array.isArray(query[key])
        ? query[key].map((f) => `${key}=${f}`)
        : `${key}=${query[key]}`;

      q = q.concat(querySegment);
    }
  });

  const string = q.join('&');

  return string ? `?${string}` : string;
};
