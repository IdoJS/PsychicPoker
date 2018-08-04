import baseResult from "../../utils/baseResult";
import { getValue, getSuit } from "../../utils/valuesConvertTable";
import { combineGenerator } from "../../utils/combinations";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isStraightFlush = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let straightFlush = {
    value: 0,
    position1: -1,
    position2: -1,
    position3: -1,
    position4: -1,
    position5: -1,
    cards: [],
    rank: 15,
    highest: 0
  };

  if (replaceFromDeck.length === 0) {
    straightFlush = searchOnList(straightFlush, userCards);
  } else if (replaceFromDeck.length === 5) {
    straightFlush = searchOnList(straightFlush, replaceFromDeck);
  } else {
    straightFlush = combinationsSearch(
      straightFlush,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength
    );
  }

  return Object.assign({}, baseResult, straightFlush);
};

const searchForFlush = list => {
  let straightFlush = {
    value: 0,
    position1: -1,
    position2: -1,
    position3: -1,
    position4: -1,
    position5: -1,
    cards: [],
    rank: 15,
    highest: 0
  };

  let defaultSuit = getSuit(list[0]);
  let highValue = getValue(list[0]);
  let position = 0;
  let isSuitFlag = true;
  let straightArray = [highValue];
  for (let i = 1; i < list.length && isSuitFlag; i++) {
    let suit = getSuit(list[i]);
    let value = getValue(list[i]);
    straightArray.push(value);
    if (defaultSuit !== suit) {
      isSuitFlag = false;
    }
    if (highValue < value) {
      highValue = value;
      position = i;
    }
  }

  if (isSuitFlag) {
    let sortedStraightArray = straightArray.sort((a, b) => a - b);

    let isStraightFlag = true;
    for (let i = 0; i < sortedStraightArray.length - 1; i++) {
      if (sortedStraightArray[i + 1] - sortedStraightArray[i] !== 1) {
        isStraightFlag = false;
      }
    }

    if (isStraightFlag) {
      straightFlush.position1 = sortedStraightArray[0];
      straightFlush.position2 = sortedStraightArray[1];
      straightFlush.position3 = sortedStraightArray[2];
      straightFlush.position4 = sortedStraightArray[3];
      straightFlush.position5 = sortedStraightArray[4];
      straightFlush.highest = sortedStraightArray[4];
      straightFlush.cards = list;
      straightFlush.rank = 1;
    }
  }

  return straightFlush;
};

const checkIfBetter = (oldStraightFlush, newStraightFlush) => {
  return oldStraightFlush.value <= newStraightFlush.value;
};

const searchOnList = (straightFlush, list) => {
  let newStraightFlush = searchForFlush(list);
  if (newStraightFlush.highest > 0) {
    if (checkIfBetter(straightFlush, newStraightFlush)) {
      straightFlush = Object.assign({}, newStraightFlush);
      straightFlush.rank = 1;
    }
  }

  return straightFlush;
};

const combinationsSearch = (
  straightFlush,
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
      let newStraightFlush = searchForFlush(searchList);
      if (newStraightFlush.highest > 0) {
        if (checkIfBetter(straightFlush, newStraightFlush)) {
          straightFlush = Object.assign({}, newStraightFlush);
          straightFlush.rank = 1;
        }
      }
    }
  }

  return straightFlush;
};
export { isStraightFlush };
