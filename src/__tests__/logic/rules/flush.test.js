import { findFlush, isFlush } from '../../../logic/rules/flush';

describe('Flush testing', () => {
  const cardLists = [
    ['AD', '6C', '4D', '3D', '2D'],
    ['AD', '6D', '4D', '3D', '2D']
  ];

  it('findFlush - fail', () => {
    let result = cardLists[0].reduce(findFlush, { isFlush: true });
    expect(result.isFlush).toBe(false);
  });

  it('findFlush - success', () => {
    let result = cardLists[1].reduce(findFlush, { isFlush: true });
    expect(result.isFlush).toBe(true);
  });

  it('isFlush - success', () => {
    let result = cardLists.reduce(isFlush, { rank: 15 });
    expect(result.rank).toBe(4);
    expect(result.highCard).toBe('AD');
    expect(result.cards).toEqual(['AD', '6D', '4D', '3D', '2D']);
  });
});
