import { getValue, getSuit } from '../../utils/valuesConvertTable';

const findStraightFlush = (accumulator, currentValue, currentIndex, cards) => {
  if (!accumulator.isFlush || !accumulator.isStraight) {
    return accumulator;
  }

  let value = getValue(currentValue);
  let suit = getSuit(currentValue);
  if (!accumulator.lastValue) {
    // initialize
    accumulator.suit = suit;
  } else {
    accumulator.isStraight = (accumulator.lastValue - 1).toString() === value.toString();
    accumulator.isFlush = accumulator.suit === suit;
  }

  accumulator.lastValue = value;
  return accumulator;
};

/**
 * input allPossiblePermutation : [array of array with possible hands] -> [[],[],[]]
 * outpit object with rank 1 for successfully find hand with the fullfilled rule else rank 15.
 */
const isStraightFlush = (accumulator, currentCards, currentIndex, allPossiblePermutation) => {
  const isStraightFlushResult = currentCards.reduce(findStraightFlush, {
    isStraight: true,
    isFlush: true
  });

  if (isStraightFlushResult.isFlush && isStraightFlushResult.isStraight) {
    if (accumulator.rank === 15) {
      return {
        rank: 1,
        highCard: currentCards[0],
        cards: currentCards
      };
    } else if (getValue(accumulator.highCard) < getValue(currentCards[0])) {
      accumulator.highCard = currentCards[0];
      accumulator.cards = currentCards;
    }
  }

  return accumulator;
};

export { isStraightFlush, findStraightFlush };
