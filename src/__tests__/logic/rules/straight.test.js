import { isStraight, findStraight } from '../../../logic/rules/straight';

describe('Straight testing', () => {
  const cardLists = [
    ['7H', '6C', '5S', '4D', '3D'],
    ['5D', '4D', '3D', '2D', '1D']
  ];

  it('findStraight', () => {
    let result = cardLists[0].reduce(findStraight, { isStraight: true });
    expect(result.isStraight).toBe(true);
  });

  it('findStraight', () => {
    let result = cardLists[1].reduce(findStraight, { isStraight: true });
    expect(result.isStraight).toBe(true);
  });

  it('isStraight', () => {
    let result = cardLists.reduce(isStraight, { rank: 15 });
    expect(result.rank).toBe(5);
    expect(result.highCard).toBe('7H');
    expect(result.cards).toEqual(['7H', '6C', '5S', '4D', '3D']);
  });
});
