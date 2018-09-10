import { xy, toStyle } from '@d3-composer/utils';
import { seriesLayers, interpolatePath, translateXY } from './utils';

export default function scatter(selection, props) {
  const { path, style, class: className, transition, interpolate } = props;
  const { x, y, key, yScale } = xy(props);
  const translate = translateXY(x, y);
  const translate0 = translateXY(
    x,
    d => (d && d.y0 != null ? yScale(d.y0) : yScale(0))
  );

  const layers = seriesLayers(selection, props);
  const paths = layers.selectAll('path').data(d => d.values, key);

  paths
    .exit()
    .transition(transition)
    .attr('transform', translate0)
    .remove();

  paths
    .enter()
    .append('path')
    .attr('transform', translate0)
    .merge(paths)
    .attr('style', toStyle(style, 'fill: currentColor; stroke: none;'))
    .attr('class', className)
    .transition(transition)
    .attr('transform', translate)
    .call(interpolatePath, path, interpolate);

  return selection;
}
