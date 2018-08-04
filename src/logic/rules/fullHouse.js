import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator } from "../../utils/combinations";
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
    fullHouse = combinationsSearch(
      fullHouse,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength
    );
  }
  return Object.assign({}, baseResult, fullHouse);
};

const searchForFullHouse = list => {
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

const checkIfBetter = (oldFullHouse, newFullHouse) => {
  return oldFullHouse.highest <= newFullHouse.highest;
};

const searchOnList = (fullHouse, list) => {
  let newFullHouse = searchForFullHouse(list);
  if (newFullHouse.highest > 0) {
    if (checkIfBetter(fullHouse, newFullHouse)) {
      fullHouse = Object.assign({}, newFullHouse);
      fullHouse.rank = 3;
    }
  }
  return fullHouse;
};

const combinationsSearch = (
  fullHouse,
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
      let newFullHouse = searchForFullHouse(searchList);
      if (newFullHouse.highest > 0) {
        if (checkIfBetter(fullHouse, newFullHouse)) {
          fullHouse = Object.assign({}, newFullHouse);
          fullHouse.rank = 3;
        }
      }
    }
  }

  return fullHouse;
};
export { isFullHouse };
