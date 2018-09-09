import { Area, Series, series, toStyle } from '@d3-composer/utils';

export function size(selection) {
  const node = selection.node();

  if (node.tagName === 'svg') {
    const viewBox = node.getAttribute('viewBox');
    if (viewBox) {
      const [_1, _2, width, height] = viewBox.split(' ');
      return { width, height };
    }

    const width = node.getAttribute('width');
    const height = node.getAttribute('height');

    return { width, height };
  }

  const area = Area.get(node);
  return area || { width: 0, height: 0 };
}

export function seriesLayers(selection, props) {
  const { seriesClass, seriesStyle } = props;
  const { data, seriesKey } = series(props);

  const layers = selection
    .selectAll(childNodes)
    .filter('[data-series]')
    .data(data, seriesKey);
  layers.exit().remove();

  return layers
    .enter()
    .append('g')
    .attr('data-series', seriesKey)
    .property(Series, d => d)
    .merge(layers)
    .attr('class', seriesClass)
    .attr('style', toStyle(seriesStyle));
}

export function childNodes() {
  return this.childNodes;
}

export function interpolatePath(selection, path, interpolate) {
  if (interpolate) {
    selection.attrTween('d', function(d, i, j) {
      const next = typeof path === 'function' ? path.call(this, d, i, j) : path;
      const previous = this.getAttribute('d');

      return interpolate(previous, next);
    });
  } else {
    selection.attr('d', path);
  }
}

export function translateXY({ x: _x, y: _y }) {
  return function(d, i, j) {
    const x = _x.call(this, d, i, j);
    const y = _y.call(this, d, i, j);

    return `translate(${x}, ${y})`;
  };
}

export function translateXY0({ x: _x, yScale }) {
  return function(d, i, j) {
    const x = _x.call(this, d, i, j);
    const y = yScale(d && d.y0 != null ? d.y0 : 0);

    return `translate(${x}, ${y})`;
  };
}
