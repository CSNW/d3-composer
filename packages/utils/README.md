# @d3-composer/utils

## API

<a href="#xy" name="xy">#</a> <b>xy</b>(<i>options</i>)

Prepare `data`, `x`, and `y` values for XY data.

Options:

- `data` - single series (e.g. `[{ x: 0, y: 10 }]`) or multi-series (e.g. `[{ values: [{ x: 0, y: 10 }] }])
- `xScale`
- `yScale`
- `xValue` - `(d, i) => x-value`
- `yValue` - `(d, i) => y-value`

<a href="#isSeries" name="isSeries">#</a> <b>isSeries</b>(<i>value</i>)

Check if value is series data (has a `values` array)

<a href="#toSeries" name="toSeries">#</a> <b>toSeries</b>(<i>data</i>)

Convert data to series form (if needed)

<a href="#seriesKey" name="seriesKey">#</a> <b>seriesKey</b>(<i>d</i>, <i>i</i>)

Get series key for series.

<a href="#toStyle" name="toStyle">#</a> <b>toStyle</b>(<i>value</i>)

Convert object or function returning object to style string
