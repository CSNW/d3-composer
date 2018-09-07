export function isSeries(series) {
  return series && series.values && Array.isArray(series.values);
}

export function toSeries(data) {
  if (!data || !isSeries(data[0])) {
    return [{ values: data || [] }];
  }

  return data;
}

export function seriesKey(d, i) {
  return d && d.key != null ? d.key : i;
}
