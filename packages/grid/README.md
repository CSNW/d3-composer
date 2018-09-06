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

<a href="#template" name="template">#</a> <b>template</b>(<i>spec</i>, <i>size</i>)

Create grid from `grid-template` specification and size.
