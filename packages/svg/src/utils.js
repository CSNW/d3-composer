import { Series, series, toStyle } from '@d3-composer/utils';

export function size(selection) {
  // ...
}

export function seriesLayers(selection, props) {
  const { seriesClass, seriesStyle } = props;
  const { data, seriesKey } = series(props);

  const layers = selection
    .selectAll(descendants)
    .filter('[data-series]')
    .data(data, seriesKey);
  layers.exit().remove();

  return layers
    .enter()
    .append('g')
    .attr('data-series', seriesKey)
    .property(Series, d => d)
    .merge(layers)
    .attr('class', seriesClass)
    .attr('style', toStyle(seriesStyle));
}

export function descendants() {
  return this.childNodes;
}
