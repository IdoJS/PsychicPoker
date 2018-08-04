import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isOnePair = (userCards = [], replaceFromDeck = []) => {
  let cardList = userCards.concat(replaceFromDeck);
  let pairs = {
    value: 0,
    cards: [],
    rank: 15,
    hightest: 0
  };

  // find all pairs
  for (let i = 0; i < cardList.length - 1; i++) {
    let valueI = getValue(cardList[i]);

    for (let j = i + 1; j < cardList.length && j - i <= 5; j++) {
      let valueJ = getValue(cardList[j]);

      if (valueI === valueJ) {
        if (pairs.value < valueI) {
          if (replaceFromDeck.indexOf(cardList[i]) === -1) {
            pairs.cards = [...replaceFromDeck, cardList[i]];
          }
          if (pairs.cards.length > 5) {
            // incorrect result
            pairs.cards = replaceFromDeck;
            break;
          } else {
            let sizeToRemove = 5 - pairs.cards.length;
            for (let uc = 0; uc < userCards.length && sizeToRemove > 0; uc++) {
              if (pairs.cards.indexOf(userCards[uc]) === -1) {
                pairs.cards.push(userCards[uc]);
                sizeToRemove--;
              }
            }
            pairs.hightest = valueI;
            pairs.value = valueI;
            pairs.indexStart = i;
            pairs.indexEnd = j;
            pairs.rank = 8;
          }
        }
      }
    }
  }
  console.log("baseResult, pairs", baseResult, pairs);

  return Object.assign(baseResult, pairs);
};

export { isOnePair };
