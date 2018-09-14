# @d3-composer/svg

## Example

```js
import { select } from 'd3';
import { chart, layer, line, scatter } from '@d3-composer/svg';

const svg = chart(
  select('#chart'),
  { width: 600, height: 400, responsive: true }
);
lines(svg, { /* ... */ });

function lines(selection, options) {
  const { data, xScale, yScale } = options;

  const values = series => series.values;
  const x = d => xScale(d.x);
  const y = d => yScale(d.y);

  line(
    series(layer(selection, 'lines'), { data }),
    { data: values, x, y }
  );
  scatter(
    series(layer(selection, 'scatter'), { data }),
    { data: values, x, y }
  );
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

<a href="#layout" name="layout">#</a> <b>layout</b>(<i>selection</i>, <i>grid</i>, <i>callback</i>)

Create layer functions that are laid out for each area of the grid. Callback should have the form `(layers) => void`, where `layers` contains a layer function for each area of the grid. Each layer function has the form `([id], [options]) => selection`. By default `id` is set to the area name, but when adding multiple layers for a single area, it's recommended to explicitly set `id`. Options can include the layer `margin`, inset from the grid area bounds.

```js
import { template } from '@d3-composer/grid';
import { layout } from '@d3-composer/svg';

const grid = template(`"title" 50 "chart" auto / auto`);

layout(selection, grid, layers => {
  const title_layer = layers.title();
  const chart_a_layer = layers.chart('a');
  const chart_b_layer = layers.chart('b', { margin: [0, 0, 10 0] });
  const x_axis_layer = layers.x_axis({ margin: [10, 0, 0, 0] })
});
```

<a href="#layer" name="layer">#</a> <b>layer</b>(<i>selection</i>, <i>id</i>)

Create or select an existing `g` layer for the given id.

<a href="#series" name="series">#</a> <b>series</b>(<i>selection</i>, <i>options</i>)

Create separate series layers and pass series values through to charts

Options:

- `data` - Array of series data
- `[key]`
- `[style]` - Style string, object, or function for series
- `[class]` - Class string or function for series 

```js
const data = [
  [{ x: 0, y: 0 }, ...],
  [{ x: 0, y: 100}, ...]
];

line(
  series(selection, { data }),
  { x: d => xScale(d.x), y: d => yScale(d.y) }
);
```

<a href="#line" name="line">#</a> <b>lines</b>(<i>selection</i>, <i>options</i>)

[Live Example](https://beta.observablehq.com/@timhall/d3-composer-line)

A line chart for drawing an x,y line

Options:

- `data` - {x,y} data
- `x` - x-value accessor
- `y` - y-value accessor
- `[curve]` - See [d3-shape](https://github.com/d3/d3-shape#curves)
- `[defined]` - Check if point is defined, breaking line if not (default = `y-value != null`)
- `[style]` - Style string, object, or function for line
- `[class]` - Class string or function for line
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))
- `[interpolate]` - An interpolation function for `update` and `exit`, such as [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path)

```js
// x,y
lines(selection, { data, x: d => xScale(d.year), y: d => yScale(d.result) })

// curve
lines(selection, { curve: d3.curveCardinal() });

// style
lines(selection, { style: { stroke: d => d.color } });

// class
lines(selection, { class: d => d.class });

// transition
lines(selection, { transition: d3.transition().duration(1000) })

// interpolate
lines(selection, { interpolate: d3.interpolatePath })
```

<a href="#bars" name="bars">#</a> <b>bars</b>(<i>selection</i>, <i>options</i>)

A flexible bars chart component that can be used to create ordinal, histogram, horizontal, and stacked bars charts.

Options:

- `data` - {x,y} or {x0,x1,y} or {x0,x1,y0,y1} data
- `[x]` - x-accessor (set left-side of bar, `width` or `x1` needs to also be defined)
- `[x0]` - x0-accessor
- `[x1]` - x1-accessor (set right-side of bar)
- `[y]` - y-accessor (set top of bar, `height` or `y0` needs to also be defined)
- `[y0]` - y0-accessor (set bottom of bar)
- `[y1]` - y1-accessor
- `[width]` - bar width accessor
- `[height]` - bar height accssor
- `[key]` - key for identifying bars
- `[style]` - Style string, object, or function for bar
- `[class]` - Class string or function for bar
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

```js
// scale
bars(selection, {
  data,
  x: d => xScale(d.x),
  width: xScale.bandwidth(), 
  y: d => yScale(d.y),
  y0: yScale(0)
});
```

<a href="#scatter" name="scatter">#</a> <b>scatter</b>(<i>selection</i>, <i>options</i>)

Scatter chart for placing `path` at x,y positions.

Options:

- `path` - String or function that returns a `d` for `path`. (e.g. `d3.symbol().size(50).type(d3.symbolCircle)`)
- `data` - {x,y} data
- `x` - x-value accessor
- `y` - y-value accessor
- `[key]`
- `[style]` - Style string, object, or function for path
- `[class]` - Class string or function for path
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

<a href="#area" name="area">#</a> <b>area</b>(<i>selection</i>, <i>options</i>)

Area chart for drawing {x,y}, {x,y0,y1}, or {x0,x1,y0,y1} series data.

Options:

- `data` - {x,y} or {x0,x1,y} or {x0,x1,y0,y1} data
- `[x]` - x-accessor (sets x0 and x1 to this value)
- `[x0]` - x0-accessor
- `[x1]` - x1-accessor (set right-side of bar)
- `[y0]` - y0-accessor (set bottom of bar)
- `[y1]` - y1-accessor
- `[curve]` - See [d3-shape](https://github.com/d3/d3-shape#curves)
- `[defined]` - Check if point is defined, breaking line if not (default = `y0-value != null and y1-value != null`)
- `[style]` - Style string, object, or function for line
- `[class]` - Class string or function for line
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))
- `[interpolate]` - An interpolation function for `update` and `exit`, such as [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path)

<a href="#labels" name="labels">#</a> <b>labels</b>(<i>selection</i>, <i>options</i>)

Labels chart for placing `text` labels at x,y positions.

Options:

- `text` - Accessor for getting text value
- `data` - {x,y} data
- `x` - x-value accessor
- `y` - y-value accessor
- `[transform]` - Transform string or function to apply to each label relative to x,y point
- `[anchor = 'start']` - x-value of text origin (`'start'`, `'middle'`, or `'end'`)
- `[baseline = 'hanging']` - y-value of text origin (`'hanging'`, `'middle'`, or `'baseline'`), see [dominant-baseline](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline)
- `[key]`
- `[style]` - Style string, object, or function for path
- `[class]` - Class string or function for path
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

<a href="#axisTop" name="axisTop">#</a> <b>axisTop</b>(<i>selection</i>, <i>options</i>)

A top-oriented axis component that wraps [d3-axis](https://github.com/d3/d3-axis).

Options (see [d3-axis](https://github.com/d3/d3-axis) for details):

- `[scale]` or `[xScale]`
- `[style]` - Style string, object, or function for axis
- `[domainStyle]` - Style string, object, or function for axis domain path
- `[tickStyle]` - Style string, object, or function for axis ticks
- `[labelStyle]` - Style string, object, or function for axis labels
- `[class]` - Class string or function for axis
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))
- `[ticks]` - tick count or interval. To set _specifier_, use `tickArguments` 
- `[tickArguments]`, `[tickValues]`, `[tickFormat]`, `[tickSize]`, `[tickSizeInner]`, `[tickSizeOuter]`, `[tickPadding]`

<a href="#axisRight" name="axisRight">#</a> <b>axisRight</b>(<i>selection</i>, <i>options</i>)

Right-oriented axis.

- `[scale]` or `[yScale]`
- (see [#axisTop](axisTop) for remaining options)

<a href="#axisBottom" name="axisBottom">#</a> <b>axisBottom</b>(<i>selection</i>, <i>options</i>)

Bottom-oriented axis.

- `[scale]` or `[xScale]`
- (see [#axisTop](axisTop) for remaining options)

<a href="#axisLeft" name="axisLeft">#</a> <b>axisLeft</b>(<i>selection</i>, <i>options</i>)

Left-oriented axis.

- `[scale]` or `[yScale]`
- (see [#axisTop](axisTop) for remaining options)

<a href="#text" name="text">#</a> <b>text</b>(<i>selection</i>, <i>options</i>)

A text component for adding and laying out text.

Options:

- `text` - Text value
- `[anchor]` - x-value of origin (`'start'`, `'middle'`, or `'end'`)
- `[baseline]` - y-value of origin (`'hanging'`, `'middle'`, or `'baseline'`), see [dominant-baseline](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline)
- `[justify = 'start']` - x-value of container placement (`'start'`, `'center'`, `'end'`) 
- `[align = 'start']` - y-value of container placement (`'start'`, `'center'`, `'end'`)
- `[style]` -  Style string, object, or function for text
- `[class]` - Class string or function for text
- `[rotation]` - Rotate text by given angle (e.g. `-90deg`)
- `[transform]` - Manually transform text

<a href="#legend" name="legend">#</a> <b>legend</b>(<i>selection</i>, <i>options</i>)

A legend component with paths and labels

Options:

- `path` - `d` string or function to pass to `path`
- `data` - legend data for labels and other functions
- `[text]` - Accessor for legend text (default is `d => d`)
- `[size = 50]` - Set width and height of legend based on symbol sizing 
- `[width]` - Width of path area
- `[height]` -  Height of legend group
- `[groupStyle]` - Style string, object, or function for item group 
- `[groupClass]` - Class string or function for item group
- `[pathStyle]` - Style string, object, or function for item path
- `[labelStyle]` - Style string, object, or function for item label

<a href="#gridlines" name="gridlines">#</a> <b>gridlines</b>(<i>selection</i>, <i>options</i>)

Gridlines component

Options:

- `xScale` - [d3-scale](https://github.com/d3/d3-scale) for x-value
- `yScale` - d3-scale for y-value
- `[xGrid = true]` - Show x gridlines (vertical)
- `[yGrid = true]` - Show y gridlines (horizontal)
- `[style]` - Style string, object, or function for line
- `[class]` - Class string or function for line
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition))

<a href="#symbolLine" name="symbolLine">#</a> <b>symbolLine</b>

Symbol type for line symbol.

```js
import { symbol } from 'd3';
import { symbolLine } from '@d3-composer/svg';

symbol().size(50).type(symbolLine);
```

<a href="#size" name="size">#</a> <b>size</b>(<i>selection</i>)

Size helper for determining selection size.

<a href="#interpolatePath" name="interpolatePath">#</a> <b>interpolatePath</b>(<i>selection</i>, <i>path</i>[, <i>interpolate</i>])

Interpolate `d` for path with `attrTween`, if `interpolate` is provided, otherwise set `d` attr. `path` should be a `d` path string or function. `interpolate` is an interpolate function taking `(previous d, next d)`, such as [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path).

<a href="#translateXY" name="translateXY">#</a> <b>translateXY</b>(<i>x</i>, <i>y</i>)

Create translate function for given x and y accessors

```js
const { x, y } = options;
const translate = translateXY(x, y);

selection.attr('transform', translate);
```
