import { select } from 'd3';

export default function body() {
  let selection;
  let svg;
  const instances = [];

  return {
    setup() {
      selection = select(document.body);
      svg = selection.append('svg');
    },
    teardown() {
      for (const instance of instances) {
        instance.remove();
      }
      svg.remove();
    },

    append(type) {
      const instance = selection.append(type);
      instances.push(instance);

      return instance;
    },
    layer() {
      return svg.append('g');
    }
  };
}
