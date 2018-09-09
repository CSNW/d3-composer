import { childNodes } from './utils';

export default function chart(selection, props) {
  const { width, height, responsive } = props;

  let svg;
  if (selection.node().tagName === 'svg') {
    svg = selection;
  } else {
    const ratio = (height / width) * 100;
    const style = responsive
      ? `position: relative; width: 100%; height: 0; padding-top: ${ratio}%;`
      : null;

    selection.attr('data-container', '').attr('style', style);
    svg = svgLayer(selection, { responsive });
  }

  return svg
    .attr('viewBox', responsive ? `0 0 ${width} ${height}` : null)
    .attr('preserveAspectRatio', responsive ? 'xMidYMid meet' : null)
    .attr('width', responsive ? null : width)
    .attr('height', responsive ? null : height);
}

function svgLayer(selection, props) {
  const { responsive } = props;

  const style = responsive ? 'position: absolute; top: 0; left: 0;' : null;

  const svg = selection
    .selectAll(childNodes)
    .filter('svg')
    .data([null]);

  return svg
    .enter()
    .append('svg')
    .merge(svg)
    .attr('style', style);
}
