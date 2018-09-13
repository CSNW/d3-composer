import { passthrough, array, toStyle } from '@d3-composer/utils';
import { line as d3_line } from 'd3-shape';
import { interpolatePath } from './utils';

export default function line(selection, props = {}) {
  let {
    data, // = passthrough,
    x,
    y,
    key,
    style,
    class: className,
    transition,
    curve,
    interpolate,
    defined
  } = props;
  data = data || passthrough; // TEMP (https://github.com/rollup/rollup/issues/2445)

  const line = d3_line()
    .x(x)
    .y(y);
  if (curve) line.curve(curve);
  if (defined) line.defined(defined);

  const path = selection.selectAll('path').data(array(data), key);

  path.exit().remove();

  path
    .enter()
    .append('path')
    .attr('d', line)
    .merge(path)
    .attr('fill', 'none')
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .call(interpolatePath, line, interpolate);

  return selection;
}
