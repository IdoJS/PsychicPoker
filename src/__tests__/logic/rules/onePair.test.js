import { isOnePair } from "../../../logic/rules/onePair";

describe("Check isOnePair", () => {
  let hand = [];
  let replace = [];
  let result;

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H"];
    result = isOnePair(hand, replace);
    expect(result.rank).toBe(8);
    expect(result.hightest).toBe("2");
    expect(JSON.stringify(result.cards)).toBe('["2H","2D","6C","9C","8C"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D"];
    result = isOnePair(hand, replace);

    expect(result.rank).toBe(8);
    expect(result.hightest).toBe("8");
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","8C","6C","9C"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D", "4C"];
    result = isOnePair(hand, replace);

    expect(result.rank).toBe(8);
    expect(result.hightest).toBe("8");
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","8C","6C"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D", "4C", "9S"];
    result = isOnePair(hand, replace);

    expect(result.rank).toBe(8);
    expect(result.hightest).toBe("8");
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","9S","8C"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D", "4C", "9S", "AH"];
    result = isOnePair(hand, replace);

    expect(result.rank).toBe(15);
    expect(result.hightest).toBe(0);
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","9S","AH"]');
  });
});
