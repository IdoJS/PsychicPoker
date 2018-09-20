import { getValue } from '../../utils/valuesConvertTable';
import { findRepeatsOfValues } from '../../utils/findRepearsOfValuesInHand';

/**
 * input allPossiblePermutation : [array of array with possible hands] -> [[],[],[]]
 * outpit object with rank 8 for successfully find hand with the fullfilled rule else rank 15.
 */
const isOnePair = (accumulator, currentCards, currentIndex, allPossiblePermutation) => {
  const repeatByValue = currentCards.reduce(findRepeatsOfValues, {});
  const findPairs = {
    2: []
  };

  Object.keys(repeatByValue).forEach((value, key) => {
    if (repeatByValue[value] === 2) {
      findPairs[2].push(value);
    }
  });

  if (findPairs[2].length === 1) {
    if (accumulator.rank === 15) {
      accumulator = {
        rank: 8,
        highCardValue: findPairs[2][0],
        cards: currentCards
      };
    } else if (getValue(accumulator.highCardValue) < findPairs[2][0]) {
      accumulator.highCardValue = findPairs[2][0];
      accumulator.cards = currentCards;
    }
  }
  return accumulator;
};

export { isOnePair, findRepeatsOfValues };
