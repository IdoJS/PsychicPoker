import { isHighCard } from "./rules/highCard";
import { isOnePair } from "./rules/onePair";
import { isTwoPair } from "./rules/twoPair";
import { isThree } from "./rules/three";
import { isStraight } from "./rules/straight";
import { isFlush } from "./rules/flush";
import { isFullHouse } from "./rules/fullHouse";
import { isFour } from "./rules/four";
import { isStraightFlush } from "./rules/straightFlush";

import constants from "../utils/constants";

const findBestHand = (hand = [], deck = []) => {
  let bestResult = {
    rank: 15,
    highest: 0
  };
  let result;
  bestResult = checkAllPossibleHandType(hand, []);

  for (let i = 1; i <= deck.length; i++) {
    let replaceFromDeck = deck.slice(0, i);
    result = checkAllPossibleHandType(hand, replaceFromDeck);
    if (result.rank < bestResult.rank) {
      bestResult = Object.assign({}, result);
    } else if (result.rank === bestResult.rank) {
      switch (result.rank) {
        case constants.NAME_TO_RANK.STRAIGHT_FLUSH:
        case constants.NAME_TO_RANK.FOUR:
        case constants.NAME_TO_RANK.THREE:
        case constants.NAME_TO_RANK.HIGH_CARD:
        case constants.NAME_TO_RANK.FLUSH:
        case constants.NAME_TO_RANK.STRAIGHT:
        case constants.NAME_TO_RANK.ONE_PAIR:
        case constants.NAME_TO_RANK.FULL_HOUSE:
          if (result.highest > bestResult.highest) {
            bestResult = Object.assign({}, result);
          }
          break;

        case constants.NAME_TO_RANK.TWO_PAIR:
          if (result.highPair.value > bestResult.highPair.value) {
            bestResult = Object.assign({}, result);
          }
          if (
            result.highPair.value === bestResult.highPair.value &&
            result.lowPair.value > bestResult.lowPair.value
          ) {
            bestResult = Object.assign({}, result);
          }
          break;
        default:
          break;
      }
    }
  }

  return bestResult;
};

const checkAllPossibleHandType = (handCards, replaceFromDeck) => {
  let result = isStraightFlush(handCards, replaceFromDeck);
  if (result.rank === 1) return result;
  result = isFour(handCards, replaceFromDeck);
  if (result.rank === 2) return result;
  result = isFullHouse(handCards, replaceFromDeck);
  if (result.rank === 3) return result;
  result = isFlush(handCards, replaceFromDeck);
  if (result.rank === 4) return result;
  result = isStraight(handCards, replaceFromDeck);
  if (result.rank === 5) return result;
  result = isThree(handCards, replaceFromDeck);
  if (result.rank === 6) return result;
  result = isTwoPair(handCards, replaceFromDeck);
  if (result.rank === 7) return result;
  result = isOnePair(handCards, replaceFromDeck);
  if (result.rank === 8) return result;
  result = isHighCard(handCards, replaceFromDeck);
  if (result.rank === 9) return result;
};

export { findBestHand };
