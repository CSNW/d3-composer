import body from '../__helpers__/body';
import stack from '../stack';

const fixture = body();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

describe('stack', () => {
  test('should create and offset stack layers', () => {
    const selection = fixture.layer();
    stack(selection, {
      data: [{ size: 10 }, { size: 20 }, { size: 30 }, { size: 40 }],
      size: d => d.size
    });

    expect(selection.node()).toMatchSnapshot();
  });

  test('should set stack style and class', () => {
    const colors = ['blue', 'green', 'yellow'];

    const selection = fixture.layer();
    stack(selection, {
      data: [{ class: 'stack-0' }, { class: 'stack-1' }, { class: 'stack-2' }],
      size: 10,
      style: (_, i) => ({ fill: colors[i] }),
      class: d => d.class
    });

    expect(selection.node()).toMatchSnapshot();
  });

  test('should stack grid', () => {
    const selection = fixture.layer();
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

  test('should re-render stacked grid', () => {
    const selection = fixture.layer();
    grid(selection);
    grid(selection);

    expect(selection.node()).toMatchSnapshot();
  });
});

function grid(selection) {
  stack(
    stack(selection, {
      data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      direction: 'vertical',
      size: 10
    }),
    { direction: 'horizontal', size: 10 }
  );
}
