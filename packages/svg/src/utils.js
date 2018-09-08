import { Series, series, toStyle } from '@d3-composer/utils';

export function size(selection) {
  // ...
}

export function seriesLayers(selection, props) {
  const { data, seriesKey, seriesClass, seriesStyle } = series(props);

  const layers = selection.selectAll('[data-series]').data(data, seriesKey);
  layers.exit().remove();
  layers
    .enter()
    .append('g')
    .attr('data-series', key)
    .property(Series, d => d)
    .merge(layers)
    .attr('class', seriesClass)
    .attr('style', toStyle(seriesStyle));

  return layers;
}
