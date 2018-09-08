import { svg } from '../__helpers__/svg';
import layer from '../layer';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

test('should add layer', () => {
  const selection = fixture();
  const added = layer(selection, 'id');

  expect(selection.node()).toMatchSnapshot();
  expect(added.node()).toMatchSnapshot();
});

test('should select layer', () => {
  const selection = fixture();
  const added = layer(selection, 'id');
  const updated = layer(selection, 'id');

  expect(selection.node()).toMatchSnapshot();
  expect(updated.node()).toMatchSnapshot();
  expect(updated.node()).toBe(added.node());
});
