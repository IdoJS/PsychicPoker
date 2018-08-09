import { asyncGetAllPossibleSubArrayFromHand } from "../utils/combinations";
import { getValue } from "../utils/valuesConvertTable";

import { isHighCard } from "./rules/highCard";
import { isOnePair } from "./rules/onePair";
import { isTwoPair } from "./rules/twoPair";
import { isThree } from "./rules/three";
import { isStraight } from "./rules/straight";
import { isFlush } from "./rules/flush";
import { isFullHouse } from "./rules/fullHouse";
import { isFour } from "./rules/four";
import { isStraightFlush } from "./rules/straightFlush";

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
    isStraightFlush,
    isFour,
    isFullHouse,
    isFlush,
    isStraight,
    isThree,
    isTwoPair,
    isOnePair,
    isHighCard
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

export { entryPoint };
