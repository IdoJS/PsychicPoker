// import { isStraightFlush } from "../../../logic/rules/straightFlush";

// describe("Check isStraightFlush", () => {
//   let hand = [];
//   let replace = [];
//   let result;

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2C", "3C", "4C", "5C", "6C"];
//     replace = [];
//     result = isStraightFlush(hand, replace);
//     expect(result.rank).toBe(1);
//     expect(JSON.stringify(result.cards)).toBe('["2C","3C","4C","5C","6C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2D", "3C", "4C", "5C", "6C"];
//     replace = ["2C"];
//     result = isStraightFlush(hand, replace);
//     expect(result.rank).toBe(1);
//     expect(JSON.stringify(result.cards)).toBe('["2C","3C","4C","5C","6C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2D", "3C", "4H", "5C", "6C"];
//     replace = ["2C", "4C"];
//     result = isStraightFlush(hand, replace);
//     expect(result.rank).toBe(1);
//     expect(JSON.stringify(result.cards)).toBe('["2C","4C","3C","5C","6C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2D", "3C", "4H", "5C", "6C"];
//     replace = ["2C", "4C", "AC"];
//     result = isStraightFlush(hand, replace);
//     expect(result.rank).toBe(15);
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2D", "3C", "4H", "5C", "6C"];
//     replace = ["2C", "4C", "AC", "3D"];
//     result = isStraightFlush(hand, replace);
//     expect(result.rank).toBe(15);
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2D", "3C", "4H", "5C", "6C"];
//     replace = ["JC", "TC", "AC", "KC", "QC"];
//     result = isStraightFlush(hand, replace);
//     expect(result.rank).toBe(1);
//     expect(JSON.stringify(result.cards)).toBe('["JC","TC","AC","KC","QC"]');
//   });
// });
