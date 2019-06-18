import { Size } from '@d3-composer/utils';
import { childNodes } from './utils';

export default function layer(selection, id, options = {}) {
  const { element = 'g', data = [null] } = options;
  const instance = selection
    .selectAll(childNodes)
    .filter(`[data-layer="${id}"]`)
    .data(data);

  // Forward size from selection to layer
  const size = selection.property(Size);

  return instance
    .enter()
    .append(element)
    .attr('data-layer', id)
    .merge(instance)
    .property(Size, size);
}
