import { Area } from '@d3-composer/utils';
import layer from './layer';

export default function layout(selection, grid) {
  const layers = {};
  Object.keys(grid).forEach(name => {
    const area = grid[name];

    layers[name] = id => {
      return layer(selection, id || `area-${name}`)
        .property(Area, area)
        .attr('data-area', name)
        .attr('transform', `translate(${area.x}, ${area.y})`);
    };
  });

  return layers;
}
