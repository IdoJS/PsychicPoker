import { isFour } from "../../../logic/rules/four";

describe("Check isFour", () => {
  let hand = [];
  let replace = [];
  let result;

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "6D", "2H", "2D", "2S"];
    replace = [];
    result = isFour(hand, replace);
    expect(result.rank).toBe(2);
    expect(JSON.stringify(result.cards)).toBe('["2C","6D","2H","2D","2S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "6D", "2H", "2D", "2S"];
    replace = ["6S"];
    result = isFour(hand, replace);
    expect(result.rank).toBe(2);
    expect(JSON.stringify(result.cards)).toBe('["6S","2C","2H","2D","2S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "6D", "2H", "2D", "2S"];
    replace = ["6S", "6H"];
    result = isFour(hand, replace);
    expect(result.rank).toBe(15);
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "6D", "2H", "2D", "2S"];
    replace = ["6S", "6H", "6C"];
    result = isFour(hand, replace);
    expect(result.rank).toBe(2);
    expect(JSON.stringify(result.cards)).toBe('["6S","6H","6C","6D","2S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "6D", "2H", "2D", "2S"];
    replace = ["6S", "6H", "6C", "5C"];
    result = isFour(hand, replace);
    expect(result.rank).toBe(2);
    expect(JSON.stringify(result.cards)).toBe('["6S","6H","6C","5C","6D"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "6D", "2H", "2D", "2S"];
    replace = ["6S", "6H", "6C", "5C", "3C"];
    result = isFour(hand, replace);
    expect(result.rank).toBe(15);
  });
});
