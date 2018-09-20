import { getValue } from '../../utils/valuesConvertTable';

const findThree = (accumulator, currentValue, currentIndex, cards) => {
  const value = getValue(currentValue);

  accumulator[value] = !accumulator[value] ? 1 : accumulator[value] + 1;

  if (accumulator[value] === 3) {
    accumulator.rank = 6;
    accumulator.cards = cards;
    accumulator.highCard = currentValue;
    accumulator.highCardValue = value;
  }

  return accumulator;
};

/**
 * input allPossiblePermutation : [array of array with possible hands] -> [[],[],[]]
 * outpit object with rank 6 for successfully find hand with the fullfilled rule else rank 15.
 */
const isThree = (accumulator, currentCards, currentIndex, allPossiblePermutation) => {
  // check if current hand fullfilled the rule.
  const isThreeResult = currentCards.reduce(findThree, {
    rank: 15,
    cards: [],
    highCardValue: 0,
    highCard: ''
  });
  // if fullfill then:
  // if no previos hand fullfilled the rule then we keep the current hand as possible result
  if (accumulator.rank === 15) {
    accumulator = isThreeResult;
  } else {
    // if some other hand already fullfilled the rule then we check which value is higher then we pick the higher value
    if (accumulator.highCardValue < isThreeResult.highCardValue) {
      accumulator = isThreeResult;
    }
  }

  return accumulator;
};

export { isThree, findThree };
