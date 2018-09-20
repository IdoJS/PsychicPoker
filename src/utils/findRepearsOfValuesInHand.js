import { getValue } from './valuesConvertTable';

const findRepeatsOfValues = (accumulator, currentValue, currentIndex, cards) => {
  let value = getValue(currentValue);

  accumulator[value] = !accumulator[value] ? 1 : accumulator[value] + 1;

  return accumulator;
};

export { findRepeatsOfValues };
