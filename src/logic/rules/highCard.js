import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator } from "../../utils/combinations";
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
    highCard = combinationsSearch(
      highCard,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength
    );
  }
  return Object.assign({}, baseResult, highCard);
};

const searchForHighCard = list => {
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

const checkIfBetter = (oldHighCard, newHighCard) => {
  return oldHighCard.value <= newHighCard.value;
};

const searchOnList = (highCard, list) => {
  let newHighCard = searchForHighCard(list);
  if (newHighCard.value > 0) {
    if (checkIfBetter(highCard, newHighCard)) {
      highCard = Object.assign({}, newHighCard);
      highCard.rank = 9;
    }
  }
  return highCard;
};

const combinationsSearch = (
  highCard,
  userCards,
  replaceFromDeck,
  replaceFromDeckLength
) => {
  let combinationsArray = combineGenerator(
    userCards,
    5 - replaceFromDeckLength
  );
  // builc array size 5 with cards from the replacmentDeck and the additional cards from user
  for (let i = 0; i < combinationsArray.length; i++) {
    let additionalCards = combinationsArray[i];

    let searchList =
      additionalCards === undefined
        ? replaceFromDeck
        : replaceFromDeck.concat(combinationsArray[i]);

    if (searchList.length === 5) {
      let newHighCard = searchForHighCard(searchList);
      if (newHighCard.value > 0) {
        if (checkIfBetter(highCard, newHighCard)) {
          highCard = Object.assign({}, newHighCard);
          highCard.rank = 9;
        }
      }
    }
  }

  return highCard;
};

export { isHighCard };
