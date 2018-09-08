# @d3-composer/svg

## Example

```js
import { chart, layer, lines, scatter } from '@d3-composer/svg';

function linesChart(selection, props) {
  const { width, height, data, xScale, yScale } = props;

  const svg = chart(selection, { width, height, responsive: true });

  lines(layer(svg, 'lines'), { data, xScale, yScale });
  scatter(layer(svg, 'scatter'), { data, xScale, yScale });
}
```

## API

<a href="#chart" name="chart">#</a> <b>chart</b>(<i>selection</i>[, <i>props</i>])

SVG chart wrapper with sizing and responsive options

<a href="#layout" name="layout">#</a> <b>layout</b>(<i>selection</i>[, <i>grid</i>])

Create `g` layers from grid

<a href="#layer" name="layer">#</a> <b>layer</b>(<i>selection</i>[, <i>id</i>])

Create named `g` layer

<a href="#lines" name="lines">#</a> <b>lines</b>(<i>selection</i>[, <i>props</i>])

Options:

- `data` - {x,y} series data
- `xScale` - [d3-scale](https://github.com/d3/d3-scale) for x-value
- `yScale` - d3-scale for y-value
- `[xValue]` - accessor for x-value (default = `d => d.x`)
- `[yValue]` - accessor for y-value (default = `d => d.y`)
- `[curve]` - See [d3-shape](https://github.com/d3/d3-shape#curves)
- `[style]` - Style string, object, or function for line
- `[class]` - Class string or function for line
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition)).
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
- `[transition]` - An instance of `d3.transition()` (see [d3-transition](https://github.com/d3/d3-transition#selection_transition)).

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

Scatter chart

<a href="#labels" name="labels">#</a> <b>labels</b>(<i>selection</i>[, <i>props</i>])

Labels component

<a href="#axis" name="axis">#</a> <b>axis</b>(<i>selection</i>[, <i>props</i>])

Axis component

<a href="#text" name="text">#</a> <b>text</b>(<i>selection</i>[, <i>props</i>])

Text component

<a href="#legend" name="legend">#</a> <b>legend</b>(<i>selection</i>[, <i>props</i>])

Legend component

<a href="#annotation" name="annotation">#</a> <b>annotation</b>(<i>selection</i>[, <i>props</i>])

Annotation component

<a href="#gridlines" name="gridlines">#</a> <b>gridlines</b>(<i>selection</i>[, <i>props</i>])

Gridlines component

<a href="#size" name="size">#</a> <b>size</b>(<i>selection<i>)

Size helper
