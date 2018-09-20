import { getValue } from '../../utils/valuesConvertTable';
import { findRepeatsOfValues } from '../../utils/findRepearsOfValuesInHand';

/**
 * input allPossiblePermutation : [array of array with possible hands] -> [[],[],[]]
 * outpit object with rank 2 for successfully find hand with the fullfilled rule else rank 15.
 */
const isTwoPair = (accumulator, currentCards, currentIndex, allPossiblePermutation) => {
  const repeatByValue = currentCards.reduce(findRepeatsOfValues, {});
  const findTwoPairs = {
    2: []
  };

  Object.keys(repeatByValue).forEach((value, key) => {
    if (repeatByValue[value] === 2) {
      findTwoPairs[2].push(value);
    }
  });

  if (findTwoPairs[2].length === 2) {
    if (accumulator.rank === 15) {
      accumulator = {
        rank: 7,
        highCard: findTwoPairs[2][0],
        cards: currentCards
      };
    } else if (getValue(accumulator.highCard) < findTwoPairs[2][0]) {
      accumulator.highCard = findTwoPairs[2][0];
      accumulator.cards = currentCards;
    }
  }

  return accumulator;
};

export { isTwoPair, findRepeatsOfValues };
