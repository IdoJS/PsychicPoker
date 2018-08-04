import { isFullHouse } from "../../../logic/rules/fullHouse";

describe("Check isFullHouse", () => {
  let hand = [];
  let replace = [];
  let result;

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "5D", "2H", "2D", "5S"];
    replace = [];
    result = isFullHouse(hand, replace);
    expect(result.rank).toBe(3);
    expect(JSON.stringify(result.cards)).toBe('["2C","5D","2H","2D","5S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "5D", "2H", "2D", "5S"];
    replace = ["5H"];
    result = isFullHouse(hand, replace);
    expect(result.rank).toBe(3);
    expect(JSON.stringify(result.cards)).toBe('["5H","5D","2H","2D","5S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "5D", "2H", "2D", "5S"];
    replace = ["5H", "6C"];
    result = isFullHouse(hand, replace);
    expect(result.rank).toBe(15);
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "5D", "2H", "2D", "5S"];
    replace = ["5H", "6C", "6H"];
    result = isFullHouse(hand, replace);
    expect(result.rank).toBe(3);
    expect(JSON.stringify(result.cards)).toBe('["5H","6C","6H","5D","5S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "5D", "2H", "2D", "5S"];
    replace = ["5H", "6C", "6H", "6S"];
    result = isFullHouse(hand, replace);
    expect(result.rank).toBe(3);
    expect(JSON.stringify(result.cards)).toBe('["5H","6C","6H","6S","5S"]');
  });

  it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
    hand = ["2C", "5D", "2H", "2D", "5S"];
    replace = ["5H", "6C", "6H", "6S", "5D"];
    result = isFullHouse(hand, replace);
    expect(result.rank).toBe(3);
    expect(JSON.stringify(result.cards)).toBe('["5H","6C","6H","6S","5D"]');
  });
});
