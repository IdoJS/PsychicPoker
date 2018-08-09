import { entryPoint } from "../../../logic/bestHand";

describe("mock tests ", () => {
  let hand;
  let deck;
  it("Hand: TH JH QC QD QS Deck: QH KH AH 2S 6S Best hand: straight-flush", done => {
    hand = ["TH", "JH", "QC", "QD", "QS"];
    deck = ["QH", "KH", "AH", "2S", "6S"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(1);
      expect(JSON.stringify(result.cards)).toBe('["AH","KH","QH","JH","TH"]');
      done();
    });
  });

  it("Hand: 2H 2S 3H 3S 3C Deck: 2D 3D 6C 9C TH Best hand: four-of-a-kind", done => {
    hand = ["2H", "2S", "3H", "3S", "3C"];
    deck = ["2D", "3D", "6C", "9C", "TH"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(2);
      expect(JSON.stringify(result.cards)).toBe('["3H","3S","3C","3D","2D"]');
      done();
    });
  });

  it("Hand: 2H 2S 3H 3S 3C Deck: 2D 9C 3D 6C TH Best hand: full-house", done => {
    hand = ["2H", "2S", "3H", "3S", "3C"];
    deck = ["2D", "9C", "3D", "6C", "TH"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(3);
      expect(JSON.stringify(result.cards)).toBe('["3H","3S","3C","2H","2D"]');
      done();
    });
  });

  it("Hand: 2H AD 5H AC 7H Deck: AH 6H 9H 4H 3C Best hand: flush", done => {
    hand = ["2H", "AD", "5H", "AC", "7H"];
    deck = ["AH", "6H", "9H", "4H", "3C"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(4);
      expect(JSON.stringify(result.cards)).toBe('["AH","9H","6H","4H","2H"]');
      done();
    });
  });

  it("Hand: AC 2D 9C 3S KD Deck: 5S 4D KS AS 4C Best hand: straight", done => {
    hand = ["AC", "2D", "9C", "3S", "KD"];
    deck = ["5S", "4D", "KS", "AS", "4C"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(5);
      expect(JSON.stringify(result.cards)).toBe('["5S","4D","3S","2D","1C"]');
      done();
    });
  });

  it("Hand: AC 2D 6C 3S KD Deck: 5S 4D KS AS 4C Best hand: straight", done => {
    hand = ["AC", "2D", "6C", "3S", "KD"];
    deck = ["5S", "4D", "KS", "AS", "4C"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(5);
      expect(JSON.stringify(result.cards)).toBe('["6C","5S","4D","3S","2D"]');
      done();
    });
  });

  it("Hand: KS AH 2H 3C 4H Deck: KC 2C TC 2D AS Best hand: three-of-a-kind", done => {
    hand = ["KS", "AH", "2H", "3C", "4H"];
    deck = ["KC", "2C", "TC", "2D", "AS"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(6);
      expect(JSON.stringify(result.cards)).toBe('["KC","TC","2H","2C","2D"]');
      done();
    });
  });

  it("Hand: AH 2C 9S AD 3C Deck: QH KS JS JD KD Best hand: two-pairs", done => {
    hand = ["AH", "2C", "9S", "AD", "3C"];
    deck = ["QH", "KS", "JS", "JD", "KD"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(7);
      expect(JSON.stringify(result.cards)).toBe('["KS","KD","QH","JS","JD"]');
      done();
    });
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H TC 4C 9S AH Best hand: one-pair", done => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    deck = ["2H", "TC", "4C", "9S", "AH"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(8);
      expect(JSON.stringify(result.cards)).toBe('["TC","9C","9S","4C","2H"]');
      done();
    });
  });

  it("Hand: TH JH QC QD QS Deck: QH KH AH 2S 6S Best hand: straight-flush", done => {
    hand = ["TH", "JH", "QC", "QD", "QS"];
    deck = ["QH", "KH", "AH", "2S", "6S"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(1);
      expect(JSON.stringify(result.cards)).toBe('["AH","KH","QH","JH","TH"]');
      done();
    });
  });

  it("Hand: 2H 2S 3H 3S 3C Deck: 2D 3D 6C 9C TH Best hand: four-of-a-kind", done => {
    hand = ["2H", "2S", "3H", "3S", "3C"];
    deck = ["2D", "3D", "6C", "9C", "TH"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(2);
      expect(JSON.stringify(result.cards)).toBe('["3H","3S","3C","3D","2D"]');

      done();
    });
  });

  it("Hand: 2H 2S 3H 3S 3C Deck: 2D 9C 3D 6C TH Best hand: full-house", done => {
    hand = ["2H", "2S", "3H", "3S", "3C"];
    deck = ["2D", "9C", "3D", "6C", "TH"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(3);
      expect(JSON.stringify(result.cards)).toBe('["3H","3S","3C","2H","2D"]');
      done();
    });
  });

  it("Hand: 2H AD 5H AC 7H Deck: AH 6H 9H 4H 3C Best hand: flush", done => {
    hand = ["2H", "AD", "5H", "AC", "7H"];
    deck = ["AH", "6H", "9H", "4H", "3C"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(4);
      expect(JSON.stringify(result.cards)).toBe('["AH","9H","6H","4H","2H"]');
      done();
    });
  });

  it("Hand: AC 2D 9C 3S KD Deck: 5S 4D KS AS 4C Best hand: straight", done => {
    hand = ["AC", "2D", "9C", "3S", "KD"];
    deck = ["5S", "4D", "KS", "AS", "4C"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(5);
      expect(JSON.stringify(result.cards)).toBe('["5S","4D","3S","2D","1C"]');
      done();
    });
  });

  it("Hand: AC 2D 6C 3S KD Deck: 5S 4D KS AS 4C Best hand: straight", done => {
    hand = ["AC", "2D", "6C", "3S", "KD"];
    deck = ["5S", "4D", "KS", "AS", "4C"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(5);
      expect(JSON.stringify(result.cards)).toBe('["6C","5S","4D","3S","2D"]');
      done();
    });
  });

  it("Hand: KS AH 2H 3C 4H Deck: KC 2C TC 2D AS Best hand: three-of-a-kind", () => {
    hand = ["KS", "AH", "2H", "3C", "4H"];
    deck = ["KC", "2C", "TC", "2D", "AS"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(6);
      expect(JSON.stringify(result.cards)).toBe('["KC","TC","2H","2C","2D"]');
    });
  });

  it("Hand: AH 2C 9S AD 3C Deck: QH KS JS JD KD Best hand: two-pairs", done => {
    hand = ["AH", "2C", "9S", "AD", "3C"];
    deck = ["QH", "KS", "JS", "JD", "KD"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(7);
      expect(JSON.stringify(result.cards)).toBe('["KS","KD","QH","JS","JD"]');
      done();
    });
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H TC 4C 9S AH Best hand: one-pair", done => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    deck = ["2H", "TC", "4C", "9S", "AH"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(8);
      expect(JSON.stringify(result.cards)).toBe('["TC","9C","9S","4C","2H"]');
      done();
    });
  });

  it("Hand: 3D 5S 2H QD TD Deck: 6S KH 9H AD QH Best hand: highest-card", done => {
    hand = ["3D", "5S", "2H", "QD", "TD"];
    deck = ["6S", "KH", "9H", "AD", "QH"];
    entryPoint(hand, deck).then(result => {
      expect(result.rank).toBe(9);
      expect(JSON.stringify(result.cards)).toBe('["AD","KH","QH","9H","6S"]');
      done();
    });
  });
});
