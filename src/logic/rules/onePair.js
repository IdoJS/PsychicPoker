import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator } from "../../utils/combinations";
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
    onePair = combinationsSearch(
      onePair,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength
    );
  }
  return Object.assign({}, baseResult, onePair);
};

const searchForOnePair = list => {
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
        }
      }
    }
  }

  return pairs;
};

const checkIfBetter = (oldOnePair, newOnePair) => {
  return oldOnePair.highPair.value <= newOnePair.highPair.value;
};

const searchOnList = (onePair, list) => {
  let newOnePair = searchForOnePair(list);
  if (newOnePair.highPair.value > 0) {
    if (checkIfBetter(onePair, newOnePair)) {
      onePair = Object.assign({}, newOnePair);
      onePair.rank = 8;
    }
  }
  return onePair;
};

const combinationsSearch = (
  onePair,
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
      let newOnePair = searchForOnePair(searchList);
      if (newOnePair.highPair.value > 0) {
        if (checkIfBetter(onePair, newOnePair)) {
          onePair = Object.assign({}, newOnePair);
          onePair.rank = 8;
        }
      }
    }
  }

  return onePair;
};

export { isOnePair };
