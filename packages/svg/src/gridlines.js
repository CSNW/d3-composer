import { toStyle } from '@d3-composer/utils';
import layer from './layer';

const index = (_, i) => i;

// TODO Not currently pixel-perfect with d3.axis
// Look into how that does tick lines (or maybe just use it here)

export default function gridlines(selection, props) {
  const {
    xGrid = true,
    yGrid = true,
    xScale,
    yScale,
    style,
    class: className,
    transition
  } = props;

  const x = d => xScale(d);
  const y = d => yScale(d);
  const [x1, x2] = xScale.range();
  const [y1, y2] = yScale.range();

  const x_lines = layer(selection, 'x')
    .selectAll('line')
    .data(xGrid ? xScale.ticks() : [], index);

  x_lines.exit().remove();
  x_lines
    .enter()
    .append('line')
    .attr('x1', x)
    .attr('x2', x)
    .merge(x_lines)
    .attr('y1', y1)
    .attr('y2', y2)
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('x1', x)
    .attr('x2', x);

  const y_lines = layer(selection, 'y')
    .selectAll('line')
    .data(yGrid ? yScale.ticks() : [], index);

  y_lines.exit().remove();
  y_lines
    .enter()
    .append('line')
    .attr('y1', y)
    .attr('y2', y)
    .merge(y_lines)
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('y1', y)
    .attr('y2', y);

  return selection;
}
