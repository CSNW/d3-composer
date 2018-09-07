import { select } from 'd3';

export function svg() {
  let instance;

  function layer() {
    return instance.append('g');
  }

  layer.setup = () => {
    instance = select(document.body).append('svg');
  };
  layer.teardown = () => {
    instance.remove();
  };

  return layer;
}
