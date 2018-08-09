import { getValue, getSuit } from "../../utils/valuesConvertTable";

const findFlush = (accumulator, currentValue, currentIndex, cards) => {
  if (!accumulator.isFlush) {
    return accumulator;
  }

  let suit = getSuit(currentValue);

  if (!accumulator.suit) {
    // initialize
    accumulator.suit = suit;
    accumulator.highCard = currentValue;
  } else {
    accumulator.isFlush = accumulator.suit === suit;
    let highCard = getValue(currentValue);
    if (getValue(accumulator.highCard) < highCard) {
      accumulator.highCard = currentValue;
    }
  }
  return accumulator;
};

const isFlush = (accumulator, currentCards, currentIndex, cards) => {
  const isFlushResult = currentCards.reduce(findFlush, {
    isFlush: true
  });

  if (isFlushResult.isFlush) {
    if (accumulator.rank === 15) {
      return {
        rank: 4,
        highCard: isFlushResult.highCard,
        cards: currentCards
      };
    } else if (
      getValue(accumulator.highCard) < getValue(isFlushResult.highCard)
    ) {
      accumulator.highCard = isFlushResult.highCard;
      accumulator.cards = currentCards;
    }
  }

  return accumulator;
};

export { isFlush };
