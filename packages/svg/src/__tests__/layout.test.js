import { template } from '@d3-composer/grid';
import { svg } from '../__helpers__/svg';
import layout from '../layout';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

test('it should layout grid layers', () => {
  const grid = template(
    `
    "title title" 25
    "y_axis chart" auto
    ". x_axis" 25
    / 25 auto
  `,
    { width: 100, height: 100 }
  );

  const selection = fixture();
  const layers = layout(selection, grid);

  expect(layers.title().node()).toMatchSnapshot();
  expect(layers.y_axis().node()).toMatchSnapshot();
  expect(layers.x_axis().node()).toMatchSnapshot();
  expect(layers.chart('lines').node()).toMatchSnapshot();
  expect(layers.chart('bars').node()).toMatchSnapshot();

  expect(selection.node()).toMatchSnapshot();
});
