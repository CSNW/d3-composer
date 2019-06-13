import { toStyle } from '@d3-composer/utils';
import { measure } from './utils';

export default function text(selection, options) {
  // anchor = origin-x = 'start' | 'middle' | 'end'
  //   (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
  // baseline = origin-y = 'hanging' | 'middle' | 'baseline'
  //   (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline)
  // justify = container-x = 'start' | 'center' | 'end'
  //   (https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-30)
  // align = container-y = 'start' | 'center' | 'end'
  //   (https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-31)

  let {
    text,
    anchor,
    baseline,
    justify = 'start',
    align = 'start',
    class: className,
    style,
    rotation,
    transform
  } = options;

  anchor =
    anchor != null
      ? anchor
      : justify === 'center'
      ? 'middle'
      : justify === 'end'
      ? 'end'
      : 'start';

  baseline =
    baseline != null
      ? baseline
      : align === 'center'
      ? 'middle'
      : align === 'end'
      ? 'baseline'
      : 'hanging';

  if (!transform && (justify !== 'start' || align !== 'start' || rotation)) {
    const { width, height } = measure(selection);
    let x = 0;
    let y = 0;

    if (justify === 'center') {
      x = width / 2;
    } else if (justify === 'end') {
      x = width;
    }

    if (align === 'center') {
      y = height / 2;
    } else if (align === 'end') {
      y = height;
    }

    transform = `translate(${x}, ${y}) rotate(${rotation || 0})`;
  }

  const instance = selection.selectAll('text').data([null]);
  instance
    .enter()
    .append('text')
    .merge(instance)
    .attr('dominant-baseline', baseline)
    .attr('text-anchor', anchor)
    .attr('transform', transform)
    .attr('class', className)
    .attr('style', toStyle(style))
    .text(text);

  return selection;
}
