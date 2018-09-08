import { seriesExtent } from '../series';

const single = [{ x: 0, y: 50 }, { x: 100, y: 0 }];
const multi = [
  { values: [{ x: 0, y: 50 }, { x: 50, y: 0 }] },
  { values: [{ x: -100, y: 100 }, { x: 50, y: 0 }] }
];
const x = d => d.x;
const y = d => d.y;

test('seriesExtent', () => {
  expect(seriesExtent([])).toEqual([undefined, undefined]);

  expect(seriesExtent(single, x)).toEqual([0, 100]);
  expect(seriesExtent(single, y)).toEqual([0, 50]);

  expect(seriesExtent(multi, x)).toEqual([-100, 50]);
  expect(seriesExtent(multi, y)).toEqual([0, 100]);
});
