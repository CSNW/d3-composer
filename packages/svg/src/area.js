import { passthrough, array, toStyle } from '@d3-composer/utils';
import { area as d3_area } from 'd3-shape';
import { interpolatePath } from './utils';

export default function area(selection, options) {
  let {
    data, // = passthrough,
    x,
    x0,
    x1,
    y0,
    y1,
    key,
    style,
    class: className,
    transition,
    curve,
    interpolate,
    defined
  } = options;
  data = data || passthrough; // TEMP (https://github.com/rollup/rollup/issues/2445)

  const area = d3_area()
    .y0(y0)
    .y1(y1);
  if (x) area.x(x);
  if (x0 && x1) area.x0(x0).x1(x1);
  if (curve) area.curve(curve);
  if (defined) area.defined(defined);

  const path = selection.selectAll('path').data(array(data), key);

  path
    .exit()
    .transition(transition)
    .remove();
  path
    .enter()
    .append('path')
    .attr('d', area)
    .merge(path)
    .attr('fill', 'currentColor')
    .attr('stroke', 'none')
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .call(interpolatePath, area, interpolate);

  return selection;
}
