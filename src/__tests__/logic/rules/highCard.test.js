import { isHighCard } from "../../../logic/rules/highCard";

describe("Check isHighCard", () => {
  let hand = [];
  let replace = [];
  let result;

  it("Hand: 3D 5S 2H QD TD Deck: 6S", () => {
    hand = ["3D", "5S", "2H", "QD", "TD"];
    replace = ["6S"];
    result = isHighCard(hand, replace);
    expect(result.rank).toBe(9);
    expect(result.cardHighValue).toBe("QD");
    expect(JSON.stringify(result.cards)).toBe('["3D","5S","2H","QD","TD"]');
  });

  it("Hand: 3D 5S 2H QD TD Deck: 6S KH", () => {
    hand = ["3D", "5S", "2H", "QD", "TD"];
    replace = ["6S", "KH"];
    result = isHighCard(hand, replace);
    expect(result.rank).toBe(9);
    expect(result.cardHighValue).toBe("KH");
    expect(JSON.stringify(result.cards)).toBe('["2H","QD","TD","6S","KH"]');
  });

  it("Hand: 3D 5S 2H QD TD Deck: 6S KH 9H", () => {
    hand = ["3D", "5S", "2H", "QD", "TD"];
    replace = ["6S", "KH", "9H"];
    result = isHighCard(hand, replace);
    expect(result.rank).toBe(9);
    expect(result.cardHighValue).toBe("KH");
    expect(JSON.stringify(result.cards)).toBe('["QD","TD","6S","KH","9H"]');
  });

  it("Hand: 3D 5S 2H QD TD Deck: 6S KH 9H AD", () => {
    hand = ["3D", "5S", "2H", "QD", "TD"];
    replace = ["6S", "KH", "9H", "AD"];
    result = isHighCard(hand, replace);
    expect(result.rank).toBe(9);
    expect(result.cardHighValue).toBe("AD");
    expect(JSON.stringify(result.cards)).toBe('["TD","6S","KH","9H","AD"]');
  });

  it("Hand: 3D 5S 2H QD TD Deck: 6S KH 9H AD", () => {
    hand = ["3D", "5S", "2H", "QD", "TD"];
    replace = ["6S", "KH", "9H", "AD", "QH"];
    result = isHighCard(hand, replace);
    expect(result.rank).toBe(9);
    expect(result.cardHighValue).toBe("AD");
    expect(JSON.stringify(result.cards)).toBe('["6S","KH","9H","AD","QH"]');
  });
});
