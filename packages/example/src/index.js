import {
  range,
  select,
  scaleLinear,
  scaleBand,
  transition as d3_transition
} from 'd3';
import { template } from '@d3-composer/grid';
import { chart, layout, lines, bars, text } from '@d3-composer/svg';

draw();
select('#update').on('click', () => draw());

function linesChart(selection, props) {
  let { data, xScale, yScale, width = 600, height = 400, transition } = props;

  const svg = chart(selection, { width, height });

  const grid = template(
    `
    "title" 75  
    "chart" auto / auto`,
    { width, height }
  );
  const layers = layout(svg, grid);

  xScale = xScale.range([0, grid.chart.width]);
  yScale = yScale.range([grid.chart.height, 0]);

  text(layers.title(), { text: 'Title', justify: 'center', align: 'center' });
  lines(layers.chart(), {
    data,
    xScale,
    yScale,
    style: { stroke: 'blue', fill: 'none' },
    transition
  });
}

function barsChart(selection, props) {
  let { data, xScale, yScale, width = 600, height = 400, transition } = props;

  const svg = chart(selection, { width, height, responsive: false });

  xScale = xScale.range([0, width]);
  yScale = yScale.range([height, 0]);

  bars(svg, {
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
