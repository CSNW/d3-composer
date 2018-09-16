const PARSE_ROW = /\"(.*?)\"\s*([\w\d]+)/g;

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
  while ((match = PARSE_ROW.exec(spec))) {
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
    .forEach((row_spec, row) => {
      const columns = row_spec.split(' ').filter(Boolean);

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

  if (value === 'auto') {
    // For css grid, fr + auto would shrink auto to content
    // doesn't work well for this case
    // -> treat auto = 1fr
    return { value: 1, units: 'fr' };
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
