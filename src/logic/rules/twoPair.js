import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & highest card value & card list
 */

const isTwoPair = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let pairs = {
    highPair: {
      value: 0,
      positionN: -1,
      positionM: -1
    },
    lowPair: {
      value: 0,
      positionN: -1,
      positionM: -1
    },
    cards: [],
    rank: 15,
    highest: 0
  };

  if (replaceFromDeck.length === 0) {
    pairs = searchOnList(pairs, userCards);
  } else if (replaceFromDeck.length === 5) {
    pairs = searchOnList(pairs, replaceFromDeck);
  } else {
    pairs = combineSearch(
      pairs,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }
  return Object.assign({}, baseResult, pairs);
};

const callBackToCheckRules = list => {
  let pairs = {
    highPair: {
      value: -1,
      positionN: -1,
      positionM: -1
    },
    lowPair: {
      value: -1,
      positionN: -1,
      positionM: -1
    }
  };
  for (let n = 0; n < list.length - 1; n++) {
    let valueN = getValue(list[n]);
    for (let m = n + 1; m < list.length; m++) {
      let valueM = getValue(list[m]);
      if (valueM === valueN) {
        if (pairs.highPair.positionN === -1) {
          pairs.highPair.positionN = n;
          pairs.highPair.positionM = m;
          pairs.highPair.value = valueN;
          pairs.cards = list;
        } else if (
          pairs.lowPair.positionN === -1 ||
          pairs.lowPair.value < valueN
        ) {
          // switch between pairs
          if (pairs.highPair.value < valueN) {
            // pairs.lowPair.positionN = pairs.highPair.positionN;
            // pairs.lowPair.positionM = pairs.highPair.positionM;
            // pairs.lowPair.value = pairs.highPair.value;

            pairs.lowPair = Object.assign({}, pairs.highPair);
            pairs.highPair.positionN = n;
            pairs.highPair.positionM = m;
            pairs.highPair.value = valueN;
            pairs.rank = 7;
            pairs.cards = list;
          } else {
            pairs.lowPair.positionN = n;
            pairs.lowPair.positionM = m;
            pairs.lowPair.value = valueN;
            pairs.rank = 7;
            pairs.cards = list;
          }
        }
      }
    }
  }

  return pairs;
};

const callBackToCheckBetterResult = (newPair, oldPair) => {
  if (oldPair.highPair.value <= newPair.highPair.value) {
    if (oldPair.highPair.value < newPair.highPair.value) {
      return true;
    }
    if (
      oldPair.highPair.value === newPair.highPair.value &&
      oldPair.lowPair.value <= newPair.lowPair.value
    ) {
      return true;
    }
  } else {
    return false;
  }
};

const searchOnList = (pairs, list) => {
  let newPair = callBackToCheckRules(list);
  if (newPair.highPair.positionM > -1 && newPair.lowPair.positionM > -1) {
    if (callBackToCheckBetterResult(newPair, pairs)) {
      pairs = Object.assign({}, newPair);
      pairs.rank = 7;
    }
  }
  return pairs;
};

export { isTwoPair };
