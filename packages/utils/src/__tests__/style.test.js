import { toStyle } from '../style';

describe('toStyle', () => {
  test('should convert object to style string', () => {
    expect(
      toStyle({
        stroke: 'blue',
        'border-radius': 0,
        padding: '0 0 10px 0'
      })
    ).toEqual('stroke: blue; border-radius: 0; padding: 0 0 10px 0;');
  });

  test('should return style string from function', () => {
    const style = toStyle((_, i) => ({ stroke: i % 2 === 0 ? 'blue' : 'red' }));

    expect(typeof style).toEqual('function');
    expect(style({}, 0)).toEqual('stroke: blue;');
    expect(style({}, 1)).toEqual('stroke: red;');
  });

  test('should pass through string', () => {
    const style = 'stroke: blue;';
    expect(toStyle(style)).toBe(style);
  });
});
