const PARSE_ROW = /\"(.*?)\"\s*([\w\d]+)/g;
const PARSE_MINMAX = /minmax\(([\w\d\s]+),([\w\d\s]+)\)/g;
const PARSE_REPEAT = /repeat\((\d+),([^\)]+)\)/g;

export function parseTemplate(spec) {
  const formatted = spec
    .split('\n')
    .map(trim)
    .filter(Boolean)
    .join(' ');
  const [areas_rows_spec, columns_spec] = formatted.split('/', 2).map(trim);

  if (!areas_rows_spec || !columns_spec) {
    throw new Error('Invalid grid template');
  }

  let areas_spec = '';
  let rows = [];
  let match;
  while ((match = PARSE_ROW.exec(areas_rows_spec))) {
    const [_, area, row] = match;

    areas_spec += `"${area}"`;
    rows.push(toLength(row));
  }

  let areas;
  if (!areas_spec) {
    rows = parseTracks(areas_rows_spec);
    areas = {};
  } else {
    areas = parseAreas(areas_spec);
  }

  const columns = parseTracks(columns_spec);

  return { areas, rows, columns };
}

export function parseTracks(spec) {
  let minmax_match;
  while ((minmax_match = PARSE_MINMAX.exec(spec))) {
    const [result, min, max] = minmax_match;

    // To handle potential nesting in repeat()
    // replace in spec with value that can be parsed by toLength
    const { index: start } = minmax_match;
    const end = start + result.length;
    const replacement = `MINMAX:${trim(min)}-${trim(max)}`;
    spec = spec.substr(0, start) + replacement + spec.substr(end);
  }

  let repeat_match;
  while ((repeat_match = PARSE_REPEAT.exec(spec))) {
    const [result, count, value] = repeat_match;
    const { index: start } = repeat_match;
    const end = start + result.length;

    const replacement = Array(parseInt(count, 10) + 1)
      .join(`${value} `)
      .trim();

    spec = spec.substr(0, start) + replacement + spec.substr(end);
  }

  const tracks = spec
    .split(' ')
    .filter(Boolean)
    .map(toLength);

  return tracks;
}

export function parseAreas(spec) {
  const areas = {};

  spec
    .split('"')
    .filter((_, i) => i % 2 !== 0)
    .forEach((row_spec, row, rows) => {
      const columns = row_spec.split(' ').filter(Boolean);

      columns.forEach((name, column) => {
        if (name === '.') return;

        const next_row = rows[row + 1];
        const next_column = columns[column + 1];

        if (!areas[name]) {
          areas[name] = { top: row };
        }
        if (!('left' in areas[name])) {
          areas[name].left = column;
        }
        if (!next_row || next_row[column] !== name) {
          areas[name].bottom = row;
        }
        if (!next_column || next_column !== name) {
          areas[name].right = column;
        }
      });
    });

  return areas;
}

export function toLength(value) {
  // units = 'fr' | 'percentage' | 'scalar'

  if (value.indexOf('MINMAX') === 0) {
    const [_, range] = value.split(':');
    const [min, max] = range.split('-');

    return [toLength(min), toLength(max)];
  }
  if (value === 'auto') {
    // For css grid, fr + auto would shrink auto to content
    // doesn't work well for this case
    // -> treat auto = 1fr
    return { value: 1, units: 'fr' };
  }
  if (endsWith(value, 'fr')) {
    return { value: Number(value.slice(0, -2)), units: 'fr' };
  }
  if (endsWith(value, '%')) {
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

function endsWith(value, check) {
  if (!value || !check) return false;

  const index = value.indexOf(check);
  if (index < 0) return false;

  return index === value.length - check.length;
}
