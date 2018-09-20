import { getValue } from '../../utils/valuesConvertTable';
import { findRepeatsOfValues } from '../../utils/findRepearsOfValuesInHand';
/**
 * input allPossiblePermutation : [array of array with possible hands] -> [[],[],[]]
 * outpit object with rank 3 for successfully find hand with the fullfilled rule else rank 15.
 */
const isFullHouse = (accumulator, currentCards, currentIndex, allPossiblePermutation) => {
  const repeatByValue = currentCards.reduce(findRepeatsOfValues, {});
  const fineIfFullHouse = {};

  Object.keys(repeatByValue).forEach((value, key) => {
    if (repeatByValue[value] === 2) {
      fineIfFullHouse[2] = value;
    }
    if (repeatByValue[value] === 3) {
      fineIfFullHouse[3] = value;
    }
  });

  if (fineIfFullHouse[2] && fineIfFullHouse[3]) {
    if (accumulator.rank === 15) {
      return {
        rank: 3,
        highCard: fineIfFullHouse[3],
        cards: currentCards
      };
    } else if (getValue(accumulator.highCard) < getValue(fineIfFullHouse[3])) {
      accumulator = {
        rank: 3,
        highCard: fineIfFullHouse[3],
        cards: currentCards
      };
    }
  }

  return accumulator;
};

export { isFullHouse, findRepeatsOfValues };
