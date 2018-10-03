export function toStyle(value) {
  if (!value) {
    return null;
  }
  if (typeof value === 'function') {
    return function() {
      const style = toStyle(value.apply(this, arguments));
      return typeof style === 'function' ? style.apply(this, arguments) : style;
    };
  }
  if (typeof value === 'string') {
    return value;
  }

  const { fixed, dynamic } = Object.keys(value).reduce(
    (memo, key) => {
      if (typeof value[key] !== 'function') {
        memo.fixed.push(`${key}: ${value[key]};`);
      } else {
        memo.dynamic.push(function(d, i, j) {
          return `${key}: ${value[key].call(this, d, i, j)};`;
        });
      }

      return memo;
    },
    { fixed: [], dynamic: [] }
  );

  if (!dynamic.length) {
    return fixed.join(' ');
  }

  return function(d, i, j) {
    return fixed.concat(dynamic.map(fn => fn.call(this, d, i, j))).join(' ');
  };
}
