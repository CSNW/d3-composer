import { xy, toStyle } from '@d3-composer/utils';
import { seriesLayers } from './utils';

export default function bars(selection, props) {
  const { style, class: className, transition } = props;
  const { x, y, key, xScale, yScale } = xy(props);

  const layers = seriesLayers(selection, props);
  const bars = layers.selectAll('rect').data(d => d.values, key);

  const x0 =
    props.x0 ||
    function(d) {
      return d && d.x0 != null ? xScale(d.x0) : x.apply(this, arguments);
    };
  const width =
    props.width ||
    function(d) {
      return d && d.x0 != null && d.x1 != null
        ? Math.max(0, xScale(d.x1) - xScale(d.x0))
        : xScale.bandwidth();
    };

  bars
    .exit()
    .transition(transition)
    .attr('y', yScale(0))
    .attr('height', 0)
    .remove();
  bars
    .enter()
    .append('rect')
    .attr('x', x0)
    .attr('y', yScale(0))
    .attr('height', 0)
    .attr('width', width)
    .merge(bars)
    .attr('class', className)
    .attr('style', toStyle(style))
    .transition(transition)
    .attr('x', x0)
    .attr('y', y)
    .attr('height', function() {
      return Math.abs(y.apply(this, arguments) - yScale(0));
    })
    .attr('width', width);
}
