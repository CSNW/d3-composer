import body from '../__helpers__/body';
import layer from '../layer';

const fixture = body();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

test('should add layer', () => {
  const selection = fixture.layer();
  const added = layer(selection, 'id');

  expect(selection.node()).toMatchSnapshot();
  expect(added.node()).toMatchSnapshot();
});

test('should select layer', () => {
  const selection = fixture.layer();
  const added = layer(selection, 'id');
  const updated = layer(selection, 'id');

  expect(selection.node()).toMatchSnapshot();
  expect(updated.node()).toMatchSnapshot();
  expect(updated.node()).toBe(added.node());
});
