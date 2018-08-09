import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isHighCard = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let highCard = {
    cards: [],
    rank: 15,
    value: -1,
    positionM: -1,
    highest: -1
  };

  if (replaceFromDeck.length === 0) {
    highCard = searchOnList(highCard, userCards);
  } else if (replaceFromDeck.length === 5) {
    highCard = searchOnList(highCard, replaceFromDeck);
  } else {
    highCard = combineSearch(
      highCard,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }

  return Object.assign({}, baseResult, highCard);
};

const callBackToCheckRules = list => {
  let highCard = {
    cards: [],
    rank: 15,
    value: -1,
    position: -1,
    highest: -1
  };

  for (let i = 0; i < list.length; i++) {
    let value = getValue(list[i]);
    if (highCard.value < value) {
      highCard.cards = list;
      highCard.value = value;
      highCard.highest = value;
      highCard.position = i;
      highCard.rank = 9;
    }
  }

  return highCard;
};

const callBackToCheckBetterResult = (newHighCard, oldHighCard) => {
  return oldHighCard.highest <= newHighCard.highest;
};

const searchOnList = (highCard, list) => {
  let newHighCard = callBackToCheckRules(list);
  if (callBackToCheckBetterResult(newHighCard, highCard)) {
    highCard = newHighCard;
    highCard.rank = 9;
  }
  return highCard;
};

const isHighCardNew = (accumulator, currentCards, currentIndex, cards) => {
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

export { isHighCard, isHighCardNew };
