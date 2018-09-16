import { toMargin } from '@d3-composer/utils';

const cache = new Map();
const PARSE_ROW = /\"(.*?)\"\s+(\S+)/g;

export default function template(spec, options) {
  let { width, height, margin } = options;
  margin = toMargin(margin);
  width -= margin[1] + margin[3];
  height -= margin[0] + margin[2];

  const parsed = cache.has(spec) ? cache.get(spec) : parseTemplate(spec);
  cache.set(spec, parsed);

  const { areas, rows, columns } = parsed;
  const x_positions = solve(columns, width, margin[3]);
  const y_positions = solve(rows, height, margin[0]);

  return layout(areas, x_positions, y_positions);
}

export function parseTemplate(spec) {
  const formatted = spec
    .split('\n')
    .map(trim)
    .filter(Boolean)
    .join(' ');
  const [rows_spec, columns_spec] = formatted.split('/', 2).map(trim);

  if (!rows_spec || !columns_spec) {
    throw new Error('Invalid grid template');
  }

  const { areas, rows } = parseRows(rows_spec);
  const columns = parseColumns(columns_spec);

  return { areas, rows, columns };
}

function parseRows(spec) {
  const areas = [];
  const rows = [];

  let match;
  while ((match = PARSE_ROW.exec(spec))) {
    const [_, area, row] = match;

    areas.push(area);
    rows.push(toLength(row));
  }

  return { areas: parseAreas(areas), rows };
}

function parseAreas(spec) {
  const areas = {};

  spec.forEach((row_spec, row) => {
    const columns = row_spec
      .split(' ')
      .map(trim)
      .filter(Boolean);

    columns.forEach((name, column) => {
      if (name === '.') return;

      const next_row = spec[row + 1];
      const next_column = columns[column + 1];

      if (!areas[name]) {
        areas[name] = { top: row };
      }
      if (!('left' in areas[name])) {
        areas[name].left = column;
      }
      if (!next_row || next_row[column] !== name) {
        areas[name].bottom = row + 1;
      }
      if (!next_column || next_column !== name) {
        areas[name].right = column + 1;
      }
    });
  });

  return areas;
}

function parseColumns(spec) {
  const columns = spec
    .split(' ')
    .map(trim)
    .filter(Boolean)
    .map(toLength);

  return columns;
}

export function solve(lengths, size, offset = 0) {
  // First pass, collect all scalar and percentage measurements
  let available = size;
  let fractional = 0;

  const first_pass = lengths.map(length => {
    if (length.units === 'auto') {
      // For css grid, fr + auto would shrink auto to content
      // doesn't work well for this case -> auto = 1fr
      fractional += 1;

      return { value: 1, units: 'fr' };
    } else if (length.units === 'fr') {
      fractional += length.value;

      return length;
    } else if (length.units === 'percentage') {
      const value = length.value * size;
      available -= value;

      return { value, units: 'scalar' };
    } else if (length.units === 'scalar') {
      available -= length.value;

      return length;
    }
  });

  if (available < 0) {
    throw new Error('More than 100% of available grid space was used');
  }
  if (fractional === 0) {
    return first_pass;
  }

  const solved = first_pass.map(length => {
    if (length.units === 'scalar') {
      return length.value;
    } else {
      return available * (length.value / fractional);
    }
  });

  return solved.reduce(
    (memo, value) => {
      const last = memo[memo.length - 1];
      const next = last + value;
      memo.push(next);

      return memo;
    },
    [offset]
  );
}

export function layout(areas, x_positions, y_positions) {
  const result = {};
  for (const name of Object.keys(areas)) {
    const area = areas[name];

    const top = y_positions[area.top];
    const right = x_positions[area.right];
    const bottom = y_positions[area.bottom];
    const left = x_positions[area.left];

    result[name] = {
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

export function toLength(value) {
  // units = 'auto' | 'fr' | 'percentage' | 'scalar'

  if (value === 'auto') {
    return { value, units: 'auto' };
  }
  if (value.endsWith('fr')) {
    return { value: Number(value.slice(0, -2)), units: 'fr' };
  }
  if (value.endsWith('%')) {
    return { value: Number(value.slice(0, -1)) / 100, units: 'percentage' };
  }

  try {
    return { value: Number(value), units: 'scalar' };
  } catch (err) {
    throw new Error(`Unknown length value "${value}"`);
  }
}

function trim(value) {
  return value.trim();
}
