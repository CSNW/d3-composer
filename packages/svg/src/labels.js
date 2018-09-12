import { passthrough, toStyle } from '@d3-composer/utils';
import { translateXY } from './utils';

export default function labels(selection, props) {
  let {
    data, // = passthrough,
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
  } = props;
  data = data || passthrough; // TEMP (https://github.com/rollup/rollup/issues/2445)
  const translate = translateXY(x, y);

  const groups = selection.selectAll('g').data(data, key);

  groups
    .exit()
    .transition(transition)
    .attr('opacity', 0)
    .remove();

  const entering = groups
    .enter()
    .append('g')
    .attr('transform', translate)
    .attr('opacity', 0);

  entering
    .merge(groups)
    .transition(transition)
    .attr('transform', translate)
    .attr('opacity', 1);
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
