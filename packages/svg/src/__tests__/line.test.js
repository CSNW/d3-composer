import { scaleLinear, transition as d3_transition } from 'd3';
import { svg } from '../__helpers__/svg';
import { end } from '../__helpers__/transition';
import series from '../series';
import line from '../line';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

const xScale = scaleLinear()
  .domain([0, 100])
  .range([0, 100]);
const x = d => xScale(d.x);

const yScale = scaleLinear()
  .domain([0, 100])
  .range([100, 0]);
const y = d => yScale(d.y);

test('should render simple line', async () => {
  const transition = d3_transition().duration(0);
  const selection = line(fixture(), {
    data: [{ x: 0, y: 0 }, { x: 100, y: 100 }],
    x,
    y,
    transition
  });

  await end(transition);

  expect(selection.node()).toMatchSnapshot();
});

test('should use style and class', async () => {
  const transition = d3_transition().duration(0);
  const selection = line(
    series(fixture(), {
      data: [
        { class: 'a', values: [{ x: 0, y: 0 }, { x: 100, y: 100 }] },
        { class: 'b', values: [{ x: 0, y: 100 }, { x: 100, y: 0 }] }
      ],
      class: series => series.class
    }),
    {
      data: series => series.values,
      x,
      y,
      transition,

      style: {
        stroke: (_, i) => (i % 2 === 0 ? 'blue' : 'red')
      }
    }
  );

  await end(transition);

  expect(selection.node()).toMatchSnapshot();
});
