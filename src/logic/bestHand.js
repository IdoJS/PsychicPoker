import { isHighCard, isHighCardNew } from "./rules/highCard";
import { isOnePair, isOnePairNew } from "./rules/onePair";
import { isTwoPair, isTwoPairNew } from "./rules/twoPair";
import { isThree, isThreeNew } from "./rules/three";
import { isStraight, isStraightNew } from "./rules/straight";
import { isFlush, isFlushNew } from "./rules/flush";
import { isFullHouse, isFullHouseNew } from "./rules/fullHouse";
import { isFour, isFourNew } from "./rules/four";
import { isStraightFlush, isStraightFlushNew } from "./rules/straightFlush";

import { asyncGetAllPossibleSubArrayFromHand } from "../utils/combinations";
import { getValue } from "../utils/valuesConvertTable";

import constants from "../utils/constants";

const sortByValue = (a, b) => {
  return getValue(b) - getValue(a);
};

const straightComboGenerator = data => {
  const { newHandDeckCombo, additionalCombosForStraight } = data;
  const newCardList = [];
  let containAce = false;
  newHandDeckCombo.forEach((card, key) => {
    let newCard = card;
    if (card[0] === "A") {
      newCard = "1" + card[1];
      containAce = true;
    }
    newCardList.push(newCard);
  });

  if (containAce) {
    additionalCombosForStraight.push(newCardList.sort(sortByValue));
  }
};

const generatePossibleHands = (allPossibleSubArrayFromHand = {}, deck = []) => {
  return new Promise(resolve => {
    const allPossibleHands = [];
    const additionalCombosForStraight = [];

    Object.values(allPossibleSubArrayFromHand).forEach(
      (arrayOfAllSubArrayBySize = [], sizeOfTheSubArrays) => {
        // take from deck 5 - sizeOfTheSubArrays and attach them to all the arrayOfAllSubArrayBySize (hand combinations)
        const slicedArrayFromDeck = deck.slice(0, 5 - sizeOfTheSubArrays);

        arrayOfAllSubArrayBySize.forEach((subArray, key) => {
          // 1. create new combo
          const newHandDeckCombo = subArray.concat(slicedArrayFromDeck);
          // 2. sort combo by value
          allPossibleHands.push(newHandDeckCombo.sort(sortByValue));
          // 3. create new combo when ace is consider as 1
          straightComboGenerator({
            newHandDeckCombo,
            additionalCombosForStraight
          });
        });
      }
    );
    resolve({ allPossibleHands, additionalCombosForStraight });
  });
};

// return data if the rule else null
const checkIfRulePossible = data => {
  let {
    currentRule,
    allPossibleHands,
    additionalCombosForStraight,
    currentIndex
  } = data;

  if (currentIndex === 0 || currentIndex === 4) {
    allPossibleHands = allPossibleHands.concat(additionalCombosForStraight);
  }

  return allPossibleHands.reduce(currentRule, { rank: 15 });
};

async function entryPoint(hand = [], deck = []) {
  // 1. find all possible sub array from the hand and return in object arrange by size of sub array
  let allPossibleSubArrayFromHand = await asyncGetAllPossibleSubArrayFromHand(
    hand
  );
  // 2. find all possible combinations of hand and deck (sorted)
  let {
    allPossibleHands,
    additionalCombosForStraight
  } = await generatePossibleHands(allPossibleSubArrayFromHand, deck);

  // 3. rule list
  const ruleList = [
    isStraightFlushNew,
    isFourNew,
    isFullHouseNew,
    isFlushNew,
    isStraightNew,
    isThreeNew,
    isTwoPairNew,
    isOnePairNew,
    isHighCardNew
  ];

  // 4. find best hand by rule
  const result = ruleList.reduce(
    (currentBestHand, currentRule, currentIndex, array) => {
      if (currentBestHand.rank === 15) {
        currentBestHand = checkIfRulePossible({
          currentRule,
          allPossibleHands,
          additionalCombosForStraight,
          currentIndex
        });
      }

      return currentBestHand;
    },
    { rank: 15 }
  );

  console.log("entryPoint result", result);

  return result;
}

const findBestHand = (hand = [], deck = []) => {
  let bestResult = {
    rank: 15,
    highest: 0,
    takeFromDeck: []
  };
  let result;
  bestResult = checkAllPossibleHandType(hand, []);

  for (let i = 1; i <= deck.length; i++) {
    let replaceFromDeck = deck.slice(0, i);
    result = checkAllPossibleHandType(hand, replaceFromDeck);
    if (result.rank < bestResult.rank) {
      bestResult = Object.assign({}, result);
      bestResult.takeFromDeck = replaceFromDeck;
    } else if (result.rank === bestResult.rank) {
      switch (result.rank) {
        case constants.NAME_TO_RANK.STRAIGHT_FLUSH:
        case constants.NAME_TO_RANK.FOUR:
        case constants.NAME_TO_RANK.THREE:
        case constants.NAME_TO_RANK.HIGH_CARD:
        case constants.NAME_TO_RANK.FLUSH:
        case constants.NAME_TO_RANK.STRAIGHT:
        case constants.NAME_TO_RANK.FULL_HOUSE:
          if (result.highest > bestResult.highest) {
            bestResult = Object.assign({}, result);
            bestResult.takeFromDeck = replaceFromDeck;
          }
          break;

        case constants.NAME_TO_RANK.TWO_PAIR:
          if (result.highPair.value > bestResult.highPair.value) {
            bestResult = Object.assign({}, result);
            bestResult.takeFromDeck = replaceFromDeck;
          }
          if (
            result.highPair.value === bestResult.highPair.value &&
            result.lowPair.value > bestResult.lowPair.value
          ) {
            bestResult = Object.assign({}, result);
            bestResult.takeFromDeck = replaceFromDeck;
          }
          break;
        case constants.NAME_TO_RANK.ONE_PAIR:
          if (result.highPair.value > bestResult.highPair.value) {
            bestResult = Object.assign({}, result);
            bestResult.takeFromDeck = replaceFromDeck;
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

export { findBestHand, entryPoint };
