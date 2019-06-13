import { svg } from '../__helpers__/svg';
import stack from '../stack';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

describe('stack', () => {
  test('should create and offset stack layers', () => {
    const selection = fixture();
    stack(selection, {
      data: [{ size: 10 }, { size: 20 }, { size: 30 }, { size: 40 }],
      size: d => d.size
    });

    expect(selection.node()).toMatchSnapshot();
  });

  test('should set stack style and class', () => {
    const colors = ['blue', 'green', 'yellow'];

    const selection = fixture();
    stack(selection, {
      data: [{ class: 'stack-0' }, { class: 'stack-1' }, { class: 'stack-2' }],
      size: 10,
      style: (_, i) => ({ fill: colors[i] }),
      class: d => d.class
    });

    expect(selection.node()).toMatchSnapshot();
  });

  test('should stack grid', () => {
    const selection = fixture();
    stack(
      stack(selection, {
        data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        direction: 'vertical',
        size: 10
      }),
      { direction: 'horizontal', size: 10 }
    );

    expect(selection.node()).toMatchSnapshot();
  });
});
