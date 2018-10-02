import { symbol, symbolCircle } from 'd3-shape';
import { toStyle } from '@d3-composer/utils';

export default function legend(selection, options) {
  let {
    path,
    size,
    width,
    height,
    text = d => d,
    data,
    groupStyle,
    groupClass,
    pathStyle,
    labelStyle
  } = options;

  // TODO Accept size, width, or height as functions
  if (!height && !size) {
    size = 50;
  }
  if (!height) {
    height = 3 * Math.sqrt(size);
  }
  if (!width) {
    width = height;
  }
  if (!size) {
    size = (Math.min(width, height) * Math.min(width, height)) / 3;
  }

  if (!path) {
    path = symbol()
      .size(size)
      .type(symbolCircle);
  }

  const layers = selection
    .selectAll('g')
    .data(data, (d, i) => (d && d.key != null ? d.key : i));

  layers.exit().remove();

  const entering = layers.enter().append('g');

  entering
    .merge(layers)
    .attr('transform', (_, i) => `translate(0, ${i * height})`)
    .attr('style', toStyle(groupStyle))
    .attr('class', groupClass);
  entering
    .append('path')
    .merge(layers.select('path'))
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .attr('fill', 'currentColor')
    .attr('stroke', 'none')
    .attr('style', toStyle(pathStyle))
    .attr('d', path);
  entering
    .append('text')
    .merge(layers.select('text'))
    .attr('dominant-baseline', 'central')
    .attr('transform', `translate(${width}, ${height / 2})`)
    .attr('fill', 'currentColor')
    .attr('stroke', 'none')
    .attr('style', toStyle(labelStyle))
    .text(text);

  return selection;
}
