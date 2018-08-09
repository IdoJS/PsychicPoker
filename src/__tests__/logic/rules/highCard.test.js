import { isHighCard } from "../../../logic/rules/highCard";

describe("HighCard testing", () => {
  const cardLists = [
    ["6H", "6C", "6S", "2D", "2D"],
    ["AD", "6D", "4D", "3D", "2D"]
  ];

  it("isHighCard - success", () => {
    let result = cardLists.reduce(isHighCard, { rank: 15 });
    expect(result.rank).toBe(9);
    expect(result.cards).toEqual(["AD", "6D", "4D", "3D", "2D"]);
  });
});
