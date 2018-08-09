import { isThree, findThree } from "../../../logic/rules/three";

describe("Four testing", () => {
  const cardLists = [
    ["6H", "6C", "6S", "4D", "2D"],
    ["AD", "6D", "4D", "3D", "2D"]
  ];

  it("findFlush - success", () => {
    let result = cardLists[0].reduce(findThree, { rank: 15 });
    expect(result.rank).toBe(6);
    expect(result.cards).toEqual(["6H", "6C", "6S", "4D", "2D"]);
  });

  it("findFlush - fail", () => {
    let result = cardLists[1].reduce(findThree, { rank: 15 });
    expect(result.rank).toBe(15);
  });

  it("isFlush - success", () => {
    let result = cardLists.reduce(isThree, { rank: 15 });

    expect(result.rank).toBe(6);
    expect(result.cards).toEqual(["6H", "6C", "6S", "4D", "2D"]);
  });
});
