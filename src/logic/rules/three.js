import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
import { combineGenerator } from "../../utils/combinations";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isThree = (userCards = [], replaceFromDeck = []) => {
  let replaceFromDeckLength = replaceFromDeck.length;
  let three = {
    value: 0,
    position1: -1,
    position2: -1,
    position3: -1,
    cards: [],
    rank: 15,
    hightest: 0
  };

  if (replaceFromDeck.length === 0) {
    three = searchOnList(three, userCards);
  } else if (replaceFromDeck.length === 5) {
    three = searchOnList(three, replaceFromDeck);
  } else {
    three = combinationsSearch(
      three,
      userCards,
      replaceFromDeck,
      replaceFromDeckLength
    );
  }

  return Object.assign({}, baseResult, three);
};

const searchForThree = list => {
  let three = {
    value: 0,
    position1: -1,
    position2: -1,
    position3: -1,
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
    if (data[key].length === 3) {
      three.value = key;
      three.position1 = data[key][0];
      three.position2 = data[key][1];
      three.position3 = data[key][2];
      three.rank = 6;
      three.cards = list;
    }
  }

  return three;
};

const checkIfBetter = (oldThree, newThree) => {
  return oldThree.value <= newThree.value;
};

const searchOnList = (three, list) => {
  let newThree = searchForThree(list);

  if (newThree.value > 0) {
    if (checkIfBetter(three, newThree)) {
      three = Object.assign({}, newThree);
      three.rank = 6;
    }
  }
  return three;
};

const combinationsSearch = (
  three,
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
      let newThree = searchForThree(searchList);

      if (newThree.value > 0) {
        if (checkIfBetter(three, newThree)) {
          three = Object.assign({}, newThree);
          three.rank = 6;
        }
      }
    }
  }

  return three;
};
export { isThree };
