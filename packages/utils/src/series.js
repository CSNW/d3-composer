import { extent } from 'd3-array';
import { local } from 'd3-selection';

const defaultSeriesKey = (d, i) => (d && d.key != null ? d.key : i);

export const Series = local();

export default function series(props) {
  let { data, seriesKey = defaultSeriesKey } = props;

  data = toSeries(data);

  return {
    data,
    seriesKey
  };
}

export function isSeries(series) {
  return series && series.values && Array.isArray(series.values);
}

export function toSeries(data) {
  if (!data || !isSeries(data[0])) {
    return [{ values: data || [] }];
  }

  return data;
}

export function seriesExtent(data, accessor) {
  return toSeries(data).reduce(
    ([min, max], series) => {
      const [series_min, series_max] = extent(series.values, accessor);

      return [
        min != null && min < series_min ? min : series_min,
        max != null && max > series_max ? max : series_max
      ];
    },
    [undefined, undefined]
  );
}
