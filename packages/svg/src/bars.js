import { passthrough, fn, toStyle } from '@d3-composer/utils';

export default function bars(selection, props) {
  let {
    data, // = passthrough,
    x,
    x0,
    x1,
    y,
    y0,
    y1,
    width,
    height,
    key,
    style,
    class: className,
    transition
  } = props;
  data = data || passthrough; // TEMP (https://github.com/rollup/rollup/issues/2445)

  x = x != null ? x : x0;
  y = y != null ? y : y1;

  width =
    width ||
    function(d, i, j) {
      return Math.abs(fn(x1).call(this, d, i, j) - fn(x).call(this, d, i, j));
    };
  height =
    height ||
    function(d, i, j) {
      return Math.abs(fn(y).call(this, d, i, j) - fn(y0).call(this, d, i, j));
    };

  const bars = selection.selectAll('rect').data(data, key);

  bars
    .exit()
    .transition(transition)
    .attr('opacity', 0)
    .remove();
  bars
    .enter()
    .append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('height', height)
    .attr('width', width)
    .attr('opacity', 0)
    .merge(bars)
    .attr('fill', 'currentColor')
    .attr('stroke', 'none')
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('x', x)
    .attr('y', y)
    .attr('height', height)
    .attr('width', width)
    .attr('opacity', 1);

  return selection;
}
