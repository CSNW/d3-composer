import { Area, Size, toMargin } from '@d3-composer/utils';
import layer from './layer';
import { childNodes } from './utils';

export default function layout(selection, grid, callback) {
  const layers = {};
  const index = {};
  const added = [];

  Object.keys(grid.areas).forEach(name => {
    const area = grid.areas[name];
    index[name] = 0;

    layers[name] = (id, options = {}) => {
      if (id && typeof id === 'object') {
        options = id;
        id = undefined;
      }

      id = id || `area-${name}-${index[name]++}`;
      const layer_area = adjustArea(area, options.margin);

      added.push(id);

      return layer(selection, id)
        .property(Area, layer_area)
        .property(Size, layer_area)
        .attr('data-area', name)
        .attr('transform', `translate(${layer_area.x}, ${layer_area.y})`);
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
    .order()
    .exit()
    .remove();

  return selection;
}

function adjustArea(area, margin) {
  if (!margin) return area;

  let { x, y, width, height } = area;
  margin = toMargin(margin);

  x += margin[3];
  y += margin[0];
  width -= margin[1] + margin[3];
  height -= margin[0] + margin[2];

  return {
    x,
    y,
    width,
    height,
    left: x,
    right: x + width,
    top: y,
    bottom: y + height
  };
}
