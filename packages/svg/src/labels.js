import { passthrough, toStyle } from '@d3-composer/utils';
import { translateXY } from './utils';

export default function labels(selection, options) {
  const {
    data = passthrough,
    x,
    y,
    key,
    text,
    style,
    class: className,
    transition,
    transform,
    anchor = 'start',
    baseline = 'hanging'
  } = options;
  const translate = translateXY(x, y);

  const groups = selection.selectAll('g').data(data, key);

  groups.exit().remove();

  const entering = groups
    .enter()
    .append('g')
    .attr('transform', translate);

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

  return selection;
}
