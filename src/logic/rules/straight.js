import { getValue } from "../../utils/valuesConvertTable";

const findStraight = (accumulator, currentValue, currentIndex, cards) => {
  if (!accumulator.isStraight) {
    return accumulator;
  }

  let value = getValue(currentValue);
  if (accumulator.lastValue) {
    accumulator.isStraight =
      (accumulator.lastValue - 1).toString() === value.toString();
  }

  accumulator.lastValue = value;
  return accumulator;
};

const isStraight = (accumulator, currentCards, currentIndex, cards) => {
  const isStraightResult = currentCards.reduce(findStraight, {
    isStraight: true
  });

  if (isStraightResult.isStraight) {
    if (accumulator.rank === 15) {
      return {
        rank: 5,
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

export { isStraight };
