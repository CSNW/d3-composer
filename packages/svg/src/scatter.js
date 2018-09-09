import { xy, toStyle } from '@d3-composer/utils';
import { seriesLayers, interpolatePath } from './utils';

export default function scatter(selection, props) {
  const { path, style, class: className, transition, interpolate } = props;
  const { x, y, key, yScale } = xy(props);

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
    .attr('style', toStyle(style))
    .attr('class', className)
    .transition(transition)
    .attr('transform', translate)
    .call(interpolatePath, path, interpolate);

  function translate(d, i, j) {
    const _x = x.call(this, d, i, j);
    const _y = y.call(this, d, i, j);

    return `translate(${_x}, ${_y})`;
  }
  function translate0(d, i, j) {
    const _x = x.call(this, d, i, j);
    const _y = yScale(0);

    return `translate(${_x}, ${_y})`;
  }
}
