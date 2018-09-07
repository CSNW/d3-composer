import { range, randomUniform, select, scaleLinear } from 'd3';
import { lines } from '@d3-composer/svg';

draw();
select('#update').on('click', () => draw());

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

  lines(layer, {
    data,
    xScale,
    yScale,
    style: { stroke: 'blue', fill: 'none' }
  });
}

function draw() {
  linesChart(select('#chart'), {
    data: random(),
    xScale: scaleLinear().domain([0, 100]),
    yScale: scaleLinear().domain([0, 100])
  });
}

function random() {
  const x_values = range(0, 110, 10);
  const y_values = randomUniform(0, 100);

  return [
    { values: x_values.map(x => ({ x, y: y_values() })) },
    { values: x_values.map(x => ({ x, y: y_values() })) }
  ];
}
