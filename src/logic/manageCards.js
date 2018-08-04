import { findBestHand } from "./bestHand";

const manageCards = (hand = [], deck = []) => {
  let result = findBestHand(hand, deck);

  let removeFromUser = [];

  for (let i = 0; i < hand.length; i++) {
    if (result.cards.indexOf(hand[i]) === -1) {
      removeFromUser.push(hand[i]);
    }
  }

  return {
    removeFromUser,
    takeFromDeck: result.takeFromDeck || [],
    rank: result.rank,
    bestHand: result.cards
  };
};

export { manageCards };
