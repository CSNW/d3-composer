import { xy, seriesKey } from '@d3-composer/utils';
import { line as d3_line } from 'd3-shape';

export default function lines(selection, props = {}) {
  const { curve, style } = props;
  const { data, x, y } = xy(props);

  const line = d3_line()
    .x(x)
    .y(y);
  if (curve) line.curve(curve);

  const lines = selection.selectAll('path').data(data, seriesKey);

  lines.exit().remove();

  lines
    .enter()
    .append('path')
    .merge(lines)
    .attr('d', d => line(d.values))
    .attr('style', style);

  return selection;
}
