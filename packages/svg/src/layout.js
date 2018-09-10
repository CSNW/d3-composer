import { Area } from '@d3-composer/utils';
import layer from './layer';
import { childNodes } from './utils';

export default function layout(selection, grid, callback) {
  const layers = {};
  const index = {};
  const added = [];

  Object.keys(grid).forEach(name => {
    const area = grid[name];
    index[name] = 0;

    layers[name] = id => {
      console.log('layer', id, name);

      id = id || `area-${name}-${index[name]++}`;
      added.push(id);

      return layer(selection, id)
        .property(Area, area)
        .attr('data-area', name)
        .attr('transform', `translate(${area.x}, ${area.y})`);
    };
  });

  callback(layers);

  // Remove stale layers
  selection
    .selectAll(childNodes)
    .filter('[data-layer]')
    .data(added, function(d) {
      return d || this.dataset.layer;
    })
    .exit()
    .remove();

  return selection;
}
