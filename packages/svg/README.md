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

Lines chart

<a href="#bars" name="bars">#</a> <b>bars</b>(<i>selection</i>[, <i>props</i>])

Bars chart

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
