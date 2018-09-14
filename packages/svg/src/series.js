import { passthrough, toStyle, Series } from '@d3-composer/utils';
import { childNodes } from './utils';

const seriesKey = (d, i) => (d && d.key != null ? d.key : i);

export default function series(selection, options) {
  let {
    data, // = passthrough,
    key = seriesKey,
    style,
    class: className
  } = options;
  data = data || passthrough; // TEMP (https://github.com/rollup/rollup/issues/2445)

  const layers = selection
    .selectAll(childNodes)
    .filter('[data-series]')
    .data(data, key);

  layers.exit().remove();

  return layers
    .enter()
    .append('g')
    .attr('data-series', key)
    .property(Series, d => d)
    .merge(layers)
    .attr('class', className)
    .attr('style', toStyle(style))
    .order();
}
