import { scaleBand, scaleLinear, transition as d3_transition } from 'd3';
import { svg } from '../__helpers__/svg';
import { end } from '../__helpers__/transition';
import bars from '../bars';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

const xScale = scaleBand()
  .domain(['A', 'B', 'C', 'D'])
  .range([0, 100]);
const x0 = d => xScale(d.x);
const x1 = d => xScale(d.x) + xScale.bandwidth();

const yScale = scaleLinear()
  .domain([0, 40])
  .range([100, 0]);
const y0 = d => yScale(0);
const y1 = d => yScale(d.y);

test('should render simple bars', async () => {
  const transition = d3_transition().duration(0);
  const selection = bars(fixture(), {
    data: [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
      { x: 'C', y: 30 },
      { x: 'D', y: 40 }
    ],
    x0,
    x1,
    y0,
    y1,
    transition
  });

  await end(transition);

  expect(selection.node()).toMatchSnapshot();
});

test('should use style and class', async () => {
  const transition = d3_transition().duration(0);
  const selection = bars(fixture(), {
    data: [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
      { x: 'C', y: 30 },
      { x: 'D', y: 40 }
    ],
    x0,
    x1,
    y0,
    y1,
    transition,

    style: {
      stroke: (_, i) => (i === 1 ? 'red' : 'white')
    },
    class: (_, i) => (i === 2 ? 'is-highlighted' : null)
  });

  await end(transition);

  expect(selection.node()).toMatchSnapshot();
});
