import { select } from 'd3-selection';
import { passthrough, fn, toStyle, Size } from '@d3-composer/utils';
import { assign, byIndex, measure } from './utils';

export default function stack(selection, options = {}) {
  const {
    data = passthrough,
    key = byIndex,
    direction = 'vertical',
    size: _size,
    class: className,
    style
  } = options;
  const getSize = fn(_size);
  const { width, height } = measure(selection);

  const items = selection.selectAll('g').data(data, key);

  items.exit().remove();

  let offset = 0;
  return items
    .enter()
    .append('g')
    .merge(items)
    .each(function(d, i, j) {
      const size = getSize.call(this, d, i, j) || 0;
      const dimensions =
        direction === 'vertical'
          ? { width, height: size }
          : { width: size, height };

      if (i === 0) offset = 0;

      const x = direction === 'vertical' ? 0 : offset;
      const y = direction === 'vertical' ? offset : 0;
      offset += size;

      select(this)
        .property(Size, dimensions)
        .attr('transform', `translate(${x}, ${y})`);
    })
    .attr('style', toStyle(style))
    .attr('class', className);
}

export function vstack(selection, options) {
  return stack(selection, assign({ direction: 'vertical' }, options));
}

export function hstack(selection, options) {
  return stack(selection, assign({ direction: 'horizontal' }, options));
}
