import { passthrough, toStyle } from '@d3-composer/utils';
import { interpolatePath, translateXY } from './utils';

export default function scatter(selection, options) {
  const {
    data = passthrough,
    x,
    y,
    key,
    path,
    style,
    class: className,
    transition,
    interpolate
  } = options;
  const translate = translateXY(x, y);

  const paths = selection.selectAll('path').data(data, key);

  paths.exit().remove();

  paths
    .enter()
    .append('path')
    .attr('transform', translate)
    .merge(paths)
    .attr('fill', 'currentColor')
    .attr('stroke', 'none')
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('transform', translate)
    .call(interpolatePath, path, interpolate);

  return selection;
}
