# @d3-composer/grid

## Example

```js
import { template } from '@d3-composer/grid';

const grid = template(`
  "title title" 50
  "y_axis chart" auto
  ". x_axis" 50
  / 50 auto
`, { width: 600, height: 400 });

// For size = { width: 600, height: 400 }:
//
// grid = {
//   areas: {
//     title: {
//       x: 0, y: 0, width: 600, height: 50,
//       top: 0, right: 600, bottom: 50, left: 0
//     },
//     y_axis: { x: 0, y: 50, width: 50, height: 300 },
//     chart: { x: 50, y: 50, width: 550, height: 300 },
//     x_axis: { x: 50, y: 350, width: 550, height: 50 }
//   },
//   rows: [[0, 50], [50, 350], [350, 400]]
//   columns: [[0, 50], [50, 600]]
//   items: [
//     { x: 0, y: 0, ...}
//     ...items correspond to each grid position
//        from left-to-right, top-to-bottom
//        (6 in this example)
//   ]
// }
```

## API

<a href="#template" name="template">#</a> <b>template</b>(<i>spec</i>, <i>options</i>)

Create grid calculation from `grid-template` specification. `spec` should follow the `grid-template` format (see [A Complete Guide To Grid](https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-15) or [MDN grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)), although it is a simplified approach with the following rules:

<b>spec</b>

`grid-template` spec string or object with `rows`, `columns`, and `[areas]`.

<b>options</b>

- `width` - Overall width
- `height` - Overall height
- `[gap]` - Gap between each row and column
- `[row_gap]` - Gap between each row (unitless value, e.g. `20`)
- `[column_gap]` - Gap between each column (unitless value, e.g. `30`)
- `[padding]` - Number, object, or array of padding from outer width/height and grid items

Notes:

- Fixed values should not include a unit (e.g. `20` instead of `20px`)
- "auto" does not behave according to CSS Grid spec and is instead treated like 1fr in all cases

```js
// chart with 50-unit high title
const grid = template(`
  "title" 50
  "chart" auto
  / auto
`, { width, height })

// chart with y-axis (25-unit width) and y-axis title (25-unit width)
const grid = template(`
  "y_title y_axis chart" auto
  / 25 25 auto
`, { width, height })

// chart with outer margins ([top, right, bottom, left])
const grid = template(
  `"chart" auto / auto`,
  { width, height, margin: [20, 40, 20, 40] }
);

// | title    (title)  (title) | 50
// | y_axis | chart  | legend  | auto
// | .      | x_axis | .       | 25
//   25       auto     100
const grid = template(`
  "title  title  title " 50
  "y_axis chart  legend" auto
  ".      x_axis .     " 25
  / 25    auto   100
`, { width, height });

// Grid template with row and column sizing
const grid = template(
  { rows: '50 auto 25', columns: '25 auto 100' },
  { width, height }
);

// equivalent to:

const grid = template(`50 auto 25 / 25 auto 100`, { width, height });

// repeat and minmax are supported

const grid = template(`repeat(4, 1fr) / minmax(100, 0.5fr) 1fr`, { width, height });
```
