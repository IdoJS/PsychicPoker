import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isStraight = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let straight = {
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
    straight = searchOnList(straight, userCards);
  } else if (replaceFromDeck.length === 5) {
    straight = searchOnList(straight, replaceFromDeck);
  } else {
    straight = combineSearch(
      straight,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }
  return Object.assign({}, baseResult, straight);
};

const callBackToCheckRules = list => {
  let straight = {
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

  let valueList = [];
  for (let i = 0; i < list.length; i++) {
    let value = getValue(list[i]);
    valueList.push(value);
    if (value === 14) {
      // its possible to use ace as 1
      valueList.push("1");
    }
  }

  let sortedList = valueList.sort((a, b) => a - b);
  let isStraightFlag = true;
  let heighCard = sortedList[sortedList.length - 1];
  if (sortedList.length === 6) {
    //[1, "2", "3", "4", "5", 14]
    if (sortedList[1] === "2") {
      sortedList = sortedList.slice(0, 5);

      heighCard = "14";
    } else if (sortedList[4] === "13") {
      sortedList = sortedList.shift();
    }
  }

  for (let i = 0; i < sortedList.length - 1; i++) {
    if (sortedList[i + 1] - sortedList[i] !== 1) {
      isStraightFlag = false;
    }
  }
  if (isStraightFlag) {
    straight.position1 = sortedList[0];
    straight.position2 = sortedList[1];
    straight.position3 = sortedList[2];
    straight.position4 = sortedList[3];
    straight.position5 = sortedList[4];
    straight.highest = heighCard;
    straight.cards = list;
    straight.rank = 5;
  }

  return straight;
};

const callBackToCheckBetterResult = (newStraight, oldStraight) => {
  return oldStraight.highest <= newStraight.highest;
};

const searchOnList = (straight, list) => {
  let newStraight = callBackToCheckRules(list);
  if (newStraight.highest > 0) {
    if (callBackToCheckBetterResult(newStraight, straight)) {
      straight = newStraight;
      straight.rank = 5;
    }
  }
  return straight;
};

export { isStraight };
