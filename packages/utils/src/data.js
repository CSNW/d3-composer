import { extent } from 'd3-array';

export function passthrough(d) {
  return d || [];
}

export function array(value) {
  return typeof value === 'function'
    ? function(d, i, j) {
        return [value.call(this, d, i, j)];
      }
    : [value];
}

export function fn(value) {
  return typeof value === 'function' ? value : () => value;
}

export function seriesExtent(data, values, value) {
  return data.reduce(
    ([min, max], series, index) => {
      const [series_min, series_max] = extent(
        values(series, index, data),
        value
      );

      return [
        min != null && min < series_min ? min : series_min,
        max != null && max > series_max ? max : series_max
      ];
    },
    [undefined, undefined]
  );
}
