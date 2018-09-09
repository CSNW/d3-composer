# @d3-composer/utils

## API

<a href="#xy" name="xy">#</a> <b>xy</b>(<i>options</i>)

Prepare `data`, `x`, and `y` values for XY data.

Options:

- `data` - single series (e.g. `[{ x: 0, y: 10 }]`) or multi-series (e.g. `[{ values: [{ x: 0, y: 10 }] }])
- `xScale`
- `yScale`
- `[xValue]` - `(d, i) => x-value`
- `[yValue]` - `(d, i) => y-value`
- `[key]` - `(d, i) => key`

<a href="#series" name="series">#</a> <b>series</b>(<i>options</i>)

Prepare `data` and `seriesKey` for series data.

Options:

- `data` - single series (e.g. `[...]`) or multi-series (e.g. `[{ values: [...] }, ...])`)
- `[seriesKey]` - `(series, i) => key`

<a href="#series-local" name="series-local">#</a> <b>Series</b>

`d3.local` used for retrieving series for node.

```js
import { Series } from '@d3-composer/utils';

const series = Series.get(node);
```

<a href="#isSeries" name="isSeries">#</a> <b>isSeries</b>(<i>value</i>)

Check if value is series data (has a `values` array)

<a href="#toSeries" name="toSeries">#</a> <b>toSeries</b>(<i>data</i>)

Convert data to series form (if needed)

<a href="#seriesExtent" name="seriesExtent">#</a> <b>seriesExtent</b>(<i>data</i>)

Calculate `[min, max]` for series data.

<a href="#toStyle" name="toStyle">#</a> <b>toStyle</b>(<i>value</i>)

Convert string, object, or function to style string

```js
const style = toStyle({ fill: 'blue', stroke: 'red' });
// style = 'fill: blue; stroke: red;'
```

<a href="#Area-local" name="Area-local">#</a> <b>Area</b>

`d3.local` used for retrieving grid area for node.
