import { isTwoPair } from "../../../logic/rules/twoPair";

describe("Check isOnePair", () => {
  let hand = [];
  let replace = [];
  let result;

  it("Hand: 6C 6D 8C 2D 7C Deck: ", () => {
    hand = ["6C", "6D", "8C", "2D", "2C"];
    replace = [];
    result = isTwoPair(hand, replace);
    expect(result.rank).toBe(7);
    expect(JSON.stringify(result.cards)).toBe('["6C","6D","8C","2D","2C"]');
  });

  it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "6D", "8C", "2D", "7C"];
    replace = ["2H"];
    result = isTwoPair(hand, replace);
    expect(result.rank).toBe(7);
    expect(JSON.stringify(result.cards)).toBe('["2H","6C","6D","2D","7C"]');
  });

  it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "6D", "8C", "2D", "7C"];
    replace = ["2H", "8D"];
    result = isTwoPair(hand, replace);
    expect(result.rank).toBe(7);
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","6C","6D","8C"]');
  });

  it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "6D", "8C", "2D", "7C"];
    replace = ["2H", "8D", "7D"];
    result = isTwoPair(hand, replace);
    expect(result.rank).toBe(7);
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","7D","8C","7C"]');
  });

  it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "6D", "8C", "2D", "7C"];
    replace = ["2H", "8D", "7D", "AD"];
    result = isTwoPair(hand, replace);
    expect(result.rank).toBe(15);
  });

  it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "6D", "8C", "2D", "7C"];
    replace = ["2H", "8D", "7D", "AD", "AC"];
    result = isTwoPair(hand, replace);
    expect(result.rank).toBe(15);
  });

  it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "6D", "8C", "2D", "7C"];
    replace = ["8H", "8D", "7D", "AD", "AC"];
    result = isTwoPair(hand, replace);
    expect(result.rank).toBe(7);
    expect(JSON.stringify(result.cards)).toBe('["8H","8D","7D","AD","AC"]');
  });
});
