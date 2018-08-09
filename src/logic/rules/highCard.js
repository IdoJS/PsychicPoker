import { getValue } from "../../utils/valuesConvertTable";

const isHighCard = (accumulator, currentCards, currentIndex, cards) => {
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
