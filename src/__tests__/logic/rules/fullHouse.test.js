import {
  isFullHouse,
  findRepeatsOfValues
} from '../../../logic/rules/fullHouse';

describe('FullHouse testing', () => {
  const cardLists = [
    ['6H', '6C', '6S', '2D', '2D'],
    ['AD', '6D', '4D', '3D', '2D']
  ];

  it('findRepeatsOfValues ', () => {
    let result = cardLists[0].reduce(findRepeatsOfValues, {});
    expect(result[2]).toBe(2);
    expect(result[6]).toBe(3);
  });

  it('findRepeatsOfValues', () => {
    let result = cardLists[1].reduce(findRepeatsOfValues, {});
    expect(result[2]).toBe(1);
    expect(result[3]).toBe(1);
    expect(result[4]).toBe(1);
    expect(result[6]).toBe(1);
    expect(result[14]).toBe(1);
  });

  it('isFullHouse - success', () => {
    let result = cardLists.reduce(isFullHouse, { rank: 15 });
    expect(result.rank).toBe(3);
    expect(result.cards).toEqual(['6H', '6C', '6S', '2D', '2D']);
  });
});
