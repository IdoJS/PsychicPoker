// import { isThree } from "../../../logic/rules/three";

// describe("Check isThree", () => {
//   let hand = [];
//   let replace = [];
//   let result;

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["6C", "6D", "8C", "2D", "6H"];
//     replace = [];
//     result = isThree(hand, replace);
//     expect(result.rank).toBe(6);
//     expect(JSON.stringify(result.cards)).toBe('["6C","6D","8C","2D","6H"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["6C", "6D", "8C", "2D", "6H"];
//     replace = ["8C"];
//     result = isThree(hand, replace);
//     expect(result.rank).toBe(6);
//     expect(JSON.stringify(result.cards)).toBe('["8C","6C","6D","2D","6H"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["6C", "6D", "8C", "2D", "6H"];
//     replace = ["8C", "8H"];
//     result = isThree(hand, replace);
//     expect(result.rank).toBe(6);
//     expect(JSON.stringify(result.cards)).toBe('["8C","8H","8C","2D","6H"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["6C", "6D", "8C", "2D", "6H"];
//     replace = ["8C", "8H", "AC"];
//     result = isThree(hand, replace);
//     expect(result.rank).toBe(6);
//     expect(JSON.stringify(result.cards)).toBe('["8C","8H","AC","8C","6H"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["6C", "6D", "8C", "2D", "6H"];
//     replace = ["8C", "8H", "AC", "5C"];
//     result = isThree(hand, replace);
//     expect(result.rank).toBe(6);
//     expect(JSON.stringify(result.cards)).toBe('["8C","8H","AC","5C","8C"]');
//   });

//   it("Hand: 6C 6D 8C 2D 6H Deck: ", () => {
//     hand = ["6C", "6D", "8C", "2D", "6H"];
//     replace = ["8C", "8H", "AC", "5C", "AD"];
//     result = isThree(hand, replace);
//     expect(result.rank).toBe(15);
//   });
// });
