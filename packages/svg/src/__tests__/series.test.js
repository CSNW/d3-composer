import body from '../__helpers__/body';
import series from '../series';

const fixture = body();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

describe('series', () => {
  test('should create layers for series data', () => {
    const selection = series(fixture.layer(), {
      data: [[], { key: 'a', values: [] }]
    });

    expect(selection.node()).toMatchSnapshot();
  });

  test('should remove layers for series data', () => {
    const selection = fixture.layer();
    series(selection, {
      data: [
        { key: 'a', values: [] },
        { key: 'b', values: [] },
        { key: 'c', values: [] }
      ]
    });
    series(selection, {
      data: [
        { key: 'a', values: [] },
        { key: 'd', values: [] },
        { key: 'c', values: [] }
      ]
    });

    expect(selection.node()).toMatchSnapshot();
  });

  test('should set series style and class', () => {
    const colors = ['blue', 'green', 'yellow'];

    const selection = fixture.layer();
    series(selection, {
      data: [
        { key: 'a', class: 'series-0', values: [] },
        { key: 'b', class: 'series-1', values: [] },
        { key: 'c', class: 'series-2', values: [] }
      ],
      style: (_, i) => ({ fill: colors[i] }),
      class: d => d.class
    });

    expect(selection.node()).toMatchSnapshot();
  });
});
