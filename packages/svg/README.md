# @d3-composer/svg

## Example

```js
import { select } from 'd3';
import { chart, layer, lines, scatter } from '@d3-composer/svg';

const svg = chart(
  select('#chart'),
  { width: 600, height: 400, responsive: true }
);
linesChart(svg, { /* ... */ });

function linesChart(selection, props) {
  const { data, xScale, yScale } = props;

  lines(layer(selection, 'lines'), { data, xScale, yScale });
  scatter(layer(selection, 'scatter'), { data, xScale, yScale });
}
```

## API

<a href="#chart" name="chart">#</a> <b>chart</b>(<i>selection</i>[, <i>options</i>])

SVG chart wrapper with sizing and responsive options.

Options:

- `width` - svg width or "design" width for `responsive`
- `height` - svg height or "design" height for `responsive`
- `[responsive]` - Use responsive container and viewBox

```js
const svg = chart(select('svg'), { width: 400, height: 300 });

const responsive = chart(
  select('div'), 
  { width: 400, height: 300, responsive: true }
); 
```

<a href="#layout" name="layout">#</a> <b>layout</b>(<i>selection</i>[, <i>grid</i>])

Create layer functions that are laid out for each area of the grid.

```js
import { template } from '@d3-composer/grid';
import { layout } from '@d3-composer/svg';

const grid = template(`"title" 50 "chart" auto / auto`);
const layers = layout(selection, grid);

const title = layers.title();
const chart_a = layers.chart('a');
const chart_b = layers.chart('b');
```

<a href="#layer" name="layer">#</a> <b>layer</b>(<i>selection</i>[, <i>id</i>])

Create or select an existing `g` layer for the given id.

<a href="#lines" name="lines">#</a> <b>lines</b>(<i>selection</i>[, <i>props</i>])

A lines chart for drawing x,y lines

Options:

- `data` - {x,y} series data
- `xScale` - [d3-scale](https://github.com/d3/d3-scale) for x-value
- `yScale` - d3-scale for y-value
- `[xValue]` - accessor for x-value (default = `d => d.x`)
- `[yValue]` - accessor for y-value (default = `d => d.y`)
- `[curve]` - See [d3-shape](https://github.com/d3/d3-shape#curves)
- `[style]` - Style string, object, or function for line
- `[class]` - Class string or function for line
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))
- `[interpolate]` - An interpolation function for `update` and `exit`, such as [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path)

```js
// scale
lines(selection, { xScale: d3.scaleLog().domain([1, 10000]) })

// curve
lines(selection, { curve: d3.curveCardinal() });

// style
lines(selection, { style: d => { stroke: d.color } });

// class
lines(selection, { class: d => d.class });

// transition
lines(selection, { transition: d3.transition().duration(1000) })

// interpolate
lines(selection, { interpolate: d3.interpolatePath })
```

<a href="#bars" name="bars">#</a> <b>bars</b>(<i>selection</i>[, <i>props</i>])

A flexible bars chart component that can be used to create ordinal, histogram, horizontal, and stacked bars charts.

Options:

- `data` - {x,y} or {x0,x1,y} or {x0,x1,y0,y1} series data
- `xScale` - [d3-scale](https://github.com/d3/d3-scale) for x-value (`d3.scaleBand()` is the typical choice)
- `yScale` - d3-scale for y-value
- `[xValue]` - accessor for x-value (default = `d => d.x`)
- `[yValue]` - accessor for y-value (default = `d => d.y`)
- `[x0]` - accessor for x0-value (default is x0-position or x-position)
- `[x1]` - accessor for x1-value (default is x1-position or `x0 + xScale.bandwidth()`)
- `[y0]` - accessor for y0-value (default is y0-position or `yScale(0)`)
- `[y1]` - accessor for y1-value (default is y1-position or y-position)
- `[key]` - Bar key for identifying bars (default is `d => d.key or x-value`)
- `[style]` - Style string, object, or function for bar
- `[class]` - Class string or function for bar
- `[seriesKey]` - Series key for identifying series (default is `(series, i) => series.key || i`)
- `[seriesStyle]` - Style string, object, or function for series group
- `[seriesClass]` - Class string or function for series group
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

```js
// scale
bars(selection, { xScale: d3.scaleLog().domain([1, 10000]) })

// style
bars(selection, { style: d => { fill: d.color } });

// class
bars(selection, { class: d => d.class });

// transition
bars(selection, { transition: d3.transition().duration(1000) })
```

<a href="#scatter" name="scatter">#</a> <b>scatter</b>(<i>selection</i>[, <i>props</i>])

Scatter chart for placing `path` at x,y positions.

Options:

- `path` - String or function that returns a `d` for `path`. (e.g. `d3.symbol().size(50).type(d3.symbolCircle)`)
- `data` - {x,y} series data
- `xScale` - [d3-scale](https://github.com/d3/d3-scale) for x-value
- `yScale` - d3-scale for y-value
- `[xValue]` - accessor for x-value (default = `d => d.x`)
- `[yValue]` - accessor for y-value (default = `d => d.y`)
- `[key]` - Path key. Note: By default, `d => d.key or x-value` is used, so for data with multiple points at a single x-value, a `key` will need to be set on `d` or a custom `key` prop provided 
- `[style]` - Style string, object, or function for path
- `[class]` - Class string or function for path
- `[seriesKey]` - Series key for identifying series (default is `(series, i) => series.key || i`)
- `[seriesStyle]` - Style string, object, or function for series group
- `[seriesClass]` - Class string or function for series group
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

<a href="#labels" name="labels">#</a> <b>labels</b>(<i>selection</i>[, <i>props</i>])

Labels chart for placing `text` labels at x,y positions.

Options:

- `text` - String or function for setting text value
- `data` - {x,y} series data
- `xScale` - [d3-scale](https://github.com/d3/d3-scale) for x-value
- `yScale` - d3-scale for y-value
- `[transform]` - Transform string or function to apply to each label relative to x,y point
- `[anchor = 'start']` - x-value of text origin (`'start'`, `'middle'`, or `'end'`)
- `[baseline = 'hanging']` - y-value of text origin (`'hanging'`, `'middle'`, or `'baseline'`), see [dominant-baseline](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline)
- `[xValue]` - accessor for x-value (default = `d => d.x`)
- `[yValue]` - accessor for y-value (default = `d => d.y`)
- `[key]` - Path key. Note: By default, `d => d.key or x-value` is used, so for data with multiple points at a single x-value, a `key` will need to be set on `d` or a custom `key` prop provided
- `[style]` - Style string, object, or function for path
- `[class]` - Class string or function for path
- `[seriesKey]` - Series key for identifying series (default is `(series, i) => series.key || i`)
- `[seriesStyle]` - Style string, object, or function for series group
- `[seriesClass]` - Class string or function for series group
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

<a href="#axisTop" name="axisTop">#</a> <b>axisTop</b>(<i>selection</i>[, <i>props</i>])

A top-oriented axis component that wraps [d3-axis](https://github.com/d3/d3-axis)

Options (see [d3-axis](https://github.com/d3/d3-axis) for details):

- `[ticks]` - tick count or interval. To set _specifier_, use `tickArguments` 
- `[tickArguments]`, `[tickValues]`, `[tickFormat]`, `[tickSize]`, `[tickSizeInner]`, `[tickSizeOuter]`, `[tickPadding]`

<a href="#axisRight" name="axisRight">#</a> <b>axisRight</b>(<i>selection</i>[, <i>props</i>])

Right-oriented axis (see [#axisTop](axisTop) for options)

<a href="#axisBottom" name="axisBottom">#</a> <b>axisBottom</b>(<i>selection</i>[, <i>props</i>])

Bottom-oriented axis (see [#axisTop](axisTop) for options)

<a href="#axisLeft" name="axisLeft">#</a> <b>axisLeft</b>(<i>selection</i>[, <i>props</i>])

Left-oriented axis (see [#axisTop](axisTop) for options)

<a href="#text" name="text">#</a> <b>text</b>(<i>selection</i>[, <i>props</i>])

A text component for adding and laying out text.

Options:

- `text` - Text value
- `[anchor]` - x-value of origin (`'start'`, `'middle'`, or `'end'`)
- `[baseline]` - y-value of origin (`'hanging'`, `'middle'`, or `'baseline'`), see [dominant-baseline](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline)
- `[justify = 'start']` - x-value of container placement (`'start'`, `'center'`, `'end'`) 
- `[align = 'start']` - y-value of container placement (`'start'`, `'center'`, `'end'`)
- `[style]` -  Style string, object, or function for text
- `[class]` - Class string or function for text
- `[rotation]` - Rotate text by given angle (e.g. `90deg`)
- `[transform]` - Manually transform text

<a href="#legend" name="legend">#</a> <b>legend</b>(<i>selection</i>[, <i>props</i>])

A legend component with paths and labels

Options:

- `path` - `d` string or function to pass to `path`
- `data` - legend data for labels and other functions
- `[text]` - string or function for legend text (default is `d => d`)
- `[size = 50]` - Set width and height of legend based on symbol sizing 
- `[width]` - Width of path area
- `[height]` -  Height of legend group
- `[groupStyle]` - Style string, object, or function for item group 
- `[groupClass]` - Class string or function for item group
- `[pathStyle]` - Style string, object, or function for item path
- `[pathClass]` - Class string or function for item path
- `[labelStyle]` - Style string, object, or function for item label
- `[labelClass]` - Class string or function for item label

<a href="#gridlines" name="gridlines">#</a> <b>gridlines</b>(<i>selection</i>[, <i>props</i>])

Gridlines component

Options:

- `xScale` - [d3-scale](https://github.com/d3/d3-scale) for x-value
- `yScale` - d3-scale for y-value
- `[style]` - Style string, object, or function for line
- `[class]` - Class string or function for line
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

<a href="#symbolLine" name="symbolLine">#</a> <b>symbolLine<b>

Symbol type for line symbol.

```js
import { symbol } from 'd3';
import { symbolLine } from '@d3-composer/svg';

symbol().size(50).type(symbolLine);
```

<a href="#size" name="size">#</a> <b>size</b>(<i>selection<i>)

Size helper for determining selection size.

<a href="#seriesLayers" name="seriesLayers">#</a> <b>seriesLayers</b>(<i>options<i>)

Series layers helper for adding/removing layers for series data.

<a href="#interpolatePath" name="interpolatePath">#</a> <b>interpolatePath</a>(<i>selection<i>, <i>path</i>[, <i>interpolate</i>])

Interpolate `d` for path with `attrTween`, if `interpolate` is provided, otherwise set `d` attr. `path` should be a `d` path string or function. `interpolate` is an interpolate function taking `(previous d, next d)`, such as [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path).
