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

const isTwoPair = (accumulator, currentCards, currentIndex, cards) => {
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

export { isTwoPair };
