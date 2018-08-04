import { isStraight } from "../../../logic/rules/straight";

describe("Check isStraight", () => {
  let hand = [];
  let replace = [];
  let result;

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "3D", "4H", "5D", "6S"];
    replace = [];
    result = isStraight(hand, replace);
    expect(result.rank).toBe(5);
    expect(JSON.stringify(result.cards)).toBe('["2C","3D","4H","5D","6S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "3D", "4H", "5D", "6S"];
    replace = ["4H"];
    result = isStraight(hand, replace);
    expect(result.rank).toBe(5);
    expect(JSON.stringify(result.cards)).toBe('["4H","2C","3D","5D","6S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "3D", "4H", "5D", "6S"];
    replace = ["4H", "7C"];
    result = isStraight(hand, replace);
    expect(result.rank).toBe(5);
    expect(JSON.stringify(result.cards)).toBe('["4H","7C","3D","5D","6S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "3D", "4H", "5D", "6S"];
    replace = ["4H", "7C", "8D"];
    result = isStraight(hand, replace);
    expect(result.rank).toBe(5);
    expect(JSON.stringify(result.cards)).toBe('["4H","7C","8D","5D","6S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "3D", "4H", "5D", "6S"];
    replace = ["4H", "7C", "8D", "6S"];
    result = isStraight(hand, replace);
    expect(result.rank).toBe(5);
    expect(JSON.stringify(result.cards)).toBe('["4H","7C","8D","6S","5D"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "3D", "4H", "5D", "6S"];
    replace = ["4H", "7C", "8D", "6S", "5C"];
    result = isStraight(hand, replace);
    expect(result.rank).toBe(5);
    expect(JSON.stringify(result.cards)).toBe('["4H","7C","8D","6S","5C"]');
  });
});
