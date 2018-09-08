import { svg } from '../__helpers__/svg';
import { seriesLayers } from '../utils';

const fixture = svg();

beforeAll(fixture.setup);
afterAll(fixture.teardown);

describe('seriesLayers', () => {
  test('should create layers for series data', () => {
    const selection = seriesLayers(fixture(), {
      data: [{ values: [] }, { key: 'a', values: [] }]
    });

    expect(selection.node()).toMatchSnapshot();
  });

  test('should remove layers for series data', () => {
    const selection = fixture();
    seriesLayers(selection, {
      data: [
        { key: 'a', values: [] },
        { key: 'b', values: [] },
        { key: 'c', values: [] }
      ]
    });
    seriesLayers(selection, {
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

    const selection = fixture();
    seriesLayers(selection, {
      data: [
        { key: 'a', class: 'series-0', values: [] },
        { key: 'b', class: 'series-1', values: [] },
        { key: 'c', class: 'series-2', values: [] }
      ],
      seriesStyle: (_, i) => ({ fill: colors[i] }),
      seriesClass: d => d.class
    });

    expect(selection.node()).toMatchSnapshot();
  });
});
