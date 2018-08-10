import { getValue } from './valuesConvertTable';

const sortByValue = (a, b) => {
  return getValue(b) - getValue(a);
};

export { sortByValue };
