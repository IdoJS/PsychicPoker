import { entryPoint } from './bestHand';
import { toFullCard } from '../utils/valuesConvertTable';

const manageCards = (hand = [], deck = []) => {
  return new Promise(resolve => {
    entryPoint(hand, deck).then(result => {
      let removeFromUser = [];
      let takeFromDeck = [];
      let keepInHand = [];

      result.cards.forEach((value, key) => {
        let card = toFullCard(value);
        if (deck.indexOf(value) !== -1) {
          takeFromDeck.push(card);
        } else {
          keepInHand.push(card);
        }
      });

      hand.forEach((value, key) => {
        if (keepInHand.indexOf(value) === -1) {
          removeFromUser.push(value);
        }
      });

      resolve({
        removeFromUser,
        takeFromDeck,
        rank: result.rank,
        bestHand: result.cards
      });
    });
  });
};

export { manageCards };
