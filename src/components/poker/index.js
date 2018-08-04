import React from "react";
import PropTypes from "prop-types";
import constants from "../../utils/constants";
import rankTable from "../../utils/rankTable";
import { pickRandom } from "../../utils/randomDeck";

import CardView from "./cardView";
import { manageCards } from "../../logic/manageCards";

class Poker extends React.Component {
  state = {
    hand: [],
    deck: [],
    handBlink: [],
    deckBlink: [],
    bestHand: 15
  };

  componentWillMount() {
    this.drawNewCards();
  }

  render() {
    return (
      <div className="pages poker">
        <div onClick={this.drawNewCards.bind(this)}>
          best hand {rankTable[this.state.bestHand]}
        </div>
        <div>
          <CardView
            cards={this.state.hand}
            blinkList={this.state.handBlink}
            type="hand"
            removeCard={this.removeCard.bind(this)}
          />

          <CardView
            cards={this.state.deck}
            blinkList={this.state.deckBlink}
            type="deck"
            removeCard={this.removeCard.bind(this)}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { hand, deck } = this.state;
    let result = manageCards(hand, deck);
    let { takeFromDeck, removeFromUser } = result;
    this.setState({
      handBlink: removeFromUser,
      deckBlink: takeFromDeck,
      bestHand: result.rank
    });
  }
  removeCard(ev) {
    const value = ev.target.innerText;
    const type = ev.target.getAttribute("data-type");
    const { hand, deck } = this.state;

    if (deck.length > 0) {
      switch (type) {
        case "hand":
          // draw from deck
          let cardFromDeck = deck.shift();
          // remove from hand
          let index = hand.indexOf(value);
          if (index >= 0) {
            hand[index] = cardFromDeck;
          }
          this.setState({
            hand,
            deck
          });
          break;
        case "deck":
          break;
        default:
          break;
      }
    }
  }
  drawNewCards() {
    const cards = pickRandom(10);
    const hand = cards.slice(0, 5);
    const deck = cards.slice(5, 10);
    const result = manageCards(hand, deck);
    let { takeFromDeck, removeFromUser } = result;
    console.log(result, cards);
    this.setState({
      handBlink: removeFromUser,
      deckBlink: takeFromDeck,
      bestHand: result.rank,
      hand,
      deck
    });
  }
}

export default Poker;
