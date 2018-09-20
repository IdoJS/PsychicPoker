import { asyncGetAllPossibleSubArrayFromHand } from '../utils/combinations';
import { sortByValue } from '../utils/sortCards';
import { isHighCard } from './rules/highCard';
import { isOnePair } from './rules/onePair';
import { isTwoPair } from './rules/twoPair';
import { isThree } from './rules/three';
import { isStraight } from './rules/straight';
import { isFlush } from './rules/flush';
import { isFullHouse } from './rules/fullHouse';
import { isFour } from './rules/four';
import { isStraightFlush } from './rules/straightFlush';

/**
 * Add addiotional combinations for straight/straightFlush rules
 * Ace can consider as 1 or 14
 */
const straightComboGenerator = data => {
  const { newHandDeckCombo, additionalCombosForStraight } = data;
  const newCardList = [];
  let containAce = false;
  newHandDeckCombo.forEach((card, key) => {
    let newCard = card;
    if (card[0] === 'A') {
      newCard = '1' + card[1];
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

    Object.values(allPossibleSubArrayFromHand).forEach((arrayOfAllSubArrayBySize = [], sizeOfTheSubArrays) => {
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
    });
    resolve({ allPossibleHands, additionalCombosForStraight });
  });
};

/**
 * input:
 * currentRule - function to check if the rule is fullfilled
 * allPossibleHands - list of all possible hands when ace value (14)
 * additionalCombosForStraight - list of all possible hands when ace value (1)
 * currentIndex - index of current rule in the rules array
 * output - check if current rule is fullfilled
 */
const checkIfRulePossible = ({ currentRule, allPossibleHands, additionalCombosForStraight, currentIndex }) => {
  if (currentIndex === 0 || currentIndex === 4) {
    // 0 - isStraightFlush , 4 - isStraight
    let isRuleFullfilled = allPossibleHands.reduce(currentRule, { rank: 15 });
    if (isRuleFullfilled.rank === 15) {
      // check straight with ace value (1) should be check only if can't find fullfillment for the rule when ace value (14)
      isRuleFullfilled = additionalCombosForStraight.reduce(currentRule, { rank: 15 });
    }
    return isRuleFullfilled;
  } else {
    return allPossibleHands.reduce(currentRule, { rank: 15 });
  }
};

async function entryPoint(hand = [], deck = []) {
  // 1. find all possible sub array from the hand and return in object arrange by size of sub array
  let allPossibleSubArrayFromHand = await asyncGetAllPossibleSubArrayFromHand(hand);
  // 2. find all possible combinations of hand and deck (sorted)
  let { allPossibleHands, additionalCombosForStraight } = await generatePossibleHands(allPossibleSubArrayFromHand, deck);
  // 3. rule list
  const ruleList = [isStraightFlush, isFour, isFullHouse, isFlush, isStraight, isThree, isTwoPair, isOnePair, isHighCard];
  // 4. find best hand by rule
  const result = ruleList.reduce(
    (currentBestHand, currentRule, currentIndex, rules) => {
      if (currentBestHand.rank === 15) {
        currentBestHand = checkIfRulePossible({
          currentRule,
          allPossibleHands,
          additionalCombosForStraight,
          currentIndex
        });
      } else {
        // if fullfill rule, stop loop
        rules.splice(1); // way to break reduce, not wise to use because mutating the array
      }
      return currentBestHand;
    },
    { rank: 15 }
  );

  return result;
}

export { entryPoint };
