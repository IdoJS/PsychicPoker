import baseResult from "../../utils/baseResult";
import { getValue, getSuit } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isFlush = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let flush = {
    value: 0,
    cards: [],
    rank: 15,
    highest: 0
  };

  if (replaceFromDeck.length === 0) {
    flush = searchOnList(flush, userCards);
  } else if (replaceFromDeck.length === 5) {
    flush = searchOnList(flush, replaceFromDeck);
  } else {
    flush = combineSearch(
      flush,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }

  return Object.assign({}, baseResult, flush);
};

const callBackToCheckRules = list => {
  let flush = {
    value: 0,
    cards: [],
    rank: 15,
    highest: 0
  };

  let defaultSuit = getSuit(list[0]);
  let highValue = getValue(list[0]);
  let position = 0;
  let isSuitFlag = true;
  for (let i = 1; i < list.length && isSuitFlag; i++) {
    let suit = getSuit(list[i]);
    let value = getValue(list[i]);
    if (defaultSuit !== suit) {
      isSuitFlag = false;
    }
    if (highValue < value) {
      highValue = value;
      position = i;
    }
  }

  if (isSuitFlag) {
    flush.highest = list[position];
    flush.value = highValue;
    flush.cards = list;
    flush.rank = 4;
  }
  return flush;
};

const callBackToCheckBetterResult = (newStraight, oldStraight) => {
  return oldStraight.value <= newStraight.value;
};

const searchOnList = (flush, list) => {
  let newFlush = callBackToCheckRules(list);
  if (newFlush.value > 0) {
    if (callBackToCheckBetterResult(newFlush, flush)) {
      flush = Object.assign({}, newFlush);
      flush.rank = 4;
    }
  }

  return flush;
};

export { isFlush };
