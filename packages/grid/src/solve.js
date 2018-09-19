/*

See complete spec at https://drafts.csswg.org/css-grid/#algo-track-sizing

1. Initialize track sizes
  - base size, fixed = # or percentage
  - base size, flexible (fr or auto) = 0
  - growth limit, fixed = # or percentage
  - growth limit, flexible = base size
  - If growth limit is less than base size, increase growth limit to base size

2. (skipped, no intrinsic track sizes in @d3-composer/grid)

3. Maximize fixed tracks
  - S = grid size
  - B = combined base sizes
  - G = combined growth limits
  - A = available space
  - x = scaling factor
  
  S = Gx + A

  If G > S, A = 0 and x = S / G
  Otherwise, x = 1

4. Expand flexible tracks
  - A = available space
  - F = sum of flex factors

  fr = A / F

  If calculated fr is less than track base size, re-calculate fr, treating track as inflexible

5. (skipped, auto = 1fr in @d3-composer/grid)

*/

export default function solve(lengths, size, gap = 0, offset = 0) {
  size -= gap * (lengths.length - 1);

  // 1. Initialize track sizes
  let base_total = 0;
  let growth_total = 0;

  lengths = lengths.map(length => {
    let flexible = false;
    let base = 0;
    let growth = 0;

    if (Array.isArray(length)) {
      if (length[0].units === 'percentage') {
        base = length[0].value * size;
      } else if (length[0].units === 'scalar') {
        base = length[0].value;
      } else {
        throw new Error(`Invalid units "${length[0].units}" for base value`);
      }

      if (length[1].units === 'scalar') {
        growth = length[1].value;
      } else if (length[1].units === 'percentage') {
        growth = length[1].value * size;
      } else {
        growth = length[1].value;
        flexible = true;
      }
    } else {
      if (length.units === 'scalar') {
        base = growth = length.value;
      } else if (length.units === 'percentage') {
        base = growth = length.value * size;
      } else {
        base = 0;
        growth = length.value;
        flexible = true;
      }
    }

    base_total += base;
    growth_total += flexible ? 0 : growth;

    return { base, growth, flexible };
  });

  if (base_total > size) {
    throw new Error('More than 100% of available grid space was used');
  }

  // 2. (skipped)

  // 3. Maximize fixed tracks
  //
  // > If the free space is positive, distribute it equally to the base sizes of all tracks,
  // > freezing tracks as they reach their growth limits (and continuing to grow the unfrozen tracks as needed).
  //
  // Calculate a minimal step size so that the tracks increase equally

  if (growth_total > size) {
    let growth_size = base_total;
    let growing = lengths.filter(
      length => !length.flexible && length.growth > length.base
    );
    let available = size - growth_size;
    let step_size = available / growing.length;

    while (growth_size < size) {
      growing = growing.filter(length => {
        const remaining = length.growth - length.base;

        const step =
          available < remaining && available < step_size
            ? available
            : remaining < step_size
              ? remaining
              : step_size;

        length.base += step;
        growth_size += step;
        available -= step;

        return length.growth > length.base;
      });
      step_size = available / growing.length;
    }
  } else {
    // Growth is within free space, apply max growth to all
    lengths.forEach(length => {
      if (length.flexible) return;
      length.base = length.growth;
    });
  }

  // 4. Expand flexible tracks
  //
  // Calculate fr as available size / total factors
  // and apply unless growth is less than base,
  // in which case that track is made "inflexible"
  // and fr is re-calculated

  const available = growth_total > size ? 0 : size - growth_total;
  if (available) {
    let flexible = lengths.filter(({ flexible }) => flexible);
    let solved = flexible.length === 0;

    while (!solved) {
      const factor_total = flexible.reduce(
        (memo, { growth }) => memo + growth,
        0
      );
      const fr = available / factor_total;

      const valid = flexible.filter(length => {
        const { base, growth } = length;
        const value = growth * fr;

        if (value < base) {
          length.flexible = false;
          return false;
        } else {
          // If lengths are made inflexible,
          // fr is guaranteed to go up and base will increase
          // -> safe to set base here

          length.base = value;
          return true;
        }
      });

      if (valid.length === flexible.length) {
        solved = true;
      } else {
        flexible = valid;
      }
    }
  }

  // 5. (skipped)

  // Finally, extract [left, right] values for each track
  return lengths.reduce((memo, length, index) => {
    const last = memo[index - 1];

    const left = last ? last[1] + gap : offset;
    const right = left + length.base;

    memo.push([left, right]);
    return memo;
  }, []);
}
