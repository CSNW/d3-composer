import { scaleBand, scaleLinear, transition as d3_transition } from 'd3';
import { svg } from '../__helpers__/svg';
import { end } from '../__helpers__/transition';
import bars from '../bars';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

test('should render simple bars', async () => {
  const transition = d3_transition().duration(0);
  const selection = bars(fixture(), {
    data: [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
      { x: 'C', y: 30 },
      { x: 'D', y: 40 }
    ],
    xScale: scaleBand()
      .domain(['A', 'B', 'C', 'D'])
      .range([0, 100]),
    yScale: scaleLinear()
      .domain([0, 40])
      .range([100, 0]),
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
    xScale: scaleBand()
      .domain(['A', 'B', 'C', 'D'])
      .range([0, 100]),
    yScale: scaleLinear()
      .domain([0, 40])
      .range([100, 0]),
    transition,

    seriesStyle: () => ({ fill: 'blue' }),
    seriesClass: (_, i) => `series-${i}`,
    style: (_, i) => ({ stroke: i === 1 ? 'red' : 'white' }),
    class: (_, i) => (i === 2 ? 'is-highlighted' : null)
  });

  await end(transition);

  expect(selection.node()).toMatchSnapshot();
});
