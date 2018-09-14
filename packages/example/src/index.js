import {
  range,
  select,
  scaleLinear,
  scaleBand,
  transition as d3_transition,
  symbol,
  symbolCircle
} from 'd3';
import {
  template,
  chart,
  layout,
  series,
  line,
  bars,
  scatter,
  area,
  labels,
  gridlines,
  text,
  legend,
  axisLeft,
  axisBottom,
  axisTop,
  axisRight,
  size,
  symbolLine
} from 'd3-composer';

draw();
select('#update').on('click', () => draw());

function linesChart(selection, options) {
  let { data, xScale, yScale, transition } = options;

  const grid = template(
    `
    "title title title title" 60  
    "y_axis_title y_axis chart legend" auto 
    ". . x_axis ." 40
    / 20 40 auto 100`,
    { ...size(selection), margin: 20 }
  );

  xScale = xScale.range([0, grid.chart.width]);
  yScale = yScale.range([grid.chart.height, 0]);

  const values = series => series.values;
  const x = d => xScale(d.x);
  const y = d => yScale(d.y);
  const y0 = yScale(0);
  const y1 = d => yScale(d.y);

  layout(selection, grid, layers => {
    text(layers.title(), { text: 'Lines', justify: 'center', align: 'center' });
    text(layers.y_axis_title(), {
      text: 'y-axis title is really long',
      align: 'center',
      justify: 'center',
      rotation: -90
    });

    gridlines(layers.chart('gridlines'), {
      xScale,
      yScale,
      style: { stroke: '#ccc' },
      xGrid: false
    });

    axisLeft(layers.y_axis(), { yScale });
    axisBottom(layers.x_axis(), {
      xScale,
      domainStyle: 'stroke: #ccc;',
      tickStyle: 'stroke: #ccc;'
    });

    area(series(layers.chart('area'), { data }), {
      data: values,
      x,
      y0,
      y1,
      style: { fill: 'blue', opacity: 0.05 },
      transition
    });
    line(series(layers.chart('line'), { data }), {
      data: values,
      x,
      y,
      style: { stroke: 'blue' },
      transition
    });
    scatter(series(layers.chart('scatter'), { data }), {
      data: values,
      x,
      y,
      path: symbol()
        .size(50)
        .type(symbolCircle),
      style: { stroke: 'blue', fill: 'rgba(255, 255, 255, 0.5)' },
      transition
    });
    labels(series(layers.chart('labels'), { data }), {
      data: values,
      x,
      y,
      text: d => d.y,
      anchor: 'middle',
      baseline: 'baseline',
      transform: `translate(0, -10)`,
      transition
    });

    legend(layers.legend({ margin: [0, 0, 0, 20] }), {
      data: ['A', 'B', 'C'],
      path: symbol()
        .size(50)
        .type(symbolLine)
    });
  });
}

function barsChart(selection, options) {
  let { data, xScale, yScale, transition } = options;

  const grid = template(
    `
    "title title" 40
    "x_axis ." 20
    "chart y_axis" auto 
    / auto 40`,
    { ...size(selection), margin: 20 }
  );

  xScale = xScale.range([0, grid.chart.width]);
  yScale = yScale.range([grid.chart.height, 0]);

  const x = d => xScale(d.x);
  const width = xScale.bandwidth();
  const y0 = yScale(0);
  const y = d => yScale(d.y);

  layout(selection, grid, layers => {
    text(layers.title(), { text: 'Bars', justify: 'center', align: 'center' });
    axisTop(layers.x_axis(), { xScale });
    axisRight(layers.y_axis(), { yScale });

    bars(series(layers.chart(), { data, style: { color: 'green' } }), {
      data: series => series.values,
      x,
      width,
      y0,
      y,
      transition
    });
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
