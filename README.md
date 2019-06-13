# d3-composer

d3-composer consists of two primary concepts: functional chart components and a grid system based on CSS grid.

__Functional chart components__

A functional chart component approach is used throughout d3-composer and allows complex charts to be composed out of simple, reusable chart components. These match closely to built-in d3 components and can be used with the standard approach of `selection.call(...)`.

```js
function lines(selection, options) {
  // ...
}

function composed(selection, options) {
  lines(selection, options);
  // ...
}

composed(select('...'), { /* ... */ })

// or 

select('...').call(composed, { /* ... */ });
```

__Grid system__

d3-composer uses a `grid-template` approach (see: [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-15) for details) for laying out selections for chart components.

```js
import { template } from 'd3-composer';

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

## Usage

For npm / yarn, `npm install d3-composer` or `yarn add d3-composer`. Otherwise, you can use unpkg to download the latest release: `<script src="https://unpkg.com/d3-composer"></script>` and reference d3-composer with the `d3c` global.

## Example

```js
import { select } from 'd3';
import { template, chart, layout, series, line, axis, text, size } from 'd3-composer';

function lines(selection, options = {}) {
  const { data = [], xScale, yScale  } = options;

  const grid = template(`
    "title title" 50
    "y_axis chart" auto
    ". x_axis" 50
    / 50 auto
  `, size(selection));

  xScale.range([0, grid.chart.width]);
  yScale.range([grid.chart.height, 0]);

  layout(selection, grid, layers => {
    axis(layers.x_axis(), { scale: xScale });
    axis(layers.y_axis(), { scale: yScale });
    
    line(
      series(layers.chart(), { data }),
      {
        data: series => series.values,
        x: d => xScale(d.x),
        y: d => yScale(d.y)
      }
    );
    
    text(layers.title(), { text: 'Line Chart' });
  });
}

const svg = chart(
  select('#chart'),
  { width: 600, height: 400, responsive: true }
);

lines(svg, { /* ... */ });
```

## Examples

Live examples on observablehq:

- [Line](https://beta.observablehq.com/@timhall/d3-composer-line)
- [Text](https://beta.observablehq.com/@timhall/d3-composer-text)

## API

### @d3-composer/grid

- [template](https://github.com/CSNW/d3-composer/blob/master/packages/grid/README.md#template) - Create grid from template

### @d3-composer/svg

- [chart](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#chart) - SVG chart wrapper with sizing and responsive options
- [layout](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#layout) - Create `g` layers from grid
- [layer](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#layer) - Create named `g` layer
- [series](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#series) - Create series layers
- [stack](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#stack) - Create stacked layers
- [vstack](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#vstack) - Create vertically stacked layers
- [hstack](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#hstack) - Create horizontally stacked layers
- [line](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#line) - Line chart
- [bars](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#bars) - Bars chart
- [scatter](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#scatter) - Scatter chart
- [area](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#area) - Area chart
- [labels](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#labels) - Labels component
- [axisTop](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#axisTop) - Top-oriented axis component
- [axisRight](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#axisRight) - Right-oriented axis component
- [axisBottom](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#axisBottom) - Bottom-oriented axis component
- [axisLeft](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#axisLeft) - Left-oriented axis component
- [text](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#text) - Text component
- [legend](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#legend) - Legend component
- [gridlines](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#gridlines) - Gridlines component
- [symbolLine](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#symbolLine) - Line symbol
- [size](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#size) - Size helper
- [interpolatePath](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#interpolatePath) - Interpolate path `d`
- [translateXY](https://github.com/CSNW/d3-composer/blob/master/packages/svg/README.md#translateXY) - Translate helper for x,y

### @d3-composer/utils

- [toStyle](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#toStyle) - convert to style string
- [toMargin](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#toMargin) - convert to margin array
- [passthrough](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#passthrough) - create data passthrough
- [array](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#array) - wrap given value as array
- [fn](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#fn) - ensure given value is a function
- [seriesExtent](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#seriesExtent) - determine extent of series data
- [Size](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#Size-local) - size local
- [Area](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#Area-local) - area local
- [Series](https://github.com/CSNW/d3-composer/blob/master/packages/utils/README.md#Series-local) - series local

## Development

- Install: `yarn` or `yarn install` (d3-composer uses yarn workspaces)
- Test: `yarn test`
- Build: `yarn build`
- Version: `npx lerna version VERSION`
- Publish: `npx lerna publish from-package --otp ######` 
