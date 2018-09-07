import { xy, seriesKey, toStyle } from '@d3-composer/utils';
import { line as d3_line } from 'd3-shape';

export default function lines(selection, props = {}) {
  const { curve, style, class: className, transition, interpolate } = props;
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
    .call(path, y0_line)
    .remove();

  lines
    .enter()
    .append('path')
    .attr('d', d => y0_line(d.values))
    .merge(lines)
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .call(path, line);

  function path(selection, line) {
    if (interpolate) {
      selection.attrTween('d', function(d) {
        const previous = this.getAttribute('d');
        const next = line(d.values);

        return interpolate(previous, next);
      });
    } else {
      selection.attr('d', d => line(d.values));
    }
  }

  return selection;
}
