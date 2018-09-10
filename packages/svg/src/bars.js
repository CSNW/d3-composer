import { xy, toStyle } from '@d3-composer/utils';
import { seriesLayers } from './utils';

export default function bars(selection, props) {
  const { style, class: className, transition } = props;
  const { x, y, key, xScale, yScale } = xy(props);

  const x0 =
    props.x0 ||
    function(d, i, j) {
      return d && d.x0 != null ? xScale(d.x0) : x.call(this, d, i, j);
    };
  const x1 =
    props.x1 ||
    function(d, i, j) {
      return d && d.x1 != null
        ? xScale(d.x1)
        : x0.call(this, d, i, j) + xScale.bandwidth();
    };

  const y0 =
    props.y0 ||
    function(d) {
      return d && d.y0 != null ? yScale(d.y0) : yScale(0);
    };
  const y1 =
    props.y1 ||
    function(d, i, j) {
      return d && d.y1 != null ? yScale(d.y1) : y.call(this, d, i, j);
    };

  function width(d, i, j) {
    return Math.abs(x1.call(this, d, i, j) - x0.call(this, d, i, j));
  }
  function height(d, i, j) {
    return Math.abs(y1.call(this, d, i, j) - y0.call(this, d, i, j));
  }

  const layers = seriesLayers(selection, props);
  const bars = layers.selectAll('rect').data(d => d.values, key);

  bars
    .exit()
    .transition(transition)
    .attr('y', y0)
    .attr('height', 0)
    .remove();
  bars
    .enter()
    .append('rect')
    .attr('x', x0)
    .attr('y', y0)
    .attr('height', 0)
    .attr('width', width)
    .merge(bars)
    .attr('class', className)
    .attr('style', toStyle(style, 'fill: currentColor; stroke: none;'))
    .transition(transition)
    .attr('x', x0)
    .attr('y', y)
    .attr('height', height)
    .attr('width', width);

  return selection;
}
