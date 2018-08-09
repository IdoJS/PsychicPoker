// import { isFlush } from "../../../logic/rules/flush";

// describe("Check isFlush", () => {
//   let hand = [];
//   let replace = [];
//   let result;

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2C", "3C", "4C", "5C", "6C"];
//     replace = [];
//     result = isFlush(hand, replace);
//     expect(result.rank).toBe(4);
//     expect(JSON.stringify(result.cards)).toBe('["2C","3C","4C","5C","6C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2C", "3C", "4C", "5C", "6C"];
//     replace = ["9C"];
//     result = isFlush(hand, replace);
//     expect(result.rank).toBe(4);
//     expect(JSON.stringify(result.cards)).toBe('["9C","3C","4C","5C","6C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2C", "3C", "4D", "5C", "6C"];
//     replace = ["9C", "8C"];
//     result = isFlush(hand, replace);
//     expect(result.rank).toBe(4);
//     expect(JSON.stringify(result.cards)).toBe('["9C","8C","3C","5C","6C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2C", "3C", "4D", "5C", "6H"];
//     replace = ["9C", "8C", "AC"];
//     result = isFlush(hand, replace);
//     expect(result.rank).toBe(4);
//     expect(JSON.stringify(result.cards)).toBe('["9C","8C","AC","3C","5C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2C", "3C", "4D", "5C", "6H"];
//     replace = ["9C", "8C", "AC", "AD"];
//     result = isFlush(hand, replace);
//     expect(result.rank).toBe(15);
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["2C", "3C", "4D", "5C", "6H"];
//     replace = ["9C", "8C", "AC", "AD", "JC"];
//     result = isFlush(hand, replace);
//     expect(result.rank).toBe(15);
//   });
// });
