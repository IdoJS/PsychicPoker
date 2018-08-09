import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";

/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isFullHouse = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let fullHouse = {
    value: 0,
    positionThree1: -1,
    positionThree2: -1,
    positionThree3: -1,
    positionTwo1: -1,
    positionTwo2: -1,
    cards: [],
    rank: 15,
    highest: 0
  };

  if (replaceFromDeck.length === 0) {
    fullHouse = searchOnList(fullHouse, userCards);
  } else if (replaceFromDeck.length === 5) {
    fullHouse = searchOnList(fullHouse, replaceFromDeck);
  } else {
    fullHouse = combineSearch(
      fullHouse,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }
  return Object.assign({}, baseResult, fullHouse);
};

const callBackToCheckRules = list => {
  let fullHouse = {
    value: 0,
    positionThree1: -1,
    positionThree2: -1,
    positionThree3: -1,
    positionTwo1: -1,
    positionTwo2: -1,
    cards: [],
    rank: 15,
    highest: 0
  };

  let data = {};
  for (let i = 0; i < list.length; i++) {
    let value = getValue(list[i]);
    if (data[value] === undefined) {
      data[value] = [list[i]];
    } else {
      data[value].push(list[i]);
    }
  }
  let flag3 = false;
  let flag2 = false;
  for (let key of Object.keys(data)) {
    if (data[key].length === 3) {
      flag3 = true;
      fullHouse.highest = key;
      fullHouse.positionThree1 = data[key][0];
      fullHouse.positionThree2 = data[key][1];
      fullHouse.positionThree3 = data[key][2];
    }
    if (data[key].length === 2) {
      flag2 = true;
      fullHouse.positionTwo1 = data[key][0];
      fullHouse.positionTwo2 = data[key][1];
    }
  }

  if (!flag2 || !flag2) {
    fullHouse.highest = 0;
  } else {
    fullHouse.cards = list;
    fullHouse.rank = 3;
  }

  return fullHouse;
};

const callBackToCheckBetterResult = (newFullHouse, oldFullHouse) => {
  return (
    newFullHouse.highest > 0 && oldFullHouse.highest <= newFullHouse.highest
  );
};

const searchOnList = (fullHouse, list) => {
  let newFullHouse = callBackToCheckRules(list);
  if (newFullHouse.highest > 0) {
    if (callBackToCheckBetterResult(newFullHouse, fullHouse)) {
      fullHouse = newFullHouse;
      fullHouse.rank = 3;
    }
  }
  return fullHouse;
};

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

const isFullHouseNew = (accumulator, currentCards, currentIndex, cards) => {
  const repeatByValue = currentCards.reduce(findRepeatsOfValues, {});
  const fineIfFullHouse = {};

  Object.keys(repeatByValue).forEach((value, key) => {
    if (repeatByValue[value] === 2) {
      fineIfFullHouse[2] = value;
    }
    if (repeatByValue[value] === 3) {
      fineIfFullHouse[3] = value;
    }
  });

  if (fineIfFullHouse[2] && fineIfFullHouse[3]) {
    if (accumulator.rank === 15) {
      return {
        rank: 3,
        highCard: fineIfFullHouse[3],
        cards: currentCards
      };
    } else if (getValue(accumulator.highCard) < getValue(fineIfFullHouse[3])) {
      accumulator = {
        rank: 3,
        highCard: fineIfFullHouse[3],
        cards: currentCards
      };
    }
  }

  return accumulator;
};

export { isFullHouse, isFullHouseNew };
