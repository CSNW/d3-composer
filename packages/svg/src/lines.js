import { series, xy, Series, toStyle } from '@d3-composer/utils';
import { line as d3_line } from 'd3-shape';
import { interpolatePath } from './utils';

export default function lines(selection, props = {}) {
  let {
    curve,
    style,
    class: className,
    transition,
    interpolate,
    defined
  } = props;
  const { seriesKey } = series(props);
  const { data, x, y, yValue, yScale } = xy(props);

  defined =
    defined ||
    function(d, i, j) {
      return yValue.call(this, d, i, j) != null;
    };

  const y0_line = d3_line()
    .x(x)
    .y(() => yScale(0))
    .defined(defined);
  const line = d3_line()
    .x(x)
    .y(y)
    .defined(defined);
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
    .attr('fill', 'none')
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .call(interpolatePath, d => line(d.values), interpolate);

  return selection;
}
