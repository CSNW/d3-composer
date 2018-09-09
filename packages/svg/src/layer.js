import { descendants } from './utils';

export default function layer(selection, id, options = {}) {
  const { element = 'g' } = options;
  const instance = selection
    .selectAll(descendants)
    .filter(`[data-layer="${id}"]`)
    .data([null]);

  return instance
    .enter()
    .append(element)
    .attr('data-layer', id)
    .merge(instance);
}
