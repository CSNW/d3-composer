import { scaleLinear, transition as d3_transition } from 'd3';
import { svg } from '../__helpers__/svg';
import { end } from '../__helpers__/transition';
import lines from '../lines';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

test('should render simple line', async () => {
  const transition = d3_transition().duration(0);
  const selection = lines(fixture(), {
    data: [{ x: 0, y: 0 }, { x: 100, y: 100 }],
    xScale: scaleLinear()
      .domain([0, 100])
      .range([0, 100]),
    yScale: scaleLinear()
      .domain([0, 100])
      .range([100, 0]),
    transition
  });

  await end(transition);

  expect(selection.node()).toMatchSnapshot();
});

test('should use style and class', async () => {
  const transition = d3_transition().duration(0);
  const selection = lines(fixture(), {
    data: [
      { class: 'a', values: [{ x: 0, y: 0 }, { x: 100, y: 100 }] },
      { class: 'b', values: [{ x: 0, y: 100 }, { x: 100, y: 0 }] }
    ],

    // TODO Make xScale and yScale optional
    xScale: scaleLinear()
      .domain([0, 100])
      .range([0, 100]),
    yScale: scaleLinear()
      .domain([0, 100])
      .range([100, 0]),
    transition,

    style: (_, i) => ({
      stroke: i % 2 === 0 ? 'blue' : 'red'
    }),
    class: d => d.class
  });

  await end(transition);

  expect(selection.node()).toMatchSnapshot();
});
