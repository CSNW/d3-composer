import {
  range,
  select,
  scaleLinear,
  scaleBand,
  transition as d3_transition,
  symbol,
  symbolCircle
} from 'd3';
import { template } from '@d3-composer/grid';
import {
  chart,
  layout,
  lines,
  bars,
  scatter,
  text,
  axisLeft,
  axisBottom,
  axisTop,
  axisRight,
  size
} from '@d3-composer/svg';

draw();
select('#update').on('click', () => draw());

function linesChart(selection, props) {
  let { data, xScale, yScale, transition } = props;

  const grid = template(
    `
    "title title title" 60  
    "y_axis_title y_axis chart" auto 
    ". . x_axis" 40
    / 20 40 auto`,
    size(selection)
  );
  const layers = layout(selection, grid);

  xScale = xScale.range([0, grid.chart.width]);
  yScale = yScale.range([grid.chart.height, 0]);

  text(layers.title(), { text: 'Lines', justify: 'center', align: 'center' });
  text(layers.y_axis_title(), {
    text: 'y-axis title is really long',
    align: 'center',
    justify: 'center',
    rotation: -90
  });
  axisLeft(layers.y_axis(), { yScale });
  axisBottom(layers.x_axis(), { xScale });

  lines(layers.chart('lines'), {
    data,
    xScale,
    yScale,
    style: { stroke: 'blue', fill: 'none' },
    transition
  });
  scatter(layers.chart('scatter'), {
    data,
    xScale,
    yScale,
    path: symbol()
      .size(50)
      .type(symbolCircle),
    style: { stroke: 'blue', fill: 'rgba(255, 255, 255, 0.5)' },
    transition
  });
}

function barsChart(selection, props) {
  let { data, xScale, yScale, transition } = props;

  const grid = template(
    `
    "title title" 40
    "x_axis ." 20
    "chart y_axis" auto 
    / auto 40`,
    size(selection)
  );
  const layers = layout(selection, grid);

  xScale = xScale.range([0, grid.chart.width]);
  yScale = yScale.range([grid.chart.height, 0]);

  text(layers.title(), { text: 'Bars', justify: 'center', align: 'center' });
  axisTop(layers.x_axis(), { xScale });
  axisRight(layers.y_axis(), { yScale });

  bars(layers.chart(), {
    data,
    xScale,
    yScale,
    seriesStyle: { fill: 'green' },
    transition
  });
}

function draw() {
  const lines = chart(select('#lines'), {
    width: 600,
    height: 400,
    responsive: true
  });

  linesChart(lines, {
    data: random(),
    xScale: scaleLinear().domain([0, 100]),
    yScale: scaleLinear().domain([0, 100]),
    transition: d3_transition().duration(1000)
  });

  const domain = range(0, 11);
  const bars = chart(select('#bars'), { width: 600, height: 400 });

  barsChart(bars, {
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
