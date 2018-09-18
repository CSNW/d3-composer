import { Area, Size, toStyle } from '@d3-composer/utils';
import { applyMargin } from '@d3-composer/grid';
import _layer from './layer';
import { childNodes } from './utils';

function layer(selection, id, area, options) {
  const { margin, style, class: className } = options;
  area = applyMargin(area, margin);

  return _layer(selection, id)
    .property(Area, area)
    .property(Size, area)
    .attr('style', toStyle(style))
    .attr('class', className)
    .attr('transform', `translate(${area.x}, ${area.y})`);
}

export default function layout(selection, grid, callback) {
  let index = 0;
  const indices = {};
  const added = [];

  function layers(id, options = {}) {
    if (id && typeof id === 'object') {
      options = id;
      id = undefined;
    }

    const item = index++;
    if (index >= grid.items.length) index = 0;

    const name = `__item_${item}`;
    if (!indices[name]) indices[name] = 0;
    const i = indices[name]++;

    id = id || `item-${item}${i > 0 ? `-${i}` : ''}`;
    added.push(id);

    return layer(selection, id, grid.items[item], options).attr(
      'data-item',
      item
    );
  }

  Object.keys(grid.areas).forEach(name => {
    const area = grid.areas[name];
    indices[name] = 0;

    layers[name] = (id, options = {}) => {
      if (id && typeof id === 'object') {
        options = id;
        id = undefined;
      }
      const i = indices[name]++;

      id = id || `area-${name}${i > 0 ? `-${i}` : ''}`;
      added.push(id);

      return layer(selection, id, area, options).attr('data-area', name);
    };
  });

  // TODO This isn't ideomatic d3, but not sure the best way to deal with dynamic layers
  callback(layers);

  // Remove stale layers
  selection
    .selectAll(childNodes)
    .filter('[data-layer]')
    .data(added, function(d) {
      return d || this.dataset.layer;
    })
    .order()
    .exit()
    .remove();

  return selection;
}
