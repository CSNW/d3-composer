# @d3-composer/utils

## API

<a href="#toStyle" name="toStyle">#</a> <b>toStyle</b>(<i>style</i>)

Convert string, object, or function to style string

```js
const style = toStyle({ fill: 'blue', stroke: 'red' });
// style = 'fill: blue; stroke: red;'

const fn = toStyle(d => ({ fill: d.fill }));
// fn ~= d => `fill: ${d.fill};`

const dynamic = toStyle({ fill: d => d.fill, stroke: 'none' });
// dynamic ~= d => `fill: ${d.fill}; stroke: none;`
```

<a href="#toMargin" name="toMargin">#</a> <b>toMargin</b>(<i>margin</i>)

Convert number or object to margin array `[top, right, bottom, left]`.

```js
toMargin() // [0, 0, 0, 0]
toMargin(10) // [10, 10, 10, 10]
toMargin({ top: 10 }) // [10, 0, 0, 0]
toMargin([0, 0, 10, 0]) // [0, 0, 10, 0]
```

<a href="#passthrough" name="passthrough">#</a> <b>passthrough</b>(<i>d</i>)

Helper for passing through data from selection by default (`d => d || []`)

<a href="#array" name="array">#</a> <b>array</b>(<i>value</i>)

Helper for wrapping value in an array, handling a value function if given

<a href="#fn" name="fn">#</a> <b>fn</b>(<i>value</i>)

Helper for ensuring returned value is a function by wrapping if necessary

<a href="#seriesExtent" name="seriesExtent">#</a> <b>seriesExtent</b>(<i>data</i>, <i>values</i>, <i>value</i>)

Calculate `[min, max]` for series data.

```js
const data = [
  { values: [{ x: 100 }] },
  { values: [{ x: 0 }] }
];

const [min, max] = seriesExtent(data, series => series.values, d => d.x);
// min = 0, max = 100
```

<a href="#Size-local" name="Size-local">#</a> <b>Size</b>

`d3.local` used for retrieving defined size for node (e.g. from grid area).

<a href="#Area-local" name="Area-local">#</a> <b>Area</b>

`d3.local` use for retrieving grid area for node.

<a href="#Series-local" name="Series-local">#</a> <b>Series</b>

`d3.local` used for retrieving series for node.
