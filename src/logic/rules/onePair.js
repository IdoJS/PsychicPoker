import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator, combineSearch } from "../../utils/combinations";

/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & highest card value & card list
 */

const isOnePair = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let onePair = {
    cards: [],
    rank: 15,
    highPair: {
      value: -1,
      positionN: -1,
      positionM: -1
    }
  };

  if (replaceFromDeck.length === 0) {
    onePair = searchOnList(onePair, userCards);
  } else if (replaceFromDeck.length === 5) {
    onePair = searchOnList(onePair, replaceFromDeck);
  } else {
    onePair = combineSearch(
      onePair,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength,
      callBackToCheckRules,
      callBackToCheckBetterResult
    );
  }
  return Object.assign({}, baseResult, onePair);
};

const callBackToCheckRules = list => {
  let pairs = {
    cards: [],
    rank: 15,
    highPair: {
      value: -1,
      positionN: -1,
      positionM: -1
    }
  };

  for (let n = 0; n < list.length - 1; n++) {
    let valueN = getValue(list[n]);
    for (let m = n + 1; m < list.length; m++) {
      let valueM = getValue(list[m]);
      if (valueM === valueN && list[n] !== list[m]) {
        if (pairs.highPair.value < valueN) {
          pairs.highPair.positionN = n;
          pairs.highPair.positionM = m;
          pairs.highPair.value = valueM;
          pairs.cards = list;
          pairs.rank = 8;
        }
      }
    }
  }

  return pairs;
};

const callBackToCheckBetterResult = (newOnePair, oldOnePair) => {
  if (oldOnePair.highPair.value < newOnePair.highPair.value) {
    return true;
  }

  return false;
};

const searchOnList = (onePair, list) => {
  let newOnePair = callBackToCheckRules(list);
  if (callBackToCheckBetterResult(newOnePair, onePair)) {
    onePair = newOnePair;
    onePair.rank = 8;
  }
  return onePair;
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

const isOnePairNew = (accumulator, currentCards, currentIndex, cards) => {
  const repeatByValue = currentCards.reduce(findRepeatsOfValues, {});
  const findPairs = {
    2: []
  };

  Object.keys(repeatByValue).forEach((value, key) => {
    if (repeatByValue[value] === 2) {
      findPairs[2].push(value);
    }
  });

  if (findPairs[2].length === 1) {
    if (accumulator.rank === 15) {
      accumulator = {
        rank: 8,
        highCard: findPairs[2][0],
        cards: currentCards
      };
    } else if (getValue(accumulator.highCard) < findPairs[2][0]) {
      accumulator.highCard = findPairs[2][0];
      accumulator.cards = currentCards;
    }
  }
  return accumulator;
};

export { isOnePair, isOnePairNew };
