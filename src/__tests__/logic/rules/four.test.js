import { findFour, isFour } from '../../../logic/rules/four';

describe('Four testing', () => {
  const cardLists = [
    ['6H', '6C', '6S', '6D', '2D'],
    ['AD', '6D', '4D', '3D', '2D']
  ];

  it('findFlush - success', () => {
    let result = cardLists[0].reduce(findFour, { rank: 15 });
    expect(result.rank).toBe(2);
    expect(result.cards).toEqual(['6H', '6C', '6S', '6D', '2D']);
  });

  it('findFlush - fail', () => {
    let result = cardLists[1].reduce(findFour, { rank: 15 });
    expect(result.rank).toBe(15);
  });

  it('isFlush - success', () => {
    let result = cardLists.reduce(isFour, { rank: 15 });
    expect(result.rank).toBe(2);
    expect(result.cards).toEqual(['6H', '6C', '6S', '6D', '2D']);
  });
});
