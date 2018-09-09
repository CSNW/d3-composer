import { Area, Series, series, toStyle } from '@d3-composer/utils';

export function size(selection) {
  const node = selection.node();
  const area = Area.get(node);

  // TODO much more robust
  return area || { width: 0, height: 0 };
}

export function seriesLayers(selection, props) {
  const { seriesClass, seriesStyle } = props;
  const { data, seriesKey } = series(props);

  const layers = selection
    .selectAll(childNodes)
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

export function childNodes() {
  return this.childNodes;
}
