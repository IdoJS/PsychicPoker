const pickRandom = (numberOfCards = 10) => {
  const pokerValues = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "j",
    "Q",
    "K"
  ];
  const pokerSuits = ["C", "D", "H", "S"];

  const deck = {
    uniqeCardsCheck: {},
    cards: []
  };

  while (deck.cards.length < 10) {
    let value = pokerValues[Math.floor(Math.random() * pokerValues.length)];
    let suits = pokerSuits[Math.floor(Math.random() * pokerSuits.length)];

    let card = value + suits;
    if (!deck.cards[card]) {
      deck.cards[card] = card;
      deck.cards.push(card);
    }
  }

  return deck.cards;
};

export { pickRandom };
