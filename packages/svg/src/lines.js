import { series, xy, Series, toStyle } from '@d3-composer/utils';
import { line as d3_line } from 'd3-shape';
import { interpolatePath } from './utils';

export default function lines(selection, props = {}) {
  const { curve, style, class: className, transition, interpolate } = props;
  const { seriesKey } = series(props);
  const { data, x, y, yScale } = xy(props);

  const y0_line = d3_line()
    .x(x)
    .y(() => yScale(0));
  const line = d3_line()
    .x(x)
    .y(y);
  if (curve) line.curve(curve);

  const lines = selection.selectAll('path').data(data, seriesKey);

  lines
    .exit()
    .transition(transition)
    .call(interpolatePath, d => y0_line(d.values), interpolate)
    .remove();

  lines
    .enter()
    .append('path')
    .property(Series, d => d)
    .attr('d', d => y0_line(d.values))
    .merge(lines)
    .attr('style', toStyle(style, 'fill: none;'))
    .attr('class', className)
    .transition(transition)
    .call(interpolatePath, d => line(d.values), interpolate);

  return selection;
}
