import { getValue } from "../../utils/valuesConvertTable";

const findRepeatsOfValues = (
  accumulator,
  currentValue,
  currentIndex,
  cards
) => {
  let value = getValue(currentValue);

  accumulator[value] = !accumulator[value] ? 1 : accumulator[value] + 1;

  return accumulator;
};

const isOnePair = (accumulator, currentCards, currentIndex, cards) => {
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
