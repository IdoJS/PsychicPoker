import {
  isStraightFlush,
  findStraightFlush
} from '../../../logic/rules/straightFlush';

describe('StraightFlush testing', () => {
  const cardLists = [
    ['7H', '6H', '5H', '4H', '3H'],
    ['5D', '4S', '3D', '2D', '1D']
  ];

  it('findStraight', () => {
    let result = cardLists[0].reduce(findStraightFlush, {
      isStraight: true,
      isFlush: true
    });
    expect(result.isStraight).toBe(true);
    expect(result.isFlush).toBe(true);
  });

  it('findStraight', () => {
    let result = cardLists[1].reduce(findStraightFlush, {
      isStraight: true,
      isFlush: true
    });

    expect(result.isStraight).toBe(true);
    expect(result.isFlush).toBe(false);
  });

  it('isStraight', () => {
    let result = cardLists.reduce(isStraightFlush, { rank: 15 });
    expect(result.rank).toBe(1);
    expect(result.highCard).toBe('7H');
    expect(result.cards).toEqual(['7H', '6H', '5H', '4H', '3H']);
  });
});
