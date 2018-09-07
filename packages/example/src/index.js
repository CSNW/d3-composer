import { select, scaleLinear } from 'd3';
import { lines } from '@d3-composer/svg';

function linesChart(selection, props) {
  let { data, xScale, yScale, width = 600, height = 400 } = props;

  const svg = selection.selectAll('svg').data([null]);
  const layer = svg
    .enter()
    .append('svg')
    .merge(svg)
    .attr('width', width)
    .attr('height', height);

  xScale = xScale.range([0, width]);
  yScale = yScale.range([height, 0]);

  lines(layer, { data, xScale, yScale, style: 'stroke: blue' });
}

linesChart(select('#chart'), {
  data: [{ x: 0, y: 0 }, { x: 100, y: 100 }],
  xScale: scaleLinear().domain([0, 100]),
  yScale: scaleLinear().domain([0, 100])
});
