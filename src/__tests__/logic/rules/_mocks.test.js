import { findBestHand } from "../../../logic/bestHand";

describe("mock tests", () => {
  let hand;
  let deck;
  let result;
  it("Hand: TH JH QC QD QS Deck: QH KH AH 2S 6S Best hand: straight-flush", () => {
    hand = ["TH", "JH", "QC", "QD", "QS"];
    deck = ["QH", "KH", "AH", "2S", "6S"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(1);
    expect(JSON.stringify(result.cards)).toBe('["QH","KH","AH","TH","JH"]');
  });

  it("Hand: 2H 2S 3H 3S 3C Deck: 2D 3D 6C 9C TH Best hand: four-of-a-kind", () => {
    hand = ["2H", "2S", "3H", "3S", "3C"];
    deck = ["2D", "3D", "6C", "9C", "TH"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(2);
    expect(JSON.stringify(result.cards)).toBe('["2D","3D","3H","3S","3C"]');
  });

  it("Hand: 2H 2S 3H 3S 3C Deck: 2D 9C 3D 6C TH Best hand: full-house", () => {
    hand = ["2H", "2S", "3H", "3S", "3C"];
    deck = ["2D", "9C", "3D", "6C", "TH"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(3);
    expect(JSON.stringify(result.cards)).toBe('["2H","2S","3H","3S","3C"]');
  });

  it("Hand: 2H AD 5H AC 7H Deck: AH 6H 9H 4H 3C Best hand: flush", () => {
    hand = ["2H", "AD", "5H", "AC", "7H"];
    deck = ["AH", "6H", "9H", "4H", "3C"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(4);
    expect(JSON.stringify(result.cards)).toBe('["AH","6H","2H","5H","7H"]');
  });

  it("Hand: AC 2D 9C 3S KD Deck: 5S 4D KS AS 4C Best hand: straight", () => {
    hand = ["AC", "2D", "9C", "3S", "KD"];
    deck = ["5S", "4D", "KS", "AS", "4C"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(5);
    expect(JSON.stringify(result.cards)).toBe('["5S","4D","AC","2D","3S"]');
  });

  it("Hand: KS AH 2H 3C 4H Deck: KC 2C TC 2D AS Best hand: three-of-a-kind", () => {
    hand = ["KS", "AH", "2H", "3C", "4H"];
    deck = ["KC", "2C", "TC", "2D", "AS"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(6);
    expect(JSON.stringify(result.cards)).toBe('["KC","2C","TC","2D","2H"]');
  });

  it("Hand: AH 2C 9S AD 3C Deck: QH KS JS JD KD Best hand: two-pairs", () => {
    hand = ["AH", "2C", "9S", "AD", "3C"];
    deck = ["QH", "KS", "JS", "JD", "KD"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(7);
    expect(JSON.stringify(result.cards)).toBe('["QH","KS","JS","JD","KD"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H TC 4C 9S AH Best hand: one-pair", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    deck = ["2H", "TC", "4C", "9S", "AH"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(8);
    expect(JSON.stringify(result.cards)).toBe('["2H","TC","4C","9S","9C"]');
  });

  it("Hand: 3D 5S 2H QD TD Deck: 6S KH 9H AD QH Best hand: highest-card", () => {
    hand = ["3D", "5S", "2H", "QD", "TD"];
    deck = ["6S", "KH", "9H", "AD", "QH"];
    result = findBestHand(hand, deck);
    expect(result.rank).toBe(9);
    expect(JSON.stringify(result.cards)).toBe('["6S","KH","9H","AD","TD"]');
  });
});
