import { passthrough, toStyle } from '@d3-composer/utils';
import { interpolatePath, translateXY } from './utils';

export default function scatter(selection, props) {
  let {
    data, // = passthrough,
    x,
    y,
    key,
    path,
    style,
    class: className,
    transition,
    interpolate
  } = props;
  data = data || passthrough; // TEMP (https://github.com/rollup/rollup/issues/2445)
  const translate = translateXY(x, y);

  const paths = selection.selectAll('path').data(data, key);

  paths
    .exit()
    .transition(transition)
    .attr('opacity', 0)
    .remove();

  paths
    .enter()
    .append('path')
    .attr('transform', translate)
    .attr('opacity', 0)
    .merge(paths)
    .attr('fill', 'currentColor')
    .attr('stroke', 'none')
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('transform', translate)
    .attr('opacity', 1)
    .call(interpolatePath, path, interpolate);

  return selection;
}
