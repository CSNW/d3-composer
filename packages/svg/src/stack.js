import { passthrough, fn, toStyle, Size } from '@d3-composer/utils';
import { assign, byIndex, size as measure } from './utils';

export default function stack(selection, options) {
  const {
    data = passthrough,
    key = byIndex,
    direction = 'vertical',
    size: _size,
    class: className,
    style
  } = options;
  const size = fn(_size);
  const { width, height } = measure(selection);

  const items = selection.selectAll('g').data(data, key);

  items.exit().remove();

  const sizes = [];
  let offset = 0;

  return items
    .enter()
    .append('g')
    .merge(items)
    .property(Size, function(d, i, j) {
      sizes[i] = size.call(this, d, i, j) || 0;

      return direction === 'vertical'
        ? { width, height: sizes[i] }
        : { width: sizes[i], height };
    })
    .attr('transform', (_d, i) => {
      const x = direction === 'vertical' ? 0 : offset;
      const y = direction === 'vertical' ? offset : 0;
      offset += sizes[i];

      return `translate(${x}, ${y})`;
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
