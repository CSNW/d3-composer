import {
  range,
  select,
  scaleLinear,
  scaleBand,
  transition as d3_transition
} from 'd3';
import { lines, bars } from '@d3-composer/svg';

draw();
select('#update').on('click', () => draw());

function linesChart(selection, props) {
  let { data, xScale, yScale, width = 600, height = 400, transition } = props;

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
    style: { stroke: 'blue', fill: 'none' },
    transition
  });
}

function barsChart(selection, props) {
  let { data, xScale, yScale, width = 600, height = 400, transition } = props;

  const svg = selection.selectAll('svg').data([null]);
  const layer = svg
    .enter()
    .append('svg')
    .merge(svg)
    .attr('width', width)
    .attr('height', height);

  xScale = xScale.range([0, width]);
  yScale = yScale.range([height, 0]);

  bars(layer, {
    data,
    xScale,
    yScale,
    seriesStyle: { fill: 'green' },
    transition
  });
}

function draw() {
  linesChart(select('#lines'), {
    data: random(),
    xScale: scaleLinear().domain([0, 100]),
    yScale: scaleLinear().domain([0, 100]),
    transition: d3_transition().duration(1000)
  });

  const domain = range(0, 11);
  barsChart(select('#bars'), {
    data: [{ values: domain.map(x => ({ x, y: inRange(0, 100) })) }],
    xScale: scaleBand()
      .domain(domain)
      .paddingInner(0.1),
    yScale: scaleLinear().domain([0, 100]),
    transition: d3_transition().duration(1000)
  });
}

function random(x_values = range(0, 110, 10)) {
  return range(0, inRange(1, 4)).map(() => {
    return { values: x_values.map(x => ({ x, y: inRange(0, 100) })) };
  });
}

function inRange(min, max) {
  return Math.round(min + Math.random() * (max - min));
}
