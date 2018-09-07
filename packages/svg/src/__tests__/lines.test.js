import { scaleLinear } from 'd3';
import { svg } from '../__helpers__/svg';
import lines from '../lines';

const layer = svg();

beforeAll(layer.setup);
afterAll(layer.teardown);

test('should render simple line', () => {
  const selection = lines(layer(), {
    data: [{ x: 0, y: 0 }, { x: 100, y: 100 }],
    xScale: scaleLinear()
      .domain([0, 100])
      .range([0, 100]),
    yScale: scaleLinear()
      .domain([0, 100])
      .range([100, 0])
  });

  expect(selection.node()).toMatchSnapshot();
});

test('should use style and class', () => {
  const selection = lines(layer(), {
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

    style: (_, i) => ({
      stroke: i % 2 === 0 ? 'blue' : 'red'
    }),
    class: d => d.class
  });

  expect(selection.node()).toMatchSnapshot();
});
