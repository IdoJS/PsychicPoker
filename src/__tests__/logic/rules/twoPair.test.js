import { isTwoPair, findRepeatsOfValues } from "../../../logic/rules/twoPair";

describe("TwoPair testing", () => {
  const cardLists = [
    ["6H", "6C", "7S", "2D", "2D"],
    ["AD", "6D", "4D", "3D", "2D"]
  ];

  it("findRepeatsOfValues", () => {
    let result = cardLists[0].reduce(findRepeatsOfValues, {});
    expect(result[6]).toBe(2);
    expect(result[2]).toBe(2);
  });

  it("isOnePair", () => {
    let result = cardLists.reduce(isTwoPair, { rank: 15 });
    expect(result.rank).toBe(7);
    expect(result.cards).toEqual(["6H", "6C", "7S", "2D", "2D"]);
  });
});
