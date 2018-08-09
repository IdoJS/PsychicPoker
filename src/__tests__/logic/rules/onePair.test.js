import { isOnePair, findRepeatsOfValues } from "../../../logic/rules/onePair";

describe("OnePair testing", () => {
  const cardLists = [
    ["6H", "6C", "7S", "AD", "2D"],
    ["AD", "6D", "4D", "3D", "2D"]
  ];

  it("findRepeatsOfValues", () => {
    let result = cardLists[0].reduce(findRepeatsOfValues, {});
    expect(result[6]).toBe(2);
  });

  it("isOnePair", () => {
    let result = cardLists.reduce(isOnePair, { rank: 15 });
    expect(result.rank).toBe(8);
    expect(result.highCardValue).toBe("6");
    expect(result.cards).toEqual(["6H", "6C", "7S", "AD", "2D"]);
  });
});
