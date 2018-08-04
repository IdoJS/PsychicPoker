import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isTwoPair = (userCards = [], replaceFromDeck = []) => {
  let cardList = userCards.concat(replaceFromDeck);
  let pairs = {
    highPair: {
      value: 0,
      positionI: -1,
      positionJ: -1
    },
    lowPair: {
      value: 0,
      positionI: -1,
      positionJ: -1
    },
    cards: [],
    rank: 15,
    hightest: 0
  };

  // find all pairs
  for (let i = 0; i < cardList.length - 2; i++) {
    let valueI = getValue(cardList[i]);

    for (let j = i + 1; j < cardList.length && j - i <= 5; j++) {
      let valueJ = getValue(cardList[j]);
      console.log("test", i, j, valueI, valueJ);
      let rangeList = [];
      if (valueI === valueJ) {
        if (pairs.highPair.value < valueI) {
          rangeList = addNotImportentCardsFromUser(
            cardList,
            replaceFromDeck,
            i, // highCardPositionI
            j, // highCardPositionJ
            pairs.highPair.positionI, // lowCardPositionI
            pairs.highPair.positionJ // lowCardPositionJ
          );

          if (rangeList.length <= 5) {
            pairs.lowPair = Object.assign({}, pairs.highPair);
            pairs.lowPair.value = pairs.highPair.value;
            pairs.highPair.value = valueI;
            pairs.highPair.positionI = i;
            pairs.highPair.positionJ = j;
            pairs.rank = 7;
            pairs.cards = rangeList;
          }
        } else if (pairs.lowPair.value < valueI) {
          rangeList = addNotImportentCardsFromUser(
            cardList,
            replaceFromDeck,
            i, // highCardPositionI
            j, // highCardPositionJ
            pairs.lowPair.positionI, // lowCardPositionI
            pairs.lowPair.positionJ // lowCardPositionJ
          );
          if (rangeList.length <= 5) {
            pairs.lowPair.value = valueI;
            pairs.lowPair.positionI = i;
            pairs.lowPair.positionJ = j;
            pairs.rank = 7;
            pairs.cards = rangeList;
          }
        }
      }
    }
  }

  pairs.cards = addNotImportentCardsFromUser(
    userCards.concat(replaceFromDeck),
    replaceFromDeck,
    pairs.highPair.positionI, // highCardPositionI
    pairs.highPair.positionJ, // highCardPositionJ
    pairs.lowPair.positionI, // lowCardPositionI
    pairs.lowPair.positionJ // lowCardPositionJ
  );
  console.log("baseResult, pairs", baseResult, pairs);

  return Object.assign(baseResult, pairs);
};

const addNotImportentCardsFromUser = (
  cardList = [],
  replaceFromDeck = [],
  highCardPositionI,
  highCardPositionJ,
  lowCardPositionI,
  lowCardPositionJ
) => {
  let resultCardList = [...replaceFromDeck];

  if (
    highCardPositionI >= 0 &&
    replaceFromDeck.indexOf(cardList[highCardPositionI]) === -1
  ) {
    resultCardList.push(cardList[highCardPositionI]);
  }
  if (
    highCardPositionJ >= 0 &&
    replaceFromDeck.indexOf(cardList[highCardPositionJ]) === -1
  ) {
    resultCardList.push(cardList[highCardPositionJ]);
  }

  if (
    lowCardPositionI >= 0 &&
    replaceFromDeck.indexOf(cardList[lowCardPositionI]) === -1
  ) {
    resultCardList.push(cardList[lowCardPositionI]);
  }
  if (
    lowCardPositionJ >= 0 &&
    replaceFromDeck.indexOf(cardList[lowCardPositionJ]) === -1
  ) {
    resultCardList.push(cardList[lowCardPositionJ]);
  }
  let sizeToRemove = 5 - resultCardList.length;
  for (let uc = 0; uc < cardList.length && sizeToRemove > 0; uc++) {
    if (
      uc !== highCardPositionI &&
      uc !== highCardPositionJ &&
      uc !== lowCardPositionI &&
      uc !== lowCardPositionJ
    ) {
      if (resultCardList.indexOf(cardList[uc]) === -1) {
        resultCardList.push(cardList[uc]);
        sizeToRemove--;
      }
    }
  }
  console.log(
    "resultCardList",
    cardList,
    resultCardList,
    replaceFromDeck,
    highCardPositionI,
    highCardPositionJ,
    lowCardPositionI,
    lowCardPositionJ
  );
  return resultCardList;
};

export { isTwoPair };
