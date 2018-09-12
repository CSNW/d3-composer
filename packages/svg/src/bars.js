import { passthrough, toStyle } from '@d3-composer/utils';

export default function bars(selection, props) {
  let {
    data, // = passthrough,
    x0,
    x1,
    y0,
    y1,
    key,
    style,
    class: className,
    transition
  } = props;
  data = data || passthrough; // TEMP (https://github.com/rollup/rollup/issues/2445)

  function width(d, i, j) {
    return Math.abs(x1.call(this, d, i, j) - x0.call(this, d, i, j));
  }
  function height(d, i, j) {
    return Math.abs(y1.call(this, d, i, j) - y0.call(this, d, i, j));
  }

  const bars = selection.selectAll('rect').data(data, key);

  bars
    .exit()
    .transition(transition)
    .attr('opacity', 0)
    .remove();
  bars
    .enter()
    .append('rect')
    .attr('x', x0)
    .attr('y', y1)
    .attr('height', height)
    .attr('width', width)
    .attr('opacity', 0)
    .merge(bars)
    .attr('class', className)
    .attr('style', toStyle(style, 'fill: currentColor; stroke: none;'))
    .transition(transition)
    .attr('x', x0)
    .attr('y', y1)
    .attr('height', height)
    .attr('width', width)
    .attr('opacity', 1);

  return selection;
}
