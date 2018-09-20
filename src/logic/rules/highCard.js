import { getValue } from '../../utils/valuesConvertTable';

/**
 * input allPossiblePermutation : [array of array with possible hands] -> [[],[],[]]
 * outpit object with rank 9 for successfully find hand with the fullfilled rule else rank 15.
 */
const isHighCard = (accumulator, currentCards, currentIndex, allPossiblePermutation) => {
  if (accumulator.rank === 15) {
    accumulator = {
      highCard: currentCards[0],
      rank: 9,
      cards: currentCards
    };
  } else if (getValue(accumulator.highCard) < getValue(currentCards[0])) {
    accumulator.highCard = currentCards[0];
    accumulator.cards = currentCards;
  }

  return accumulator;
};

export { isHighCard };
