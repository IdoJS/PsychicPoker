import { isOnePair } from "../../../logic/rules/onePair";
import { manageCards } from "../../../logic/manageCards";

describe("Check isOnePair ", () => {
  let hand = [];
  let replace = [];
  let result;

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = [];
    result = isOnePair(hand, replace);
    expect(result.rank).toBe(15);
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H"];
    result = isOnePair(hand, replace);
    expect(result.rank).toBe(8);
    expect(result.highPair.value).toBe("2");
    expect(JSON.stringify(result.cards)).toBe('["2H","6C","9C","8C","2D"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D"];
    result = isOnePair(hand, replace);

    expect(result.rank).toBe(8);
    expect(result.highPair.value).toBe("8");
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","6C","9C","8C"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D", "4C"];
    result = isOnePair(hand, replace);
    expect(result.rank).toBe(8);
    expect(result.highPair.value).toBe("8");
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","6C","8C"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D", "4C", "9S"];
    result = isOnePair(hand, replace);

    expect(result.rank).toBe(8);
    expect(result.highPair.value).toBe("9");
    expect(JSON.stringify(result.cards)).toBe('["2H","8D","4C","9S","9C"]');
  });

  it("Hand: 6C 9C 8C 2D 7C Deck: 2H", () => {
    hand = ["6C", "9C", "8C", "2D", "7C"];
    replace = ["2H", "8D", "4C", "9S", "AH"];
    result = isOnePair(hand, replace);

    expect(result.rank).toBe(15);
  });

  it("[KH, 3H, 8S, 2H, 3S, AC, 7D, 2D, 8H, 2C]", () => {
    hand = ["KH", "3H", "8S", "2H", "3S"];
    replace = ["AC", "7D", "2D", "8H", "2C"];
    result = manageCards(hand, replace);
    expect(result.rank).toBe(8);
    expect(JSON.stringify(result.bestHand)).toBe('["AC","7D","2D","8H","8S"]');
  });

  it("Hand: 6C 6D 8C 2D 7C Deck: 2H", () => {
    hand = ["2H", "8H", "3S", "2C", "TS"];
    replace = ["JC", "KD", "QC", "7H", "JD"];
    result = manageCards(hand, replace);

    expect(result.rank).toBe(8);
    expect(JSON.stringify(result.bestHand)).toBe('["JC","KD","QC","7H","JD"]');
  });
});
