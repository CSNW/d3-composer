import { seriesExtent } from '../data';

const multi = [
  { values: [{ x: 0, y: 50 }, { x: 50, y: 0 }] },
  { values: [{ x: -100, y: 100 }, { x: 50, y: 0 }] }
];

const values = series => series.values;
const x = d => d.x;
const y = d => d.y;

test('seriesExtent', () => {
  expect(seriesExtent([], values, x)).toEqual([undefined, undefined]);

  expect(seriesExtent(multi, values, x)).toEqual([-100, 50]);
  expect(seriesExtent(multi, values, y)).toEqual([0, 100]);
});
