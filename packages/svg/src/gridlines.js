import { toStyle } from '@d3-composer/utils';
import layer from './layer';

const index = (_, i) => i;

export default function gridlines(selection, options) {
  const {
    xGrid = true,
    yGrid = true,
    xScale,
    yScale,
    xTicks,
    xTickArguments,
    xTickValues,
    yTicks,
    yTickArguments,
    yTickValues,
    style,
    class: className,
    transition
  } = options;

  const [x1, x2] = xScale.range();
  const [y1, y2] = yScale.range();

  const translateX = d => `translate(${xScale(d) + 0.5}, 0)`;
  const translateY = d => `translate(0, ${yScale(d) + 0.5})`;

  const x_data = !xGrid
    ? []
    : xTickValues ||
      xScale.ticks.apply(
        xScale.ticks,
        xTicks ? [xTicks] : xTickArguments || []
      );
  const y_data = !yGrid
    ? []
    : yTickValues ||
      yScale.ticks.apply(
        yScale.ticks,
        yTicks ? [yTicks] : yTickArguments || []
      );

  const x_lines = layer(selection, 'x')
    .selectAll('line')
    .data(x_data, index);

  x_lines.exit().remove();
  x_lines
    .enter()
    .append('line')
    .attr('transform', translateX)
    .merge(x_lines)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', y1)
    .attr('y2', y2)
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('transform', translateX);

  const y_lines = layer(selection, 'y')
    .selectAll('line')
    .data(y_data, index);

  y_lines.exit().remove();
  y_lines
    .enter()
    .append('line')
    .attr('transform', translateY)
    .merge(y_lines)
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('y1', 0)
    .attr('y2', 0)
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('transform', translateY);

  return selection;
}
