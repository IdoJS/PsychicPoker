import baseResult from "../../utils/baseResult";
import { getValue } from "../../utils/valuesConvertTable";
/**
 * input - userCards :5 cards
 *        replaceFromDeck: [1..5] cards
 * output - is high-card & hightest card value & card list
 */

const isHighCard = (userCards = [], replaceFromDeck = []) => {
  let result = Object.assign({}, baseResult);

  let highestCard = 0;

  // find high card at the user deck
  for (let i = 0; i < userCards.length; i++) {
    let cardValue = getValue(userCards[i]);
    if (cardValue > highestCard) {
      highestCard = cardValue;
      result.rank = 9;
      result.cards = userCards;
      result.hightest = userCards[i];
    }
  }
  let cardList = userCards.concat(replaceFromDeck);
  // find high card at the replaceFromDeck
  for (let i = 0; i < replaceFromDeck.length; i++) {
    let cardValue = getValue(replaceFromDeck[i]);
    if (cardValue > highestCard) {
      highestCard = cardValue;
      result.rank = 9;
      result.cards = cardList;
      result.hightest = replaceFromDeck[i];
    }
    cardList.shift();
  }

  return result;
};

export { isHighCard };
