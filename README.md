# d3-composer

d3-composer consists of two primary concepts: functional chart components and a grid system based on CSS grid.

__Functional chart components__

A functional chart component approach is used throughout d3-composer and allows complex charts to be composed out of simple, reusable chart components.

```js
function lines(selection, props) {
  // ...
}

function composed(selection, props) {
  lines(selection, props);
  // ...
}
```

__Grid system__

d3-composer uses a `grid-template` approach (see: [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-15) for details) for laying out selections for chart components.

```js
import { template } from '@d3-composer/grid';
import { size } from '@d3-composer/svg';

const grid = template(`
  "title title" 50
  "y_axis chart" auto
  ". x_axis" 50
  / 50 auto
`, { width: 600, height: 400 });

// For size = { width: 600, height: 400 }:
//
// grid = {
//   title: { x: 0, y: 0, width: 600, height: 50 },
//   y_axis: { x: 0, y: 50, width: 50, height: 300 },
//   chart: { x: 50, y: 50, width: 550, height: 300 },
//   x_axis: { x: 50, y: 350, width: 550, height: 50 }
// }
```

## Example

```js
import { select } from 'd3';
import { template } from '@d3-composer/grid';
import { chart, layout, lines, axis, text } from '@d3-composer/svg';

function linesChart(selection, props = {}) {
  const { data = [], width = 600, height = 400 } = props;
  const svg = chart(selection, { width, height, responsive: true });

  const grid = template(`
    "title title" 50
    "y_axis chart" auto
    ". x_axis" 50
    / 50 auto
  `, { width, height });
  const layers = layout(svg, grid);

  const xScale = props.xScale.domain([0, grid.chart.width]);
  const yScale = props.yScale.domain([grid.chart.height, 0]);

  axis(layers.x_axis(), { scale: xScale });
  axis(layers.y_axis(), { scale: yScale });
  lines(layers.chart(), { data, xScale, yScale });
  text(layers.title(), { text: 'Line Chart' });
}

linesChart(select('#chart'), { /* ... */ });
```

## API

### @d3-composer/grid

- [template](https://github.com/CSNW/d3-composer/blob/master/packages/grid/README.md#template) - Create grid from template

### @d3-composer/svg

- [chart](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#chart) - SVG chart wrapper with sizing and responsive options
- [layout](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#layout) - Create `g` layers from grid
- [layer](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#layer) - Create named `g` layer
- [lines](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#lines) - Lines chart
- [bars](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#bars) - Bars chart
- [scatter](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#scatter) - Scatter chart
- [labels](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#labels) - Labels component
- [axis](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#axis) - Axis component
- [text](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#text) - Text component
- [legend](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#legend) - Legend component
- [annotation](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#annotation) - Annotation component
- [gridlines](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#gridlines) - Gridlines component
- [size](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#size) - Size helper

## Development

- Install: `yarn` or `yarn install` (d3-composer uses yarn workspaces)
- Test: `yarn test`
- Build: In package subdirectory: `yarn build`
