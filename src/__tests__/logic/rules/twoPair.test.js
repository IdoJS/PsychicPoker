import { isTwoPair } from "../../../logic/rules/twoPair";

describe("Check isOnePair", () => {
  let hand = [];
  let replace = [];
  let result;

  // it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
  //   hand = ["6C", "6D", "8C", "2D", "7C"];
  //   replace = ["2H"];
  //   result = isTwoPair(hand, replace);
  //   expect(result.rank).toBe(7);
  //   expect(JSON.stringify(result.cards)).toBe('["2H","6C","6D","2D","8C"]');
  // });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D"];
    result = isTwoPair(hand, replace);
    console.log("8", result);
    expect(result.rank).toBe(7);
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","8C","6C","9C"]');
  });

  // it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
  //   hand = ["6C", "9C", "8C", "2D", "7C"];
  //   replace = ["2H", "8D", "4C"];
  //   result = isOnePair(hand, replace);

  //   expect(result.rank).toBe(8);
  //   expect(result.hightest).toBe("8");
  //   expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","8C","6C"]');
  // });

  // it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
  //   hand = ["6C", "9C", "8C", "2D", "7C"];
  //   replace = ["2H", "8D", "4C", "9S"];
  //   result = isOnePair(hand, replace);

  //   expect(result.rank).toBe(8);
  //   expect(result.hightest).toBe("8");
  //   expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","9S","8C"]');
  // });

  // it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
  //   hand = ["6C", "9C", "8C", "2D", "7C"];
  //   replace = ["2H", "8D", "4C", "9S", "AH"];
  //   result = isOnePair(hand, replace);

  //   expect(result.rank).toBe(15);
  //   expect(result.hightest).toBe(0);
  //   expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","9S","AH"]');
  // });
});
