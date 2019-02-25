import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import keys from 'lodash/keys';

export function flattenError(el) {
  if (isString(el) || isNumber(el)) {
    return el;
  }

  if (isArray(el)) {
    return el.reduce((agg, e) => (agg === '' ? flattenError(e) : `${agg} ${flattenError(e)}`), '');
  }

  if (isPlainObject(el)) {
    return keys(el).reduce((agg, k) => (agg === '' ? `${k} ${flattenError(el[k])}` : `${agg}. ${k} ${flattenError(el[k])}`), '');
  }

  if (isBoolean(el)) {
    if (!el) {
      return 'false';
    }
  }

  return '';
}

export function handleError(error) {
  if (error instanceof Error) {
    return error.toString();
  }
  return flattenError(error);
}
