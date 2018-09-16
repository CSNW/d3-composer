export default function solve(lengths, size, gap = 0, offset = 0) {
  size -= gap * (lengths.length - 1);

  // First pass, collect all scalar and percentage measurements
  let available = size;
  let fractional = 0;

  const first_pass = lengths.map(length => {
    if (length.units === 'fr') {
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

  const solved = first_pass.map(length => {
    if (length.units === 'scalar') {
      return length.value;
    } else {
      return available * (length.value / fractional);
    }
  });

  return solved.reduce((memo, value, index) => {
    const last = memo[index - 1];

    const left = last ? last[1] + gap : offset;
    const right = left + value;

    memo.push([left, right]);
    return memo;
  }, []);
}
