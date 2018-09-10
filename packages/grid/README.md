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
//   title: { x: 0, y: 0, width: 600, height: 50 },
//   y_axis: { x: 0, y: 50, width: 50, height: 300 },
//   chart: { x: 50, y: 50, width: 550, height: 300 },
//   x_axis: { x: 50, y: 350, width: 550, height: 50 }
// }
```

## API

<a href="#template" name="template">#</a> <b>template</b>(<i>spec</i>, <i>options</i>)

Create grid calculation from `grid-template` specification. `spec` should follow the `grid-template` format (see [A Complete Guide To Grid](https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-15) or [MDN grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)), although it is a simplified approach with the following rules:

- Helpers like `repeat` and `minmax` are not currently supported
- Fixed values should not include a unit (e.g. `20` instead of `20px`)

Options:

- `width`
- `height`
- `[margin]` - margin number, object, or array for outer margins
