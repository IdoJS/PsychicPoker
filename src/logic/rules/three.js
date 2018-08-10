import { getValue } from '../../utils/valuesConvertTable';

const findThree = (accumulator, currentValue, currentIndex, cards) => {
  let value = getValue(currentValue);

  accumulator[value] = !accumulator[value] ? 1 : accumulator[value] + 1;

  if (accumulator[value] === 3) {
    accumulator.rank = 6;
    accumulator.cards = cards;
    accumulator.highCard = currentValue;
  }

  return accumulator;
};

const isThree = (accumulator, currentCards, currentIndex, cards) => {
  const isThreeResult = currentCards.reduce(findThree, { rank: 15 });

  if (accumulator.rank === 15) {
    return isThreeResult;
  } else {
    if (
      isThreeResult.rank !== 15 &&
      getValue(accumulator.highCard) < getValue(isThreeResult.highCard)
    ) {
      return isThreeResult;
    }
  }

  return accumulator;
};

export { isThree, findThree };
