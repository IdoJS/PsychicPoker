import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isFour = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let four = {
    value: 0,
    position1: -1,
    position2: -1,
    position3: -1,
    position4: -1,
    cards: [],
    rank: 15,
    hightest: 0
  };

  if (replaceFromDeck.length === 0) {
    four = searchOnList(four, userCards);
  } else if (replaceFromDeck.length === 5) {
    four = searchOnList(four, replaceFromDeck);
  } else {
    four = combineSearch(
      four,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }

  return Object.assign({}, baseResult, four);
};

const callBackToCheckRules = list => {
  let four = {
    value: 0,
    position1: -1,
    position2: -1,
    position3: -1,
    position4: -1,
    cards: [],
    rank: 15,
    hightest: 0
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

  for (let key of Object.keys(data)) {
    if (data[key].length === 4) {
      four.value = key;
      four.position1 = data[key][0];
      four.position2 = data[key][1];
      four.position3 = data[key][2];
      four.position4 = data[key][3];
      four.rank = 2;
      four.cards = list;
    }
  }

  return four;
};

const callBackToCheckBetterResult = (newFour, oldFour) => {
  return oldFour.value <= newFour.value;
};

const searchOnList = (four, list) => {
  let newFour = callBackToCheckRules(list);

  if (newFour.value > 0) {
    if (callBackToCheckBetterResult(newFour, four)) {
      four = Object.assign({}, newFour);
      four.rank = 2;
    }
  }
  return four;
};

export { isFour };
