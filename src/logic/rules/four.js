import { getValue } from '../../utils/valuesConvertTable';

const findFour = (accumulator, currentValue, currentIndex, cards) => {
  let value = getValue(currentValue);

  accumulator[value] = !accumulator[value] ? 1 : accumulator[value] + 1;

  if (accumulator[value] === 4) {
    accumulator.rank = 2;
    accumulator.cards = cards;
    accumulator.highCard = getValue(currentValue);
  }

  return accumulator;
};

/**
 * input allPossiblePermutation : [array of array with possible hands] -> [[],[],[]]
 * outpit object with rank 2 for successfully find hand with the fullfilled rule else rank 15.
 */
const isFour = (accumulator, currentCards, currentIndex, allPossiblePermutation) => {
  const isFourResult = currentCards.reduce(findFour, { rank: 15 });

  if (accumulator.rank === 15) {
    return isFourResult;
  } else {
    if (
      isFourResult.rank !== 15 &&
      getValue(accumulator.highCard) < getValue(isFourResult.highCard)
    ) {
      return isFourResult;
    }
  }

  return accumulator;
};

export { isFour, findFour };
