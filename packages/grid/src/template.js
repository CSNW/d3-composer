import { toMargin } from '@d3-composer/utils';
import { parseTemplate, parseRows, parseColumns, parseAreas } from './parse';
import solve from './solve';

const cache = new Map();

export default function template(spec, options) {
  let { width, height, row_gap, column_gap, padding } = options;
  padding = toMargin(padding);
  width -= padding[1] + padding[3];
  height -= padding[0] + padding[2];

  // spec: string = template
  // spec: object = { rows, columns, [areas] } templates
  let rows, columns, areas;
  if (typeof spec === 'object') {
    rows = parseRows(spec.rows);
    columns = parseColumns(spec.columns);
    areas = spec.areas ? parseAreas(spec.areas) : {};
  } else {
    const parsed = cache.has(spec) ? cache.get(spec) : parseTemplate(spec);
    cache.set(spec, parsed);
    ({ rows, columns, areas } = parsed);
  }

  const x = solve(columns, width, column_gap, padding[3]);
  const y = solve(rows, height, row_gap, padding[0]);

  return layout(rows, columns, areas, x, y);
}

export function layout(rows, columns, areas, x, y) {
  const result = { rows: y, columns: x, items: [], areas: {} };

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      const top = y[i][0];
      const right = x[j][1];
      const bottom = y[i][1];
      const left = x[j][0];

      result.items.push({
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
        top,
        right,
        bottom,
        left
      });
    }
  }

  for (const name of Object.keys(areas)) {
    const area = areas[name];

    const top = y[area.top][0];
    const right = x[area.right][1];
    const bottom = y[area.bottom][1];
    const left = x[area.left][0];

    result.areas[name] = {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      top,
      right,
      bottom,
      left
    };
  }

  return result;
}
