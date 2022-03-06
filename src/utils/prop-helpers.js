import PropTypes from 'prop-types';

export const ReactNode = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
  PropTypes.elementType,
]);

export const FunctionOrJSX = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.elementType,
]);

export const OneOf = (array = []) => PropTypes.oneOf([...array]);
export const OneOfType = (array = []) => PropTypes.oneOfType([...array]);
