import { toStyle } from '@d3-composer/utils';
import { descendants } from './utils';

export default function chart(selection, props) {
  const { width, height, responsive = true } = props;

  let svg;
  if (selection.node().tagName === 'svg') {
    svg = selection;
  } else {
    svg = svgLayer(containerLayer(selection, { width, height, responsive }), {
      responsive
    });
  }

  return svg
    .attr('viewBox', responsive ? `0 0 ${width} ${height}` : null)
    .attr('preserveAspectRatio', responsive ? 'xMidYMid meet' : null)
    .attr('width', responsive ? null : width)
    .attr('height', responsive ? null : height);
}

function containerLayer(selection, props) {
  const { width, height, responsive } = props;
  const ratio = height / width;

  const container = selection
    .selectAll(descendants)
    .filter('[data-container]')
    .data([null]);

  return container
    .enter()
    .append('div')
    .attr('data-container', '')
    .merge(container)
    .attr(
      'style',
      responsive
        ? toStyle({
            position: 'relative',
            width: '100%',
            height: 0,
            'padding-top': `${ratio * 100}%`
          })
        : null
    );
}

function svgLayer(selection, props) {
  const { responsive } = props;

  const svg = selection
    .selectAll(descendants)
    .filter('svg')
    .data([null]);

  return svg
    .enter()
    .append('svg')
    .merge(svg)
    .attr(
      'style',
      responsive
        ? toStyle({
            position: 'absolute',
            top: 0,
            left: 0
          })
        : null
    );
}
