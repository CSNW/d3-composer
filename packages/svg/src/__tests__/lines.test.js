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
