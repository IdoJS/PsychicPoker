import baseResult from "../../utils/baseResult";
import { getValue, getSuit } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";
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
    straightFlush = combineSearch(
      straightFlush,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }

  return Object.assign({}, baseResult, straightFlush);
};

const callBackToCheckRules = list => {
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

    let heighCard = sortedStraightArray[sortedStraightArray.length - 1];
    if (sortedStraightArray.length === 6) {
      //[1, "2", "3", "4", "5", 14]
      if (sortedStraightArray[1] === "2") {
        sortedStraightArray = sortedStraightArray.slice(0, 5);

        heighCard = "14";
      } else if (sortedStraightArray[4] === "13") {
        sortedStraightArray = sortedStraightArray.shift();
      }
    }

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
      straightFlush.highest = heighCard;
      straightFlush.cards = list;
      straightFlush.rank = 1;
    }
  }

  return straightFlush;
};

const callBackToCheckBetterResult = (newStraightFlush, oldStraightFlush) => {
  return oldStraightFlush.highest <= newStraightFlush.highest;
};

const searchOnList = (straightFlush, list) => {
  let newStraightFlush = callBackToCheckRules(list);
  if (newStraightFlush.highest > 0) {
    if (callBackToCheckBetterResult(newStraightFlush, straightFlush)) {
      straightFlush = Object.assign({}, newStraightFlush);
      straightFlush.rank = 1;
    }
  }

  return straightFlush;
};

export { isStraightFlush };
