import { xy, toStyle } from '@d3-composer/utils';
import { seriesLayers, translateXY, translateXY0 } from './utils';

export default function labels(selection, props) {
  const {
    text,
    style,
    class: className,
    transition,
    transform,
    anchor = 'start',
    baseline = 'hanging'
  } = props;
  const { x, y, key, yScale } = xy(props);
  const translate = translateXY({ x, y });
  const translate0 = translateXY0({ x, yScale });

  const layers = seriesLayers(selection, props);
  const groups = layers.selectAll('g').data(d => d.values, key);

  groups
    .exit()
    .transition(transition)
    .attr('transform', translate0)
    .remove();

  const entering = groups
    .enter()
    .append('g')
    .attr('transform', translate0);

  entering
    .merge(groups)
    .transition(transition)
    .attr('transform', translate);
  entering
    .append('text')
    .merge(groups.select('text'))
    .attr('text-anchor', anchor)
    .attr('dominant-baseline', baseline)
    .attr('style', toStyle(style))
    .attr('class', className)
    .attr('transform', transform || null)
    .text(text);
}
